<#
.SYNOPSIS
    Pilot Userscripts Toolkit — Build, Sync & Local Distribution Manager
.DESCRIPTION
    Tu dong hoa hoan toan quy trinh dong bo shared blocks, bien dich TTS Reader
    va chay local server de cai dat/cap nhat 1-click vao Tampermonkey/Violentmonkey.
    Cau truc chuan hoa: 00_Shared, 01_Downloaders, 02_Readers, 03_Tools.
#>

[CmdletBinding()]
param(
    [ValidateSet('all', 'sync', 'build', 'check', 'serve')]
    [string]$Action = 'all',
    [int]$Port = 8768
)

$ErrorActionPreference = 'Stop'
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$SharedDir = Join-Path $ScriptDir '00_Shared'
$DlDir     = Join-Path $ScriptDir '01_Downloaders'
$TtsDir    = Join-Path $ScriptDir '02_Readers'
$ToolsDir  = Join-Path $ScriptDir '03_Tools'
$DistDir   = Join-Path $TtsDir 'dist'
$SitesDir  = Join-Path $TtsDir 'sites'

# ==============================================================================
# 1. HAM DONG BO SHARED BLOCKS (SYNC)
# ==============================================================================
function Invoke-PilotSync([bool]$CheckOnly = $false) {
    Write-Host "`n[PILOT SYNC] Ra soat va dong bo cac khoi dung chung theo cau truc chuan..." -ForegroundColor Cyan

    $blocks = @(
        @{
            src = "ui-kit.js"; tag = "aurel-ui-kit";
            targets = @(
                '01_Downloaders\ao3-downloader.user.js',
                '01_Downloaders\ffn-downloader.user.js',
                '01_Downloaders\jjwxc-downloader.user.js',
                '01_Downloaders\lofter-downloader.user.js',
                '01_Downloaders\stv-downloader.user.js',
                '01_Downloaders\wattpad-downloader.user.js',
                '01_Downloaders\wikicv-downloader.user.js',
                '02_Readers\core.js',
                '03_Tools\stv-names.user.js',
                '03_Tools\tm-translate.user.js',
                '03_Tools\wikicv-library.user.js',
                '03_Tools\wikicv-name-desk.user.js'
            )
        },
        @{
            src = "epub.js"; tag = "aurel-epub";
            targets = @(
                '01_Downloaders\ao3-downloader.user.js',
                '01_Downloaders\wattpad-downloader.user.js'
            )
        }
    )

    $staleCount = 0

    foreach ($blk in $blocks) {
        $srcPath = Join-Path $SharedDir $blk.src
        $openTag = "// <$($blk.tag)>"
        $closeTag = "// </$($blk.tag)>"

        if (-not (Test-Path $srcPath)) {
            Write-Error "Khong tim thay file nguon: $srcPath"
        }

        $kitLines = [System.IO.File]::ReadAllLines($srcPath, [System.Text.Encoding]::UTF8)
        if ($kitLines.Length -lt 2 -or $kitLines[0].Trim() -ne $openTag -or $kitLines[$kitLines.Length - 1].Trim() -ne $closeTag) {
            Write-Error "$($blk.src) phai mo bang $openTag va dong bang $closeTag"
        }

        foreach ($relTarget in $blk.targets) {
            $targetPath = Join-Path $ScriptDir $relTarget
            if (-not (Test-Path $targetPath)) {
                Write-Warning "Khong tim thay target: $targetPath"
                continue
            }

            $lines = [System.IO.File]::ReadAllLines($targetPath, [System.Text.Encoding]::UTF8)
            $startIdx = -1
            $endIdx = -1

            for ($i = 0; $i -lt $lines.Length; $i++) {
                if ($lines[$i].Trim() -eq $openTag) { $startIdx = $i }
                if ($lines[$i].Trim() -eq $closeTag) { $endIdx = $i; break }
            }

            if ($startIdx -eq -1 -or $endIdx -eq -1 -or $endIdx -le $startIdx) {
                Write-Warning "$relTarget thieu cap the $openTag .. $closeTag"
                continue
            }

            # So sanh noi dung hien tai va nguon
            $currentBlockLength = $endIdx - $startIdx + 1
            $isSame = ($currentBlockLength -eq $kitLines.Length)

            if ($isSame) {
                for ($k = 0; $k -lt $kitLines.Length; $k++) {
                    if ($lines[$startIdx + $k] -ne $kitLines[$k]) {
                        $isSame = $false
                        break
                    }
                }
            }

            if ($isSame) {
                Write-Host "  = $relTarget [$($blk.tag)] (dong bo tot)" -ForegroundColor DarkGray
            } else {
                $staleCount++
                if ($CheckOnly) {
                    Write-Host "  ! $relTarget [$($blk.tag)] (CAN DONG BO)" -ForegroundColor Yellow
                } else {
                    $newLines = New-Object System.Collections.Generic.List[string]

                    for ($i = 0; $i -lt $startIdx; $i++) {
                        $newLines.Add($lines[$i])
                    }
                    foreach ($kl in $kitLines) {
                        $newLines.Add($kl)
                    }
                    for ($i = $endIdx + 1; $i -lt $lines.Length; $i++) {
                        $newLines.Add($lines[$i])
                    }

                    [System.IO.File]::WriteAllLines($targetPath, $newLines.ToArray(), [System.Text.Encoding]::UTF8)
                    Write-Host "  + $relTarget [$($blk.tag)] (DA CAP NHAT)" -ForegroundColor Green
                }
            }
        }
    }

    Write-Host "[PILOT SYNC] Hoan tat. So muc lech: $staleCount" -ForegroundColor Cyan
    return ($staleCount -eq 0)
}

