// 原创场景插画（纯 SVG，只画场景氛围，不画任何官方角色）
(function () {
  "use strict";
  var W = 800, H = 300;
  var uid = 0;

  function rnd(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }
  function sky(top, bottom) {
    var id = "g" + (uid++);
    return { id: id, def: '<linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + top + '"/><stop offset="1" stop-color="' + bottom + '"/></linearGradient>' };
  }
  // 城市天际线
  function skyline(seed, base, minH, maxH, color, opts) {
    opts = opts || {};
    var r = rnd(seed), x = -10, s = "";
    while (x < W + 10) {
      var w = 18 + r() * 46, h = minH + r() * (maxH - minH);
      s += '<rect x="' + x.toFixed(1) + '" y="' + (base - h).toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + (h + 2).toFixed(1) + '" fill="' + color + '"/>';
      if (opts.windows) {
        for (var wy = base - h + 8; wy < base - 6; wy += 11) for (var wx = x + 4; wx < x + w - 5; wx += 8) if (r() < opts.windows) s += '<rect x="' + wx.toFixed(1) + '" y="' + wy.toFixed(1) + '" width="3" height="4" fill="' + opts.wcolor + '"/>';
      }
      if (opts.broken && r() < .35) s += '<polygon points="' + x.toFixed(1) + "," + (base - h).toFixed(1) + " " + (x + w * .6).toFixed(1) + "," + (base - h - 10 - r() * 14).toFixed(1) + " " + (x + w).toFixed(1) + "," + (base - h).toFixed(1) + '" fill="' + color + '"/>';
      x += w + (opts.gap || 0) * r();
    }
    return s;
  }
  function mountains(seed, base, amp, color, n) {
    var r = rnd(seed), pts = "0," + H + " 0," + base;
    n = n || 9;
    for (var i = 0; i <= n; i++) pts += " " + (i * W / n).toFixed(0) + "," + (base - r() * amp).toFixed(0);
    return '<polygon points="' + pts + " " + W + "," + H + '" fill="' + color + '"/>';
  }
  function dots(seed, n, y0, y1, color, rmax, op) {
    var r = rnd(seed), s = "";
    for (var i = 0; i < n; i++) s += '<circle cx="' + (r() * W).toFixed(0) + '" cy="' + (y0 + r() * (y1 - y0)).toFixed(0) + '" r="' + (0.6 + r() * rmax).toFixed(1) + '" fill="' + color + '" opacity="' + (op || .8) + '"/>';
    return s;
  }
  function rain(seed, n, color) {
    var r = rnd(seed), s = "";
    for (var i = 0; i < n; i++) { var x = r() * W, y = r() * H; s += '<line x1="' + x.toFixed(0) + '" y1="' + y.toFixed(0) + '" x2="' + (x - 6).toFixed(0) + '" y2="' + (y + 18).toFixed(0) + '" stroke="' + color + '" stroke-width="1" opacity=".5"/>'; }
    return s;
  }
  function crystals(seed, n, base, color) {
    var r = rnd(seed), s = "";
    for (var i = 0; i < n; i++) {
      var x = r() * W, h = 10 + r() * 26, w = 4 + r() * 6;
      s += '<polygon points="' + (x - w).toFixed(0) + "," + base + " " + x.toFixed(0) + "," + (base - h).toFixed(0) + " " + (x + w).toFixed(0) + "," + base + '" fill="' + color + '" opacity=".85"/>';
    }
    return s;
  }
  function birch(x, base, h, color) {
    var s = '<rect x="' + x + '" y="' + (base - h) + '" width="5" height="' + h + '" fill="' + color + '"/>';
    for (var y = base - h + 10; y < base; y += 17) s += '<rect x="' + x + '" y="' + y + '" width="3" height="2" fill="#2a2a2a" opacity=".6"/>';
    return s;
  }
  function wrap(defs, body, caption) {
    return '<figure class="scene"><svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + caption + '"><defs>' + defs + "</defs>" + body + "</svg><figcaption>" + caption + "</figcaption></figure>";
  }

  var S = {};

  S.ch0 = function () {
    var g = sky("#2b0f0f", "#a8391f");
    var glow = '<radialGradient id="fire0" cx=".55" cy="1" r=".7"><stop offset="0" stop-color="#ffb347" stop-opacity=".9"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>';
    return wrap(g.def + glow,
      '<rect width="800" height="300" fill="url(#' + g.id + ')"/><rect width="800" height="300" fill="url(#fire0)"/>' +
      dots(3, 70, 20, 240, "#ffcf80", 1.6, .7) +
      skyline(7, 250, 60, 150, "#3a1712", { broken: true }) +
      skyline(11, 280, 30, 90, "#1a0b09", { windows: .25, wcolor: "#ff8a3d", broken: true }) +
      '<rect y="278" width="800" height="22" fill="#120706"/>',
      "切尔诺伯格，暴动之夜");
  };
  S.ch1 = function () {
    var g = sky("#0d1424", "#3a3550");
    return wrap(g.def,
      '<rect width="800" height="300" fill="url(#' + g.id + ')"/>' + dots(5, 90, 0, 150, "#cfd8ff", 1, .6) +
      skyline(13, 210, 40, 110, "#2a2840") +
      '<path d="M0 300 L0 230 Q400 200 800 240 L800 300 Z" fill="#14141f"/>' +
      '<g fill="#e0b25a" opacity=".9"><circle cx="560" cy="248" r="2.2"/><circle cx="575" cy="250" r="2.2"/><circle cx="590" cy="247" r="2.2"/><circle cx="603" cy="251" r="2.2"/></g>' +
      '<path d="M120 160 l18 -40 l18 40 z" fill="#ff6a3d" opacity=".55"/>',
      "撤离：把燃烧的城市留在身后");
  };
  S.ch2 = function () {
    var g = sky("#f7c58b", "#7aa7c7");
    return wrap(g.def,
      '<rect width="800" height="300" fill="url(#' + g.id + ')"/>' +
      skyline(21, 250, 80, 200, "#5b7088", { gap: 2 }) +
      skyline(23, 268, 40, 130, "#34465a", { windows: .35, wcolor: "#ffd27a" }) +
      '<rect y="266" width="800" height="34" fill="#202c3a"/>' +
      '<rect x="0" y="284" width="800" height="6" fill="#4a5a6c"/>',
      "龙门：繁华的上城区");
  };
  S.ch3 = function () {
    var g = sky("#2a2620", "#6b5a44");
    return wrap(g.def,
      '<rect width="800" height="300" fill="url(#' + g.id + ')"/>' +
      '<polygon points="0,0 260,0 230,300 0,300" fill="#1f1b17"/><polygon points="800,0 540,0 570,300 800,300" fill="#1f1b17"/>' +
      '<g stroke="#3b342b" stroke-width="2">' + [40, 90, 140, 190].map(function (y) { return '<line x1="240" y1="' + y + '" x2="560" y2="' + (y + 12) + '"/>'; }).join("") + "</g>" +
      '<g transform="translate(400 215)"><ellipse rx="34" ry="42" fill="#d9d2c3"/><ellipse cx="-12" cy="-6" rx="8" ry="5" fill="#1f1b17"/><ellipse cx="12" cy="-6" rx="8" ry="5" fill="#1f1b17"/><path d="M-14 18 h28" stroke="#1f1b17" stroke-width="3"/></g>' +
      '<rect y="270" width="800" height="30" fill="#15120f"/>',
      "贫民窟的巷子，和一张留下来的面具");
  };
  S.ch4 = function () {
    var g = sky("#9aa6b2", "#dfe5ea");
    return wrap(g.def,
      '<rect width="800" height="300" fill="url(#' + g.id + ')"/>' +
      skyline(31, 240, 40, 120, "#7d8894", { broken: true, gap: 20 }) +
      skyline(37, 270, 20, 70, "#55606b", { broken: true, gap: 30 }) +
      '<rect y="262" width="800" height="38" fill="#eef2f5"/>' + dots(41, 160, 0, 300, "#ffffff", 1.8, .9),
      "废弃的分城，雪怪出没的地方");
  };
  S.ch5 = function () {
    var g = sky("#0b1020", "#26203f");
    return wrap(g.def,
      '<rect width="800" height="300" fill="url(#' + g.id + ')"/>' +
      skyline(51, 260, 90, 230, "#161a30", { windows: .4, wcolor: "#ffd966" }) +
      '<rect y="258" width="800" height="42" fill="#0a0c18"/>' +
      '<rect y="262" width="800" height="38" fill="#ffd966" opacity=".06"/>' + rain(53, 140, "#a9c3ff"),
      "雨夜的龙门巷战");
  };
  S.ch6 = function () {
    var g = sky("#cfe0ef", "#f7fbff");
    var flake = '<g stroke="#7fb0d8" stroke-width="3" stroke-linecap="round">' + [0, 60, 120].map(function (a) { return '<line x1="0" y1="-38" x2="0" y2="38" transform="rotate(' + a + ')"/>'; }).join("") + "</g>";
    return wrap(g.def,
      '<rect width="800" height="300" fill="url(#' + g.id + ')"/>' +
      mountains(61, 200, 70, "#b7cde0", 7) + mountains(67, 245, 40, "#e3edf6", 6) +
      '<g transform="translate(620 90)" opacity=".75">' + flake + "</g>" +
      dots(63, 120, 0, 300, "#ffffff", 2, .95),
      "乌萨斯雪原，霜星的冬天");
  };
  S.ch7 = function () {
    var g = sky("#3b2a1e", "#b0703a");
    return wrap(g.def,
      '<rect width="800" height="300" fill="url(#' + g.id + ')"/>' +
      '<circle cx="640" cy="120" r="46" fill="#ffcf8a" opacity=".55"/>' +
      '<g fill="#1e140e"><path d="M150 230 L190 120 L230 140 L260 80 L300 130 L340 100 L380 150 L420 110 L460 160 L500 230 Z"/>' +
      '<rect x="120" y="225" width="420" height="22" rx="6"/></g>' +
      '<g fill="#3a281c">' + [140, 190, 240, 290, 340, 390, 440, 490].map(function (x) { return '<circle cx="' + x + '" cy="252" r="12"/>'; }).join("") + "</g>" +
      '<rect y="262" width="800" height="38" fill="#5e3d24"/>' +
      '<g fill="#d7b48a" opacity=".5"><path d="M540 250 q40 -10 80 0 q40 10 80 0 v14 h-160z"/></g>',
      "开向龙门的切尔诺伯格核心城");
  };
  S.ch8 = function () {
    var g = sky("#f2a65a", "#5d79a6");
    return wrap(g.def,
      '<rect width="800" height="300" fill="url(#' + g.id + ')"/>' +
      '<circle cx="400" cy="250" r="90" fill="#ffe1a8" opacity=".7"/>' +
      skyline(81, 262, 50, 150, "#2f3b55", { gap: 2 }) +
      '<rect y="260" width="800" height="40" fill="#1f2738"/>' +
      '<line x1="0" y1="275" x2="800" y2="275" stroke="#ffe1a8" stroke-width="1" opacity=".35"/>',
      "黄昏，停下来的城市");
  };

  S.dm = function () {
    var g = sky("#1c1c26", "#4b4a5e");
    var trees = "";
    [60, 120, 170, 240, 600, 650, 720, 760].forEach(function (x, i) { trees += birch(x, 280, 180 + (i % 3) * 30, "#d9d6cf"); });
    return wrap(g.def,
      '<rect width="800" height="300" fill="url(#' + g.id + ')"/>' + '<circle cx="400" cy="80" r="26" fill="#e9e6f5" opacity=".8"/>' +
      skyline(91, 270, 20, 80, "#2a2935", { broken: true, gap: 25 }) + trees +
      crystals(93, 18, 282, "#6a5a8a") + '<rect y="280" width="800" height="20" fill="#e8e8ee"/>',
      "卡兹戴尔北面的桦树林");
  };
  S.sv = function () {
    var g = sky("#1b2f3a", "#5f8a91");
    return wrap(g.def,
      '<rect width="800" height="300" fill="url(#' + g.id + ')"/>' +
      '<g fill="#14232b"><rect x="520" y="110" width="110" height="140"/><polygon points="510,112 575,40 640,112"/><rect x="565" y="10" width="20" height="40"/><rect x="560" y="150" width="30" height="100" fill="#0c171d"/></g>' +
      '<path d="M0 230 Q100 215 200 232 T400 228 T600 236 T800 226 V300 H0 Z" fill="#244652"/>' +
      '<path d="M0 255 Q120 242 240 258 T480 252 T800 256 V300 H0 Z" fill="#163039"/>' +
      dots(95, 40, 220, 300, "#9fe0d6", 1.2, .5),
      "伊比利亚，海边的教堂");
  };
  S.iw = function () {
    var g = sky("#e9e2cf", "#b9c7b5");
    return wrap(g.def,
      '<rect width="800" height="300" fill="url(#' + g.id + ')"/>' +
      '<circle cx="610" cy="70" r="22" fill="#f8f4e8"/><circle cx="660" cy="92" r="12" fill="#f8f4e8" opacity=".8"/>' +
      mountains(101, 170, 90, "#a7b8a8", 6) + mountains(103, 215, 70, "#7f9584", 7) + mountains(107, 262, 40, "#5b6f60", 8) +
      '<g transform="translate(160 236)"><path d="M-26 0 h52 l-8 26 h-36 z" fill="#8a4b2a"/><rect x="-4" y="26" width="8" height="10" fill="#8a4b2a"/><rect x="-16" y="36" width="32" height="5" fill="#8a4b2a"/></g>',
      "尚蜀的三山十七峰");
  };
  S.is = function () {
    var g = sky("#22242c", "#4d4f5c");
    var cols = "";
    for (var x = 120; x <= 680; x += 80) cols += '<rect x="' + x + '" y="110" width="16" height="140" fill="#6d6a66"/>';
    return wrap(g.def,
      '<rect width="800" height="300" fill="url(#' + g.id + ')"/>' +
      '<polygon points="90,110 400,40 710,110" fill="#5c5955"/><rect x="90" y="106" width="620" height="10" fill="#77736d"/>' + cols +
      '<rect x="80" y="248" width="640" height="14" fill="#77736d"/>' +
      '<rect y="262" width="800" height="38" fill="#18191e"/>' + rain(111, 160, "#c9cfe0"),
      "叙拉古，雨中的剧院");
  };
  S.mn = function () {
    var g = sky("#7fb2e0", "#d8ecfa");
    var flags = "";
    for (var x = 60; x < 800; x += 70) flags += '<line x1="' + x + '" y1="70" x2="' + x + '" y2="130" stroke="#3d4a5c" stroke-width="2"/><path d="M' + x + " 72 l26 7 l-26 9z\" fill=\"" + (x % 140 ? "#d9a634" : "#b8323a") + '"/>';
    return wrap(g.def,
      '<rect width="800" height="300" fill="url(#' + g.id + ')"/>' + flags +
      '<path d="M0 300 V150 Q400 110 800 150 V300 Z" fill="#c8bfae"/>' +
      '<path d="M0 300 V190 Q400 160 800 190 V300 Z" fill="#a89c87"/>' +
      '<ellipse cx="400" cy="270" rx="300" ry="34" fill="#d9c89b"/>' +
      '<g transform="translate(400 255)" fill="#e9eef3" stroke="#56606c" stroke-width="2"><path d="M0 -60 L4 6 L-4 6 Z"/><rect x="-16" y="6" width="32" height="5"/></g>',
      "卡西米尔，骑士竞技场");
  };
  S.bi = function () {
    var g = sky("#3e5d86", "#c3d6ea");
    return wrap(g.def,
      '<rect width="800" height="300" fill="url(#' + g.id + ')"/>' +
      '<polygon points="250,260 430,30 610,260" fill="#e9f0f7"/><polygon points="430,30 470,90 445,85 420,110 400,80" fill="#ffffff"/>' +
      mountains(121, 210, 60, "#9fb6cf", 6) + mountains(127, 255, 30, "#f2f6fa", 8) +
      '<g transform="translate(660 210)" fill="#6b4f3a"><rect x="-20" y="-30" width="40" height="40"/><polygon points="-26,-30 0,-52 26,-30"/><circle cx="0" cy="-16" r="6" fill="#e0b24a"/></g>' +
      dots(129, 90, 0, 300, "#ffffff", 1.6, .9),
      "谢拉格，圣山与钟声");
  };

  window.AK_ART = function (id) { return S[id] ? S[id]() : ""; };
})();
