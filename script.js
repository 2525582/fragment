"use strict";
const $ = (s) => document.querySelector(s);

/* ===== story data ===== */
const AREAS = [
  {
    id: "entrance", num: "01", name: "崩れた入口", en: "RUINED ENTRANCE",
    desc: "かつて、記録を守るための場所があった。今は天井が崩れ、光も届かない。足元には瓦礫と、色を失った何かの破片。それでも——ここに残されたものは、まだ消えていない。",
    points: [
      { id: "sign", label: "落ちた看板", title: "FRAGMENT 01 — 序文", frag: true,
        body: "『存在した証は、残像として残り続ける。』\n看板には、そう刻まれていた。文字の半分は欠けている。\nこの場所は、双子の姉妹の記録を守っていたはずだった。姉の名前はアルマ。妹の名前はノエル。\n記録は朽ちても、残像は残る。それを確かめるために、あなたはここへ来た。" },
      { id: "board", label: "割れた表示板", title: "FRAGMENT 02 — 応答のない記録", frag: true,
        body: "表示板は割れ、文字がところどころ消えている。\n『04 RECORDS FOUND』\n『01 RECORD UNREACHABLE — 応答なし』\n4つの記録のうち、1つだけが応答をやめたまま。誰の記録なのか、表示板はもう教えてくれない。\nただ、応答がないことと、存在しないことは、違うはずだった。" },
      { id: "wing", label: "羽の落ちた場所", title: "調査 — 片羽", frag: false,
        body: "瓦礫の隙間に、蝶の羽が落ちていた。片方だけ。\n色はほとんど抜けているのに、縁のあたりにだけ、鮮やかな黄緑色が残っている。\nこの世界の象徴である「蝶」。その力を分け合った双子の、どちらの羽なのかは分からない。\n——いや、分かる気がした。この色は、姉の色だ。" }
    ]
  },
  {
    id: "archive", num: "02", name: "散らかった記録室", en: "SCATTERED ARCHIVE",
    desc: "記録の棚は倒れ、紙が床一面に散らばっている。誰かが荒らしたのではなく、時間に崩された部屋。踏むたびに、乾いた音がする。",
    points: [
      { id: "gen", label: "生成の記録", title: "FRAGMENT 03 — 生成", frag: true,
        body: "『双子は「生成」された存在である。世界の象徴である蝶の力を、二人で分け合って生まれた。』\nアルマとノエルは、普通の姉妹ではなかった。生まれた時から、この世界の要である蝶と結ばれていた。\n力は一人分。それを二人で分け合う。\nそれが、すべての始まりだった。" },
      { id: "child", label: "幼少期の記録", title: "FRAGMENT 04 — 愛されていた頃", frag: true,
        body: "幼い頃、蝶を生み出す力に優れていたのは、妹のノエルだった。\n彼女の周りにはいつも蝶が舞い、人は彼女を愛した。姉のアルマはいつもその隣にいて、二人は何をするにも一緒だった。\n『穏やかで、何不自由ない日々』——記録にはそうある。\nこの頃の二人の笑い声が、まだ部屋の隅に残っている気がした。" },
      { id: "memo", label: "小さなメモ", title: "調査 — 誰かのメモ", frag: false,
        body: "散らばった紙の中に、走り書きのメモがあった。\n『温室の扉は、蝶の力を分け合った人数で開く。数字を入れればいい。』\n誰が書いたのかは分からない。インクは古い。\n——温室は、この先にあるはずだ。" }
    ]
  },
  {
    id: "greenhouse", num: "03", name: "枯れた温室", en: "WITHERED GREENHOUSE",
    gate: { q: "蝶の力を分け合ったのは、何人？（数字で答えてください）", answers: ["2", "２"], msg: "違うようだ。メモの言葉を思い出して。" },
    desc: "ガラスは割れ、蔓が絡まり、花壇は枯れている。かつて蝶が舞った温室は、今は静まり返っている。それでも土の匂いと、花の気配だけが残っていた。",
    points: [
      { id: "flowers", label: "枯れた花壇", title: "FRAGMENT 05 — 花", frag: true,
        body: "ノエルは花が好きだった。静かな場所と、花と、蝶。\n枯れた花壇の脇に、新しい花が供えられている。こんな廃墟に、誰が——。\n答えは分かっている。アルマだ。彼女は今も、ここに通っている。\n供えられた花だけが、この温室で色を失っていない。" },
      { id: "scale", label: "色づく鱗粉", title: "FRAGMENT 06 — 力の差", frag: true,
        body: "ガラスの破片に、鱗粉が付着していた。片方は鮮やかに色づき、片方は透明に近い。\n成長するにつれ、蝶の力は釣り合いを失っていった。アルマの力は異常なほど育ち、ノエルの力は、静かに衰えていった。\n分け合ったはずの力は、いつしか一人に集まっていった。\n誰のせいでもない。でも、確かに何かが壊れ始めた。" },
      { id: "specimen", label: "標本箱", title: "FRAGMENT 07 — 最後の蝶", frag: true,
        body: "標本箱の奥に、一匹だけ蝶が収められていた。羽は透明に近く、光に透ける。\nラベルには震えた字で、こう書かれている。\n『ノエルが最後に生んだ蝶。もう飛べないけれど、捨てられなかった。』\n筆跡は、アルマのものだ。\n力が消えていく妹の、最後の証を、姉はこうして残した。" }
    ]
  },
  {
    id: "room", num: "04", name: "双子の部屋", en: "TWINS' ROOM",
    desc: "小さな部屋に、ベッドが二つ並んでいる。一方は崩れ、一方は——今も整えられている。誰かが、帰りを待つように。",
    points: [
      { id: "beds", label: "二つのベッド", title: "FRAGMENT 08 — 並んで眠った日々", frag: true,
        body: "幼い頃、二人はいつも並んで眠った。蝶の話、花の話、他愛のない話をして。\n片方のベッドは埃をかぶり、もう片方は綺麗に整えられている。整えられているのは、ノエルのベッドだ。\nアルマは今でも、この部屋を片付け続けている。\n帰るはずのない場所を、帰れる場所のままにするために。" },
      { id: "distance", label: "遠ざけられた日々", title: "FRAGMENT 09 — 視線", frag: true,
        body: "ノエルの力が衰えると、周囲は少しずつ彼女を遠ざけるようになった。視線が冷たくなり、声が届かなくなった。\nノエルは感情を表に出すことをやめた。誰かに期待することも、何かを望むことも。\nアルマは、止められなかった。力を持つ者として扱われる自分と、遠ざけられる妹。その間で、伝えるべき言葉を、伝えられなかった。\n引き出しには鍵がかかっている。鍵は——姉が妹に、最後まで伝えられなかった一言。" },
      { id: "drawer", label: "鍵のかかった引き出し", title: "FRAGMENT 10 — 書きかけの手紙", frag: true,
        gate: { q: "鍵は、姉が妹に伝えられなかった一言。引き出しに、その言葉を入れてください。", answers: ["すき", "スキ", "好き"], msg: "鍵は開かない。彼女の言葉を、思い出して。" },
        body: "引き出しの中には、書きかけの手紙が何通も入っていた。全部、同じ書き出し。全部、途中で終わっている。\n『今度こそ、あなたに好きだと伝えたい。』\n強い自分から好意を伝えることが、悔しかった。照れくさかった。プライドが邪魔をした。\nそうして伝えられないまま、3年前の日が来てしまった。\n手紙は、今も宛先を失ったまま、ここで眠っている。" }
    ]
  },
  {
    id: "stairway", num: "05", name: "止まった階段", en: "STOPPED STAIRWAY",
    desc: "最奥へ続く階段。途中から先は暗く、空気が冷たい。壁の時計は、針を止めたまま微動だにしない。",
    points: [
      { id: "clock", label: "止まった時計", title: "FRAGMENT 11 — 3年前", frag: true,
        body: "時計は、3年前の日付で止まっている。ノエルが死んだ日だ。\n記録によれば、彼女はもうこの世にいない。蝶の力を失い、周囲から忘れられ、静かに消えていった。\nでも、アルマは受け入れていない。受け入れられるはずがなかった。\n伝えられなかった言葉が一つある限り、彼女の中で時間は、あの日から進んでいない。" },
      { id: "graffiti", label: "壁の落書き", title: "FRAGMENT 12 — 声", frag: true,
        body: "階段の壁に、小さな文字が刻まれていた。\n『もう、誰も私を見ていない。』\n誰の字かは分からない。でも、この廃墟を歩いてきたあなたには、もう分かるはずだ。\n——見ている。ずっと、誰かが彼女を見ていた。\n最奥の扉が、かすかに光っている。集めた欠片が、道を示している。" }
    ]
  },
  {
    id: "deepest", num: "06", name: "最奥", en: "THE DEEPEST", deepest: true,
    desc: "欠片をすべて集めた者だけが辿り着ける、廃墟の最奥。暗闇の中で、透明な羽が、静かに光っていた。",
    points: []
  }
];
const TOTAL_FRAGS = AREAS.reduce((n, a) => n + a.points.filter((p) => p.frag).length, 0);

