"use strict";
const $ = (s) => document.querySelector(s);

/* ===== puzzle files ===== */
const FILES = [
  {
    id: "f1", num: "01", title: "色の鍵", piece: "わ",
    riddle: "本編の記録で、双子のプロフィールにはテーマカラーが小さく記されている（THEME — #......）。姉と妹、2人の色コードから「数字だけ」を拾い、姉→妹の順に並べよ。",
    answers: ["69238"],
    hints: [
      "本編でアルマとノエルのプロフィールをそれぞれ開いてみて。",
      "色コードは、プロフィールのセリフの上に小さく「THEME — #」と書かれている。",
      "姉は #A6D923、妹は #B8CDEB。文字を除いて数字だけを並べると、6・9・2・3・8。"
    ],
    rewardTitle: "復元された記録 I — 序文と生成",
    reward: "『存在した証は、残像として残り続ける。』この場所は、双子の姉妹の記録を守っていた。姉はアルマ、妹はノエル。\n双子は「生成」された存在だった。世界の象徴である蝶の力を、二人で分け合って生まれた。力は一人分。それを二人で分け合う。それが、すべての始まりだった。"
  },
  {
    id: "f2", num: "02", title: "声の鍵", piece: "す",
    riddle: "本編のセリフ集（QUOTES）を開け。登録された4人のセリフの「最初の一文字」（「を除く）を、記録番号の順（001→004）に並べよ。",
    answers: ["わね今も", "わねこも"],
    hints: [
      "セリフ集は、本編のメニューの04番。",
      "一人目、詩織のセリフは「わ」から始まる。二人目は茨薔薇。",
      "順に並べると——わ・ね・今・も。"
    ],
    rewardTitle: "復元された記録 II — 愛された頃と、力の差",
    reward: "幼い頃、蝶を生み出す力に優れていたのは妹のノエルだった。彼女の周りにはいつも蝶が舞い、人は彼女を愛した。姉のアルマはいつもその隣にいた。\nしかし成長するにつれ、力は釣り合いを失っていった。アルマの鱗粉は鮮やかに色づき、ノエルの蝶は透明になっていった。分け合ったはずの力は、いつしか一人に集まっていった。誰のせいでもない。でも、確かに何かが壊れ始めた。"
  },
  {
    id: "f3", num: "03", title: "番号の鍵", piece: "れ",
    riddle: "本編のメニューを開け。各画面には番号が振られている。「封印記録の番号 − 手配書の番号 + 世界の番号」を計算せよ。",
    answers: ["12"],
    hints: [
      "本編の右上のMENUを開くと、各画面に番号が見える。",
      "封印記録は08、手配書は02、世界は06。",
      "8 − 2 + 6 = ？"
    ],
    rewardTitle: "復元された記録 III — 花と、最後の蝶",
    reward: "ノエルは花が好きだった。静かな場所と、花と、蝶。廃墟の温室には、今も新しい花が供えられている。アルマが通っているのだ。\n標本箱の奥には、一匹の蝶。『ノエルが最後に生んだ蝶。もう飛べないけれど、捨てられなかった。』ラベルは姉の震えた字だった。力が消えていく妹の最後の証を、姉はこうして残した。"
  },
  {
    id: "f4", num: "04", title: "印の鍵", piece: "な",
    riddle: "本編の4つの画面——セリフ集、画廊、世界、概要——の片隅に、小さな数字の「印」が1つずつ刻まれている。印を、メニューの番号順（04→05→06→09）に読め。",
    answers: ["3142"],
    hints: [
      "印は各画面の一番下、フッターの近くにある。とても小さい。",
      "セリフ集の印は「3」、画廊の印は「1」。",
      "世界の印は「4」、概要の印は「2」。読む順番はメニューの番号順。"
    ],
    rewardTitle: "復元された記録 IV — ベッドと、視線",
    reward: "双子の部屋には、ベッドが二つ並んでいる。片方は埃をかぶり、ノエルのベッドだけが今も整えられている。帰るはずのない場所を、帰れる場所のままにするために、アルマは片付け続けている。\nノエルの力が衰えると、周囲は彼女を遠ざけるようになった。視線が冷たくなり、声が届かなくなった。アルマは止められなかった。伝えるべき言葉を、伝えられなかった。"
  },
  {
    id: "f5", num: "05", title: "好みの鍵", piece: "い",
    riddle: "本編のプロフィールで、姉妹それぞれの「好きなもの」に挙げられた項目の数を数え、2人の数を掛け算せよ。（項目は「、」で区切られている）",
    answers: ["25"],
    hints: [
      "アルマとノエル、2人のプロフィールの「好きなもの」欄を見る。",
      "姉の好きなものは5つ。妹は——数えてみて。",
      "5 × 5 = ？"
    ],
    rewardTitle: "復元された記録 V — 書きかけの手紙",
    reward: "鍵のかかった引き出しの中には、書きかけの手紙が何通も入っていた。全部、同じ書き出し。全部、途中で終わっている。\n『今度こそ、あなたに好きだと伝えたい。』\n強い自分から好意を伝えることが、悔しかった。照れくさかった。プライドが邪魔をした。そうして伝えられないまま、3年前の日が来てしまった。手紙は、今も宛先を失ったまま眠っている。"
  },
  {
    id: "f6", num: "06", title: "設計図の鍵", piece: "で",
    riddle: "この廃墟の設計図は、GitHubに保管されている。リポジトリ「fragment」を開き、その説明文を読め。最後の問いが、そこに書かれている。",
    answers: ["ノエル", "のえる", "NOEL"],
    hints: [
      "github.com/2525582/fragment を開いて。",
      "リポジトリの説明文は、ページ右側の「About」欄にある。",
      "答えは、蝶の力を失い、忘れられた妹の名前。"
    ],
    rewardTitle: "復元された記録 VI — 止まった時間と、声",
    reward: "階段の時計は、3年前の日付で止まっている。ノエルが死んだ日だ。伝えられなかった言葉が一つある限り、アルマの中で時間はあの日から進んでいない。\n壁には小さな文字。『もう、誰も私を見ていない。』\n——見ている。ずっと、誰かが彼女を見ていた。集めた文字が、最後の鍵になる。"
  }
];
const FINAL_ANSWERS = ["わすれないで", "ワスレナイデ"];