# ==============================================================================
# 2. HAM BIEN DICH TTS READER (BUILD)
# ==============================================================================
function Invoke-PilotBuild {
    Write-Host "`n[PILOT BUILD] Bien dich TTS Reader tu 02_Readers/core.js va 02_Readers/sites/*.js..." -ForegroundColor Cyan

    $coreFile = Join-Path $TtsDir 'core.js'
    if (-not (Test-Path $coreFile)) {
        Write-Error "Khong tim thay core.js tai $coreFile"
    }

    if (-not (Test-Path $DistDir)) {
        New-Item -ItemType Directory -Path $DistDir -Force | Out-Null
    }

    # Doc phan than core.js (bo phan khai bao boc va // ==UserScript==)
    $coreRaw = [System.IO.File]::ReadAllText($coreFile, [System.Text.Encoding]::UTF8)

    # Cat bo // ==UserScript== ... // ==/UserScript== neu co trong core
    $coreClean = [regex]::Replace($coreRaw, '(?s)// ==UserScript==.*?// ==/UserScript==\r?\n?', '')
    # Cat bo bọc IIFE ngoai cung neu co
    $coreClean = [regex]::Replace($coreClean, '^\s*\(function\s*\(\)\s*\{', '')
    $coreClean = [regex]::Replace($coreClean, '\}\)\(\);\s*$', '')

    # Indent 4 spaces cho core code
    $coreLines = $coreClean -split '\r?\n'
    $indentedCoreLines = $coreLines | ForEach-Object { if ($_) { "    $_" } else { "" } }
    $coreProcessed = $indentedCoreLines -join "`r`n"

    # Lay version tu core.js neu co, hoac mac dinh
    $version = "0.3.0"
    if ($coreRaw -match "VERSION\s*=\s*['`"]([^'`"]+)['`"]") {
        $version = $Matches[1]
    }

    # Xoa dist cu neu co ten cu (nhu fanfiction)
    $oldFfnDist = Join-Path $DistDir "tts-reader-fanfiction.user.js"
    if (Test-Path $oldFfnDist) { Remove-Item $oldFfnDist -Force }

    $siteFiles = Get-ChildItem -Path $SitesDir -Filter "*.js" | Sort-Object Name
    foreach ($sf in $siteFiles) {
        $siteRaw = [System.IO.File]::ReadAllText($sf.FullName, [System.Text.Encoding]::UTF8)

        $headerMatch = [regex]::Match($siteRaw, '(?s)(// ==UserScript==.*?// ==/UserScript==)')
        if (-not $headerMatch.Success) {
            Write-Warning "Khong tim thay metadata header trong $($sf.Name)"
            continue
        }

        $header = $headerMatch.Groups[1].Value
        $body = $siteRaw.Substring($headerMatch.Index + $headerMatch.Length).Trim()

        $headerProcessed = $header.Replace('{{VERSION}}', $version)

        $bodyProcessed = [regex]::Replace($body, '(?m)^\s*SITE\s*=', 'var SITE =')

        $siteLines = $bodyProcessed -split '\r?\n'
        $indentedSiteLines = $siteLines | ForEach-Object { if ($_) { "    $_" } else { "" } }
        $indentedSiteBlock = $indentedSiteLines -join "`r`n"

        $output = @"
$headerProcessed
// File nay duoc BUILD tu 02_Readers/ (core.js + sites/$($sf.Name)). Sua o do roi chay: .\build_pilot.ps1

;(function () {
    'use strict';

$indentedSiteBlock

$coreProcessed
})();
"@

        $distFileName = "tts-reader-$($sf.BaseName).user.js"
        $distFilePath = Join-Path $DistDir $distFileName
        [System.IO.File]::WriteAllText($distFilePath, $output, [System.Text.Encoding]::UTF8)

        $sizeKb = [math]::Round((Get-Item $distFilePath).Length / 1KB, 1)
        Write-Host "  + $distFileName ($sizeKb KB)" -ForegroundColor Green
    }

    Write-Host "[PILOT BUILD] Hoan tat cac ban build trong 02_Readers/dist/" -ForegroundColor Cyan
}

# ==============================================================================
# 3. HAM CHAY LOCAL HTTP SERVER (SERVE)
# ==============================================================================
function Start-PilotServer([int]$ListenPort) {
    Write-Host "`n[PILOT SERVER] Khoi chay Local Userscript Hub tai http://127.0.0.1:$ListenPort/ ..." -ForegroundColor Cyan
    Write-Host "Bam Ctrl+C de dung server.`n" -ForegroundColor Yellow

    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://127.0.0.1:$ListenPort/")
    $listener.Prefixes.Add("http://localhost:$ListenPort/")
    $listener.Start()

    try {
        while ($listener.IsListening) {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response

            $urlPath = $request.Url.LocalPath.TrimStart('/')

            if ([string]::IsNullOrEmpty($urlPath) -or $urlPath -eq 'index.html') {
                $response.ContentType = "text/html; charset=utf-8"
                $scriptsList = Get-ChildItem -Path $ScriptDir -Recurse -File -Filter "*.user.js" | Sort-Object Name

                $html = @"
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <title>AureLysn Pilot — Userscript Hub</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0b0b0f; color: #ede6db; padding: 30px; max-width: 960px; margin: 0 auto; }
        h1 { color: #f2a65a; border-bottom: 2px solid #20424a; padding-bottom: 10px; margin-bottom: 6px; }
        h2 { color: #3be6c5; font-size: 18px; margin-top: 26px; margin-bottom: 12px; border-left: 4px solid #3be6c5; padding-left: 10px; }
        .sub { color: #93b2b0; font-size: 14px; margin-bottom: 24px; }
        .card { background: #16323a; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; border: 1px solid rgba(160,215,208,.12); }
        .card:hover { border-color: rgba(59,230,197,.4); }
        .info { flex: 1; }
        .title { font-weight: bold; font-size: 15px; color: #e8f4f2; }
        .desc { font-size: 12.5px; color: #93b2b0; margin-top: 3px; font-family: monospace; }
        .btn { background: #f2a65a; color: #0b0b0f; font-weight: bold; text-decoration: none; padding: 7px 15px; border-radius: 6px; white-space: nowrap; margin-left: 16px; font-size: 13px; }
        .btn:hover { background: #3be6c5; color: #053a33; }
        .tag { font-size: 11px; background: #20424a; color: #7fe0a8; padding: 2px 7px; border-radius: 4px; margin-left: 8px; font-weight: normal; }
    </style>
</head>
<body>
    <h1>Pilot — Userscripts Hub</h1>
    <div class="sub">Hệ thống userscript chuẩn hóa cho AureLysn Vault. Bấm <strong>Cài đặt 1-Click</strong> để nạp trực tiếp vào Tampermonkey / Violentmonkey.</div>
"@

                $categories = @(
                    @{ name = "01. Bộ Tải Truyện (01_Downloaders)"; pattern = "01_Downloaders" },
                    @{ name = "02. Bộ Đọc TTS Reader (02_Readers)"; pattern = "02_Readers" },
                    @{ name = "03. Bộ Công Cụ & Dịch Thuật (03_Tools)"; pattern = "03_Tools" }
                )

                foreach ($cat in $categories) {
                    $catScripts = $scriptsList | Where-Object { $_.FullName -match [regex]::Escape($cat.pattern) }
                    if ($catScripts.Count -gt 0) {
                        $html += "<h2>$($cat.name)</h2>"
                        foreach ($s in $catScripts) {
                            $relUrl = $s.FullName.Substring($ScriptDir.Length).TrimStart('\').Replace('\', '/')
                            $sizeKb = [math]::Round($s.Length / 1KB, 1)
                            $html += "<div class='card'><div class='info'><div class='title'>$($s.Name) <span class='tag'>$sizeKb KB</span></div><div class='desc'>$relUrl</div></div><a class='btn' href='/$relUrl'>Cài đặt 1-Click</a></div>"
                        }
                    }
                }

                $html += @"
</body>
</html>
"@
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($html)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
                $response.OutputStream.Close()
                continue
            }

            # Serve file .user.js hoac file khac
            $filePath = Join-Path $ScriptDir ($urlPath.Replace('/', '\'))

            if (Test-Path $filePath -PathType Leaf) {
                if ($filePath.EndsWith('.user.js') -or $filePath.EndsWith('.js')) {
                    $response.ContentType = "application/javascript; charset=utf-8"
                } else {
                    $response.ContentType = "application/octet-stream"
                }

                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
                $response.OutputStream.Close()
            } else {
                $response.StatusCode = 404
                $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
                $response.OutputStream.Close()
            }
        }
    } finally {
        $listener.Stop()
        $listener.Close()
        Write-Host "`n[PILOT SERVER] Da dung server." -ForegroundColor Yellow
    }
}

# ==============================================================================
# 4. DIEU PHOI LENH (DISPATCHER)
# ==============================================================================
switch ($Action) {
    'sync'  { Invoke-PilotSync -CheckOnly $false }
    'check' { Invoke-PilotSync -CheckOnly $true }
    'build' { Invoke-PilotBuild }
    'all'   {
        $ok = Invoke-PilotSync -CheckOnly $false
        Invoke-PilotBuild
        Write-Host "`n[PILOT] Hoan tat tat ca thao tac build & sync!" -ForegroundColor Green
    }
    'serve' {
        Start-PilotServer -ListenPort $Port
    }
}
