---
id: subsystem.nexus.readme
type: info
scope: global
lane: personal
status: active
aliases: ["Trạm Dịch", "Tram Dich", "Nexus README", "TranslateCenter", "tram dich zh-vi"]
related: ["[[_EVASION-MOC]]"]
always_load: false
tags: [d/doc, k/subsystem, p/personal]
last_updated: 2026-11-13
---

# Trạm Dịch

Web local để đọc, sửa và dịch truyện **zh → vi** và **en → vi**. Nhận file `.epub` / `.txt` /
`.md` / `.html`, và `.zip` / `.rar` chứa nhiều truyện, tải lên từ máy hoặc duyệt từ Google Drive
(`G:\My Drive`). Sách được chia tủ và gắn tag để lọc.

Không cần cài thư viện nào, chỉ cần Python 3.11+ (máy đang có 3.14).

## Chạy

Nhấp đúp `start.bat`, hoặc:

```
python server.py                 # mở http://127.0.0.1:8765
python server.py --port 9000 --no-browser
```

Server chỉ nghe trên `127.0.0.1`. Máy khác trong mạng không truy cập được.

## Engine dịch

Phần dịch được port từ `TM-Translate-3.5.5.18-AureLysn.user.js`: cùng dạng request, cùng cách
giữ tên riêng bằng placeholder, cùng cơ chế gói lỗi thì chia đôi rồi thử lại.

| Engine | Trung | Anh | Ghi chú |
|---|---|---|---|
| dichngay | ✅ | ❌ | Mặc định cho tiếng Trung. Đo ngày 13/09/2026: câu tiếng Anh bị trả nguyên văn |
| dichnhanh | ✅ | ❌ | Có các mode vi / qt / hv, văn phong Ancient / Modern |
| google | ✅ | ✅ | Endpoint `gtx` không chính thức. Mặc định cho tiếng Anh |
| local | ✅ | ❌ | VietPhrase offline. Phải nạp hoặc tải từ điển trong Cài đặt trước |

Cả ba engine server đều là API **không chính thức**. Chúng có thể đổi hoặc chặn bất cứ lúc nào,
khi đó tăng giãn cách trong Cài đặt hoặc đổi engine.

## Mở từ vault

Mục **Mở từ vault** duyệt `05_Evasion/01_Oeuvre/Studio/Continue/` và `Studio/Original/` của AureLysn Vault (một danh sách dự án chung).

- **Chỉ đọc**, trừ một nút: **Lưu thành file… → vault** ở Bàn viết tạo note mới cạnh chương (xem mục
  Bàn viết). Ngoài nút đó, nội dung chỉ được chép vào thư viện; sửa hay dịch trong app không ghi ngược
  vào vault, vì `sources/` là bất biến và chương muốn chốt phải đi qua gate của vault.
- Chọn nhiều file `.md` / `.txt`, kể cả ở nhiều thư mục, rồi nhập thành **một** cuốn sách. Có ba cách
  chia chương: mỗi file một chương, tách theo `#`/`##`, hoặc tách theo regex. Frontmatter bị bỏ,
  wikilink được đổi thành chữ thường.
- Note nguồn có khai `asset:` (store + path_rel) sẽ hiện nút **Nhập file gốc trong kho**. Đường dẫn
  thật được tra trong `01_Origine/03_Systems/Config/stores.md`. Hỗ trợ `.zip` chứa các file txt (kiểu tải từ Lofter),
  `.html`, `.epub`, `.txt`.
- Chương lấy từ note chưa chốt (`status:` là `idea` / `draft` / `wip` / `review`) mang nhãn **nháp** ở mục
  lục và đầu chương. Nhãn đi theo note: lấy lại chương sau khi note thành `final` thì nhãn mất, và nếu
  văn bản không đổi thì bản dịch được giữ. `tram_dich_push.py` của vault đẩy cả chương nháp và ghi đè
  bản nháp đã đổi; chương đã chốt thì nó chỉ báo.
