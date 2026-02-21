// 分手与挽回成功率分析逻辑

// 25道题目配置，每题包含题干、图标、选项与分值
const QUESTIONS = [
  {
    text: "你和前任在一起多久？",
    icon: "⏰",
    options: [
      { label: "少于6个月", score: 2 },
      { label: "6个月至1年", score: 3 },
      { label: "1年至3年", score: 4 },
      { label: "3年及以上", score: 5 },
    ],
    dimension: "承诺与投入",
  },
  {
    text: "分手的主要原因是什么？",
    icon: "💥",
    options: [
      { label: "沟通问题", score: 4 },
      { label: "不忠/背叛", score: 1 },
      { label: "不合适的目标或价值观", score: 2 },
      { label: "性格不合", score: 3 },
      { label: "外部压力（如家庭、工作等）", score: 4 },
      { label: "其他", score: 3 },
    ],
    dimension: "信任与价值观",
  },
  {
    text: "你们在分手前是否有过长时间的冷战或疏远？",
    icon: "🌙",
    options: [
      { label: "是，几个月或更长", score: 1 },
      { label: "有，但时间较短（几周内）", score: 2 },
      { label: "没有冷战，一直保持联系", score: 4 },
      { label: "不记得具体，但关系有些疏远", score: 2 },
    ],
    dimension: "沟通质量",
  },
  {
    text: "你们是否有过积极的沟通，解决过冲突或问题？",
    icon: "🗣️",
    options: [
      { label: "是，我们有过多次深入且有效的沟通", score: 5 },
      { label: "有过一些沟通，但未能彻底解决问题", score: 3 },
      { label: "很少沟通，问题一直没有得到解决", score: 1 },
    ],
    dimension: "沟通质量",
  },
  {
    text: "你现在对前任的情感状态如何？",
    icon: "💗",
    options: [
      { label: "依然深爱对方", score: 5 },
      { label: "有些思念，但已经开始放下", score: 4 },
      { label: "我感到冷漠或无所谓", score: 2 },
      { label: "有些怨恨或不满", score: 1 },
    ],
    dimension: "情感联结",
  },
  {
    text: "分手后你们是否保持联系？",
    icon: "📱",
    options: [
      { label: "是，频繁联系", score: 4 },
      { label: "偶尔联系", score: 3 },
      { label: "完全没有联系", score: 1 },
      { label: "只是偶尔发个信息", score: 2 },
    ],
    dimension: "沟通质量",
  },
  {
    text: "你是否有主动尝试过复合？",
    icon: "🤲",
    options: [
      { label: "是，我做了很多努力（例如道歉、改变自己等）", score: 5 },
      { label: "是，我做了一些努力（例如沟通或小改变）", score: 4 },
      { label: "没有，我没有主动去挽回", score: 2 },
      { label: "我只是等待对方主动", score: 3 },
    ],
    dimension: "行动与投入",
  },
  {
    text: "你的前任是否表达过想复合的意愿？",
    icon: "🔁",
    options: [
      { label: "是的，他们明确表示过想复合", score: 5 },
      { label: "他们没有直接说过，但有暗示", score: 4 },
      { label: "没有，完全没有表示复合的意思", score: 2 },
      { label: "不确定，有时他们表现得矛盾", score: 3 },
    ],
    dimension: "情感联结",
  },
  {
    text: "你们之间是否存在明显的信任问题？",
    icon: "🛡️",
    options: [
      { label: "是的，信任问题很严重", score: 1 },
      { label: "存在一些信任问题，但可以通过努力修复", score: 3 },
      { label: "信任问题不明显或已解决", score: 5 },
    ],
    dimension: "信任与价值观",
  },
  {
    text: "你是否认为自己还爱着前任？",
    icon: "❤️",
    options: [
      { label: "是，我依然深爱他们", score: 5 },
      { label: "我对他们仍有感情，但不确定是否是爱情", score: 4 },
      { label: "我不再爱他们", score: 2 },
      { label: "我对他们有些怨恨或消极情绪", score: 1 },
    ],
    dimension: "情感联结",
  },
  {
    text: "分手后是否有任何第三方（朋友、家人等）影响你们的关系？",
    icon: "🧭",
    options: [
      { label: "有，家人或朋友强烈干预了我们的关系", score: 2 },
      { label: "有些人试图劝说我们复合", score: 4 },
      { label: "没有，完全没有外界干涉", score: 5 },
      { label: "反而有些人劝我们分开", score: 1 },
    ],
    dimension: "外部支持",
  },
  {
    text: "你们的关系是否有明确的未来规划（如结婚、生子等）？",
    icon: "🛤️",
    options: [
      { label: "是，我们曾有共同的未来规划", score: 5 },
      { label: "我们曾讨论过，但没有具体的计划", score: 4 },
      { label: "没有，关系中缺少未来规划", score: 3 },
      { label: "我们有过分歧，未来规划完全不一致", score: 2 },
    ],
    dimension: "承诺与投入",
  },
  {
    text: "外部环境（如朋友、家庭、经济等）是否影响你们的关系？",
    icon: "🌐",
    options: [
      { label: "是，外部压力对我们的关系影响很大", score: 2 },
      { label: "一些外部因素对关系有一定影响", score: 4 },
      { label: "没有，关系完全是内部问题", score: 5 },
      { label: "外部因素没有造成太大影响", score: 5 },
    ],
    dimension: "外部支持",
  },
  {
    text: "你在关系中通常如何处理冲突？",
    icon: "🤔",
    options: [
      { label: "我会冷静下来并与伴侣讨论解决方案", score: 5 },
      { label: "我倾向于独自处理问题，避免情感依赖", score: 3 },
      { label: "我需要不断确认对方的感情，害怕被抛弃", score: 2 },
      { label: "我时常感到困惑，不知道该如何应对", score: 3 },
    ],
    dimension: "情绪调节",
  },
  {
    text: "在你们的关系中，是否有曾经的亲密感和激情？",
    icon: "🔥",
    options: [
      { label: "我们曾经非常亲密，互相吸引", score: 5 },
      { label: "我们有一定的亲密感和吸引力，但逐渐减少", score: 4 },
      { label: "我们的亲密感和激情基本消失", score: 2 },
      { label: "我们从未有过强烈的亲密感和激情", score: 1 },
    ],
    dimension: "情感联结",
  },
  {
    text: "在你们的关系中，是否能有效地倾听对方的感受？",
    icon: "👂",
    options: [
      { label: "是的，我们彼此尊重并认真倾听对方的感受", score: 5 },
      { label: "我们偶尔倾听对方，但会有争执", score: 4 },
      { label: "很少倾听，沟通时情绪化", score: 2 },
    ],
    dimension: "沟通质量",
  },
  {
    text: "你们是否愿意为复合做出改变？",
    icon: "🔧",
    options: [
      { label: "是的，我们愿意为彼此做出改变", score: 5 },
      { label: "我们愿意做出一些改变，但不确定能否成功", score: 4 },
      { label: "我们不愿意改变", score: 1 },
    ],
    dimension: "行动与投入",
  },
  {
    text: "分手后，你们是否进行过自我反思和成长？",
    icon: "📖",
    options: [
      { label: "是的，我从这段关系中学到了很多", score: 5 },
      { label: "有些反思，但没有实质性的改变", score: 3 },
      { label: "我很难从这段关系中找到成长的空间", score: 2 },
      { label: "我没有反思，感觉自己并没有改变", score: 1 },
    ],
    dimension: "自我成长",
  },
  {
    text: "你们之间是否有过妥协和宽容？",
    icon: "🤝",
    options: [
      { label: "是，我们经常妥协，并且理解彼此的立场", score: 5 },
      { label: "我们有过一些妥协，但并未完全理解对方", score: 4 },
      { label: "很少妥协，关系充满摩擦", score: 2 },
      { label: "我们没有任何妥协，关系总是对立的", score: 1 },
    ],
    dimension: "冲突解决",
  },
  {
    text: "你是否认为自己能够与前任建立更加成熟的关系？",
    icon: "🌱",
    options: [
      { label: "是的，我认为我们可以变得更加成熟，互相理解", score: 5 },
      { label: "有些可能性，但还需要更多的努力", score: 4 },
      { label: "我不确定，担心过去的问题会重现", score: 3 },
      { label: "我认为我们无法再建立健康的关系", score: 1 },
    ],
    dimension: "自我成长",
  },
  {
    text: "你们之间是否有平等的责任和角色分担？",
    icon: "⚖️",
    options: [
      { label: "是的，我们有明确且平等的责任分担", score: 5 },
      { label: "有些责任不平等，但我们能接受", score: 4 },
      { label: "我们的角色和责任不明确，常常冲突", score: 2 },
    ],
    dimension: "信任与价值观",
  },
  {
    text: "你们是否在冲突后能够及时和解并恢复关系？",
    icon: "🕊️",
    options: [
      { label: "是的，我们能够迅速和解，恢复正常关系", score: 5 },
      { label: "我们需要一些时间，但最终能够恢复关系", score: 4 },
      { label: "我们很难恢复关系，经常让冲突影响到情感", score: 2 },
    ],
    dimension: "冲突解决",
  },
  {
    text: "你们之间是否有过充分的情感表达和反馈？",
    icon: "💬",
    options: [
      { label: "是的，我们都能清晰地表达自己的情感和需求", score: 5 },
      { label: "我们偶尔表达情感，但有时会被误解", score: 4 },
      { label: "很少表达情感，常常有误解", score: 2 },
    ],
    dimension: "情感联结",
  },
  {
    text: "你们是否能够共同面对困难和挑战？",
    icon: "🛡️",
    options: [
      { label: "是的，我们能够一起面对并解决问题", score: 5 },
      { label: "我们能一起面对困难，但有时缺乏决策能力", score: 4 },
      { label: "我们常常因困难而产生更多冲突", score: 2 },
    ],
    dimension: "外部支持",
  },
  {
    text: "你们是否曾在重大决策上有过冲突？",
    icon: "⚔️",
    options: [
      { label: "是的，我们曾因重大决策发生激烈争执", score: 2 },
      { label: "我们偶尔有不同意见，但最终达成共识", score: 4 },
      { label: "我们很少有重大决策冲突", score: 5 },
    ],
    dimension: "冲突解决",
  },
];