/* ===== state ===== */
const solvedSet = new Set(JSON.parse(localStorage.getItem("fragment2-solved") || "[]"));
const hintState = JSON.parse(localStorage.getItem("fragment2-hints") || "{}");
let finalSolved = localStorage.getItem("fragment2-final") === "1";
function saveState() {
  localStorage.setItem("fragment2-solved", JSON.stringify([...solvedSet]));
  localStorage.setItem("fragment2-hints", JSON.stringify(hintState));
  localStorage.setItem("fragment2-final", finalSolved ? "1" : "0");
}
function normalize(v) { return v.trim().replace(/[\s　]+/g, ""); }

/* ===== screens ===== */
const introScreen = $("#introScreen"), boardScreen = $("#boardScreen");
function setScreen(target) {
  [introScreen, boardScreen].forEach((s) => {
    const on = s === target;
    s.classList.toggle("is-active", on);
    s.setAttribute("aria-hidden", on ? "false" : "true");
  });
  window.scrollTo({ top: 0 });
}
function updateCount() {
  const c2 = (typeof solved2 !== "undefined" && solved2) ? solved2.size : 0;
  $("#fragCount").textContent = `SOLVED ${solvedSet.size + c2} / ${FILES.length + 4}`;
}

/* ===== board ===== */
function renderBoard() {
  const list = $("#fileList");
  list.innerHTML = "";
  FILES.forEach((file) => {
    const solved = solvedSet.has(file.id);
    const card = document.createElement("article");
    card.className = "file-card" + (solved ? " is-solved" : "");
    const hintsShown = hintState[file.id] || 0;
    let inner = `
      <div class="file-head">
        <span class="file-tag">FILE ${file.num}</span>
        <h3 class="file-title">${file.title}</h3>
        <span class="file-status">${solved ? `SOLVED — 導出文字「${file.piece}」` : "未解決"}</span>
      </div>
      <p class="file-riddle">${file.riddle}</p>`;
    if (solved) {
      inner += `<div class="reward"><p class="reward-tag">STORY RESTORED</p><h4>${file.rewardTitle}</h4><p class="reward-body">${file.reward}</p></div>`;
    } else {
      inner += `<div class="hint-area">`;
      for (let i = 0; i < hintsShown; i++) inner += `<p class="hint-line">ヒント${i + 1}：${file.hints[i]}</p>`;
      inner += `</div>
      <div class="file-actions">
        ${hintsShown < file.hints.length ? `<button class="ghost-button" data-hint="${file.id}" type="button">ヒントを見る（${hintsShown} / ${file.hints.length}）</button>` : ""}
      </div>
      <div class="gate-form">
        <input type="text" placeholder="答えを入力" autocomplete="off" spellcheck="false" data-input="${file.id}">
        <button type="button" data-solve="${file.id}">判定</button>
      </div>
      <p class="gate-msg" data-msg="${file.id}"></p>`;
    }
    card.innerHTML = inner;
    list.appendChild(card);
  });
  list.querySelectorAll("[data-hint]").forEach((btn) => btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-hint");
    hintState[id] = Math.min((hintState[id] || 0) + 1, 3);
    saveState(); renderBoard();
  }));
  list.querySelectorAll("[data-solve]").forEach((btn) => btn.addEventListener("click", () => trySolve(btn.getAttribute("data-solve"))));
  list.querySelectorAll("[data-input]").forEach((inp) => inp.addEventListener("keydown", (e) => { if (e.key === "Enter") trySolve(inp.getAttribute("data-input")); }));
  renderFinal();
  if (typeof renderCase2 === "function") renderCase2();
  updateCount();
}
function trySolve(id) {
  const file = FILES.find((f) => f.id === id);
  const input = document.querySelector(`[data-input="${id}"]`);
  const msg = document.querySelector(`[data-msg="${id}"]`);
  if (!file || !input) return;
  const v = normalize(input.value);
  const ok = file.answers.some((a) => normalize(a) === v || normalize(a).toUpperCase() === v.toUpperCase());
  if (ok) {
    solvedSet.add(id);
    saveState();
    document.body.classList.add("eroding");
    window.setTimeout(() => document.body.classList.remove("eroding"), 240);
    renderBoard();
  } else if (msg) {
    msg.textContent = "違うようだ。手がかりを、もう一度確かめて。";
  }
}