- Sách lấy từ vault **phải xác nhận trước khi dịch bằng engine server**, theo luật fiction §6: không
  upload ra ngoài trừ khi Aurel yêu cầu. Engine `local` thì không cần hỏi.
- Không cho lưu file xuất vào bên trong vault hay bản mirror của vault.
- Gốc vault: khai trong Cài đặt, hoặc để trống để app tự tìm gốc `D:\AureLysn`.

## Nhập .zip / .rar — nhiều truyện trong một file

Thả một `.zip` hoặc `.rar` vào Thư viện (hoặc **Tải file lên**, hoặc chọn **một** archive trong **Từ
Drive**) thì app quét trước rồi mới hỏi, vì một archive thường chứa nhiều truyện với số file khác nhau.

Bảng xem trước liệt kê từng truyện kèm **số chương · số file**. Bỏ tick truyện không cần, sửa tên ngay
trong ô, và đổi cách tách:

| Cách tách | Dùng khi |
|---|---|
| **Mỗi thư mục con = 1 truyện** (mặc định) | `Bộ truyện/Truyện A/*.txt` + `Bộ truyện/Truyện B/*.txt`. Một lớp thư mục bọc ngoài bị bỏ qua vì nó không phải ranh giới truyện. Archive **phẳng**, không có thư mục con nào, thì tính là một truyện — tên lấy theo thư mục bọc ngoài, không có thì lấy tên archive |
| **Cả archive = 1 truyện** | bản tải kiểu Lofter: mọi file là chương của cùng một truyện |
| **Mỗi file = 1 truyện** | một thư mục toàn truyện ngắn, mỗi file một truyện |

- Nhóm **nhiều file** → mỗi file một chương, xếp theo thứ tự tên tự nhiên (`ch2` trước `ch10`). Dòng đầu
  là tên chương; phần đầu bài Lofter bị cắt nếu bật tuỳ chọn bên dưới.
- Nhóm **một file** → file đó là cả truyện, tách chương bằng regex tiêu đề (đổi trong Cài đặt).
- File `.epub` nằm trong archive luôn là một truyện riêng, không bao giờ bị gộp thành chương — trừ khi
  chọn *Cả archive = 1 truyện* và trong đó đã có sẵn file text, khi ấy epub được coi là bản gốc và bỏ qua.
- Hai nút ở cuối bảng: **Nhập vào thư viện** (sửa và dịch tiếp được) và **Tải epub** (tạo epub thẳng từ
  bản gốc, không lưu gì vào thư viện; nhiều truyện thì gói trong một zip).

### Bỏ phần đầu bài Lofter và ghi chú tác giả

Bản tải từ Lofter đặt một khối thông tin lên đầu **mỗi** bài. Đo ngày 17/09/2026 trên zip trong
`00_Inbox`, khối đó luôn cùng một hình dạng:

```
【6927】…-序.                          <- tiêu đề bài, đã thành tên chương
3.4.2020                               <- ngày, không phải bài nào cũng có
https://hongli243.lofter.com/post/…    <- link post, luôn nằm ngay trên dòng kẻ
——————————————————————————————          <- dòng kẻ đóng khối
［Ảnh］ https://imglf4.lf127.net/…      <- link ảnh moi ra từ bài
彭哥列第十代首领…                        <- blurb / giới thiệu nhân vật
#6927 #ALL27 大家不要站錯ㄌ              <- dòng tag đóng khối theo lệ Lofter
序.                                     <- tiêu đề lặp lại, rồi mới tới truyện
```

Tick **Bỏ phần đầu bài Lofter và ghi chú tác giả** trong bảng xem trước (bật sẵn) thì cắt từ đầu bài tới hết dòng kẻ;
nếu trong 12 dòng kế tiếp có dòng tag thì cắt tới hết dòng tag; rồi bỏ nốt link ảnh và dòng tiêu đề
bị lặp ở đầu phần còn lại. Bài không có link post ở 4 dòng đầu thì không bị đụng tới, và **không bao
giờ cắt tới mức chương rỗng** — cắt mà hết chữ thì giữ nguyên bài.

