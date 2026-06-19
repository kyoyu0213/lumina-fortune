// 前世診断ページの多言語文言。
// - UI文言・質問/選択肢は ja/en/ko/zh-TW を全訳。
// - 結果本文（概要・特徴・課題・物語の章など）は results(日本語)を正とし、未訳は ja フォールバック。
import type { Lang } from "@/lib/i18n/config";
import type { PastLifeId, PastLifeResult } from "@/lib/pastlife/pastlife";

export type PastLifeUI = {
  backTop: string;
  introTitle: string;
  introLead: string;
  introInfo1: string;
  introInfo2: string;
  introInfo3: string;
  startButton: string;
  shareIntroButton: string;
  questionLabel: (current: number, total: number) => string;
  backButton: string;
  resultEyebrow: string;
  traitsTitle: string;
  soulTaskTitle: string;
  luminaWordTitle: string;
  storyToggle: string;
  shareButton: string;
  saveImageButton: string;
  savingImage: string;
  retryButton: string;
  imageSaved: string;
  imageFailed: string;
  shareIntroText: string;
  shareResultText: (name: string, subtitle: string) => string;
};

export type QuestionText = { text: string; options: string[] };

export const pastlifeUI: Record<Lang, PastLifeUI> = {
  ja: {
    backTop: "← トップへ戻る",
    introTitle: "前世診断",
    introLead: "あなたの魂は、\nどんな人生を歩んできたのか。",
    introInfo1: "16の質問から、あなたの魂が\nかつて歩んだ前世の物語を読み解きます。",
    introInfo2: "あなたは悲劇の王女？\nそれとも星を巡ってきた旅人？",
    introInfo3: "さっそく診断してみましょう。",
    startButton: "診断をはじめる",
    shareIntroButton: "友達にこの診断をシェア",
    questionLabel: (c, t) => `QUESTION ${c} / ${t}`,
    backButton: "← 戻る",
    resultEyebrow: "Your Past Life",
    traitsTitle: "今世に残る特徴",
    soulTaskTitle: "魂の課題",
    luminaWordTitle: "ルミナからの一言",
    storyToggle: "前世の物語を読む",
    shareButton: "Xでシェアする",
    saveImageButton: "画像を保存する",
    savingImage: "画像を生成中…",
    retryButton: "もう一度診断する",
    imageSaved: "画像を保存しました。",
    imageFailed: "画像の生成に失敗しました。時間をおいて再度お試しください。",
    shareIntroText:
      "あなたの魂は、どんな人生を歩んできたのか。前世診断であなたの過去世の物語を見てみよう🌙\n#前世診断 #ルミナ",
    shareResultText: (name, subtitle) =>
      `私の前世は「${name}」でした🌙\n\n${subtitle}\n\nあなたの魂は、どんな人生を歩んできた？ #前世診断 #ルミナ`,
  },
  en: {
    backTop: "← Back to top",
    introTitle: "Past Life Diagnosis",
    introLead: "What kind of life\nhas your soul walked?",
    introInfo1: "From 16 questions, we read the story of\nthe past life your soul once walked.",
    introInfo2: "Are you a tragic princess?\nOr a traveler who wandered the stars?",
    introInfo3: "Let's begin the diagnosis.",
    startButton: "Start the diagnosis",
    shareIntroButton: "Share this diagnosis with friends",
    questionLabel: (c, t) => `QUESTION ${c} / ${t}`,
    backButton: "← Back",
    resultEyebrow: "Your Past Life",
    traitsTitle: "Traits carried into this life",
    soulTaskTitle: "Your soul's task",
    luminaWordTitle: "A word from Lumina",
    storyToggle: "Read the past life story",
    shareButton: "Share on X",
    saveImageButton: "Save image",
    savingImage: "Generating image…",
    retryButton: "Take the diagnosis again",
    imageSaved: "Image saved.",
    imageFailed: "Failed to generate the image. Please try again later.",
    shareIntroText:
      "What kind of life has your soul walked? See the story of your past life with the Past Life Diagnosis 🌙\n#PastLifeDiagnosis #Lumina",
    shareResultText: (name, subtitle) =>
      `My past life was "${name}" 🌙\n\n${subtitle}\n\nWhat life has your soul walked? #PastLifeDiagnosis #Lumina`,
  },
  ko: {
    backTop: "← 메인으로 돌아가기",
    introTitle: "전생 진단",
    introLead: "당신의 영혼은\n어떤 삶을 걸어왔을까.",
    introInfo1: "16개의 질문으로, 당신의 영혼이\n예전에 걸어온 전생의 이야기를 읽어 냅니다.",
    introInfo2: "당신은 비극의 왕녀?\n아니면 별을 떠돌아온 여행자?",
    introInfo3: "바로 진단해 봅시다.",
    startButton: "진단 시작하기",
    shareIntroButton: "친구에게 이 진단 공유하기",
    questionLabel: (c, t) => `QUESTION ${c} / ${t}`,
    backButton: "← 뒤로",
    resultEyebrow: "Your Past Life",
    traitsTitle: "이번 생에 남은 특징",
    soulTaskTitle: "영혼의 과제",
    luminaWordTitle: "루미나의 한마디",
    storyToggle: "전생의 이야기 읽기",
    shareButton: "X에 공유하기",
    saveImageButton: "이미지 저장",
    savingImage: "이미지 생성 중…",
    retryButton: "다시 진단하기",
    imageSaved: "이미지를 저장했습니다.",
    imageFailed: "이미지 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    shareIntroText:
      "당신의 영혼은 어떤 삶을 걸어왔을까. 전생 진단으로 당신의 과거 생의 이야기를 만나 보세요 🌙\n#전생진단 #루미나",
    shareResultText: (name, subtitle) =>
      `제 전생은 「${name}」였어요 🌙\n\n${subtitle}\n\n당신의 영혼은 어떤 삶을 걸어왔을까? #전생진단 #루미나`,
  },
  "zh-TW": {
    backTop: "← 返回首頁",
    introTitle: "前世診斷",
    introLead: "你的靈魂，\n走過了怎樣的人生。",
    introInfo1: "透過16個問題，解讀你的靈魂\n曾經走過的前世故事。",
    introInfo2: "你是悲劇的公主？\n還是巡遊群星而來的旅人？",
    introInfo3: "馬上來診斷看看吧。",
    startButton: "開始診斷",
    shareIntroButton: "把這個診斷分享給朋友",
    questionLabel: (c, t) => `QUESTION ${c} / ${t}`,
    backButton: "← 返回",
    resultEyebrow: "Your Past Life",
    traitsTitle: "留存於今生的特質",
    soulTaskTitle: "靈魂的課題",
    luminaWordTitle: "露米娜的一句話",
    storyToggle: "閱讀前世的故事",
    shareButton: "分享到 X",
    saveImageButton: "儲存圖片",
    savingImage: "圖片產生中…",
    retryButton: "再次診斷",
    imageSaved: "已儲存圖片。",
    imageFailed: "圖片產生失敗，請稍後再試。",
    shareIntroText:
      "你的靈魂走過了怎樣的人生。用前世診斷看看你過去世的故事吧 🌙\n#前世診斷 #露米娜",
    shareResultText: (name, subtitle) =>
      `我的前世是「${name}」🌙\n\n${subtitle}\n\n你的靈魂走過了怎樣的人生？ #前世診斷 #露米娜`,
  },
};