/* ===== state ===== */
const foundSet = new Set(JSON.parse(localStorage.getItem("fragment-found") || "[]"));
const gatesOpen = new Set(JSON.parse(localStorage.getItem("fragment-gates") || "[]"));
function saveState() {
  localStorage.setItem("fragment-found", JSON.stringify([...foundSet]));
  localStorage.setItem("fragment-gates", JSON.stringify([...gatesOpen]));
}
function normalizeAnswer(v) { return v.trim().toUpperCase().replace(/[\s　]+/g, ""); }

/* ===== screens ===== */
const introScreen = $("#introScreen"), mapScreen = $("#mapScreen"), areaScreen = $("#areaScreen");
let currentArea = null;
function setScreen(target) {
  [introScreen, mapScreen, areaScreen].forEach((s) => {
    const on = s === target;
    s.classList.toggle("is-active", on);
    s.setAttribute("aria-hidden", on ? "false" : "true");
  });
  window.scrollTo({ top: 0 });
}
function updateFragCount() {
  const t = `FRAGMENTS ${foundSet.size} / ${TOTAL_FRAGS}`;
  $("#fragCount").textContent = t;
  const m = $("#mapFragCount"); if (m) m.textContent = `${foundSet.size} / ${TOTAL_FRAGS}`;
}