/* ===== final ===== */
function renderFinal() {
  const slots = $("#pieceSlots");
  slots.innerHTML = "";
  FILES.forEach((file) => {
    const span = document.createElement("span");
    span.className = "piece-slot" + (solvedSet.has(file.id) ? " is-got" : "");
    span.textContent = solvedSet.has(file.id) ? file.piece : "？";
    slots.appendChild(span);
  });
  $("#finalForm").style.display = finalSolved ? "none" : "";
  $("#finalMsg").textContent = finalSolved ? "最後の鍵は、もう開かれている。" : "";
  $("#replayEnding").hidden = !finalSolved;
}
function tryFinal() {
  const v = normalize($("#finalInput").value);
  const ok = FINAL_ANSWERS.some((a) => normalize(a) === v);
  if (ok) {
    finalSolved = true; saveState(); renderFinal();
    playEnding();
  } else {
    $("#finalMsg").textContent = "鍵が違う。集めた文字を、順に並べて。";
  }
}
$("#finalButton").addEventListener("click", tryFinal);
$("#finalInput").addEventListener("keydown", (e) => { if (e.key === "Enter") tryFinal(); });

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
});
$("#replayEnding").addEventListener("click", playEnding);

/* ===== nav ===== */
$("#enterButton").addEventListener("click", () => { renderBoard(); setScreen(boardScreen); });
$("#brandHome").addEventListener("click", (e) => { e.preventDefault(); setScreen(introScreen); });
$("#resetButton").addEventListener("click", () => {
  solvedSet.clear();
  Object.keys(hintState).forEach((k) => delete hintState[k]);
  finalSolved = false;
  if (typeof resetCase2 === "function") resetCase2();
  saveState(); renderBoard();
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

updateCount();

/* ===== CASE 2 — 残された記録 (v3) ===== */
var FILES2 = [
  {
    id: "f7", num: "07", title: "文書の鍵", piece: "あ",
    riddle: "本編の設計図（GitHubのリポジトリ「afterimage」）を開け。最初に表示される文書（README）の「管理メモ — 保管の心得」には4つの文がある。その頭文字を、順に並べよ。",
    answers: ["すきだよ", "スキダヨ"],
    hints: [
      "github.com/2525582/afterimage を開いて。",
      "READMEは、リポジトリのトップにそのまま表示されている。「管理メモ」の4つの文を見て。",
      "頭文字は——す・き・だ・よ。"
    ],
    rewardTitle: "復元された記録 VII — 管理メモの私信",
    reward: "本編の設計図に紛れた管理メモ。その4行は、業務連絡の顔をした私信だった。\nすべての記録は薄い。気づけば人は忘れる。だから彼女は、誰にも見られない場所に本音を置いた。行の頭にだけ、想いを隠して。\n『すきだよ』——3年前に言えなかった言葉は、こんな形で今も保管され続けている。"
  },
  {
    id: "f8", num: "08", title: "記録の鍵", piece: "え",
    riddle: "この廃墟には、記録データ「log_all.txt」が残されている（このページの隅に、ファイル名だけが残っている）。ダウンロードして開き、「声」についての行を探せ。その行に記されたキーワードが答えだ。",
    answers: ["しろいはな", "シロイハナ"],
    hints: [
      "ファイルは、調査ファイルのページの下部にある「log_all.txt」というリンクから落とせる。",
      "約180行ある。開いて「声」で検索すると、1行だけ見つかる。",
      "キーワードは『しろいはな』。"
    ],
    rewardTitle: "復元された記録 VIII — 白い花",
    reward: "膨大な記録データの海。その137番目の行にだけ、声の記録があった。キーワードは『しろいはな』。\nノエルが好きだった、白い花。温室に供えられる花が白いのは、偶然ではない。アルマは覚えている。妹の好きだったものを、一つ残らず。\n忘れていたのは、世界のほうだった。"
  },
  {
    id: "f9", num: "09", title: "対話の鍵", piece: "た", special: "door",
    riddle: "記録のどこにも載っていない扉がある。入口は、本編の概要（ABOUT）の隅に、ファイル名の姿で残されている。扉の鍵は、FILE 07で手に入れた言葉。扉の向こうで彼女と話し、声の欠片を受け取れ。",
    answers: [],
    hints: [
      "本編ABOUTの関連記録の近くに「unlogged_door.html」という小さな文字がある。",
      "扉のパスワードは、文書の鍵（FILE 07）の答えそのもの。",
      "彼女の問いに、彼女の記録どおりに答えること。彼女が好きだったのは、静かな場所と、花。"
    ],
    rewardTitle: "復元された記録 IX — 扉の向こうの声",
    reward: "記録のどこにも載っていない扉。その向こうで、彼女は待っていた。\n『もう、誰も私を見ていない』——そう言った彼女に、あなたは答えた。忘れていない、と。好きだったものを覚えている、と。\n彼女は笑ったかどうか分からない。ただ、声の欠片を置いて、静かに消えた。"
  },
  {
    id: "f10", num: "10", title: "黒塗りの鍵", piece: "ね",
    riddle: "黒塗りの記録が3つある。1つはこのCASE 2の説明文の中、2つ目は本編の世界（WORLD）の終わり、3つ目は本編の概要（ABOUT）の終わり。黒塗りを押して開き、隠れた文字を FRAGMENT → WORLD → ABOUT の順に並べよ。",
    answers: ["とびら", "トビラ"],
    hints: [
      "黒塗りはクリック（タップ）で開く。まず、このページのCASE 2の説明文の中を探して。",
      "本編のWORLDとABOUTの一番下のほうにも、同じ黒塗りがある。",
      "並べると——と・び・ら。"
    ],
    rewardTitle: "復元された記録 X — 黒塗りの意味",
    reward: "黒塗りは、隠すためのものではなかった。守るためのものだった。\n大切な言葉ほど、世界は簡単に踏みにじる。だから3つに分けて、別々の場所に眠らせた。集めた者だけが、その名を呼べるように。\n『とびら』。声の欠片と、その名を呼ぶ資格を、あなたは手に入れた。"
  }
];
var FINAL2_ANSWERS = ["あえたね", "アエタネ"];
var solved2 = new Set(JSON.parse(localStorage.getItem("fragment3-solved") || "[]"));
var hintState2 = JSON.parse(localStorage.getItem("fragment3-hints") || "{}");
var final2Solved = localStorage.getItem("fragment3-final") === "1";
function saveState2() {
  localStorage.setItem("fragment3-solved", JSON.stringify([...solved2]));
  localStorage.setItem("fragment3-hints", JSON.stringify(hintState2));
  localStorage.setItem("fragment3-final", final2Solved ? "1" : "0");
}
function renderCase2() {
  const list = $("#fileList2");
  if (!list) return;
  list.innerHTML = "";
  FILES2.forEach((file) => {
    const solved = solved2.has(file.id);
    const card = document.createElement("article");
    card.className = "file-card" + (solved ? " is-solved" : "");
    const hintsShown = hintState2[file.id] || 0;
    let inner = `
      <div class="file-head">
        <span class="file-tag">FILE ${file.num}</span>
        <h3 class="file-title">${file.title}</h3>
        <span class="file-status">${solved ? `SOLVED — 導出文字「${file.piece}」` : "未解決"}</span>
      </div>
      <p class="file-riddle">${file.riddle}</p>`;
    if (solved) {
      inner += `<div class="reward"><p class="reward-tag">STORY RESTORED</p><h4>${file.rewardTitle}</h4><p class="reward-body">${file.reward}</p></div>`;
    } else {
      inner += `<div class="hint-area">`;
      for (let i = 0; i < hintsShown; i++) inner += `<p class="hint-line">ヒント${i + 1}：${file.hints[i]}</p>`;
      inner += `</div>
      <div class="file-actions">
        ${hintsShown < file.hints.length ? `<button class="ghost-button" data-hint2="${file.id}" type="button">ヒントを見る（${hintsShown} / ${file.hints.length}）</button>` : ""}
      </div>`;
      if (file.special === "door") {
        inner += `<div class="file-actions"><button class="ghost-button" data-doorcheck="${file.id}" type="button">扉の記録を確認する</button></div>
        <p class="gate-msg" data-msg2="${file.id}"></p>`;
      } else {
        inner += `<div class="gate-form">
          <input type="text" placeholder="答えを入力" autocomplete="off" spellcheck="false" data-input2="${file.id}">
          <button type="button" data-solve2="${file.id}">判定</button>
        </div>
        <p class="gate-msg" data-msg2="${file.id}"></p>`;
      }
    }
    card.innerHTML = inner;
    list.appendChild(card);
  });
  list.querySelectorAll("[data-hint2]").forEach((btn) => btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-hint2");
    hintState2[id] = Math.min((hintState2[id] || 0) + 1, 3);
    saveState2(); renderCase2();
  }));
  list.querySelectorAll("[data-solve2]").forEach((btn) => btn.addEventListener("click", () => trySolve2(btn.getAttribute("data-solve2"))));
  list.querySelectorAll("[data-input2]").forEach((inp) => inp.addEventListener("keydown", (e) => { if (e.key === "Enter") trySolve2(inp.getAttribute("data-input2")); }));
  list.querySelectorAll("[data-doorcheck]").forEach((btn) => btn.addEventListener("click", () => {
    if (localStorage.getItem("fragment2-door") === "1") {
      solved2.add("f9"); saveState2();
      document.body.classList.add("eroding");
      window.setTimeout(() => document.body.classList.remove("eroding"), 240);
      renderCase2(); updateCount();
    } else {
      const msg = document.querySelector('[data-msg2="f9"]');
      if (msg) msg.textContent = "まだ、彼女の声は届いていない。扉は、本編のABOUTの隅にある。";
    }
  }));
  renderFinal2();
  updateCount();
}
function trySolve2(id) {
  const file = FILES2.find((f) => f.id === id);
  const input = document.querySelector(`[data-input2="${id}"]`);
  const msg = document.querySelector(`[data-msg2="${id}"]`);
  if (!file || !input) return;
  const v = normalize(input.value);
  const ok = file.answers.some((a) => normalize(a) === v);
  if (ok) {
    solved2.add(id);
    saveState2();
    document.body.classList.add("eroding");
    window.setTimeout(() => document.body.classList.remove("eroding"), 240);
    renderCase2();
  } else if (msg) {
    msg.textContent = "違うようだ。手がかりを、もう一度確かめて。";
  }
}
function renderFinal2() {
  const slots = $("#pieceSlots2");
  if (!slots) return;
  slots.innerHTML = "";
  FILES2.forEach((file) => {
    const span = document.createElement("span");
    span.className = "piece-slot" + (solved2.has(file.id) ? " is-got" : "");
    span.textContent = solved2.has(file.id) ? file.piece : "？";
    slots.appendChild(span);
  });
  $("#finalForm2").style.display = final2Solved ? "none" : "";
  $("#finalMsg2").textContent = final2Solved ? "もう一つの鍵は、もう開かれている。" : "";
  $("#replayEnding2").hidden = !final2Solved;
}
function tryFinal2() {
  const v = normalize($("#finalInput2").value);
  const ok = FINAL2_ANSWERS.some((a) => normalize(a) === v);
  if (ok) {
    final2Solved = true; saveState2(); renderFinal2();
    playEnding2();
  } else {
    $("#finalMsg2").textContent = "鍵が違う。集めた文字を、順に並べて。";
  }
}
function playEnding2() {
  const overlay = $("#endingOverlay2");
  if (!overlay) return;
  overlay.hidden = false;
  overlay.classList.remove("playing");
  void overlay.offsetWidth;
  overlay.classList.add("playing");
}
function resetCase2() {
  solved2.clear();
  Object.keys(hintState2).forEach((k) => delete hintState2[k]);
  final2Solved = false;
  localStorage.removeItem("fragment2-door");
  saveState2();
}
var fb2 = $("#finalButton2");
if (fb2) fb2.addEventListener("click", tryFinal2);
var fi2 = $("#finalInput2");
if (fi2) fi2.addEventListener("keydown", (e) => { if (e.key === "Enter") tryFinal2(); });
var ec2 = $("#endingClose2");
if (ec2) ec2.addEventListener("click", () => {
  const overlay = $("#endingOverlay2");
  overlay.hidden = true; overlay.classList.remove("playing");
});
var re2 = $("#replayEnding2");
if (re2) re2.addEventListener("click", playEnding2);

/* ===== redactions ===== */
document.querySelectorAll("[data-redact]").forEach((el) => {
  el.addEventListener("click", () => el.classList.add("open"));
});

renderCase2();
updateCount();
