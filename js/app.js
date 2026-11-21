(function () {
  "use strict";
  var A = window.AK;
  var app = document.getElementById("app");
  var nav = document.getElementById("nav");
  var menuBtn = document.querySelector(".menu-btn");
  var P = {};
  A.PEOPLE.forEach(function (p) { P[p.id] = p; });

  var NAV = [
    ["#/", "首页"],
    ["#/world", "世界观"],
    ["#/people", "人物关系"],
    ["#/main/ch0", "主线"],
    ["#/side", "支线"],
    ["#/glossary", "名词表"]
  ];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fcolor(f) { return A.FACTIONS[f] ? A.FACTIONS[f].color : "var(--muted)"; }
  function chip(id) {
    var p = P[id]; if (!p) return "";
    return '<button class="chip" data-person="' + id + '"><i style="background:' + fcolor(p.f) + '"></i>' + esc(p.n) + "</button>";
  }

  function renderNav(hash) {
    nav.innerHTML = NAV.map(function (n) {
      var on = (n[0] === "#/" ? hash === "#/" || hash === "" : hash.indexOf(n[0].replace(/\/ch0$/, "")) === 0);
      return '<a href="' + n[0] + '"' + (on ? ' class="on"' : "") + ">" + n[1] + "</a>";
    }).join("");
  }

  var PRTS = {
    ch0: "0-1 坍塌/BEG", ch1: "1-1 孤岛/BEG", ch2: "2-1 龙门之行/END", ch3: "3-1 会合/BEG", ch4: "4-1 免费拥抱/BEG",
    ch5: "5-1 冤家易结/BEG", ch6: "6-1 僵局/BEG", ch7: "7-1 32:00:00/NBT", ch8: "R8-1 昨日，谷壳将裂/BEG",
    dm: "DM-1 埋藏/BEG", sv: "SV-1 闯入者/BEG", iw: "IW-ST-1 客将至/NBT", is: "IS-ST-1 沉疴/NBT", mn: "MN-ST-1 亮相/NBT", bi: "BI-1 不欢而聚/BEG"
  };
  function prtsLink(id) {
    if (!PRTS[id]) return "";
    var url = "https://prts.wiki/w/" + encodeURIComponent(PRTS[id].replace(/ /g, "_")).replace(/%2F/g, "/");
    return '<p class="src"><a href="' + url + '" target="_blank" rel="noopener">在 PRTS 维基查看原作剧情与官方配图 ↗</a></p>';
  }
  // 故事正文：在第二段后插一张场景插画
  function storyHTML(id, paras) {
    var art = window.AK_ART ? window.AK_ART(id) : "";
    var head = paras.slice(0, 2), tail = paras.slice(2);
    return '<div class="story"><p>' + head.join("</p><p>") + "</p></div>" + art + (tail.length ? '<div class="story"><p>' + tail.join("</p><p>") + "</p></div>" : "");
  }

  // ---------- pages ----------
  function home() {
    var mains = A.MAIN.map(function (c) {
      return '<a class="card" href="#/main/' + c.id + '"><div class="no">' + c.no + " · " + esc(c.place) + '</div><div class="tt">' + esc(c.title) + '</div><div class="ds">' + esc(c.sub) + "</div></a>";
    }).join("");
    var sides = A.SIDE.map(function (s) {
      return '<a class="card" href="#/side/' + s.id + '"><div class="no">支线 · ' + esc(s.place) + '</div><div class="tt">' + esc(s.title) + '</div><div class="ds">' + esc(s.why) + "</div></a>";
    }).join("");
    return '<section class="hero"><div class="kicker">ARKNIGHTS · 剧情白话版</div>' +
      "<h1>不卖关子的明日方舟</h1>" +
      '' + (window.AK_ART ? window.AK_ART("ch8") : "") + '<p class="lead">原作剧情信息量大、喜欢藏着说，很多关键反转要到好几章以后才点破。这里把主线第0–8章（整合运动篇）和六篇重要支线重新讲一遍：用大白话，按时间顺序，该解释的地方直接解释，人物关系一张图看清。</p></section>' +
      '<div class="panel"><h3>推荐阅读顺序</h3><ol class="steps">' +
      '<li>先花三分钟看 <a href="#/world">世界观</a>：源石、感染者、移动城市是什么。</li>' +
      '<li>打开 <a href="#/people">人物关系</a>，认识罗德岛、整合运动、龙门三方的主要人物。</li>' +
      '<li>从 <a href="#/main/ch0">第0章</a> 开始读主线。每章顶部有一句话总结，底部有“这章你需要知道”。</li>' +
      '<li>主线读完，再按兴趣看 <a href="#/side">支线</a>。遇到看不懂的词就查 <a href="#/glossary">名词表</a>。</li>' +
      "</ol></div>" +
      '<div class="panel"><h3>一分钟剧透版</h3><p>' + A.WORLD[0].p.join("</p><p>") + "</p><p>最大的反转：整合运动的领袖<b>塔露拉</b>早年是真心为感染者奋斗的人，后来身体被乌萨斯老公爵<b>科西切</b>占据，才把整合运动变成了屠城的工具。她和龙门警官<b>陈</b>是失散的姐妹。</p></div>" +
      "<h2>主线 · 整合运动篇</h2><div class='grid'>" + mains + "</div>" +
      "<h2>重要支线</h2><div class='grid'>" + sides + "</div>";
  }

  function world() {
    return '<div class="kicker">START HERE</div><h1>世界观速览</h1><p class="lead">读主线之前，只需要知道这些。</p>' +
      A.WORLD.map(function (w) { return '<div class="panel"><h3>' + esc(w.t) + "</h3><p>" + w.p.join("</p><p>") + "</p></div>"; }).join("") +
      '<div class="pager"><a href="#/"><small>上一页</small>首页</a><a class="r" href="#/people"><small>下一页</small>人物关系</a></div>';
  }

  // graph layout (viewBox 900 x 640)
  var POS = {
    theresa: [150, 80], w: [400, 70], kaltsit: [90, 230], doctor: [270, 210], amiya: [210, 360],
    wei: [500, 200], chen: [450, 360], talulah: [660, 330], kashchey: [790, 170], alina: [800, 420],
    patriot: [640, 520], frostnova: [430, 560], mephisto: [770, 590], faust: [860, 520],
    skull: [210, 560], misha: [90, 480]
  };
  var LTYPE = { ally: ["var(--l-ally)", "盟友 / 同伴"], enemy: ["var(--l-enemy)", "敌对"], family: ["var(--l-family)", "亲人 / 养育"], complex: ["var(--l-complex)", "复杂"] };

  function graphSVG() {
    var edges = "", labels = "", nodes = "";
    A.LINKS.forEach(function (l, i) {
      var a = POS[l[0]], b = POS[l[1]]; if (!a || !b) return;
      var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      edges += '<line class="edge' + (l[3] === "complex" ? " dash" : "") + '" data-e="' + i + '" data-a="' + l[0] + '" data-b="' + l[1] + '" x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="' + LTYPE[l[3]][0] + '"/>';
      labels += '<text class="elabel" data-a="' + l[0] + '" data-b="' + l[1] + '" x="' + mx + '" y="' + (my - 6) + '">' + esc(l[2].length > 14 ? l[2].slice(0, 14) + "…" : l[2]) + "</text>";
    });
    Object.keys(POS).forEach(function (id) {
      var p = P[id], xy = POS[id];
      var r = (id === "doctor" || id === "amiya" || id === "talulah" || id === "chen") ? 17 : 13;
      nodes += '<g class="node" data-id="' + id + '" tabindex="0" role="button" aria-label="' + esc(p.n) + '"><circle cx="' + xy[0] + '" cy="' + xy[1] + '" r="' + r + '" fill="' + fcolor(p.f) + '"/><text x="' + xy[0] + '" y="' + (xy[1] + r + 17) + '">' + esc(p.n.replace(/（.*）/, "")) + "</text></g>";
    });
    return '<svg class="graph" viewBox="0 0 900 640" role="img" aria-label="前八章核心人物关系图">' + edges + nodes + labels + "</svg>";
  }

  function relsOf(id) {
    return A.LINKS.filter(function (l) { return l[0] === id || l[1] === id; }).map(function (l) {
      var other = l[0] === id ? l[1] : l[0];
      return "<li>↔ <b>" + esc(P[other].n) + "</b>：" + esc(l[2]) + "</li>";
    }).join("");
  }

  function people() {
    var legend = '<div class="legend">' +
      Object.keys(A.FACTIONS).map(function (k) { return '<span><i class="dot" style="background:' + A.FACTIONS[k].color + '"></i>' + A.FACTIONS[k].name + "</span>"; }).join("") +
      "</div><div class='legend'>" +
      Object.keys(LTYPE).map(function (k) { return '<span><i style="background:' + LTYPE[k][0] + '"></i>' + LTYPE[k][1] + "</span>"; }).join("") + "</div>";
    var groups = ["rhodes", "lungmen", "reunion", "ursus", "merc", "babel"].map(function (f) {
      var list = A.PEOPLE.filter(function (p) { return p.f === f; });
      if (!list.length) return "";
      return "<h2>" + A.FACTIONS[f].name + '</h2><p class="lead" style="font-size:15px">' + esc(A.FACTIONS[f].desc) + '</p><div class="people-list">' +
        list.map(function (p) {
          var r = relsOf(p.id);
          return '<div class="person" id="p-' + p.id + '" style="--fc:' + fcolor(p.f) + '"><span class="nm">' + esc(p.n) + '</span><span class="tg">' + esc(p.tag) + "</span><p>" + esc(p.d) + "</p>" + (r ? '<ul class="rel-list">' + r + "</ul>" : "") + "</div>";
        }).join("") + "</div>";
    }).join("");
    return '<div class="kicker">WHO IS WHO</div><h1>人物关系</h1><p class="lead">点击图中的人名，高亮他和别人的关系。下方是按阵营分组的人物卡。<b>注意：这一页包含前八章的关键剧透。</b></p>' +
      legend + '<div class="graph-wrap">' + graphSVG() + '</div><div class="panel info" id="info"><p style="color:var(--muted)">← 点击图中任意人物查看介绍</p></div>' + groups;
  }

  function chapter(id) {
    var i = A.MAIN.findIndex(function (c) { return c.id === id; });
    if (i < 0) return notFound();
    var c = A.MAIN[i], prev = A.MAIN[i - 1], next = A.MAIN[i + 1];
    return '<div class="kicker">主线 · 整合运动篇</div><h1><span class="tag-main">' + c.no + "</span>" + esc(c.title) + '</h1><p class="lead">' + esc(c.sub) + "</p>" +
      '<div class="meta"><span>📍 ' + esc(c.place) + "</span><span>原作关卡：" + c.id.replace("ch", "") + "-x</span></div>" +
      '<div class="tldr"><div class="lbl">一句话</div>' + esc(c.tldr) + "</div>" +
      '<h3>本章登场（点名字看介绍）</h3><div class="cast">' + c.cast.map(chip).join("") + "</div>" +
      '<h2>故事</h2>' + storyHTML(c.id, c.story) + prtsLink(c.id) +
      '<h2>这章你需要知道</h2><div class="panel"><ul class="know"><li>' + c.know.join("</li><li>") + "</li></ul></div>" +
      '<div class="pager">' +
      (prev ? '<a href="#/main/' + prev.id + '"><small>上一章</small>' + prev.no + " " + esc(prev.title) + "</a>" : '<a href="#/world"><small>上一页</small>世界观</a>') +
      (next ? '<a class="r" href="#/main/' + next.id + '"><small>下一章</small>' + next.no + " " + esc(next.title) + "</a>" : '<a class="r" href="#/side"><small>接下来</small>重要支线</a>') +
      "</div>";
  }

  function sideIndex() {
    return '<div class="kicker">SIDE STORIES</div><h1>重要支线</h1><p class="lead">支线是独立的活动剧情，每篇讲一个国家或一组人物。下面这六篇和主线的世界观关系最紧，建议读完主线第0–8章后再看。</p>' +
      '<div class="grid">' + A.SIDE.map(function (s) {
        return '<a class="card" href="#/side/' + s.id + '"><div class="no">' + esc(s.place) + " · " + esc(s.when) + '</div><div class="tt">' + esc(s.title) + '</div><div class="ds">' + esc(s.tldr) + "</div></a>";
      }).join("") + "</div>";
  }

  function side(id) {
    var i = A.SIDE.findIndex(function (s) { return s.id === id; });
    if (i < 0) return notFound();
    var s = A.SIDE[i], prev = A.SIDE[i - 1], next = A.SIDE[i + 1];
    return '<div class="kicker">SIDE STORY</div><h1><span class="tag-side">支线</span>' + esc(s.title) + '</h1><p class="lead">' + esc(s.why) + "</p>" +
      '<div class="meta"><span>📍 ' + esc(s.place) + "</span><span>🕒 " + esc(s.when) + "</span></div>" +
      '<div class="tldr"><div class="lbl">一句话</div>' + esc(s.tldr) + "</div>" +
      '<div class="panel"><b>主要人物：</b>' + esc(s.cast) + "</div>" +
      '<h2>故事</h2>' + storyHTML(s.id, s.story) + prtsLink(s.id) +
      '<h2>读懂这篇的关键</h2><div class="panel"><ul class="know"><li>' + s.know.join("</li><li>") + "</li></ul></div>" +
      '<div class="pager">' +
      (prev ? '<a href="#/side/' + prev.id + '"><small>上一篇</small>' + esc(prev.title) + "</a>" : '<a href="#/side"><small>返回</small>支线目录</a>') +
      (next ? '<a class="r" href="#/side/' + next.id + '"><small>下一篇</small>' + esc(next.title) + "</a>" : '<a class="r" href="#/glossary"><small>最后</small>名词表</a>') +
      "</div>";
  }

  function glossary() {
    return '<div class="kicker">GLOSSARY</div><h1>名词表</h1><p class="lead">读剧情时碰到不懂的词，来这里查。</p><div class="panel"><dl class="gl">' +
      A.GLOSSARY.map(function (g) { return "<dt>" + esc(g[0]) + "</dt><dd>" + esc(g[1]) + "</dd>"; }).join("") + "</dl></div>";
  }

  function notFound() { return '<h1>找不到这一页</h1><p><a href="#/">回到首页</a></p>'; }

  // ---------- person popup ----------
  var pop = document.createElement("div");
  pop.className = "pop";
  pop.innerHTML = '<div class="panel" role="dialog" aria-modal="true"><button class="x" aria-label="关闭">×</button><div class="pc"></div></div>';
  document.body.appendChild(pop);
  function showPerson(id) {
    var p = P[id]; if (!p) return;
    var r = relsOf(id);
    pop.querySelector(".pc").innerHTML = '<div class="person" style="--fc:' + fcolor(p.f) + ';box-shadow:none;border-left:0;border-right:0;border-bottom:0;padding:8px 0 0"><span class="nm">' + esc(p.n) + '</span><span class="tg">' + esc((A.FACTIONS[p.f] || {}).name || "") + " · " + esc(p.tag) + "</span><p>" + esc(p.d) + "</p>" + (r ? '<ul class="rel-list">' + r + "</ul>" : "") + '<p><a href="#/people" data-close>在人物关系页查看 →</a></p></div>';
    pop.classList.add("open");
    pop.querySelector(".x").focus();
  }
  pop.addEventListener("click", function (e) {
    if (e.target === pop || e.target.classList.contains("x") || e.target.hasAttribute("data-close")) pop.classList.remove("open");
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") pop.classList.remove("open"); });

  // ---------- graph interaction ----------
  function bindGraph() {
    var svg = app.querySelector(".graph"); if (!svg) return;
    var info = document.getElementById("info");
    function focus(id) {
      svg.classList.add("focus");
      var linked = { }; linked[id] = 1;
      svg.querySelectorAll(".edge, .elabel").forEach(function (e) {
        var hit = e.getAttribute("data-a") === id || e.getAttribute("data-b") === id;
        e.classList.toggle("hi", hit);
        if (hit) { linked[e.getAttribute("data-a")] = 1; linked[e.getAttribute("data-b")] = 1; }
      });
      svg.querySelectorAll(".node").forEach(function (n) { n.classList.toggle("hi", !!linked[n.getAttribute("data-id")]); });
      var p = P[id];
      info.innerHTML = '<h3 style="color:' + fcolor(p.f) + '">' + esc(p.n) + ' <span style="font-size:13px;color:var(--muted);font-weight:400">' + esc(p.tag) + "</span></h3><p>" + esc(p.d) + '</p><ul class="rel-list">' + relsOf(id) + "</ul>";
    }
    svg.querySelectorAll(".node").forEach(function (n) {
      n.addEventListener("click", function (e) { e.stopPropagation(); focus(n.getAttribute("data-id")); });
      n.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); focus(n.getAttribute("data-id")); } });
    });
    svg.addEventListener("click", function () { svg.classList.remove("focus"); });
  }

  // ---------- router ----------
  function route() {
    var h = location.hash || "#/";
    var parts = h.replace(/^#\/?/, "").split("/");
    var html;
    switch (parts[0]) {
      case "": html = home(); break;
      case "world": html = world(); break;
      case "people": html = people(); break;
      case "main": html = chapter(parts[1] || "ch0"); break;
      case "side": html = parts[1] ? side(parts[1]) : sideIndex(); break;
      case "glossary": html = glossary(); break;
      default: html = notFound();
    }
    app.innerHTML = html;
    renderNav(h);
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    pop.classList.remove("open");
    window.scrollTo(0, 0);
    bindGraph();
    var t = A.MAIN.concat(A.SIDE).find(function (x) { return x.id === parts[1]; });
    document.title = (t ? t.title + " · " : "") + "方舟剧情白话版";
  }

  app.addEventListener("click", function (e) {
    var c = e.target.closest("[data-person]");
    if (c) showPerson(c.getAttribute("data-person"));
  });
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  window.addEventListener("hashchange", route);
  route();
})();