/* ===== map ===== */
function renderMap() {
  const list = $("#areaList");
  list.innerHTML = "";
  AREAS.forEach((area) => {
    const frags = area.points.filter((p) => p.frag);
    const got = frags.filter((p) => foundSet.has(p.id)).length;
    const btn = document.createElement("button");
    btn.className = "area-card";
    let status;
    if (area.deepest) {
      const ready = foundSet.size >= TOTAL_FRAGS;
      status = ready ? "扉が開いている" : `封印 — 欠片 ${foundSet.size} / ${TOTAL_FRAGS}`;
      btn.classList.toggle("is-locked", !ready);
    } else if (area.gate && !gatesOpen.has(area.id)) {
      status = "鍵がかかっている";
      btn.classList.add("is-locked");
    } else if (frags.length && got === frags.length) {
      status = "探索完了";
      btn.classList.add("is-done");
    } else {
      status = `欠片 ${got} / ${frags.length}`;
    }
    btn.innerHTML = `<span class="area-num">AREA ${area.num}</span><span class="area-name">${area.name}<small>${area.en}</small></span><span class="area-status">${status}</span>`;
    btn.addEventListener("click", () => openArea(area));
    list.appendChild(btn);
  });
  updateFragCount();
}

/* ===== area ===== */
function openArea(area) {
  currentArea = area;
  if (area.deepest) {
    if (foundSet.size >= TOTAL_FRAGS) { playEnding(); return; }
  }
  $("#areaEyebrow").textContent = `AREA ${area.num} — ${area.en}`;
  $("#areaTitle").innerHTML = area.name;
  $("#areaNote").innerHTML = `${area.en}<br><span>欠片 ${area.points.filter((p) => foundSet.has(p.id) && p.frag).length} / ${area.points.filter((p) => p.frag).length}</span>`;
  $("#areaDesc").textContent = area.desc;
  $("#areaFooter").textContent = `AREA ${area.num}`;
  const gateBox = $("#gateBox");
  const body = $("#areaBody");
  if (area.gate && !gatesOpen.has(area.id)) {
    gateBox.hidden = false; body.hidden = true;
    $("#gateQ").textContent = area.gate.q;
    $("#gateMsg").textContent = "";
    $("#gateInput").value = "";
  } else {
    gateBox.hidden = true; body.hidden = false;
    renderPoints(area);
  }
  $("#pointPanel").hidden = true;
  setScreen(areaScreen);
}
function renderPoints(area) {
  const list = $("#pointList");
  list.innerHTML = "";
  area.points.forEach((point) => {
    const btn = document.createElement("button");
    btn.className = "point-item";
    const locked = point.gate && !gatesOpen.has(point.id);
    const found = foundSet.has(point.id);
    btn.innerHTML = `<span>${point.label}</span><span class="point-state">${locked ? "鍵" : found ? "FOUND" : "未調査"}</span>`;
    if (found) btn.classList.add("is-found");
    btn.addEventListener("click", () => openPoint(area, point));
    list.appendChild(btn);
  });
}
function openPoint(area, point) {
  const panel = $("#pointPanel");
  if (point.gate && !gatesOpen.has(point.id)) {
    panel.hidden = false;
    $("#pointTag").textContent = "LOCKED — 鍵がかかっている";
    $("#pointTitle").textContent = point.label;
    $("#pointBody").innerHTML = `${point.gate.q}<br><br><span class="inline-gate"><input id="drawerInput" type="text" placeholder="言葉を入力" autocomplete="off" spellcheck="false"><button id="drawerButton" type="button">開ける</button></span><br><span class="gate-msg" id="drawerMsg"></span>`;
    const tryDrawer = () => {
      const v = normalizeAnswer($("#drawerInput").value);
      const ok = point.gate.answers.some((a) => normalizeAnswer(a) === v);
      if (ok) { gatesOpen.add(point.id); saveState(); openPoint(area, point); renderPoints(area); }
      else { $("#drawerMsg").textContent = point.gate.msg; }
    };
    $("#drawerButton").addEventListener("click", tryDrawer);
    $("#drawerInput").addEventListener("keydown", (e) => { if (e.key === "Enter") tryDrawer(); });
    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return;
  }
  panel.hidden = false;
  $("#pointTag").textContent = point.frag ? (foundSet.has(point.id) ? "FRAGMENT — 回収済み" : "FRAGMENT — 欠片を回収した") : "INVESTIGATION — 調査記録";
  $("#pointTitle").textContent = point.title;
  $("#pointBody").textContent = point.body;
  if (point.frag && !foundSet.has(point.id)) {
    foundSet.add(point.id);
    saveState();
    document.body.classList.add("eroding");
    window.setTimeout(() => document.body.classList.remove("eroding"), 240);
  }
  updateFragCount();
  renderPoints(area);
  $("#areaNote").innerHTML = `${area.en}<br><span>欠片 ${area.points.filter((p) => foundSet.has(p.id) && p.frag).length} / ${area.points.filter((p) => p.frag).length}</span>`;
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
function tryAreaGate() {
  const area = currentArea;
  if (!area || !area.gate) return;
  const v = normalizeAnswer($("#gateInput").value);
  const ok = area.gate.answers.some((a) => normalizeAnswer(a) === v);
  if (ok) {
    gatesOpen.add(area.id); saveState();
    $("#gateBox").hidden = true; $("#areaBody").hidden = false;
    renderPoints(area);
  } else {
    $("#gateMsg").textContent = area.gate.msg;
  }
}
$("#gateButton").addEventListener("click", tryAreaGate);
$("#gateInput").addEventListener("keydown", (e) => { if (e.key === "Enter") tryAreaGate(); });

/* ===== ending ===== */
function playEnding() {
  const overlay = $("#endingOverlay");
  if (!overlay) return;
  overlay.hidden = false;
  overlay.classList.remove("playing");
  void overlay.offsetWidth;
  overlay.classList.add("playing");
}
$("#endingClose").addEventListener("click", () => {
  const overlay = $("#endingOverlay");
  overlay.hidden = true; overlay.classList.remove("playing");
  renderMap(); setScreen(mapScreen);
});

/* ===== nav ===== */
$("#enterButton").addEventListener("click", () => { renderMap(); setScreen(mapScreen); });
$("#brandHome").addEventListener("click", (e) => { e.preventDefault(); setScreen(introScreen); });
$("#areaBack").addEventListener("click", () => { renderMap(); setScreen(mapScreen); });
$("#resetButton").addEventListener("click", () => {
  foundSet.clear(); gatesOpen.clear(); saveState(); renderMap();
});

/* ===== atmosphere: dust + random glitch ===== */
const canvas = $("#dustCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let w, h, motes = [];
  const resize = () => { w = canvas.width = innerWidth; h = canvas.height = innerHeight; };
  resize(); addEventListener("resize", resize);
  for (let i = 0; i < 42; i++) motes.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.7 + 0.4, s: Math.random() * 0.00045 + 0.00012, d: Math.random() * 0.6 - 0.3 });
  (function tick() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(190,198,214,0.4)";
    motes.forEach((m) => { m.y -= m.s; m.x += m.d * 0.0006; if (m.y < -0.02) { m.y = 1.02; m.x = Math.random(); } ctx.beginPath(); ctx.arc(m.x * w, m.y * h, m.r, 0, 7); ctx.fill(); });
    requestAnimationFrame(tick);
  })();
}
window.setInterval(() => {
  if (Math.random() < 0.14) {
    document.body.classList.add("eroding");
    window.setTimeout(() => document.body.classList.remove("eroding"), 200);
  }
}, 7000);

updateFragCount();
