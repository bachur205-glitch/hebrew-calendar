/* Hebrew calendar engine: no dependencies.
   Day numbers are "RD" fixed days (RD 1 = Jan 1, year 1 Gregorian; RD 0 is a Sunday). */
(function (root) {
  'use strict';

  var EPOCH = -1373427; // RD of 1 Tishri, AM 1

  function mod(a, b) { return ((a % b) + b) % b; }
  function isLeap(y) { return mod(7 * y + 1, 19) < 7; }

  function elapsed(y) {
    var m = Math.floor((235 * y - 234) / 19);
    var parts = 12084 + 13753 * m;
    var day = m * 29 + Math.floor(parts / 25920);
    if (mod(3 * (day + 1), 7) < 3) day++;
    return day;
  }
  function correction(y) {
    var a = elapsed(y - 1), b = elapsed(y), c = elapsed(y + 1);
    if (c - b === 356) return 2;
    if (b - a === 382) return 1;
    return 0;
  }
  function newYear(y) { return EPOCH + elapsed(y) + correction(y); }
  function yearLength(y) { return newYear(y + 1) - newYear(y); }

  /* Months in calendar order starting from Tishri. */
  function monthsOf(y) {
    var len = yearLength(y) % 10;
    var m = [
      ['Tishri', 30], ['Cheshvan', len === 5 ? 30 : 29], ['Kislev', len === 3 ? 29 : 30],
      ['Tevet', 29], ['Shevat', 30]
    ];
    if (isLeap(y)) m.push(['AdarI', 30], ['AdarII', 29]); else m.push(['Adar', 29]);
    m.push(['Nisan', 30], ['Iyar', 29], ['Sivan', 30], ['Tammuz', 29], ['Av', 30], ['Elul', 29]);
    return m.map(function (x) { return { id: x[0], len: x[1] }; });
  }

  function hebToRD(y, id, d) {
    var ms = monthsOf(y), rd = newYear(y);
    for (var i = 0; i < ms.length; i++) {
      if (ms[i].id === id) return rd + d - 1;
      rd += ms[i].len;
    }
    return NaN;
  }

  function rdToHeb(rd) {
    var y = Math.floor((rd - EPOCH) / 365.24682) + 1;
    while (newYear(y) > rd) y--;
    while (newYear(y + 1) <= rd) y++;
    var ms = monthsOf(y), left = rd - newYear(y);
    for (var i = 0; i < ms.length; i++) {
      if (left < ms[i].len) return { y: y, id: ms[i].id, mi: i, d: left + 1 };
      left -= ms[i].len;
    }
  }

  function isGregLeap(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }
  function gregDays(y, m) { return [31, isGregLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]; }

  function gregToRD(y, m, d) {
    var p = y - 1;
    var r = 365 * p + Math.floor(p / 4) - Math.floor(p / 100) + Math.floor(p / 400) +
      Math.floor((367 * m - 362) / 12) + d;
    if (m > 2) r -= isGregLeap(y) ? 1 : 2;
    return r;
  }
  function rdToGreg(rd) {
    var d0 = rd - 1;
    var n400 = Math.floor(d0 / 146097), d1 = mod(d0, 146097);
    var n100 = Math.floor(d1 / 36524), d2 = mod(d1, 36524);
    var n4 = Math.floor(d2 / 1461), d3 = mod(d2, 1461);
    var n1 = Math.floor(d3 / 365);
    var y = 400 * n400 + 100 * n100 + 4 * n4 + n1;
    if (n100 !== 4 && n1 !== 4) y++;
    var corr = rd < gregToRD(y, 3, 1) ? 0 : (isGregLeap(y) ? 1 : 2);
    var m = Math.floor((12 * (rd - gregToRD(y, 1, 1) + corr) + 373) / 367);
    return { y: y, m: m, d: rd - gregToRD(y, m, 1) + 1 };
  }
  function dow(rd) { return mod(rd, 7); } // 0 = Sunday ... 6 = Shabbat

  /* Hebrew numerals, e.g. 24 -> כ״ד, 787 -> תשפ״ז */
  function gematria(n) {
    var ones = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'];
    var tens = ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'];
    var hund = ['', 'ק', 'ר', 'ש', 'ת'];
    var s = '', h = Math.floor(n / 100);
    n = n % 100;
    while (h > 4) { s += 'ת'; h -= 4; }
    s += hund[h];
    if (n === 15) s += 'טו';
    else if (n === 16) s += 'טז';
    else s += tens[Math.floor(n / 10)] + ones[n % 10];
    if (s.length === 1) return s + '׳';
    return s.slice(0, -1) + '״' + s.slice(-1);
  }

  /* Holidays for one Hebrew date. Returns [{k:key, t:'major'|'minor'|'fast'|'rc', n?:dayNumber}] */
  function holidays(y, id, d, wd, israel) {
    var out = [];
    function add(k, t, n) { out.push({ k: k, t: t, n: n }); }
    var kislev = monthsOf(y)[2].len;

    switch (id) {
      case 'Tishri':
        if (d === 1) add('rh', 'major');
        if (d === 2) add('rh2', 'major');
        if ((d === 3 && wd !== 6) || (d === 4 && wd === 0)) add('gedaliah', 'fast');
        if (d === 10) add('yk', 'major');
        if (d === 15) add('sukkot', 'major');
        if (d === 16) add(israel ? 'chm' : 'sukkot2', israel ? 'minor' : 'major');
        if (d >= 17 && d <= 20) add('chm', 'minor');
        if (d === 21) add('hoshana', 'minor');
        if (d === 22) add(israel ? 'shemini_st' : 'shemini', 'major');
        if (d === 23 && !israel) add('simchat', 'major');
        break;
      case 'Kislev':
        if (d >= 25) add('chanukah', 'minor', d - 24);
        break;
      case 'Tevet':
        if (d <= 32 - kislev) add('chanukah', 'minor', kislev - 24 + d);
        if (d === 10) add('tevet10', 'fast');
        break;
      case 'Shevat':
        if (d === 15) add('tubishvat', 'minor');
        break;
      case 'AdarI':
        if (d === 14) add('purimkatan', 'minor');
        if (d === 15) add('shushankatan', 'minor');
        break;
      case 'Adar':
      case 'AdarII':
        if ((d === 13 && wd !== 6) || (d === 11 && wd === 4)) add('esther', 'fast');
        if (d === 14) add('purim', 'minor');
        if (d === 15) add('shushan', 'minor');
        break;
      case 'Nisan':
        if (d === 15) add('pesach', 'major');
        if (d === 16) add(israel ? 'chm' : 'pesach2', israel ? 'minor' : 'major');
        if (d >= 17 && d <= 20) add('chm', 'minor');
        if (d === 21) add('pesach7', 'major');
        if (d === 22 && !israel) add('pesach8', 'major');
        break;
      case 'Iyar':
        if (d === 18) add('lag', 'minor');
        break;
      case 'Sivan':
        if (d === 6) add('shavuot', 'major');
        if (d === 7 && !israel) add('shavuot2', 'major');
        break;
      case 'Tammuz':
        if ((d === 17 && wd !== 6) || (d === 18 && wd === 0)) add('tammuz17', 'fast');
        break;
      case 'Av':
        if ((d === 9 && wd !== 6) || (d === 10 && wd === 0)) add('tisha', 'fast');
        if (d === 15) add('tubav', 'minor');
        break;
    }
    if ((d === 1 && id !== 'Tishri') || d === 30) add('rc', 'rc');
    return out;
  }

  var api = {
    isLeap: isLeap, yearLength: yearLength, monthsOf: monthsOf, newYear: newYear,
    hebToRD: hebToRD, rdToHeb: rdToHeb, gregToRD: gregToRD, rdToGreg: rdToGreg,
    gregDays: gregDays, dow: dow, gematria: gematria, holidays: holidays
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Heb = api;
})(typeof window !== 'undefined' ? window : this);