/** 質問・選択肢（id をキー、options 順は questions.ts と一致） */
export const questionTexts: Record<Lang, Record<number, QuestionText>> = {
  ja: {
    1: { text: "あなたが惹かれる景色は？", options: ["古い城と夕暮れの空", "星が降るような夜空", "深い森の小道", "果てしなく続く海"] },
    2: { text: "人生で一番大切にしたいものは？", options: ["愛", "使命", "自由", "真実"] },
    3: { text: "つらい時、あなたはどうする？", options: ["一人で静かに考える", "誰かのために動く", "場所を変えて気分転換する", "気持ちを言葉にする"] },
    4: { text: "人から言われやすい言葉は？", options: ["優しい", "不思議", "真面目", "自由人"] },
    5: { text: "恋愛で近いのは？", options: ["好きな人を優先しがち", "一度好きになると一途", "運命を感じる恋に弱い", "束縛されると苦しくなる"] },
    6: { text: "もし前世の記憶が見えるなら？", options: ["誰かと別れた記憶", "戦いや使命の記憶", "魔法や儀式の記憶", "旅をしていた記憶"] },
    7: { text: "あなたが得意なのは？", options: ["人の気持ちを察する", "物事を深く考える", "場の空気を読む", "新しいことに挑戦する"] },
    8: { text: "心が落ち着く場所は？", options: ["静かな部屋", "神社や教会のような場所", "森や花のある場所", "海や川のそば"] },
    9: { text: "物語の主人公になるなら？", options: ["国のために恋を諦める王女", "大切な人を守る騎士", "未来を読む占星術師", "世界を旅する放浪者"] },
    10: { text: "あなたの弱点に近いものは？", options: ["我慢しすぎる", "考えすぎる", "感情に飲まれる", "周囲と違うと感じる"] },
    11: { text: "惹かれる言葉は？", options: ["約束", "祈り", "奇跡", "目覚め"] },
    12: { text: "誰かが困っていたら？", options: ["すぐ助けたい", "解決策を考える", "そっと寄り添う", "必要なら戦う"] },
    13: { text: "子どもの頃好きだった世界観は？", options: ["王国やプリンセス", "魔法や魔女", "星や宇宙", "冒険や宝探し"] },
    14: { text: "あなたが怖いものは？", options: ["大切な人を失うこと", "自由を失うこと", "自分の居場所がないこと", "真実を知らないまま終わること"] },
    15: { text: "今のあなたに必要なものは？", options: ["自分を大切にする勇気", "誰かを信じる勇気", "新しい世界へ進む勇気", "本当の自分を受け入れる勇気"] },
    16: { text: "最後に、魂が求めている気がするものは？", options: ["愛", "癒し", "自由", "覚醒"] },
  },
  en: {
    1: { text: "The scenery that draws you?", options: ["An old castle and a twilight sky", "A night sky like falling stars", "A path through a deep forest", "An endless sea"] },
    2: { text: "What you most want to cherish in life?", options: ["Love", "Duty", "Freedom", "Truth"] },
    3: { text: "When times are hard, what do you do?", options: ["Think quietly alone", "Act for someone's sake", "Change places for a fresh mood", "Put feelings into words"] },
    4: { text: "What people tend to say about you?", options: ["Kind", "Mysterious", "Serious", "Free spirit"] },
    5: { text: "What's closest to you in love?", options: ["Tend to prioritize the one you love", "Devoted once you fall in love", "Weak for love that feels like fate", "Feel stifled when tied down"] },
    6: { text: "If you could see memories of a past life?", options: ["A memory of parting with someone", "A memory of battle or duty", "A memory of magic or ritual", "A memory of traveling"] },
    7: { text: "What you're good at?", options: ["Sensing others' feelings", "Thinking things through deeply", "Reading the mood of a room", "Trying new things"] },
    8: { text: "Where your heart feels calm?", options: ["A quiet room", "A place like a shrine or church", "A place with forests and flowers", "By the sea or a river"] },
    9: { text: "If you were a story's protagonist?", options: ["A princess giving up love for her country", "A knight protecting a loved one", "An astrologer who reads the future", "A wanderer traveling the world"] },
    10: { text: "What's closest to your weakness?", options: ["Enduring too much", "Overthinking", "Getting swept up by emotion", "Feeling different from others"] },
    11: { text: "The word that draws you?", options: ["Promise", "Prayer", "Miracle", "Awakening"] },
    12: { text: "If someone is in trouble?", options: ["Want to help right away", "Think of a solution", "Quietly stay close", "Fight if needed"] },
    13: { text: "The world you loved as a child?", options: ["Kingdoms and princesses", "Magic and witches", "Stars and the cosmos", "Adventure and treasure hunts"] },
    14: { text: "What you're afraid of?", options: ["Losing someone dear", "Losing freedom", "Having no place to belong", "Ending without knowing the truth"] },
    15: { text: "What you need right now?", options: ["Courage to value yourself", "Courage to trust someone", "Courage to step into a new world", "Courage to accept your true self"] },
    16: { text: "Finally, what your soul seems to seek?", options: ["Love", "Healing", "Freedom", "Awakening"] },
  },
  ko: {
    1: { text: "당신이 끌리는 풍경은?", options: ["오래된 성과 황혼의 하늘", "별이 쏟아질 듯한 밤하늘", "깊은 숲의 오솔길", "끝없이 이어지는 바다"] },
    2: { text: "인생에서 가장 소중히 하고 싶은 것은?", options: ["사랑", "사명", "자유", "진실"] },
    3: { text: "힘들 때, 당신은 어떻게 하나요?", options: ["혼자 조용히 생각한다", "누군가를 위해 움직인다", "장소를 바꿔 기분 전환한다", "마음을 말로 표현한다"] },
    4: { text: "사람들에게 자주 듣는 말은?", options: ["다정해", "신비로워", "성실해", "자유로운 사람"] },
    5: { text: "연애에서 가까운 것은?", options: ["좋아하는 사람을 우선하기 쉽다", "한 번 좋아하면 한결같다", "운명을 느끼는 사랑에 약하다", "구속받으면 괴로워진다"] },
    6: { text: "만약 전생의 기억이 보인다면?", options: ["누군가와 이별한 기억", "싸움이나 사명의 기억", "마법이나 의식의 기억", "여행하던 기억"] },
    7: { text: "당신이 잘하는 것은?", options: ["사람의 마음을 헤아리는 것", "사물을 깊이 생각하는 것", "분위기를 읽는 것", "새로운 것에 도전하는 것"] },
    8: { text: "마음이 안정되는 곳은?", options: ["조용한 방", "신사나 교회 같은 곳", "숲이나 꽃이 있는 곳", "바다나 강가"] },
    9: { text: "이야기의 주인공이 된다면?", options: ["나라를 위해 사랑을 포기하는 왕녀", "소중한 사람을 지키는 기사", "미래를 읽는 점성술사", "세계를 여행하는 방랑자"] },
    10: { text: "당신의 약점에 가까운 것은?", options: ["너무 참는다", "너무 생각한다", "감정에 휩쓸린다", "주위와 다르다고 느낀다"] },
    11: { text: "끌리는 단어는?", options: ["약속", "기도", "기적", "각성"] },
    12: { text: "누군가 곤란해하고 있다면?", options: ["바로 돕고 싶다", "해결책을 생각한다", "조용히 곁에 있어 준다", "필요하면 싸운다"] },
    13: { text: "어릴 적 좋아했던 세계관은?", options: ["왕국이나 프린세스", "마법이나 마녀", "별이나 우주", "모험이나 보물찾기"] },
    14: { text: "당신이 무서워하는 것은?", options: ["소중한 사람을 잃는 것", "자유를 잃는 것", "내가 있을 곳이 없는 것", "진실을 모른 채 끝나는 것"] },
    15: { text: "지금 당신에게 필요한 것은?", options: ["자신을 소중히 하는 용기", "누군가를 믿는 용기", "새로운 세계로 나아가는 용기", "진정한 나를 받아들이는 용기"] },
    16: { text: "마지막으로, 영혼이 원하는 것 같은 것은?", options: ["사랑", "치유", "자유", "각성"] },
  },
  "zh-TW": {
    1: { text: "吸引你的風景是？", options: ["古老的城堡與黃昏的天空", "繁星灑落般的夜空", "深邃森林的小徑", "綿延無盡的大海"] },
    2: { text: "人生中最想珍惜的是？", options: ["愛", "使命", "自由", "真實"] },
    3: { text: "難過時，你會怎麼做？", options: ["獨自靜靜思考", "為了某人而行動", "換個地方轉換心情", "把心情化為言語"] },
    4: { text: "別人常對你說的話是？", options: ["溫柔", "不可思議", "認真", "自由的人"] },
    5: { text: "戀愛中比較像你的是？", options: ["容易以喜歡的人為優先", "一旦喜歡就很專一", "對命中註定的戀情沒有抵抗力", "被束縛就會感到痛苦"] },
    6: { text: "若能看見前世的記憶？", options: ["與某人離別的記憶", "戰鬥或使命的記憶", "魔法或儀式的記憶", "旅行的記憶"] },
    7: { text: "你擅長的是？", options: ["察覺他人的心情", "深入思考事物", "讀懂場合的氣氛", "挑戰新事物"] },
    8: { text: "讓你心安的地方是？", options: ["安靜的房間", "神社或教堂般的地方", "有森林與花的地方", "海邊或河邊"] },
    9: { text: "如果成為故事的主角？", options: ["為國家放棄愛情的公主", "守護重要之人的騎士", "解讀未來的占星師", "周遊世界的流浪者"] },
    10: { text: "最接近你弱點的是？", options: ["過度忍耐", "想太多", "被情緒淹沒", "覺得與周遭不同"] },
    11: { text: "吸引你的詞語是？", options: ["約定", "祈禱", "奇蹟", "覺醒"] },
    12: { text: "若有人陷入困境？", options: ["想立刻幫忙", "思考解決方法", "靜靜地陪伴", "必要時挺身而戰"] },
    13: { text: "小時候喜歡的世界觀是？", options: ["王國與公主", "魔法與魔女", "星星與宇宙", "冒險與尋寶"] },
    14: { text: "你害怕的是？", options: ["失去重要的人", "失去自由", "沒有自己的歸屬", "在不知真相中結束"] },
    15: { text: "此刻你需要的是？", options: ["珍惜自己的勇氣", "相信他人的勇氣", "邁向新世界的勇氣", "接納真實自我的勇氣"] },
    16: { text: "最後，靈魂似乎在追求的是？", options: ["愛", "療癒", "自由", "覺醒"] },
  },
};