// 维度定义，用于汇总与显示
const DIMENSIONS = [
  "沟通质量",
  "情感联结",
  "信任与价值观",
  "承诺与投入",
  "行动与投入",
  "外部支持",
  "情绪调节",
  "自我成长",
  "冲突解决",
];

// 评分段落与建议
const RESULT_SEGMENTS = [
  {
    min: 0,
    max: 50,
    label: "复合可能性极低",
    color: "var(--color-danger)",
    advice: [
      "先把重心放在自我疗愈，给彼此空间冷静。",
      "避免频繁打扰对方，先稳定自己的情绪。",
      "提升自我价值，完善社交与生活圈。",
    ],
  },
  {
    min: 51,
    max: 100,
    label: "有一定可能性",
    color: "var(--color-warning)",
    advice: [
      "尝试温和、低压力的沟通，询问对方感受。",
      "针对分手原因做出可见改变，逐步重建信任。",
      "安排轻松的见面，重建安全感与熟悉度。",
    ],
  },
  {
    min: 101,
    max: 150,
    label: "较大复合机会",
    color: "var(--color-info)",
    advice: [
      "保持稳定的沟通频率，展示成熟与成长。",
      "邀请对方共同回顾美好记忆，营造积极情绪。",
      "在合适时机提出具体计划，探索重启关系的可能。",
    ],
  },
  {
    min: 151,
    max: 200,
    label: "成功率很高",
    color: "var(--color-success)",
    advice: [
      "坦诚表达复合意愿，并倾听对方需求。",
      "共同制定新规则，避免重蹈覆辙。",
      "保持耐心，稳步推进，不要操之过急。",
    ],
  },
];

