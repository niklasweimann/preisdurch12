const HTML = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ist der Preis durch 12 teilbar?</title>
<meta property="og:title" content="Ist der Preis durch 12 teilbar?">
<meta property="og:description" content="Bitte kurz prüfen, bevor der Vertrag rausgeht.">
<style>
  :root { --navy:#062465; --blue:#1e6eeb; --blue-dark:#1859c4; --paper:#fdfcfc; --sky:#f0f9ff; --ink:#0a0a08; --line:#d9e2f1; }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100vh; background:var(--paper); color:var(--ink);
         font-family: "saans", -apple-system, "Segoe UI", Helvetica, Arial, sans-serif; font-weight:300; font-size:16px; line-height:1.4; overflow-x:hidden; }
  header { background:var(--navy); color:#fff; padding:0 16px; }
  .bar { max-width:960px; margin:0 auto; height:56px; display:flex; align-items:center; font-weight:500; letter-spacing:.2px; opacity:.85; }
  .hero { background:var(--navy); color:#fff; padding:40px 16px 96px; }
  .hero div { max-width:960px; margin:0 auto; }
  h1 { font-size:clamp(.95rem,3.8vw,3.4rem); line-height:1.1; font-weight:500; margin:0 0 14px; white-space:nowrap; }
  .hero p { margin:0; font-size:1.15rem; opacity:.8; }
  main { max-width:560px; margin:-56px auto 48px; padding:0 16px; position:relative; z-index:1; }
  .card { background:#fff; border:1px solid var(--line); border-radius:8px; padding:28px; box-shadow:0 8px 24px rgba(6,36,101,.10); }
  label { display:block; font-weight:500; margin-bottom:8px; }
  .field { display:flex; align-items:center; border:1px solid var(--line); border-radius:8px; padding:0 16px; background:var(--paper); }
  .field:focus-within { border-color:var(--blue); box-shadow:0 0 0 3px rgba(30,110,235,.2); }
  .field input { flex:1; min-width:0; border:0; outline:0; background:transparent; color:inherit; font:inherit; font-weight:500; font-size:1.8rem; padding:12px 0; text-align:right; }
  .field span { font-size:1.4rem; margin-left:10px; opacity:.5; }
  button { font:inherit; font-weight:500; cursor:pointer; border:0; border-radius:8px; width:100%; }
  .go { background:var(--blue); color:#fff; padding:14px 20px; margin-top:16px; font-size:1.05rem; }
  .go:hover { background:var(--blue-dark); }
  .ghost { background:none; color:var(--blue); padding:10px; margin-top:8px; font-size:.95rem; }
  .ghost:hover { text-decoration:underline; }
  #msg { margin-top:18px; min-height:1.4em; }
  #msg:empty { margin:0; min-height:0; }
  #msg.res { background:var(--sky); border-radius:8px; padding:14px 16px; }
  #msg b { font-weight:500; }

  /* ALARM */
  #alarm { position:fixed; inset:0; z-index:50; display:none; flex-direction:column; align-items:center; justify-content:center;
           text-align:center; padding:24px; color:#fff; animation: blink 1s steps(1) infinite; }
  #alarm.on { display:flex; }
  #alarm h2 { font-size:clamp(2rem,9vw,4.5rem); font-weight:500; margin:0 0 12px; }
  #alarm p { font-size:1.3rem; max-width:520px; margin:0 0 20px; }
  #alarm button { background:#fff; color:#b00000; width:auto; padding:14px 22px; font-size:1.05rem; }
  .head { display:flex; align-items:center; justify-content:center; gap:clamp(12px,4vw,40px); margin-bottom:12px; }
  .head h2 { margin:0; }
  .beacon { position:relative; width:clamp(70px,16vw,140px); aspect-ratio:1; flex:none; }
  .beacon::before { content:""; position:absolute; inset:-60%; border-radius:50%;
    background:conic-gradient(from 0deg, rgba(255,235,120,.95), rgba(255,200,0,0) 22%, rgba(255,235,120,.95) 50%, rgba(255,200,0,0) 72%, rgba(255,235,120,.95));
    -webkit-mask:radial-gradient(circle, transparent 20%, #000 21%, transparent 70%); mask:radial-gradient(circle, transparent 20%, #000 21%, transparent 70%);
    animation: spin .9s linear infinite; }
  .beacon::after { content:""; position:absolute; left:15%; right:15%; top:20%; bottom:0; border-radius:50% 50% 8px 8px / 60% 60% 8px 8px;
    background:radial-gradient(circle at 35% 30%, #fff4a8, #ffb300 55%, #b36b00); box-shadow:0 0 40px 10px rgba(255,200,0,.8); }
  .beacon.r::before { animation-direction:reverse; }
  @keyframes spin { to { transform:rotate(360deg); } }
  @keyframes blink { 0%{background:#ff0000} 50%{background:#5a0000} }

  /* TEILBAR */
  #cute { position:fixed; inset:0; z-index:40; pointer-events:none; display:none; overflow:hidden; background:rgba(240,249,255,.85); }
  #cute.on { display:block; }
  #bunny { position:absolute; left:50%; bottom:6%; font-size:7rem; transform:translateX(-50%); animation: hop .7s ease-in-out infinite; }
  @keyframes hop { 0%,100%{ transform:translateX(-50%) translateY(0) rotate(-6deg) scale(1,.92);} 50%{ transform:translateX(-50%) translateY(-90px) rotate(6deg) scale(.95,1.05);} }
  .fall { position:absolute; top:-10vh; animation: fall linear forwards; }
  @keyframes fall { to { transform: translateY(115vh) rotate(360deg); } }
  #cutemsg { position:absolute; top:12%; width:100%; text-align:center; font-size:clamp(1.8rem,6vw,3rem); font-weight:500; color:var(--navy); animation: pop .6s ease-out; }
  @keyframes pop { from{ transform:scale(0);} 70%{ transform:scale(1.15);} to{ transform:scale(1);} }
  @media (prefers-reduced-motion: reduce) { #alarm { animation:none; background:#d00; } .beacon::before { animation:none; } #bunny { animation:none; } }
</style>
</head>
<body>
<header><div class="bar">Preis-durch-12</div></header>
<section class="hero"><div>
  <h1>Ist der Preis <span id="hprice"></span>durch 12 teilbar?</h1>
  <p>Bevor der Vertrag rausgeht: kurz prüfen, damit die Abrechnung nicht stolpert.</p>
</div></section>
<main><div class="card">
  <label for="price">Vertragspreis in Euro</label>
  <div class="field"><input id="price" inputmode="decimal" autocomplete="off" placeholder="0,00"><span>€</span></div>
  <button class="go" id="check">Prüfen</button>
  <div id="msg"></div>
  <button class="ghost" id="share">Link mit diesem Preis kopieren</button>
</div></main>

<div id="alarm" role="alertdialog" aria-live="assertive">
  <div class="head"><div class="beacon"></div><h2>ALARM</h2><div class="beacon r"></div></div>
  <p id="alarmtext"></p>
  <button id="dismiss">Oje, ich korrigiere den Preis</button>
</div>
<div id="cute"><div id="cutemsg"></div><div id="bunny">🐰</div></div>

<script>
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var input = $('price'), msg = $('msg');
  function syncTitle() { var v = input.value.trim(); $('hprice').textContent = v ? v + (/€/.test(v) ? '' : ' €') + ' ' : ''; }
  input.addEventListener('input', syncTitle);

  // Betrag -> Cent (ganze Zahl) oder null (ungültig). Rückgabe {cents, tooPrecise}
  function parse(raw) {
    var s = String(raw).replace(/[€\\s]/g, '');
    if (!s || !/^[0-9.,]+$/.test(s)) return null;
    if (s.indexOf(',') >= 0) {
      if (s.split(',').length > 2) return null;
      s = s.replace(/\\./g, '').replace(',', '.');
    } else if (/^\\d{1,3}(\\.\\d{3})+$/.test(s)) {
      s = s.replace(/\\./g, '');
    } else if ((s.match(/\\./g) || []).length > 1) {
      return null;
    }
    var parts = s.split('.');
    var frac = parts[1] || '';
    if (!/^\\d+$/.test(parts[0])) return null;
    var whole = BigInt(parts[0]);
    if (frac.length > 2) {
      return { cents: whole * 100n + BigInt(frac.slice(0, 2)), tooPrecise: /[1-9]/.test(frac.slice(2)) };
    }
    return { cents: whole * 100n + BigInt((frac + '00').slice(0, 2)), tooPrecise: false };
  }
  function fmt(cents) {
    var c = cents < 0n ? 0n : cents;
    var w = (c / 100n).toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, '.');
    var f = (c % 100n).toString().padStart(2, '0');
    return w + ',' + f + ' €';
  }

  // Audio
  var ctx, siren;
  function startSiren() {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      stopSiren();
      var osc = ctx.createOscillator(), lfo = ctx.createOscillator(), lg = ctx.createGain(), g = ctx.createGain();
      osc.type = 'sawtooth'; osc.frequency.value = 700;
      lfo.frequency.value = 1.6; lg.gain.value = 300;
      lfo.connect(lg); lg.connect(osc.frequency);
      g.gain.value = 0.18; osc.connect(g); g.connect(ctx.destination);
      osc.start(); lfo.start();
      siren = { stop: function () { try { osc.stop(); lfo.stop(); } catch (e) {} } };
    } catch (e) {}
  }
  function stopSiren() { if (siren) { siren.stop(); siren = null; } }
  function chime() {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      [660, 880, 1320].forEach(function (f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime + i * 0.12;
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.2, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
        o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.45);
      });
    } catch (e) {}
  }
  var cuteTimer;
  function hideAll() {
    $('alarm').classList.remove('on'); stopSiren();
    $('cute').classList.remove('on'); clearInterval(cuteTimer);
    document.querySelectorAll('.fall').forEach(function (n) { n.remove(); });
  }
  function alarm(text) {
    hideAll();
    $('alarmtext').innerHTML = text;
    $('alarm').classList.add('on');
    startSiren();
    if (navigator.vibrate) navigator.vibrate([300, 150, 300, 150, 300]);
  }
  function cute(text) {
    hideAll();
    $('cutemsg').textContent = text;
    $('cute').classList.add('on');
    chime();
    var emojis = ['💙', '⭐', '🦄', '✨', '🐥', '🌈', '🚚'];
    function drop() {
      var e = document.createElement('div');
      e.className = 'fall'; e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      e.style.left = Math.random() * 100 + 'vw';
      e.style.fontSize = (1.2 + Math.random() * 2) + 'rem';
      e.style.animationDuration = (2.5 + Math.random() * 3) + 's';
      $('cute').appendChild(e);
      setTimeout(function () { e.remove(); }, 6000);
    }
    for (var i = 0; i < 30; i++) setTimeout(drop, i * 60);
    cuteTimer = setInterval(drop, 120);
    setTimeout(hideAll, 6000);
  }

  function check() {
    var p = parse(input.value);
    if (!p) { msg.textContent = 'Bitte einen Betrag eingeben, z. B. 1234,56'; return; }
    msg.className = 'res';
    var rem = p.cents % 12n;
    if (!p.tooPrecise && rem === 0n && p.cents > 0n) {
      var q = p.cents / 12n;
      msg.innerHTML = '<b>' + fmt(p.cents) + '</b> = 12 × <b>' + fmt(q) + '</b>';
      cute('Durch 12 teilbar!');
    } else if (p.cents === 0n && !p.tooPrecise) {
      msg.textContent = 'Null ist zwar durch 12 teilbar, aber ein Vertrag über 0 € ist auch ein Problem. 😅';
    } else {
      var down = p.cents - rem, up = down + 12n;
      var hint = p.tooPrecise
        ? 'Mehr als zwei Nachkommastellen geht nicht.'
        : 'Nächste passende Preise: <b>' + (down > 0n ? fmt(down) + '</b> oder <b>' : '') + fmt(up) + '</b>';
      msg.innerHTML = hint;
      alarm('<b>' + fmt(p.cents) + '</b> ist <b>nicht</b> durch 12 teilbar!<br>(als Eurobetrag mit Cent, Rest: ' + rem + ' Cent)<br><br>' + hint);
    }
  }

  $('check').addEventListener('click', check);
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
  $('dismiss').addEventListener('click', hideAll);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hideAll(); });

  $('share').addEventListener('click', function () {
    var v = input.value.trim();
    if (!v) { msg.textContent = 'Erst einen Preis eingeben, dann Link kopieren.'; return; }
    var url = location.origin + location.pathname + '?preis=' + encodeURIComponent(v);
    var done = function () { msg.className = 'res'; msg.textContent = 'Link kopiert: ' + url; };
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt('Link:', url); });
    else prompt('Link:', url);
  });

  var pre = new URLSearchParams(location.search).get('preis');
  if (pre) { input.value = pre; syncTitle(); $('check').focus(); } else { input.focus(); }
})();
</script>
</body>
</html>`;

export default {
  async fetch() {
    return new Response(HTML, {
      headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" },
    });
  },
};