Cùng tuỳ chọn đó cắt luôn **dòng ghi chú của tác giả** ở **đầu và cuối** chương — dòng mở đầu bằng
`♫ ♪ ★ ☆ ※ ◎ ✿ ▲ △ ● ◆ ■` hoặc `PS:` · `Ps、` · `作者有话说`, dài không quá 200 ký tự. Giữa chương thì
không đụng tới, và luôn chừa lại ít nhất một dòng.

**`注：` và `註：` thì giữ** — đó là chú thích có giá trị tra cứu, không phải tác giả tán gẫu. Ví dụ
`注：莎士比亚的戏剧不论男女角色，启用的都是男演员。` ở cuối `(không rõ).zip` vẫn còn nguyên.

> Đây là **danh sách hẹp, không phải luật "dòng bắt đầu bằng ký hiệu"**. Đo ngày 17/09/2026 trên toàn bộ
> zip trong `00_Inbox`: `♫` mở đầu 24 dòng ghi chú, nhưng `“` mở đầu **69** dòng thoại, `「` 8 dòng, `【` 4
> dòng, `《` và `〈` là tiêu đề. Cắt theo ký hiệu chung sẽ ăn mất truyện. Chạy trên cả `00_Inbox`, luật này
> cắt đúng **26 dòng, tất cả đều là ghi chú thật**, không dính dòng truyện nào.

Dòng tác giả **không có ký hiệu** thì vẫn ở lại — ví dụ `27抱的小黑貓是......大家可以猜一下!!!` ở cuối
chương. Không có dấu hiệu nào phân biệt nó với một câu truyện, nên app không đoán.

Bảng xem trước liệt kê **đúng những dòng sẽ bị cắt** ở bài đầu tiên, xem rồi hãy quyết định. Mặc định
đổi trong **Cài đặt → Tách chương file .txt**; mặc định đó cũng áp dụng cho `.txt` lẻ, Drive, vault và
**Thêm chương**, những chỗ không có bảng xem trước.

### Xuất epub hàng loạt

**Thư viện → Chọn nhiều → ⤓ Xuất epub** gói các sách đã chọn thành một zip. Chọn được bản dịch, bản gốc
hay song ngữ, giống nút xuất trong trang sách.

### File .rar cần công cụ ngoài