// 当前状态
let currentIndex = 0;
const answers = Array(QUESTIONS.length).fill(null);

// DOM 引用
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const qText = document.getElementById("q-text");
const qNum = document.getElementById("q-num");
const qIcon = document.getElementById("q-icon");
const optionsContainer = document.getElementById("options-container");
const progressBar = document.getElementById("progress-bar");
const progressPct = document.getElementById("progress-pct");
const questionCounter = document.getElementById("question-counter");
const scorePctEl = document.getElementById("score-pct");
const resultBadge = document.getElementById("result-badge");
const resultDesc = document.getElementById("result-desc");
const adviceList = document.getElementById("advice-list");
const dimensionGrid = document.getElementById("dimension-grid");
const ringProgress = document.getElementById("ring-progress");

// 事件绑定
startBtn.addEventListener("click", () => switchScreen(quizScreen));
prevBtn.addEventListener("click", () => goQuestion(-1));
nextBtn.addEventListener("click", () => {
  if (nextBtn.dataset.action === "submit") {
    showResult();
  } else {
    goQuestion(1);
  }
});
restartBtn.addEventListener("click", resetQuiz);

// 初始化第一题
renderQuestion();
updateNavState();
updateProgress();

function switchScreen(target) {
  [welcomeScreen, quizScreen, resultScreen].forEach((el) => {
    el.classList.remove("active");
  });
  target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const q = QUESTIONS[currentIndex];
  qText.textContent = q.text;
  qNum.textContent = String(currentIndex + 1).padStart(2, "0");
  qIcon.textContent = q.icon;

  optionsContainer.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt.label;
    if (answers[currentIndex] === idx) {
      btn.classList.add("selected");
    }
    btn.addEventListener("click", () => selectOption(idx));
    optionsContainer.appendChild(btn);
  });

  questionCounter.textContent = `第 ${currentIndex + 1} 题 / 共 ${QUESTIONS.length} 题`;
  updateNavState();
  updateProgress();
}

