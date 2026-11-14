'use strict';

/* Vietnamese spelling without a dictionary.

   A Vietnamese syllable is onset + rhyme + tone, and the set of rhymes is closed (about 170).
   So a typo is caught by structure alone: `nguời`, `vieets`, `nhừng`, `qủanh` do not parse.
   What this cannot see is a wrong word that is still a well-formed syllable (`chanh` for `tranh`).
   Runs in the page; nothing is sent anywhere. Also loadable from node for testing. */

const VN_ONSETS = ['ngh', 'ng', 'nh', 'gh', 'gi', 'kh', 'ph', 'th', 'tr', 'ch', 'qu',
  'b', 'c', 'd', 'đ', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'x', ''];

const VN_RHYMES = new Set((
  'a ac ach ai am an ang anh ao ap at au ay '
  + 'ăc ăm ăn ăng ăp ăt '
  + 'âc âm ân âng âp ât âu ây '
  + 'e ec em en eng eo ep et '
  + 'ê êch êm ên ênh êp êt êu '
  + 'i ia ich iêc iêm iên iêng iêp iêt iêu im in inh ip it iu '
  + 'o oa oac oach oai oam oan oang oanh oao oap oat oay oăc oăm oăn oăng oăt oc oe oen oeo oet oi om on ong ooc oong op ot '
  + 'ô ôc ôi ôm ôn ông ôp ôt '
  + 'ơ ơi ơm ơn ơp ơt '
  + 'u ua uân uâng uât uây uc uê uêch uênh ui um un ung uôc uôi uôm uôn uông uôt up uơ ut uy uya uych uyên uyêt uynh uyt uyu '
  + 'ư ưa ưc ưi ưm ưn ưng ươc ươi ươm ươn ương ươp ươt ươu ưt ưu '
  + 'y ya ych yêm yên yêng yêt yêu ynh yt'
).split(' '));

const VN_TONE_MARKS = { '́': 1, '̀': 2, '̉': 3, '̃': 4, '̣': 5 };   // sắc huyền hỏi ngã nặng
const VN_TONE_CHARS = ['', '́', '̀', '̉', '̃', '̣'];
const VN_VOWELS = 'aăâeêioôơuưy';

/** `người` -> { base: 'ngươi', tone: 2 }; null when the letters cannot be Vietnamese at all. */
function vnSplitTone(word) {
  let base = '', tone = 0, tones = 0;
  for (const ch of word.toLowerCase().normalize('NFD')) {
    if (VN_TONE_MARKS[ch]) { tone = VN_TONE_MARKS[ch]; tones++; }
    else base += ch;
  }
  base = base.normalize('NFC');
  if (tones > 1 || !/^[a-zăâêôơưđ]+$/.test(base) || /[fjwz]/.test(base)) return null;
  return { base, tone };
}

/** Onset and rhyme of a toneless syllable, or null. */
function vnParse(base) {
  for (const onset of VN_ONSETS) {
    if (!base.startsWith(onset)) continue;
    const rest = base.slice(onset.length);
    const tries = onset === 'gi' ? [rest, 'i' + rest] : [rest];   // gì = gi + i, giếng = gi + iêng
    for (const rhyme of tries) {
      if (!VN_RHYMES.has(rhyme)) continue;
      const front = 'eêiy'.includes(rhyme[0]);
      if ((onset === 'k' || onset === 'gh' || onset === 'ngh') && !front) continue;   // k, gh, ngh only before e ê i y
      if ((onset === 'c' || onset === 'g' || onset === 'ng') && front) continue;      // c, g, ng never before them
      if (onset === 'qu' && rhyme[0] === 'u') continue;
      return { onset, rhyme };
    }
  }
  return null;
}

function vnValidParts(base, tone) {
  const p = vnParse(base);
  if (!p) return false;
  // a syllable closed by c, ch, p, t only carries sắc or nặng
  if (/(c|ch|p|t)$/.test(p.rhyme) && tone !== 1 && tone !== 5) return false;
  return true;
}

function vnValid(word) {
  const s = vnSplitTone(word);
  return !!s && vnValidParts(s.base, s.tone);
}

