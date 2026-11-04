// Compares hebcal.js with the JS engine's built-in Hebrew calendar (Intl) for every day 1900-2100.
const H = require('../hebcal.js');
const fmt = new Intl.DateTimeFormat('en-u-ca-hebrew', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' });
const idMap = { Tishri: 'Tishri', Heshvan: 'Cheshvan', Kislev: 'Kislev', Tevet: 'Tevet', Shevat: 'Shevat',
  'Adar I': 'AdarI', 'Adar II': 'AdarII', Adar: 'Adar', Nisan: 'Nisan', Iyar: 'Iyar', Sivan: 'Sivan',
  Tamuz: 'Tammuz', Av: 'Av', Elul: 'Elul' };
let bad = 0, n = 0;
for (let y = 1900; y <= 2100; y++) for (let m = 1; m <= 12; m++) for (let d = 1; d <= H.gregDays(y, m); d++) {
  const rd = H.gregToRD(y, m, d);
  const g = H.rdToGreg(rd);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const p = Object.fromEntries(fmt.formatToParts(dt).map(x => [x.type, x.value]));
  const h = H.rdToHeb(rd);
  n++;
  const wd = dt.getUTCDay();
  const ok = g.y === y && g.m === m && g.d === d && H.dow(rd) === wd &&
    h.y === +p.year && h.id === idMap[p.month] && h.d === +p.day &&
    H.hebToRD(h.y, h.id, h.d) === rd;
  if (!ok && bad++ < 5) console.log('MISMATCH', y, m, d, h, p);
}
console.log(n + ' days checked, ' + bad + ' mismatches');
console.log('gematria:', H.gematria(24), H.gematria(787), H.gematria(15), H.gematria(30), H.gematria(5));
const t = H.rdToHeb(H.gregToRD(2026, 11, 3));
console.log('2026-11-03 =', t);
console.log('Chanukah 5787 starts', H.rdToGreg(H.hebToRD(5787, 'Kislev', 25)));