function selectOption(idx) {
  answers[currentIndex] = idx;
  renderQuestion();
  // 自动进入下一题（可选），保持需要点击“下一题”以确保阅读
  nextBtn.disabled = false;
  if (currentIndex === QUESTIONS.length - 1) {
    nextBtn.dataset.action = "submit";
    nextBtn.textContent = "查看结果 →";
  }
}

function goQuestion(delta) {
  const nextIndex = currentIndex + delta;
  if (nextIndex < 0 || nextIndex >= QUESTIONS.length) return;
  currentIndex = nextIndex;
  renderQuestion();
}

function updateNavState() {
  prevBtn.disabled = currentIndex === 0;
  const answered = answers[currentIndex] !== null;
  nextBtn.disabled = !answered;
  nextBtn.dataset.action = currentIndex === QUESTIONS.length - 1 ? "submit" : "next";
  nextBtn.textContent = currentIndex === QUESTIONS.length - 1 ? "查看结果 →" : "下一题 →";
}

function updateProgress() {
  const answeredCount = answers.filter((a) => a !== null).length;
  const pct = Math.round((answeredCount / QUESTIONS.length) * 100);
  progressBar.style.width = `${pct}%`;
  progressPct.textContent = `${pct}%`;
}

function computeScore() {
  let total = 0;
  const dimensionScore = {};
  DIMENSIONS.forEach((d) => { dimensionScore[d] = 0; });

  answers.forEach((ansIdx, qIdx) => {
    const q = QUESTIONS[qIdx];
    const opt = q.options[ansIdx];
    if (!opt) return;
    total += opt.score;
    dimensionScore[q.dimension] = (dimensionScore[q.dimension] || 0) + opt.score;
  });

  const maxScore = QUESTIONS.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.score)), 0);
  const probability = Math.round((total / maxScore) * 100);
  return { total, probability, dimensionScore, maxScore };
}

function findSegment(prob) {
  return RESULT_SEGMENTS.find((s) => prob >= s.min && prob <= s.max) || RESULT_SEGMENTS[0];
}

function showResult() {
  const { probability, dimensionScore, maxScore } = computeScore();
  const segment = findSegment(probability);

  // 更新圆环
  const circumference = 2 * Math.PI * 85;
  const offset = circumference * (1 - probability / 100);
  ringProgress.style.strokeDashoffset = offset;
  scorePctEl.textContent = `${probability}%`;

  // 徽章与描述
  resultBadge.textContent = `🎯 ${segment.label}`;
  resultBadge.style.background = "rgba(255, 255, 255, 0.08)";
  resultBadge.style.color = segment.color;
  resultBadge.style.border = `1px solid ${segment.color}`;

  resultDesc.textContent = segment.advice[0];

  // 建议列表
  adviceList.innerHTML = "";
  segment.advice.forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    adviceList.appendChild(li);
  });

  // 维度分析
  dimensionGrid.innerHTML = "";
  DIMENSIONS.forEach((dim) => {
    const item = document.createElement("div");
    item.className = "dimension-item";
    const score = dimensionScore[dim] || 0;
    // 估算该维度最大分：包含该维度的题目数量 * 每题最高分 5
    const maxForDim = QUESTIONS.filter((q) => q.dimension === dim).length * 5;
    const pct = maxForDim ? Math.round((score / maxForDim) * 100) : 0;

    item.innerHTML = `
      <div class="dim-header">
        <span class="dim-name">${dim}</span>
        <span class="dim-score">${pct}%</span>
      </div>
      <div class="dim-bar-track">
        <div class="dim-bar-fill" style="width:${pct}%;"></div>
      </div>
    `;
    dimensionGrid.appendChild(item);
  });

  switchScreen(resultScreen);
}

function resetQuiz() {
  currentIndex = 0;
  answers.fill(null);
  renderQuestion();
  updateNavState();
  updateProgress();
  switchScreen(welcomeScreen);
}
