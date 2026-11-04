(function () {
  'use strict';
  var H = window.Heb;
  var MINY = 3762, MAXY = 9999;

  /* ------------------------------------------------------------------ text */
  var HEB_MONTH = { Tishri: 'תשרי', Cheshvan: 'חשוון', Kislev: 'כסלו', Tevet: 'טבת', Shevat: 'שבט', Adar: 'אדר',
    AdarI: 'אדר א׳', AdarII: 'אדר ב׳', Nisan: 'ניסן', Iyar: 'אייר', Sivan: 'סיוון', Tammuz: 'תמוז', Av: 'אב', Elul: 'אלול' };
  var EN_MONTH = { Tishri: 'Tishrei', Cheshvan: 'Cheshvan', Kislev: 'Kislev', Tevet: 'Tevet', Shevat: 'Shevat', Adar: 'Adar',
    AdarI: 'Adar I', AdarII: 'Adar II', Nisan: 'Nisan', Iyar: 'Iyar', Sivan: 'Sivan', Tammuz: 'Tammuz', Av: 'Av', Elul: 'Elul' };

  var HOL = {
    en: { rh: 'Rosh Hashana', rh2: 'Rosh Hashana II', gedaliah: 'Fast of Gedaliah', yk: 'Yom Kippur', sukkot: 'Sukkot',
      sukkot2: 'Sukkot II', chm: 'Chol HaMoed', hoshana: 'Hoshana Rabba', shemini: 'Shemini Atzeret',
      shemini_st: 'Shemini Atzeret / Simchat Torah', simchat: 'Simchat Torah', chanukah: 'Chanukah', tevet10: 'Fast of 10 Tevet',
      tubishvat: 'Tu BiShvat', purimkatan: 'Purim Katan', shushankatan: 'Shushan Purim Katan', esther: 'Fast of Esther',
      purim: 'Purim', shushan: 'Shushan Purim', pesach: 'Pesach', pesach2: 'Pesach II', pesach7: 'Pesach (7th day)',
      pesach8: 'Pesach (8th day)', lag: "Lag BaOmer", shavuot: 'Shavuot', shavuot2: 'Shavuot II', tammuz17: '17 Tammuz',
      tisha: "Tisha B'Av", tubav: "Tu B'Av", rc: 'Rosh Chodesh' },
    he: { rh: 'ראש השנה', rh2: 'ראש השנה ב׳', gedaliah: 'צום גדליה', yk: 'יום כיפור', sukkot: 'סוכות', sukkot2: 'סוכות ב׳',
      chm: 'חול המועד', hoshana: 'הושענא רבה', shemini: 'שמיני עצרת', shemini_st: 'שמיני עצרת / שמחת תורה',
      simchat: 'שמחת תורה', chanukah: 'חנוכה', tevet10: 'עשרה בטבת', tubishvat: 'ט״ו בשבט', purimkatan: 'פורים קטן',
      shushankatan: 'שושן פורים קטן', esther: 'תענית אסתר', purim: 'פורים', shushan: 'שושן פורים', pesach: 'פסח',
      pesach2: 'פסח ב׳', pesach7: 'שביעי של פסח', pesach8: 'אחרון של פסח', lag: 'ל״ג בעומר', shavuot: 'שבועות',
      shavuot2: 'שבועות ב׳', tammuz17: 'י״ז בתמוז', tisha: 'תשעה באב', tubav: 'ט״ו באב', rc: 'ראש חודש' }
  };

  var TXT = {
    en: {
      wdShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      wd: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbat'],
      gm: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      gms: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Today', convert: 'Convert', settings: 'Settings', todayChip: 'Today',
      hintBrowse: '◀ ▶ Month  ·  ▲ ▼ Year  ·  OK Pick a day',
      hintDay: '◀ ▶ ▲ ▼ Move  ·  OK Convert  ·  Back Exit',
      hintBar: '◀ ▶ Choose  ·  OK Open  ·  ▲ Back to days',
      hintConv: '◀ ▶ Field  ·  ▲ ▼ Change  ·  OK Show  ·  Back',
      hintSet: '▲ ▼ Select  ·  ◀ ▶ or OK Change  ·  Back',
      g2h: 'Gregorian → Hebrew', h2g: 'Hebrew → Gregorian', tap: 'tap to switch',
      day: 'Day', month: 'Month', year: 'Year', show: 'Show in calendar', convTitle: 'Date Converter',
      setTitle: 'Settings', lang: 'Language', hol: 'Holidays', dia: 'Diaspora', isr: 'Israel',
      ud: 'Up / Down keys', ud0: 'Up = next year', ud1: 'Up = previous year', result: 'Result', none: 'No special day',
      candle: 'day'
    },
    he: {
      wdShort: ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'],
      wd: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
      gm: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
      gms: ['ינו׳', 'פבר׳', 'מרץ', 'אפר׳', 'מאי', 'יוני', 'יולי', 'אוג׳', 'ספט׳', 'אוק׳', 'נוב׳', 'דצמ׳'],
      today: 'היום', convert: 'המרה', settings: 'הגדרות', todayChip: 'היום',
      hintBrowse: '◀ ▶ חודש  ·  ▲ ▼ שנה  ·  OK בחירת יום',
      hintDay: '◀ ▶ ▲ ▼ ניווט  ·  OK המרה  ·  חזרה',
      hintBar: '◀ ▶ בחירה  ·  OK פתיחה  ·  ▲ חזרה לימים',
      hintConv: '◀ ▶ שדה  ·  ▲ ▼ שינוי  ·  OK הצגה  ·  חזרה',
      hintSet: '▲ ▼ בחירה  ·  ◀ ▶ או OK שינוי  ·  חזרה',
      g2h: 'לועזי ← עברי', h2g: 'עברי ← לועזי', tap: 'לחץ להחלפה',
      day: 'יום', month: 'חודש', year: 'שנה', show: 'הצג בלוח', convTitle: 'המרת תאריכים',
      setTitle: 'הגדרות', lang: 'שפה', hol: 'חגים', dia: 'חו״ל', isr: 'ישראל',
      ud: 'מקשי למעלה / למטה', ud0: 'למעלה = שנה הבאה', ud1: 'למעלה = שנה קודמת', result: 'תוצאה', none: 'אין אירוע מיוחד',
      candle: 'נר'
    }
  };

  /* ----------------------------------------------------------------- state */
  var set = { lang: 'en', israel: false, invY: false };
  try { var saved = JSON.parse(localStorage.getItem('hebcal.settings')); if (saved) for (var k in set) if (k in saved) set[k] = saved[k]; } catch (e) {}
  function save() { try { localStorage.setItem('hebcal.settings', JSON.stringify(set)); } catch (e) {} }

  function L() { return TXT[set.lang]; }
  function he() { return set.lang === 'he'; }

  function todayRD() { var n = new Date(); return H.gregToRD(n.getFullYear(), n.getMonth() + 1, n.getDate()); }

  var S = { view: 'cal', y: 0, id: '', sel: 1, mode: 'browse', bar: 0, setIdx: 0 };
  var C = { dir: 'g2h', f: 1, src: {} };

  function goRD(rd) { var h = H.rdToHeb(rd); S.y = h.y; S.id = h.id; S.sel = h.d; }
  goRD(todayRD());

  /* -------------------------------------------------------------- helpers */
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function wrap(v, a, b) { return v > b ? a : v < a ? b : v; }
  function fixId(y, id) {
    var leap = H.isLeap(y);
    if (leap && id === 'Adar') return 'AdarII';
    if (!leap && (id === 'AdarI' || id === 'AdarII')) return 'Adar';
    return id;
  }
  function monthIdx(ms, id) { for (var i = 0; i < ms.length; i++) if (ms[i].id === id) return i; return 0; }
  function monthLen(y, id) { var ms = H.monthsOf(y); return ms[monthIdx(ms, id)].len; }
  function dayLabel(d) { return he() ? H.gematria(d) : String(d); }
  function yearLabel(y) { return he() ? H.gematria(y % 1000) : String(y); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function hebStr(y, id, d, lang) {
    if (lang === 'he') return H.gematria(d) + ' ' + HEB_MONTH[id] + ' ' + H.gematria(y % 1000);
    return d + ' ' + EN_MONTH[id] + ' ' + y;
  }
  function gregStr(g, wd, lang) {
    var t = TXT[lang];
    if (lang === 'he') return 'יום ' + t.wd[wd] + ', ' + g.d + ' ב' + t.gm[g.m - 1] + ' ' + g.y;
    return t.wd[wd] + ', ' + g.d + ' ' + t.gm[g.m - 1] + ' ' + g.y;
  }
  function holName(h) {
    var n = HOL[set.lang][h.k];
    if (h.n) n += ' · ' + (he() ? L().candle + ' ' + H.gematria(h.n) : L().candle + ' ' + h.n);
    return n;
  }
  function chips(list, extra) {
    var s = '';
    if (extra) s += extra;
    list.forEach(function (h) { s += '<span class="chip ' + h.t + '">' + esc(holName(h)) + '</span>'; });
    return s;
  }

  /* ------------------------------------------------------------ navigation */
  function shiftMonth(delta) {
    var ms = H.monthsOf(S.y), i = monthIdx(ms, S.id) + delta;
    if (i < 0) { if (S.y <= MINY) return; S.y--; ms = H.monthsOf(S.y); i = ms.length - 1; }
    else if (i >= ms.length) { if (S.y >= MAXY) return; S.y++; ms = H.monthsOf(S.y); i = 0; }
    S.id = ms[i].id; S.sel = Math.min(S.sel, ms[i].len);
  }
  function shiftYear(delta) {
    var y = clamp(S.y + delta, MINY, MAXY);
    S.y = y; S.id = fixId(y, S.id); S.sel = Math.min(S.sel, monthLen(y, S.id));
  }
  function shiftDay(delta) {
    var rd = H.hebToRD(S.y, S.id, S.sel) + delta, h = H.rdToHeb(rd);
    if (h.y < MINY || h.y > MAXY) return;
    S.y = h.y; S.id = h.id; S.sel = h.d;
  }
  function upDir() { return set.invY ? -1 : 1; } // what the Up key does to the year

  /* ---------------------------------------------------------------- render */
  var app = document.getElementById('app');

  function head(title, sub, greg, buttons) {
    return '<header class="head">' + (buttons ? buttons.l : '') +
      '<div class="mid"><h1>' + title + '</h1>' + (sub ? '<div class="sub" dir="auto">' + sub + '</div>' : '') +
      (greg ? '<div class="greg" dir="auto">' + greg + '</div>' : '') + (buttons && buttons.mid ? buttons.mid : '') + '</div>' +
      (buttons ? buttons.r : '') + '</header>';
  }

  function viewCal() {
    var t = L(), ms = H.monthsOf(S.y), len = ms[monthIdx(ms, S.id)].len;
    var first = H.hebToRD(S.y, S.id, 1), sd = H.dow(first), tr = todayRD();
    var g1 = H.rdToGreg(first), g2 = H.rdToGreg(first + len - 1);
    var gtxt = g1.y === g2.y
      ? (g1.m === g2.m ? t.gm[g1.m - 1] : t.gm[g1.m - 1] + ' – ' + t.gm[g2.m - 1]) + ' ' + g1.y
      : t.gms[g1.m - 1] + ' ' + g1.y + ' – ' + t.gms[g2.m - 1] + ' ' + g2.y;

    var primary = he() ? HEB_MONTH[S.id] : EN_MONTH[S.id];
    var secondary = he() ? EN_MONTH[S.id] + ' ' + S.y : HEB_MONTH[S.id] + ' ' + H.gematria(S.y % 1000);
    // ▲ / ▼ buttons mirror what the Up / Down keys do
    var buttons = {
      mid: '<div class="yr"><button data-act="' + (upDir() > 0 ? 'ydown' : 'yup') + '" aria-label="Year down">▼</button><b>' + S.y +
        '</b><button data-act="' + (upDir() > 0 ? 'yup' : 'ydown') + '" aria-label="Year up">▲</button></div>'
    };
    // arrows are drawn where the keys point: in RTL "next" is on the left
    if (he()) { buttons.l = '<button class="nav" data-act="next" aria-label="Next month">‹</button>'; buttons.r = '<button class="nav" data-act="prev" aria-label="Previous month">›</button>'; }
    else { buttons.l = '<button class="nav" data-act="prev" aria-label="Previous month">‹</button>'; buttons.r = '<button class="nav" data-act="next" aria-label="Next month">›</button>'; }

    var wd = '';
    for (var w = 0; w < 7; w++) wd += '<span>' + t.wdShort[w] + '</span>';

    var cells = '';
    for (var i = 0; i < 42; i++) {
      var d = i - sd + 1;
      if (d < 1 || d > len) { cells += '<div class="cell empty"></div>'; continue; }
      var rd = first + d - 1, g = H.rdToGreg(rd), hs = H.holidays(S.y, S.id, d, i % 7, set.israel);
      var cls = 'cell' + (i % 7 === 6 ? ' sat' : '') + (rd === tr ? ' today' : '') +
        (d === S.sel ? (S.mode === 'day' ? ' cur' : ' sel') : '');
      var kind = hs.some(function (h) { return h.t === 'major'; }) ? 'major' : hs.length ? 'minor' : '';
      cells += '<button class="' + cls + '" data-act="cell" data-d="' + d + '" tabindex="-1"><b>' + dayLabel(d) + '</b><small>' +
        (g.d === 1 ? g.d + ' ' + t.gms[g.m - 1] : g.d) + '</small>' + (kind ? '<i class="dot ' + kind + '"></i>' : '') + '</button>';
    }

    // details for the selected day
    var selRD = first + S.sel - 1, sg = H.rdToGreg(selRD), swd = H.dow(selRD);
    var shs = H.holidays(S.y, S.id, S.sel, swd, set.israel);
    var detail = '<section class="detail"><div class="d1" dir="auto">' + esc(hebStr(S.y, S.id, S.sel, set.lang)) + '</div>' +
      '<div class="d2" dir="auto">' + esc(gregStr(sg, swd, set.lang)) + '</div>' +
      '<div class="d2" dir="auto">' + esc(hebStr(S.y, S.id, S.sel, he() ? 'en' : 'he')) + '</div>' +
      '<div class="chips">' + (selRD === tr ? '<span class="chip today">' + t.todayChip + '</span>' : '') + chips(shs) + '</div></section>';

    var names = [t.today, t.convert, t.settings], acts = ['today', 'conv', 'settings'];
    var bar = '<nav class="bar">' + names.map(function (n, j) {
      return '<button data-act="' + acts[j] + '" class="' + (j === 0 ? 'today ' : '') + (S.mode === 'bar' && S.bar === j ? 'focus' : '') + '">' + n + '</button>';
    }).join('') + '</nav>';
    var hint = S.mode === 'browse' ? t.hintBrowse : S.mode === 'day' ? t.hintDay : t.hintBar;

    return head(primary, secondary, gtxt, buttons) +
      '<main class="main cal-main"><div class="cal"><div class="wd">' + wd + '</div><div class="grid">' + cells + '</div></div>' +
      '<div class="side">' + detail + bar + '<div class="hint">' + hint + '</div></div></main>';
  }

  /* ------- converter */
  function convInit(rd) {
    if (C.dir === 'g2h') { var g = H.rdToGreg(rd); C.src = { y: clamp(g.y, 1, 9999), m: g.m, d: g.d }; }
    else {
      var h = H.rdToHeb(rd);
      if (h.y < MINY) { h = { y: MINY, id: 'Tishri', d: 1 }; }
      if (h.y > MAXY) { h = { y: MAXY, id: 'Elul', d: 29 }; }
      C.src = { y: h.y, id: h.id, d: h.d };
    }
  }
  function convRD() { var s = C.src; return C.dir === 'g2h' ? H.gregToRD(s.y, s.m, s.d) : H.hebToRD(s.y, s.id, s.d); }
  function convAdjust(f, delta) {
    var s = C.src;
    if (C.dir === 'g2h') {
      if (f === 1) s.d = wrap(s.d + delta, 1, H.gregDays(s.y, s.m));
      else if (f === 2) { s.m = wrap(s.m + delta, 1, 12); s.d = Math.min(s.d, H.gregDays(s.y, s.m)); }
      else if (f === 3) { s.y = clamp(s.y + delta, 1, 9999); s.d = Math.min(s.d, H.gregDays(s.y, s.m)); }
    } else {
      var ms = H.monthsOf(s.y);
      if (f === 1) s.d = wrap(s.d + delta, 1, ms[monthIdx(ms, s.id)].len);
      else if (f === 2) { var i = wrap(monthIdx(ms, s.id) + delta, 0, ms.length - 1); s.id = ms[i].id; s.d = Math.min(s.d, ms[i].len); }
      else if (f === 3) { s.y = clamp(s.y + delta, MINY, MAXY); s.id = fixId(s.y, s.id); s.d = Math.min(s.d, monthLen(s.y, s.id)); }
    }
  }
  function convToggle() { var rd = convRD(); C.dir = C.dir === 'g2h' ? 'h2g' : 'g2h'; convInit(rd); }
  function openConv() { C.f = 1; convInit(H.hebToRD(S.y, S.id, S.sel)); S.view = 'conv'; }

  function viewConv() {
    var t = L(), s = C.src, rd = convRD(), f = C.f, vals;
    if (C.dir === 'g2h') vals = [String(s.d), t.gm[s.m - 1], String(s.y)];
    else vals = [dayLabel(s.d), he() ? HEB_MONTH[s.id] : EN_MONTH[s.id], he() ? H.gematria(s.y % 1000) + '<br><small>' + s.y + '</small>' : String(s.y)];
    var labels = [t.day, t.month, t.year];
    var spins = vals.map(function (v, j) {
      return '<div class="spin ' + (f === j + 1 ? 'focus' : '') + '" data-act="field" data-f="' + (j + 1) + '"><label>' + labels[j] +
        '</label><button data-act="adj" data-f="' + (j + 1) + '" data-delta="1">▲</button><b>' + v +
        '</b><button data-act="adj" data-f="' + (j + 1) + '" data-delta="-1">▼</button></div>';
    }).join('');

    var h = H.rdToHeb(rd), g = H.rdToGreg(rd), wd = H.dow(rd), hs = H.holidays(h.y, h.id, h.d, wd, set.israel);
    var r1, r2;
    if (C.dir === 'g2h') { r1 = hebStr(h.y, h.id, h.d, set.lang); r2 = hebStr(h.y, h.id, h.d, he() ? 'en' : 'he'); }
    else { r1 = gregStr(g, wd, set.lang); r2 = t.wd[wd]; if (he()) r2 = ''; }
    var result = '<div class="result"><div class="r0">' + t.result + '</div><div class="r1" dir="auto">' + esc(r1) + '</div><div class="r2" dir="auto">' + esc(r2) +
      '</div><div class="chips">' + chips(hs) + '</div></div>';

    return head(t.convTitle, '', '', { l: '<button class="nav" data-act="back">‹</button>', r: '<span class="nav" style="visibility:hidden"></span>' }) +
      '<main class="page"><button class="modebtn ' + (f === 0 ? 'focus' : '') + '" data-act="toggleDir">' + (C.dir === 'g2h' ? t.g2h : t.h2g) + ' ⇄</button>' +
      '<div class="spins">' + spins + '</div>' + result +
      '<button class="btn ' + (f === 4 ? 'focus' : '') + '" data-act="showcal">' + t.show + '</button></main>' +
      '<div class="hint">' + t.hintConv + '</div>';
  }

  /* ------- settings */
  function settingRows() {
    var t = L();
    return [
      [t.lang, set.lang === 'he' ? 'עברית' : 'English'],
      [t.hol, set.israel ? t.isr : t.dia],
      [t.ud, set.invY ? t.ud1 : t.ud0]
    ];
  }
  function changeSetting(i) {
    if (i === 0) set.lang = set.lang === 'he' ? 'en' : 'he';
    else if (i === 1) set.israel = !set.israel;
    else set.invY = !set.invY;
    save();
  }
  function viewSettings() {
    var t = L();
    var rows = settingRows().map(function (r, i) {
      return '<button class="row ' + (S.setIdx === i ? 'focus' : '') + '" data-act="setrow" data-i="' + i + '"><span>' + r[0] + '</span><b>' + r[1] + '</b></button>';
    }).join('');
    return head(t.setTitle, '', '', { l: '<button class="nav" data-act="back">‹</button>', r: '<span class="nav" style="visibility:hidden"></span>' }) +
      '<main class="page">' + rows + '</main><div class="hint">' + t.hintSet + '</div>';
  }

  function render() {
    document.documentElement.lang = set.lang;
    document.documentElement.dir = he() ? 'rtl' : 'ltr';
    app.innerHTML = S.view === 'cal' ? viewCal() : S.view === 'conv' ? viewConv() : viewSettings();
  }

  /* ----------------------------------------------------------------- input */
  function keyName(e) {
    switch (e.key) {
      case 'ArrowUp': case 'Up': return 'up';
      case 'ArrowDown': case 'Down': return 'down';
      case 'ArrowLeft': case 'Left': return 'left';
      case 'ArrowRight': case 'Right': return 'right';
      case 'Enter': case 'Select': case 'OK': return 'ok';
      case 'Escape': case 'Backspace': case 'GoBack': case 'BrowserBack': return 'back';
      case 'PageUp': return 'pgup';
      case 'PageDown': return 'pgdn';
    }
    switch (e.keyCode) { // TV remotes (Android TV, Tizen, webOS) and older browsers
      case 38: return 'up'; case 40: return 'down'; case 37: return 'left'; case 39: return 'right';
      case 13: case 23: return 'ok';
      case 27: case 8: case 4: case 461: case 10009: return 'back';
    }
    return '';
  }
  function visualDir(k) { // step direction of left/right keys on screen (+1 = forward in time)
    var s = k === 'right' ? 1 : -1;
    return he() ? -s : s;
  }

  function keyCal(k, e) {
    if (S.mode === 'browse') {
      if (k === 'left' || k === 'right') shiftMonth(visualDir(k));
      else if (k === 'up') shiftYear(upDir());
      else if (k === 'down') shiftYear(-upDir());
      else if (k === 'pgup') shiftYear(10 * upDir());
      else if (k === 'pgdn') shiftYear(-10 * upDir());
      else if (k === 'ok') S.mode = 'day';
      else return false;
    } else if (S.mode === 'day') {
      var len = monthLen(S.y, S.id);
      if (k === 'left' || k === 'right') shiftDay(visualDir(k));
      else if (k === 'up') { if (S.sel > 7) S.sel -= 7; else shiftDay(-7); }
      else if (k === 'down') { if (S.sel + 7 <= len) S.sel += 7; else { S.mode = 'bar'; S.bar = 0; } }
      else if (k === 'pgup') shiftMonth(1);
      else if (k === 'pgdn') shiftMonth(-1);
      else if (k === 'ok') openConv();
      else if (k === 'back') S.mode = 'browse';
      else return false;
    } else { // bottom bar
      if (k === 'left' || k === 'right') S.bar = clamp(S.bar + (he() ? -1 : 1) * (k === 'right' ? 1 : -1), 0, 2);
      else if (k === 'up') S.mode = 'day';
      else if (k === 'ok') runAct(['today', 'conv', 'settings'][S.bar]);
      else if (k === 'back') S.mode = 'browse';
      else return false;
    }
    return true;
  }

  function keyConv(k) {
    if (k === 'back') { S.view = 'cal'; return true; }
    if (k === 'left' || k === 'right') { C.f = clamp(C.f + (he() ? -1 : 1) * (k === 'right' ? 1 : -1), 0, 4); return true; }
    if (k === 'up' || k === 'down' || k === 'pgup' || k === 'pgdn') {
      var d = (k === 'up' || k === 'pgup') ? 1 : -1;
      if (C.f === 0) convToggle();
      else if (C.f >= 1 && C.f <= 3) convAdjust(C.f, (k === 'pgup' || k === 'pgdn') && C.f === 3 ? d * 10 : d);
      else return true;
      return true;
    }
    if (k === 'ok') { if (C.f === 0) convToggle(); else showInCal(); return true; }
    return false;
  }

  function keySettings(k) {
    if (k === 'back') { S.view = 'cal'; return true; }
    if (k === 'up') S.setIdx = clamp(S.setIdx - 1, 0, 2);
    else if (k === 'down') S.setIdx = clamp(S.setIdx + 1, 0, 2);
    else if (k === 'left' || k === 'right' || k === 'ok') changeSetting(S.setIdx);
    else return false;
    return true;
  }

  function showInCal() { goRD(convRD()); S.view = 'cal'; S.mode = 'day'; }

  function runAct(a, el) {
    switch (a) {
      case 'today': goRD(todayRD()); S.mode = 'day'; break;
      case 'conv': openConv(); break;
      case 'settings': S.view = 'settings'; S.setIdx = 0; break;
      case 'back': S.view = 'cal'; break;
      case 'prev': shiftMonth(-1); break;
      case 'next': shiftMonth(1); break;
      case 'yup': shiftYear(1); break;
      case 'ydown': shiftYear(-1); break;
      case 'cell': S.sel = +el.getAttribute('data-d'); S.mode = 'day'; break;
      case 'toggleDir': C.f = 0; convToggle(); break;
      case 'field': C.f = +el.getAttribute('data-f'); break;
      case 'adj': C.f = +el.getAttribute('data-f'); convAdjust(C.f, +el.getAttribute('data-delta')); break;
      case 'showcal': showInCal(); break;
      case 'setrow': S.setIdx = +el.getAttribute('data-i'); changeSetting(S.setIdx); break;
      default: return;
    }
    render();
  }

  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var k = keyName(e), handled = false;
    if (!k) {
      var c = (e.key || '').toLowerCase();
      if (S.view === 'cal' && (c === 't' || c === 'c' || c === 's')) {
        runAct(c === 't' ? 'today' : c === 'c' ? 'conv' : 'settings'); e.preventDefault();
      }
      return;
    }
    if (e.target && e.target.tagName === 'BUTTON' && k === 'ok') e.preventDefault(); // we handle OK ourselves
    if (S.view === 'cal') handled = keyCal(k, e);
    else if (S.view === 'conv') handled = keyConv(k);
    else handled = keySettings(k);
    if (handled) { e.preventDefault(); render(); }
  });

  app.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (el) runAct(el.getAttribute('data-act'), el);
  });

  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  render();

  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }
})();