Python không đọc được `.rar`, nên app gọi `UnRAR.exe` của WinRAR hoặc `7z.exe` của 7-Zip có sẵn trên máy.
Tự dò `C:\Program Files\WinRAR\` và `C:\Program Files\7-Zip\` rồi tới `PATH`; khai tay trong
**Cài đặt → Đọc file .rar** nếu cài chỗ khác. Không có công cụ nào thì app báo lỗi rõ chứ không bỏ qua
im lặng. `.zip` không cần gì thêm.

## Bàn viết — bản của Aurel, lưu riêng

Trong trang đọc, nút **Bàn viết** mở ba cột: **bản đối chiếu** (chỉ đọc), **bản của bạn**, và **dàn ý ·
đại cương** đọc thẳng từ vault. Chương có bản sửa mang nhãn **bản sửa** ở mục lục.

- **Lưu riêng, không ghi đè.** Bản của bạn nằm trong bảng `edits`, mỗi chương một bản. Bản gốc và bản
  dịch của chương không bị đụng tới, nên luôn còn cái để đối chiếu. Nút **Sửa** cũ vẫn là sửa thẳng vào
  bản gốc / bản dịch.
- **Bản đối chiếu tự chọn theo chương:** chương đã có bản dịch (sách convert như PPCT, EMB) thì đối chiếu
  và bắt đầu sửa từ **bản convert**; chương chỉ có bản gốc (truyện viết thẳng tiếng Việt như TRIAD, CLS)
  thì từ **bản gốc**. Chương có cả hai thì đổi qua lại được.
- Đoạn nào bên bản đối chiếu **không còn y nguyên** trong bản của bạn thì có vạch màu. Bấm một đoạn để nhảy
  tới chỗ tương ứng bên bản của bạn. Hai cột cuộn theo nhau.
- Bản nháp được lấy lại từ vault sau khi bạn đã sửa: bản của bạn giữ nguyên, bàn viết báo bản đối chiếu
  đã đổi.
- **Dàn ý · đại cương:** các note nằm cùng thư mục với note chương (`ch01-plan`, `ch01-review`…) và mọi
  note trong `arcs/` của project. Tự mở dàn ý của chính chương đó nếu có. Note `superseded` / `archived`
  được ghi rõ trong danh sách. Chỉ đọc. Cần sách có gắn nguồn vault.
- **Thẻ cảnh:** các note trong `scenes*/` cạnh chương cũng nằm trong danh sách dàn ý.
- **Tự lưu** sau khi ngừng gõ 2,5 giây; Ctrl+S lưu ngay. Ô viết không bị vẽ lại khi lưu nên con trỏ đứng yên.
- **Lịch sử:** mỗi khoảng mười phút viết, trạm giữ lại một bản lưu trước (tối đa 20 bản mỗi chương), kể
  cả lúc bấm **Bỏ bản sửa**. Xem và lấy lại được.
- **Gõ tắt:** mỗi sách một danh sách `chữ tắt=chữ đầy đủ` (`bh=Boothill`). Gõ chữ tắt rồi dấu cách hoặc
  dấu câu là được thay. Lưu trong `settings` của trạm.
- **Bảng tự sửa khi gõ** (nút **Tự sửa**, thay cho hộp Gõ tắt cũ): một bảng gồm mục của sách này, mục dùng
  chung mọi sách, và các mục có sẵn. Thêm mục mới bằng hai ô *Gõ → Thành* và chọn phạm vi; dùng cho viết
  tắt, cho lỗi hay gõ nhầm (`nguời → người`), hay chữ bất kỳ. Mỗi mục có sẵn có ô bật/tắt riêng — mục
  nhiều nghĩa (`k`, `j`, `bt`…) tắt sẵn, bật lên thì cũng tự sửa. Mục của bạn che mục có sẵn trùng chữ. Thứ
  tự thắng: sách này, mọi sách, có sẵn. Lưu trong `settings` (`desk_snippets`, `desk_auto`).
- **Hoàn thiện viết tắt:** trạm có sẵn bảng viết tắt tiếng Việt thông dụng. Loại một nghĩa (`ko`, `dc`,
  `nhg`, `trc`, `ng`…) được viết đầy đủ ngay khi gõ, tắt được trong hộp Gõ tắt. Loại một chữ cái hoặc nhiều
  nghĩa (`k`, `j`, `r`, `bt`…) không bao giờ tự đổi. Nút **Hoàn thiện viết tắt trong bài…** (trong hộp Gõ
  tắt) liệt kê mọi chữ viết tắt đang có trong bản của bạn, từng dòng tick được và sửa được chữ đầy đủ, rồi
  đổi một lượt, có hoàn tác. Giữ chữ hoa đầu. Danh sách Gõ tắt của sách thắng bảng thông dụng; hộp Chính
  tả đưa chữ đầy đủ lên đầu gợi ý.
- **Mốc từ dàn ý:** Alt + bấm một dòng trong cột dàn ý để thả nó vào bản của bạn thành `〔…〕`, viết xong thì
  xoá. Bộ đếm báo còn bao nhiêu mốc chưa viết.
- **Mục tiêu số chữ** cho từng chương, kèm số chữ đã thêm trong phiên này.
- **Nghe:** đọc bản của bạn thành tiếng bằng bộ đọc của trang đọc, bắt đầu từ đoạn có con trỏ. Trong lúc
  nghe, cột đối chiếu hiện bản của bạn và tô chỗ đang đọc; bấm một đoạn để nhảy tới nó trong ô viết. Mốc
  `〔…〕` không được đọc. Giọng và tốc độ chỉnh ở ngăn **Đọc thành tiếng** của trang đọc.
- **Tên** (bật sẵn): tên nhân vật, nơi chốn, tổ chức có note trong `Characters/` · `locations/` ·
  `organizations/` của project được gạch chân ngay trong ô viết. Tên lấy từ tiêu đề note và `aliases:`
  (bỏ mã project ở đuôi). **Ctrl + bấm** vào tên để mở note đó ở cột phải; những tên có trong chương cũng
  nằm sẵn trong danh sách của cột phải. Chỉ đọc; `secrets/` không được quét.
- **Từ lặp** (bật sẵn): tô từ và cụm 2–4 chữ lặp lại gần nhau (trong 60–80 chữ; từ đơn từ 5 ký tự, trong
  30 chữ). Hư từ và tên riêng không tính.
- **Nhịp câu:** dải cột phía trên, mỗi cột một câu, cao theo số chữ. Đỏ là câu từ 35 chữ (cùng ngưỡng với
  `ai_tells_check`), vàng là bốn câu liền dài gần bằng nhau. Bấm một cột để tới câu đó.
- Ba thứ trên được tô ở một lớp nằm sau ô viết; ô viết vẫn là ô chữ thường nên gõ Unikey và Ctrl+Z như cũ.
- **Thẻ cảnh** (nút riêng): mọi thẻ trong `scenes*/` của chương thành một bảng — tên cảnh, POV, mục đích
  cảnh, kết cảnh, số chữ mục tiêu. **Đặt mốc** thả `〔§ tên cảnh〕` vào bản của bạn; chữ viết dưới mốc được
  đếm cho cảnh đó và thẻ đổi màu theo tiến độ. Mốc cảnh là giàn giáo: không vào file xuất, không vào
  Kiểm văn, không tính số chữ, không được đọc thành tiếng. Cần sách có gắn nguồn vault.
- **Tập trung:** chỉ còn ô viết, chữ to hơn, đoạn đang viết sáng lên còn các đoạn khác mờ đi, và dòng đang
  gõ được giữ ở khoảng giữa màn hình. Bấm lại để thoát; bấm **Nghe** cũng thoát.
- **Nhật ký viết:** mỗi lần lưu, trạm cộng mức tăng giảm số chữ vào ngày hôm đó (bảng `writing_days`). Ô
  **Hôm nay** trên thanh công cụ hiện số chữ trong ngày, mục tiêu ngày nếu có, và chuỗi ngày viết liền.
  Số chữ là mức thực nên ngày ngồi gọt bản convert có thể âm; chuỗi ngày tính theo ngày có lưu. Nút
  **Mục tiêu** đặt mục tiêu chương, mục tiêu ngày và xem 14 ngày gần nhất.
- **Chính tả** (`static/vnspell.js`): soát theo cấu tạo âm tiết tiếng Việt (âm đầu + vần + thanh), không
  cần từ điển và không gửi gì ra ngoài. Chữ không thể là âm tiết tiếng Việt bị gạch lượn sóng ngay trong ô
  viết. Nút **Chính tả** liệt kê từng chữ kèm gợi ý (Telex gõ dở, thiếu dấu mũ/móc, sai âm đầu, sai thanh
  trên vần tắc, gõ đảo hai phím), thay mọi chỗ bằng một lần bấm, hoặc **Bỏ qua** để sách này coi chữ đó là
  đúng. Cùng hộp đó: hai dấu cách liền, dấu cách trước dấu câu, thiếu dấu cách sau dấu câu (sửa hết một
  lần), và chữ lặp liền nhau (chỉ báo, vì có thể là láy). Tên riêng viết hoa, tên có note trong vault và
  mốc `〔…〕` được bỏ qua. **Không bắt được** chữ sai mà vẫn là âm tiết đúng (`chanh` thay cho `tranh`).
  Đo 05/10/2026 trên ba chương thật: CLS ch1 báo 1 chữ trên 3.418 (`ninja`); TRIAD ch1 báo 23 chữ, trong
  đó có lỗi thật (`măt`).
- **Tìm – thay** trên bản của bạn, có hoàn tác một bước.
- **Kiểm văn** chạy `style_metrics.py` và `ai_tells_check.py` của vault trên bản đang sửa, đo theo
  `style/` của project. Chạy tại máy, không gửi gì ra ngoài.
- **Lưu thành file…** ghi bản đã lưu ra `.md` tên `…-aurel-viet-lai.md`:
  - **Vault**: note mới cạnh note chương (`ch01-chapter.md` → `ch01-aurel-viet-lai.md`), frontmatter lấy
    theo note chương, `authority: user`, `status: draft`. Đây là **chỗ duy nhất app ghi vào vault**. Note
    chương không bao giờ bị mở để ghi. Tên đã có mà không phải do app ghi thì app lấy tên `-2`, `-3`. File
    do chính app ghi lần trước thì hỏi trước khi ghi đè. File mới nằm ở cây chính của vault, chưa commit.
- Xoá chương, hoặc gộp chương sau vào chương trước, thì bản sửa của chương bị xoá mất theo.
- Chưa có: AI gợi ý viết lại. Phần đó gửi văn bản ra ngoài máy nên làm riêng.

## Thêm chương vào sách có sẵn

Trong trang sách, mục **Thêm chương** lấy nội dung từ **file trên máy**, **Drive**, **vault**, hoặc
**dán văn bản**, và có nút tạo **chương trống**.

- Chọn chỗ chèn: cuối sách, hoặc ngay sau một chương. Nhiều file được xếp theo tên và nối tiếp nhau.
- Ở đây `.zip` / `.rar` **không** hỏi tách truyện: cả archive nối thành một mạch chương, vì đích đến đã là một sách.
- **Bỏ qua chương trùng tên** (bật sẵn). Tiện khi tải lại bản zip ch1–16 vào sách đang có ch1–15.
- Khi dán văn bản, có thể tự tách thành nhiều chương theo dòng tiêu đề.
- Trang vault cũng có ô **Nhập vào**: tạo sách mới hoặc thêm vào sách có sẵn.
- Thêm nội dung vault vào **bất kỳ** sách nào thì sách đó bị đánh dấu là nội dung vault, và lựa chọn
  "đồng ý gửi ra ngoài" trước đó bị xoá. Lựa chọn này lưu trong DB, không lưu ở trình duyệt.

## Xoá

- **Thư viện → Chọn nhiều:** bấm vào các sách để chọn, rồi **xoá** hoặc **chuyển tủ** hàng loạt.
- **Mục lục của sách:** tích các chương rồi **xoá bản dịch** (giữ bản gốc) hoặc **xoá chương**.
- Xoá chỉ tác động tới thư viện của app. File gốc trên máy, Drive và vault không bị động tới.

## Dữ liệu

Toàn bộ nằm trong `data/`: `library.db` (SQLite), `covers/`, `dicts/`, `staging/` (archive đang chờ giữa lúc quét và lúc nhập, tự dọn sau 6 giờ). Sao lưu = copy thư mục này.
Đặt biến `TRAMDICH_DATA` để chạy app với một thư mục dữ liệu khác, ví dụ khi test, mà không đụng tới `data/`.
File gốc trên máy hoặc Drive không bao giờ bị sửa. App chép nội dung vào DB lúc nhập.

## Giới hạn đã biết

- EPUB được đọc thành **chữ + bìa**. Khi xuất lại sẽ mất CSS và ảnh minh hoạ bên trong.
- Mỗi dòng là một đoạn. Song ngữ và tách chương dựa vào số dòng của bản gốc và bản dịch khớp nhau.
- Chưa đo định dạng thật của từ điển GitHub. Bộ đọc nhận JSON object, JSON mảng cặp, và `zh=vi/vi2`.