/** Put the tone back on the vowel that carries it (the newer convention: hoà, thuý, quả). */
function vnCompose(base, tone) {
  if (!tone) return base;
  const p = vnParse(base);
  if (!p) return base;
  let rhyme = p.rhyme;
  if (p.onset === 'gi' && !VN_RHYMES.has(base.slice(2))) rhyme = base.slice(2) || 'i';   // the i belongs to the onset
  const start = base.length - rhyme.length;
  if (start < 0) return base;
  let end = 0;
  while (end < rhyme.length && VN_VOWELS.includes(rhyme[end])) end++;
  const cluster = rhyme.slice(0, end), closed = end < rhyme.length;
  let at = -1;
  for (const special of ['ơ', 'ê', 'ô', 'â', 'ă']) if (at < 0) at = cluster.lastIndexOf(special);
  if (at < 0 && cluster.includes('ư') && cluster.length === 1) at = 0;
  if (at < 0) {
    if (cluster.length <= 1) at = 0;
    else if (closed) at = cluster.length - 1;
    else if (cluster.length === 3) at = 1;
    else at = ['oa', 'oe', 'uy'].includes(cluster) ? 1 : 0;
  }
  const i = start + at;
  return (base.slice(0, i) + (base[i] + VN_TONE_CHARS[tone]).normalize('NFC') + base.slice(i + 1)).normalize('NFC');
}

const VN_SWAPS = ['aăâ', 'eê', 'oôơ', 'uư', 'dđ', 'iy'];
const VN_TELEX = [['uow', 'ươ'], ['dd', 'đ'], ['aa', 'â'], ['aw', 'ă'], ['ee', 'ê'], ['oo', 'ô'], ['ow', 'ơ'], ['uw', 'ư']];
const VN_TELEX_TONE = { s: 1, f: 2, r: 3, x: 4, j: 5 };

/** Well-formed syllables one slip away from `word`, most likely first. */
function vnSuggest(word, limit = 5) {
  const lower = word.toLowerCase();
  const out = [];
  const add = (base, tone) => {
    if (!vnValidParts(base, tone)) return;
    const w = vnCompose(base, tone);
    if (w !== lower && !out.includes(w)) out.push(w);
  };
  // Telex left undone: vieets -> viết, dduowngf -> đường
  if (/^[a-z]+$/.test(lower)) {
    let t = lower, tone = 0;
    if (VN_TELEX_TONE[t[t.length - 1]] && t.length > 2) { tone = VN_TELEX_TONE[t[t.length - 1]]; t = t.slice(0, -1); }
    for (const [from, to] of VN_TELEX) t = t.split(from).join(to);
    if (!/[fjwz]/.test(t)) add(t, tone);
  }
  const s = vnSplitTone(lower.replace(/[fjwz]/g, ''));
  if (s) {
    const { base, tone } = s;
    if (tone !== 1 && tone !== 5 && /(c|ch|p|t)$/.test(base)) { add(base, 1); add(base, 5); }                   // wrong tone on a stopped syllable
    // the onset spelled the wrong way round: ngĩ -> nghĩ, kông -> không / công, gế -> ghế
    for (const [from, to] of [['ng', 'ngh'], ['ngh', 'ng'], ['g', 'gh'], ['gh', 'g'], ['k', 'kh'], ['k', 'c'], ['c', 'k'], ['t', 'th'], ['t', 'tr'], ['c', 'ch'], ['n', 'nh'], ['n', 'ng']]) {
      if (base.startsWith(from) && !(from.length < to.length && base.startsWith(to))) add(to + base.slice(from.length), tone);
    }
    const tones = [tone, ...(tone === 0 ? [1, 5] : [])];
    for (const tn of tones) {
      for (let i = 0; i < base.length; i++) {
        for (const group of VN_SWAPS) {
          if (!group.includes(base[i])) continue;
          for (const c of group) if (c !== base[i]) add(base.slice(0, i) + c + base.slice(i + 1), tn);
        }
      }
      for (let i = 0; i < base.length; i++) add(base.slice(0, i) + base.slice(i + 1), tn);                       // a doubled key
      for (let i = 0; i + 1 < base.length; i++) add(base.slice(0, i) + base[i + 1] + base[i] + base.slice(i + 2), tn);   // two keys swapped
    }
  }
  const cap = word[0] !== word[0].toLowerCase();
  return out.slice(0, limit).map((w) => (cap ? w[0].toUpperCase() + w.slice(1) : w));
}

if (typeof module !== 'undefined') module.exports = { vnValid, vnSuggest, vnCompose, vnSplitTone };