/** 言語別の結果オーバーライド（未訳は空＝ja フォールバック） */
export type PastLifeResultOverride = {
  name?: string;
  subtitle?: string;
  overview?: string;
  traits?: string;
  soulTask?: string;
  luminaWord?: string;
  chapters?: { title?: string; body?: string }[];
};

// 見出し系（name/subtitle/overview/traits/soulTask/luminaWord）を全訳。
// 長文の物語章(chapters)は未指定＝ja フォールバック（後から追加可）。
export const pastlifeResultOverrides: Record<Lang, Partial<Record<PastLifeId, PastLifeResultOverride>>> = {
  ja: {},
  en: {
    tragic_princess: {
      name: "The Tragic Princess",
      subtitle: "A soul that wavered between love and duty",
      overview: `Your past life was
"The Tragic Princess."

A princess who, while bearing her nation's future,
fell in love across the divide of rank.

In the end, to protect the one she loved,
she chose to part ways herself.`,
      traits: `You still hold a strong sense of responsibility and a kindness that puts others before yourself.
You tend to protect those dear to you, even by silencing your own true feelings.`,
      soulTask: `"Don't give up on your own happiness."
Live not only for others — please cherish your own wishes too.`,
      luminaWord: `You no longer have to endure for someone else's sake.
In this life, you may choose your own happiness.`,
    },
    loyal_knight: {
      name: "The Loyal Knight",
      subtitle: "A soul that upheld what it vowed to protect",
      overview: `Your past life was
"The Loyal Knight."

A knight who spent a lifetime protecting
the one they loved and what they were sworn to guard.

Never breaking a promise,
a soul that carried its pride to the end.`,
      traits: `You do not easily bend a decision once made or your feelings for someone dear.
Sincere, you have the strength to fulfill your responsibility to the end when relied upon.`,
      soulTask: `"Let the tension leave your shoulders."
Don't carry everything alone — learn, at times, to rely on others.`,
      luminaWord: `Your loyalty still supports your core.
But you, too, may be protected by someone.`,
    },
    white_witch: {
      name: "The White Witch",
      subtitle: "A soul that healed people unseen",
      overview: `Your past life was
"The White Witch."

Deep in the forest, handling medicine and prayer,
a witch who saved people without their knowing.

Though carrying loneliness,
a soul that never let go of kindness.`,
      traits: `Sensitive to others' pain, you cannot leave someone in trouble alone.
You hold your own sensibility and intuition, and tend to cherish solitary time.`,
      soulTask: `"Open your heart first."
Not only giving — you may show your weakness to someone too.`,
      luminaWord: `Your kindness is true magic that seeks no reward.
In this life, you, too, may lean on someone.`,
    },
    light_priest: {
      name: "The Priest of Light",
      subtitle: "A soul that guided people with prayer",
      overview: `Your past life was
"The Priest of Light."

Offering prayers in a temple,
a priest who guided the hearts of the lost.

With a pure resolve in their heart,
a soul that remained the people's hope.`,
      traits: `You hold a straightforward, sincere conviction and a composure that puts people at ease.
Cherishing rightness and beauty, you have a strong power to discipline yourself.`,
      soulTask: `"Allow yourself to be imperfect."
In chasing ideals, try not to blame yourself too much.`,
      luminaWord: `Within you is a quiet light that illuminates others.
First, let that light shine upon yourself.`,
    },
    star_seer: {
      name: "The Star Seer",
      subtitle: "A soul that read fate in the stars",
      overview: `Your past life was
"The Star Seer."

A sage who read the stars of the night sky
and divined people's destinies.

Believing in the unseen,
a soul that kept gazing at the future.`,
      traits: `Your intuition is sharp, with the power to sense the essence and flow of things.
You observe quietly and have a caution that thinks deeply before acting.`,
      soulTask: `"Try moving before you think."
Don't only wait for answers — step out toward the future yourself.`,
      luminaWord: `Your intuition still points correctly to the future.
Believe that voice, and take a step forward.`,
    },
    alchemist: {
      name: "The Alchemist",
      subtitle: "A soul that kept seeking the truth",
      overview: `Your past life was
"The Alchemist."

Seeking the truth of the world,
an alchemist who devoted their life to inquiry.

A soul that kept chasing
an answer no one had ever seen.`,
      traits: `Your curiosity is strong, with an inquiring mind that thinks things through until satisfied.
You hold ideas different from others and a worldview all your own.`,
      soulTask: `"Don't carry it all alone."
Sharing knowledge and results with someone widens the world.`,
      luminaWord: `Your inquiring spirit is the driving force that moves the world forward.
Please use that wisdom for people's happiness too.`,
    },
    bard: {
      name: "The Bard",
      subtitle: "A soul that connected hearts through song",
      overview: `Your past life was
"The Bard."

Traveling from land to land,
a poet who delivered song and story.

Lighting lamps in people's hearts,
a soul that lived freely.`,
      traits: `You love to express, with a charm that draws people's hearts.
Bright and light, you can enjoy new encounters and change.`,
      soulTask: `"Put down roots in one place."
While staying free, nurture deep, lasting bonds.`,
      luminaWord: `Your words and expression hold the power to save someone's heart.
Let that voice resound through the world even more.`,
    },
    forest_guardian: {
      name: "The Forest Guardian",
      subtitle: "A soul that kept watching over life",
      overview: `Your past life was
"The Forest Guardian."

Watching over the forest and its creatures,
a guardian who quietly kept protecting life.

Living alongside nature,
a soul that honored harmony.`,
      traits: `Calm and steady, you put those with you at ease.
Even without standing out, you have the power to support others with a sure kindness.`,
      soulTask: `"Step outside your own world."
Not only protecting — open your heart to new bonds and places too.`,
      luminaWord: `Beside you, the heart strangely settles.
That quiet kindness will protect those dear to you in this life too.`,
    },
    sea_priestess: {
      name: "The Sea Priestess",
      subtitle: "A soul that offered prayer to the sea",
      overview: `Your past life was
"The Sea Priestess."

Offering prayers at a seaside shrine,
a priestess who wished for people's safety.

Entrusting herself to the great flow,
a soul that lived with rich sensitivity.`,
      traits: `Rich in emotion, you sensitively feel others' feelings.
You hold a gentle, enfolding affection and a strong power of empathy.`,
      soulTask: `"Draw a boundary between your emotions and others'."
Don't carry too much of another's pain — protect your own heart too.`,
      luminaWord: `Your rich sensitivity is a precious talent that heals people.
Please cherish your own heart just as much.`,
    },
    wanderer: {
      name: "The Wandering Traveler",
      subtitle: "A soul that traveled in search of freedom",
      overview: `Your past life was
"The Wandering Traveler."

Never staying in one place,
a wanderer who kept walking the world.

Loving freedom, a soul that engraved
countless landscapes upon the heart.`,
      traits: `Full of curiosity, disliking restraint, you have the strength to go your own way.
Unafraid of change, you can dive into new worlds.`,
      soulTask: `"Pause and look back."
Not only pressing onward — cherish and nurture the bonds you've met.`,
      luminaWord: `Your free soul can be bound by no one.
Beyond your journey, you will surely find the place you truly wish to return to.`,
    },
    healer: {
      name: "The Healer",
      subtitle: "A soul that stayed close to the wounded",
      overview: `Your past life was
"The Healer."

Staying close to the wounded,
a healer who mended heart and body.

Seeking no reward,
a soul that simply kept reaching out a hand.`,
      traits: `Caring, you find joy in acting for someone's sake.
Gentle, you have the capacity to accept people's weakness and pain.`,
      soulTask: `"Don't put yourself last."
Before healing others, first fill your own cup.`,
      luminaWord: `In your hands dwells a warmth that heals people.
With those hands, sometimes hold yourself too.`,
    },
    dragon_contract: {
      name: "The Dragon's Contractor",
      subtitle: "A strong soul that bonded with a dragon",
      overview: `Your past life was
"The Dragon's Contractor."

Forming a bond with a legendary dragon,
one entrusted with great power.

With strong will and resolve in their heart,
a soul that faced its destiny.`,
      traits: `Strong at the core, you hold an unshakable resolve when it matters.
With charisma, you have the power to lead and pull people along.`,
      soulTask: `"Know that it's okay to show weakness too."
The more you try to be strong, the more the courage to honestly rely on others matters.`,
      luminaWord: `Within you is a power strong enough to change destiny.
Please use that power together with kindness.`,
    },
    star_traveler: {
      name: "The Star Traveler",
      subtitle: "A special soul that journeyed among the stars",
      overview: `Your past life was
"The Star Traveler."

Not staying in one world,
a rare soul that journeyed among the stars.

Guided by intuition and destiny,
a soul that arrived here now,
carrying a precious mission.`,
      traits: `You hold strong intuition and a mysterious power to sense destiny.
Somehow hard to pin down, you see the world from a viewpoint unlike others.`,
      soulTask: `"Place your heart here, in this place."
While gazing far, cherish the bonds and time before you.`,
      luminaWord: `You are a special soul who came here journeying through many stars.
The meaning of that journey will become clear in the life to come.`,
    },
  },
  ko: {
    tragic_princess: {
      name: "비극의 왕녀",
      subtitle: "사랑과 사명 사이에서 흔들린 영혼",
      overview: `당신의 전생은
「비극의 왕녀」.

나라의 미래를 짊어지면서도
신분이 다른 사랑을 한 왕녀.

마지막에는 사랑하는 사람을 지키기 위해,
스스로 이별을 택한 영혼입니다.`,
      traits: `책임감이 강하고, 자신보다 주위를 우선하는 다정함을 지금도 지니고 있습니다.
진짜 마음을 억눌러서라도, 소중한 사람을 지키려는 면이 있을 것입니다.`,
      soulTask: `「자신의 행복을 포기하지 않는 것」.
누군가를 위해 사는 것만이 아니라, 당신 자신의 바람도 소중히 해 주세요.`,
      luminaWord: `당신은 이제, 누군가를 위해 참지 않아도 됩니다.
이번 생에서는, 당신 자신의 행복을 택해도 좋습니다.`,
    },
    loyal_knight: {
      name: "충의의 기사",
      subtitle: "지키겠다 맹세한 것을 끝까지 지킨 영혼",
      overview: `당신의 전생은
「충의의 기사」.

소중한 사람과 지켜야 할 것을
평생을 바쳐 지켜 낸 기사.

약속을 어기지 않고,
긍지를 끝까지 지킨 영혼입니다.`,
      traits: `한 번 정한 일이나 소중한 사람을 향한 마음을, 쉽게 굽히지 않습니다.
성실하여, 의지하게 되면 끝까지 책임을 다하려는 강인함이 있습니다.`,
      soulTask: `「어깨의 힘을 빼는 것」.
모든 것을 떠안지 말고, 때로는 누군가에게 기대는 것도 익혀 갑시다.`,
      luminaWord: `당신의 충의는 지금도 당신의 심지를 떠받치고 있습니다.
하지만 당신 자신도 누군가에게 지켜져도 괜찮습니다.`,
    },
    white_witch: {
      name: "하얀 마녀",
      subtitle: "남몰래 사람들을 치유한 영혼",
      overview: `당신의 전생은
「하얀 마녀」.

숲 깊은 곳에서 약과 기도를 다루며,
남몰래 사람들을 구한 마녀.

고독을 안고서도,
다정함을 놓지 않은 영혼입니다.`,
      traits: `사람의 아픔에 민감하여, 곤란한 사람을 그냥 두지 못합니다.
독자적인 감성과 직감을 지니고, 혼자만의 시간을 소중히 하는 면이 있습니다.`,
      soulTask: `「먼저 마음을 여는 것」.
주기만 하지 말고, 당신의 약함도 누군가에게 보여도 됩니다.`,
      luminaWord: `당신의 다정함은, 보답을 바라지 않는 진짜 마법입니다.
이번 생에서는, 당신도 누군가에게 기대도 좋습니다.`,
    },
    light_priest: {
      name: "빛의 신관",
      subtitle: "기도로 사람들을 인도한 영혼",
      overview: `당신의 전생은
「빛의 신관」.

신전에서 기도를 올리며,
길 잃은 사람들의 마음을 인도한 신관.

맑은 뜻을 가슴에 품고,
사람들의 희망으로 남은 영혼입니다.`,
      traits: `올곧고 성실한 신념을 지녀, 사람을 안심시키는 차분함이 있습니다.
올바름과 아름다움을 소중히 하며, 자신을 다스리는 힘이 강할 것입니다.`,
      soulTask: `「완벽하지 않아도 된다고 허락하는 것」.
이상을 좇은 나머지, 자신을 너무 탓하지 않도록 합시다.`,
      luminaWord: `당신의 안쪽에는, 사람을 비추는 고요한 빛이 있습니다.
우선, 그 빛으로 당신 자신을 비춰 주세요.`,
    },
    star_seer: {
      name: "별을 읽는 자",
      subtitle: "별에서 운명을 읽은 영혼",
      overview: `당신의 전생은
「별을 읽는 자」.

밤하늘의 별을 풀어내어,
사람들의 운명을 점친 현자.

보이지 않는 것을 믿으며,
미래를 바라본 영혼입니다.`,
      traits: `직감이 날카로워, 사물의 본질과 흐름을 느끼는 힘이 있습니다.
조용히 관찰하고, 깊이 생각한 뒤 움직이는 신중함을 지니고 있을 것입니다.`,
      soulTask: `「생각하기 전에 먼저 움직여 보는 것」.
답을 기다리기만 하지 말고, 스스로 미래로 내디뎌 봅시다.`,
      luminaWord: `당신의 직감은 지금도 미래를 올바르게 가리키고 있습니다.
그 목소리를 믿고, 한 걸음 내디뎌 보세요.`,
    },
    alchemist: {
      name: "연금술사",
      subtitle: "진리를 계속 탐구한 영혼",
      overview: `당신의 전생은
「연금술사」.

세계의 진리를 좇아,
탐구에 평생을 바친 연금술사.

누구도 본 적 없는 답을,
계속 좇은 영혼입니다.`,
      traits: `호기심이 강하여, 납득할 때까지 끝까지 파고드는 탐구심이 있습니다.
남과 다른 발상이나, 독자적인 세계관을 지니고 있을 것입니다.`,
      soulTask: `「혼자 떠안지 않는 것」.
지식과 성과를 누군가와 나누면 세계는 넓어집니다.`,
      luminaWord: `당신의 탐구심은, 세계를 앞으로 나아가게 하는 원동력입니다.
그 지혜를, 부디 사람의 행복을 위해서도 써 주세요.`,
    },
    bard: {
      name: "음유시인",
      subtitle: "노래로 사람들의 마음을 이은 영혼",
      overview: `당신의 전생은
「음유시인」.

나라에서 나라로 여행하며,
노래와 이야기를 전한 시인.

사람들의 마음에 등불을 밝히고,
자유롭게 산 영혼입니다.`,
      traits: `표현하는 것을 좋아하고, 사람의 마음을 끄는 매력이 있습니다.
밝고 가벼워, 새로운 만남이나 변화를 즐길 수 있을 것입니다.`,
      soulTask: `「한 곳에 뿌리를 내리는 것」.
자유로우면서도, 깊이 이어지는 유대를 길러 갑시다.`,
      luminaWord: `당신의 말과 표현은, 누군가의 마음을 구하는 힘을 지니고 있습니다.
그 목소리를, 더욱 세계에 울려 퍼지게 해 주세요.`,
    },
    forest_guardian: {
      name: "숲의 수호자",
      subtitle: "생명을 계속 지켜본 영혼",
      overview: `당신의 전생은
「숲의 수호자」.

숲과 생명들을 지켜보며,
조용히 생명을 계속 지킨 수호자.

자연과 함께 살며,
조화를 존중한 영혼입니다.`,
      traits: `온화하고 안정감이 있어, 함께 있는 사람을 안심시킵니다.
눈에 띄지 않아도, 확실한 다정함으로 주위를 받치는 힘이 있을 것입니다.`,
      soulTask: `「자신의 세계 밖으로 나가 보는 것」.
지키기만 하지 말고, 새로운 인연이나 장소에도 마음을 열어 봅시다.`,
      luminaWord: `당신 곁에 있으면, 신기하게도 마음이 차분해집니다.
그 고요한 다정함은, 이번 생에서도 소중한 사람을 지킬 것입니다.`,
    },
    sea_priestess: {
      name: "바다의 무녀",
      subtitle: "기도를 바다에 바친 영혼",
      overview: `당신의 전생은
「바다의 무녀」.

바닷가 사당에서 기도를 올리며,
사람들의 무사를 빈 무녀.

커다란 흐름에 몸을 맡기고,
풍부한 감수성으로 산 영혼입니다.`,
      traits: `감정이 풍부하여, 사람의 마음을 민감하게 느낍니다.
다정하게 감싸 안는 듯한 애정을 지니고, 공감하는 힘이 강할 것입니다.`,
      soulTask: `「자신과 타인의 감정에 경계를 긋는 것」.
상대의 아픔을 지나치게 짊어지지 말고, 자신의 마음도 지킵시다.`,
      luminaWord: `당신의 풍부한 감수성은, 사람을 치유하는 고귀한 재능입니다.
부디, 당신 자신의 마음도 그만큼 소중히 해 주세요.`,
    },
    wanderer: {
      name: "떠도는 방랑자",
      subtitle: "자유를 찾아 떠돈 영혼",
      overview: `당신의 전생은
「떠도는 방랑자」.

한 곳에 머물지 않고,
세계를 계속 걸은 방랑자.

자유를 사랑하며, 수많은 풍경을
마음에 새긴 영혼입니다.`,
      traits: `호기심이 왕성하고, 구속을 싫어하며, 자신의 길을 가는 강인함이 있습니다.
변화를 두려워하지 않고, 새로운 세계로 뛰어들 수 있을 것입니다.`,
      soulTask: `「멈춰 서서 돌아보는 것」.
계속 나아가기만 하지 말고, 만난 인연을 소중히 길러 갑시다.`,
      luminaWord: `당신의 자유로운 영혼은, 누구도 묶을 수 없습니다.
그 걸음 끝에서, 진정 돌아가고 싶은 곳도 분명 찾게 될 것입니다.`,
    },
    healer: {
      name: "치유자",
      subtitle: "상처받은 사람들에게 다가간 영혼",
      overview: `당신의 전생은
「치유자」.

상처받은 사람들 곁에 다가가,
마음과 몸을 치유한 치료자.

보답을 바라지 않고,
그저 손을 계속 내민 영혼입니다.`,
      traits: `잘 챙기고, 누군가를 위해 움직이는 데에서 기쁨을 느낍니다.
다정하여, 사람의 약함과 아픔을 받아 주는 포용력이 있을 것입니다.`,
      soulTask: `「자신을 뒤로 미루지 않는 것」.
사람을 치유하기 전에, 먼저 당신 자신을 채워 줍시다.`,
      luminaWord: `당신의 손에는, 사람을 치유하는 따뜻함이 깃들어 있습니다.
그 손으로, 가끔은 당신 자신을 안아 주세요.`,
    },
    dragon_contract: {
      name: "용의 계약자",
      subtitle: "용과 인연을 맺은 강한 영혼",
      overview: `당신의 전생은
「용의 계약자」.

전설의 용과 인연을 맺어,
커다란 힘을 부여받은 자.

강한 의지와 각오를 가슴에 품고,
운명에 맞선 영혼입니다.`,
      traits: `심지가 강하여, 결정적인 순간에 흔들리지 않는 각오를 지니고 있습니다.
카리스마가 있어, 사람을 인도하고 이끌어 가는 힘이 있을 것입니다.`,
      soulTask: `「약함도 보여도 된다는 것을 아는 것」.
강하려 할수록, 솔직하게 기대는 용기도 소중해집니다.`,
      luminaWord: `당신의 안에는, 운명을 바꿀 만큼 강한 힘이 있습니다.
그 힘을, 부디 다정함과 함께 써 주세요.`,
    },
    star_traveler: {
      name: "별의 여행자",
      subtitle: "별들을 돌아온 특별한 영혼",
      overview: `당신의 전생은
「별의 여행자」.

하나의 세계에 머물지 않고,
별들을 돌아온 희귀한 영혼.

직감과 운명에 이끌려,
소중한 사명을 지니고
지금 이곳에 다다른 영혼입니다.`,
      traits: `강한 직감과, 운명을 느끼는 신기한 힘을 지니고 있습니다.
어딘가 종잡을 수 없고, 남과는 다른 시점으로 세계를 보고 있을 것입니다.`,
      soulTask: `「지금 이곳에 마음을 두는 것」.
멀리를 바라보면서도, 눈앞의 인연과 시간을 아끼며 사랑합시다.`,
      luminaWord: `당신은, 수많은 별을 돌아 이곳에 온 특별한 영혼입니다.
그 여행의 의미는, 앞으로의 이번 생에서 밝혀질 것입니다.`,
    },
  },
  "zh-TW": {
    tragic_princess: {
      name: "悲劇的公主",
      subtitle: "在愛與使命之間搖擺的靈魂",
      overview: `你的前世是
「悲劇的公主」。

一邊背負國家的未來，
卻愛上了身分有別之人的公主。

最後，為了守護所愛之人，
親自選擇了別離的靈魂。`,
      traits: `你至今仍懷有強烈的責任感，以及把周遭置於自己之前的溫柔。
即使壓抑真實的心情，也會想守護重要之人。`,
      soulTask: `「別放棄自己的幸福」。
不只為了某人而活，也請珍惜你自己的心願。`,
      luminaWord: `你已經，不必再為了某人而忍耐。
在這一世，你可以選擇自己的幸福。`,
    },
    loyal_knight: {
      name: "忠義的騎士",
      subtitle: "貫徹立誓守護之物的靈魂",
      overview: `你的前世是
「忠義的騎士」。

傾盡一生守護所愛之人
與該守護之物的騎士。

不違背約定，
貫徹榮耀至終的靈魂。`,
      traits: `一旦決定之事或對重要之人的心意，你不會輕易動搖。
誠懇，被倚靠時懷有把責任盡到最後的堅強。`,
      soulTask: `「放鬆肩上的力量」。
別把一切都扛起，偶爾也學會依靠他人吧。`,
      luminaWord: `你的忠義，至今仍撐著你的核心。
但你自己，也可以被某人守護。`,
    },
    white_witch: {
      name: "白之魔女",
      subtitle: "默默療癒眾人的靈魂",
      overview: `你的前世是
「白之魔女」。

在森林深處掌理藥與祈禱，
默默拯救人們的魔女。

即使懷著孤獨，
也不曾放開溫柔的靈魂。`,
      traits: `對他人的痛楚敏感，無法對陷入困境的人坐視不理。
擁有獨特的感性與直覺，有珍視獨處時光的一面。`,
      soulTask: `「主動敞開心扉」。
不只是給予，也可以把你的脆弱展現給某人。`,
      luminaWord: `你的溫柔，是不求回報的真正魔法。
在這一世，你也可以對某人撒嬌、依靠。`,
    },
    light_priest: {
      name: "光之神官",
      subtitle: "以祈禱引導眾人的靈魂",
      overview: `你的前世是
「光之神官」。

在神殿獻上祈禱，
引導迷惘之人內心的神官。

胸懷清澈的志向，
始終是人們希望的靈魂。`,
      traits: `懷有率直而誠懇的信念，擁有讓人安心的沉著。
珍視正確與美，自律之力強大。`,
      soulTask: `「允許自己不必完美」。
別因追求理想而過度責備自己。`,
      luminaWord: `在你的內在，有一道照亮他人的靜謐之光。
請先用那道光，照亮你自己。`,
    },
    star_seer: {
      name: "觀星者",
      subtitle: "在星辰中讀取命運的靈魂",
      overview: `你的前世是
「觀星者」。

解讀夜空繁星，
為人們占卜命運的賢者。

相信看不見之物，
持續凝望未來的靈魂。`,
      traits: `直覺敏銳，擁有感知事物本質與流向的力量。
靜靜觀察，懷有深思後再行動的謹慎。`,
      soulTask: `「在思考之前，先試著行動」。
別只是等待答案，主動向未來邁出一步吧。`,
      luminaWord: `你的直覺，至今仍正確地指向未來。
請相信那道聲音，邁出一步。`,
    },
    alchemist: {
      name: "鍊金術師",
      subtitle: "不斷探究真理的靈魂",
      overview: `你的前世是
「鍊金術師」。

追尋世界的真理，
將一生奉獻給探究的鍊金術師。

不斷追逐
無人見過之答案的靈魂。`,
      traits: `好奇心強，懷有不徹底弄懂不罷休的探究心。
擁有與眾不同的發想，以及獨特的世界觀。`,
      soulTask: `「別獨自承擔」。
把知識與成果與某人分享，世界便會更寬廣。`,
      luminaWord: `你的探究心，是推動世界前進的原動力。
請也將那份智慧，用於他人的幸福。`,
    },
    bard: {
      name: "吟遊詩人",
      subtitle: "以歌聲連繫人心的靈魂",
      overview: `你的前世是
「吟遊詩人」。

從一國旅行到另一國，
傳遞歌與故事的詩人。

在人們心中點亮燈火，
自由生活的靈魂。`,
      traits: `喜歡表達，擁有吸引人心的魅力。
開朗而輕盈，能享受新的相遇與變化。`,
      soulTask: `「在一處紮根」。
在保有自由的同時，也培育深而綿長的羈絆吧。`,
      luminaWord: `你的話語與表達，擁有拯救某人之心的力量。
請讓那道聲音，更響亮地迴盪於世界。`,
    },
    forest_guardian: {
      name: "森林守護者",
      subtitle: "持續守望生命的靈魂",
      overview: `你的前世是
「森林守護者」。

守望著森林與生靈，
靜靜地持續守護生命的守護者。

與自然共生，
尊崇和諧的靈魂。`,
      traits: `溫和而有安定感，讓相處之人安心。
即使不起眼，也擁有以確實的溫柔支撐周遭的力量。`,
      soulTask: `「踏出自己的世界」。
別只是守護，也對新的緣分與地方敞開心扉吧。`,
      luminaWord: `在你身旁，心會不可思議地平靜下來。
那份靜謐的溫柔，在這一世也將守護你重要的人。`,
    },
    sea_priestess: {
      name: "海之巫女",
      subtitle: "向大海獻上祈禱的靈魂",
      overview: `你的前世是
「海之巫女」。

在海邊的神社獻上祈禱，
祈願人們平安的巫女。

將自身託付於浩大的流動，
以豐沛感受力而活的靈魂。`,
      traits: `情感豐富，能敏銳地感受他人的心情。
懷有如溫柔包覆般的愛情，共鳴之力強大。`,
      soulTask: `「在自己與他人的情感間劃出界線」。
別過度背負對方的痛，也要守護自己的心。`,
      luminaWord: `你豐沛的感受力，是療癒他人的尊貴才能。
請也將你自己的心，同等地珍惜。`,
    },
    wanderer: {
      name: "旅行的流浪者",
      subtitle: "為了追尋自由而旅行的靈魂",
      overview: `你的前世是
「旅行的流浪者」。

不停留於一處，
持續行走世界的流浪者。

熱愛自由，將無數風景
銘刻於心的靈魂。`,
      traits: `好奇心旺盛，厭惡束縛，懷有走自己之路的堅強。
不畏改變，能躍入嶄新的世界。`,
      soulTask: `「停下腳步回望」。
別只是一味前行，也珍惜並培育所遇見的緣分吧。`,
      luminaWord: `你自由的靈魂，無人能束縛。
在那旅程的盡頭，你必定也會找到真正想歸返之處。`,
    },
    healer: {
      name: "療癒者",
      subtitle: "陪伴受傷之人的靈魂",
      overview: `你的前世是
「療癒者」。

陪伴在受傷之人身旁，
療癒身心的治療者。

不求回報，
只是不斷伸出援手的靈魂。`,
      traits: `善於照顧人，在為某人付出中感到喜悅。
溫柔，擁有接住他人脆弱與痛楚的包容力。`,
      soulTask: `「別把自己擺到最後」。
在療癒他人之前，先讓你自己充盈吧。`,
      luminaWord: `在你的手中，棲息著療癒他人的溫暖。
請用那雙手，偶爾也擁抱你自己。`,
    },
    dragon_contract: {
      name: "龍之契約者",
      subtitle: "與龍締結羈絆的強大靈魂",
      overview: `你的前世是
「龍之契約者」。

與傳說之龍締結羈絆，
被託付浩大力量之人。

胸懷堅強的意志與覺悟，
迎向命運的靈魂。`,
      traits: `核心堅定，在關鍵時刻懷有不動搖的覺悟。
具魅力，擁有引導並帶領他人的力量。`,
      soulTask: `「明白展現脆弱也無妨」。
愈想堅強，坦率依靠他人的勇氣便愈重要。`,
      luminaWord: `在你之中，有著足以改變命運的強大力量。
請將那份力量，與溫柔一同使用。`,
    },
    star_traveler: {
      name: "星之旅人",
      subtitle: "巡遊群星而來的特別靈魂",
      overview: `你的前世是
「星之旅人」。

不停留於一個世界，
巡遊群星而來的稀有靈魂。

受直覺與命運引導，
懷著重要的使命，
於此刻抵達此處的靈魂。`,
      traits: `懷有強烈的直覺，以及感知命運的奇妙力量。
有些難以捉摸，以與眾不同的視角看世界。`,
      soulTask: `「將心安放於此刻此地」。
在凝望遠方的同時，也珍愛眼前的緣分與時光。`,
      luminaWord: `你是巡遊了眾多星辰、來到此處的特別靈魂。
那趟旅程的意義，將在今後的這一世逐漸顯明。`,
    },
  },
};

/** 日本語の結果に指定言語のオーバーライドを合成（未訳は ja フォールバック）。 */
export function localizePastLifeResult(base: PastLifeResult, lang: Lang): PastLifeResult {
  if (lang === "ja") return base;
  const ov = pastlifeResultOverrides[lang]?.[base.id];
  if (!ov) return base;
  return {
    ...base,
    name: ov.name ?? base.name,
    subtitle: ov.subtitle ?? base.subtitle,
    overview: ov.overview ?? base.overview,
    traits: ov.traits ?? base.traits,
    soulTask: ov.soulTask ?? base.soulTask,
    luminaWord: ov.luminaWord ?? base.luminaWord,
    chapters: base.chapters.map((ch, i) => ({
      ...ch,
      title: ov.chapters?.[i]?.title ?? ch.title,
      body: ov.chapters?.[i]?.body ?? ch.body,
    })),
  };
}
