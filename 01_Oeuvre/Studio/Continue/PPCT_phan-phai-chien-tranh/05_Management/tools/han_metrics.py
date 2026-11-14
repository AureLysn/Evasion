import re, sys, json, statistics
HAN = re.compile(r'[\u4e00-\u9fff\u3400-\u4dbf]')
def body(text):
    lines = text.split('\n')
    # strip frontmatter
    if lines and lines[0].strip() == '---':
        end = lines[1:].index('---') + 1
        lines = lines[end+1:]
    out, started = [], False
    for l in lines:
        s = l.strip()
        if not started:
            if s.startswith('如果都能接受'):
                started = True
            continue
        if re.match(r'^[—\-]{5,}$', s):
            break
        if s: out.append(s)
    return out
def h(s): return len(HAN.findall(s))
def main(p):
    paras = body(open(p, encoding='utf-8').read())
    txt = '\n'.join(paras)
    total = h(txt)
    dia = sum(h(m) for m in re.findall(r'“([^”]*)”', txt))
    sents = [s for s in re.split(r'[。！？]', txt) if h(s) > 0]
    sl = [h(s) for s in sents]
    pl = [h(p) for p in paras]
    with_d = sum(1 for p in paras if '“' in p)
    bare = sum(1 for p in paras if re.fullmatch(r'(“[^”]*”)+', p))
    k = 1000 / total
    terms = ['圣杯','英灵','宝具','御主','魔力','令咒','职阶','从者','从灵','彭格列','黑手党','火焰','直觉','平行世界']
    th = {t: txt.count(t) for t in terms if txt.count(t)}
    r = dict(han_chars=total, dialogue_ratio=round(dia/total,3), paragraphs=len(paras),
        han_per_paragraph_mean=round(statistics.mean(pl),1),
        paragraphs_ge_100_ratio=round(sum(x>=100 for x in pl)/len(pl),3),
        sentence_median=statistics.median(sl),
        sentences_ge_50_ratio=round(sum(x>=50 for x in sl)/len(sl),3),
        sentences_le_4_per_1000=round(sum(x<=4 for x in sl)*k,2),
        paragraphs_with_dialogue=round(with_d/len(paras),3),
        bare_dialogue_paragraphs=round(bare/len(paras),3),
        q=round(txt.count('？')*k,2), excl=round(txt.count('！')*k,2),
        ellipsis=round(txt.count('……')*k,2), em_dash=round(txt.count('——')*k,2),
        terms_per_1000=round(sum(th.values())*k,2), term_hits=th,
        eye=len(re.findall(r'眼睛|眼瞳|眸|虹膜|瞳孔|竖瞳', txt)),
        corner=txt.count('「')+txt.count('」'),
        first_person_outside=len(re.findall('我', re.sub(r'“[^”]*”', '', txt))))
    print(json.dumps(r, ensure_ascii=False, indent=1))
main(sys.argv[1])
