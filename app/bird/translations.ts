// 鳥タイプ診断ページの多言語文言。
// - UI文言・質問/選択肢は ja/en/ko/zh-TW を全訳。
// - 13タイプの結果本文は bird.ts(日本語)を正とし、未訳は ja フォールバック（localizeBirdResult）。
import type { Lang } from "@/lib/i18n/config";
import type { BirdId, BirdType } from "@/lib/bird/bird";

export type BirdUI = {
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
  loveTitle: string;
  workTitle: string;
  compatibleTitle: string;
  messageHeading: (name: string) => string;
  shareButton: string;
  saveImageButton: string;
  savingImage: string;
  retryButton: string;
  imageSaved: string;
  imageFailed: string;
  shareIntroText: string;
  shareResultText: (name: string, catchCopy: string) => string;
  mangaTitle: string;
  mangaDescription: string;
};

export type QuestionText = { text: string; options: string[] };

export const birdUI: Record<Lang, BirdUI> = {
  ja: {
    backTop: "← トップへ戻る",
    introTitle: "鳥タイプ診断",
    introLead: "12羽の鳥たちが教えてくれる、\nあなたの本当の性格",
    introInfo1: "あなたの考え方や行動パターンから、\n12羽の鳥の中で最も近いタイプを診断します。",
    introInfo2: "あなたは愛されるシマエナガ？\nそれとも知性派のヨウム？",
    introInfo3: "さっそく診断してみましょう。",
    startButton: "診断をはじめる",
    shareIntroButton: "友達にこの診断をシェア",
    questionLabel: (c, t) => `QUESTION ${c} / ${t}`,
    backButton: "← 戻る",
    resultEyebrow: "Your Bird Type",
    loveTitle: "恋愛傾向",
    workTitle: "仕事傾向",
    compatibleTitle: "相性の良い鳥",
    messageHeading: (name) => `${name}からのメッセージ`,
    shareButton: "Xでシェアする",
    saveImageButton: "画像を保存する",
    savingImage: "画像を生成中…",
    retryButton: "もう一度診断する",
    imageSaved: "画像を保存しました。",
    imageFailed: "画像の生成に失敗しました。時間をおいて再度お試しください。",
    shareIntroText:
      "12羽の鳥たちが教えてくれる、あなたの本当の性格🪶 あなたはどの鳥？【鳥タイプ診断】\n#鳥タイプ診断 #鳥たちの王国",
    shareResultText: (name, catchCopy) =>
      `私の鳥タイプは「${name}」でした🪶\n\n${catchCopy}\n\nあなたはどの鳥？ #鳥タイプ診断 #鳥たちの王国`,
    mangaTitle: "羽根の広場",
    mangaDescription: "鳥たちの漫画を読む",
  },
  en: {
    backTop: "← Back to top",
    introTitle: "Bird Type Diagnosis",
    introLead: "Your true nature, told by\n12 birds",
    introInfo1: "From your way of thinking and acting,\nwe find which of the 12 birds is closest to you.",
    introInfo2: "Are you the beloved Long-tailed Tit?\nOr the brainy African Grey?",
    introInfo3: "Let's begin the diagnosis.",
    startButton: "Start the diagnosis",
    shareIntroButton: "Share this diagnosis with friends",
    questionLabel: (c, t) => `QUESTION ${c} / ${t}`,
    backButton: "← Back",
    resultEyebrow: "Your Bird Type",
    loveTitle: "In love",
    workTitle: "At work",
    compatibleTitle: "Compatible birds",
    messageHeading: (name) => `Message from ${name}`,
    shareButton: "Share on X",
    saveImageButton: "Save image",
    savingImage: "Generating image…",
    retryButton: "Take the diagnosis again",
    imageSaved: "Image saved.",
    imageFailed: "Failed to generate the image. Please try again later.",
    shareIntroText:
      "Your true nature, told by 12 birds 🪶 Which bird are you? [Bird Type Diagnosis]\n#BirdTypeDiagnosis #BirdKingdom",
    shareResultText: (name, catchCopy) =>
      `My bird type is "${name}" 🪶\n\n${catchCopy}\n\nWhich bird are you? #BirdTypeDiagnosis #BirdKingdom`,
    mangaTitle: "Feather Plaza",
    mangaDescription: "Read the birds' comics",
  },
  ko: {
    backTop: "← 메인으로 돌아가기",
    introTitle: "새 타입 진단",
    introLead: "12마리의 새가 알려주는,\n당신의 진짜 성격",
    introInfo1: "당신의 사고방식과 행동 패턴으로부터,\n12마리의 새 중 가장 가까운 타입을 진단합니다.",
    introInfo2: "당신은 사랑받는 오목눈이?\n아니면 지성파인 회색앵무?",
    introInfo3: "바로 진단해 봅시다.",
    startButton: "진단 시작하기",
    shareIntroButton: "친구에게 이 진단 공유하기",
    questionLabel: (c, t) => `QUESTION ${c} / ${t}`,
    backButton: "← 뒤로",
    resultEyebrow: "Your Bird Type",
    loveTitle: "연애 성향",
    workTitle: "일 성향",
    compatibleTitle: "궁합이 좋은 새",
    messageHeading: (name) => `${name}의 메시지`,
    shareButton: "X에 공유하기",
    saveImageButton: "이미지 저장",
    savingImage: "이미지 생성 중…",
    retryButton: "다시 진단하기",
    imageSaved: "이미지를 저장했습니다.",
    imageFailed: "이미지 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    shareIntroText:
      "12마리의 새가 알려주는 당신의 진짜 성격 🪶 당신은 어떤 새? 【새 타입 진단】\n#새타입진단 #새들의왕국",
    shareResultText: (name, catchCopy) =>
      `제 새 타입은 「${name}」였어요 🪶\n\n${catchCopy}\n\n당신은 어떤 새? #새타입진단 #새들의왕국`,
    mangaTitle: "깃털 광장",
    mangaDescription: "새들의 만화 읽기",
  },
  "zh-TW": {
    backTop: "← 返回首頁",
    introTitle: "鳥類型診斷",
    introLead: "12隻鳥告訴你的，\n你真正的性格",
    introInfo1: "從你的思考方式與行為模式，\n診斷出12隻鳥之中最接近你的類型。",
    introInfo2: "你是惹人疼愛的銀喉長尾山雀？\n還是智慧派的非洲灰鸚鵡？",
    introInfo3: "馬上來診斷看看吧。",
    startButton: "開始診斷",
    shareIntroButton: "把這個診斷分享給朋友",
    questionLabel: (c, t) => `QUESTION ${c} / ${t}`,
    backButton: "← 返回",
    resultEyebrow: "Your Bird Type",
    loveTitle: "戀愛傾向",
    workTitle: "工作傾向",
    compatibleTitle: "契合的鳥",
    messageHeading: (name) => `來自${name}的訊息`,
    shareButton: "分享到 X",
    saveImageButton: "儲存圖片",
    savingImage: "圖片產生中…",
    retryButton: "再次診斷",
    imageSaved: "已儲存圖片。",
    imageFailed: "圖片產生失敗，請稍後再試。",
    shareIntroText:
      "12隻鳥告訴你的真正性格 🪶 你是哪一隻鳥？【鳥類型診斷】\n#鳥類型診斷 #鳥兒們的王國",
    shareResultText: (name, catchCopy) =>
      `我的鳥類型是「${name}」🪶\n\n${catchCopy}\n\n你是哪一隻鳥？ #鳥類型診斷 #鳥兒們的王國`,
    mangaTitle: "羽毛廣場",
    mangaDescription: "閱讀鳥兒們的漫畫",
  },
};

/** 質問・選択肢（id をキー、options 順は bird.ts と一致） */
export const questionTexts: Record<Lang, Record<number, QuestionText>> = {
  ja: {
    1: { text: "初対面の人が多い場所では？", options: ["自然と話しかけて、場を明るくする", "無理に目立たず、近くの人と少しずつ仲良くなる", "周りを観察して、どんな人たちか見極める", "気が合いそうな人を直感で見つける"] },
    2: { text: "休日の理想の過ごし方は？", options: ["友達や仲間と楽しく出かけたい", "大切な人とゆっくり過ごしたい", "一人で創作や趣味に没頭したい", "静かな場所で心を整えたい"] },
    3: { text: "友人が落ち込んでいたら？", options: ["明るい言葉で励ます", "何も言わず、そばで話を聞く", "原因を整理して、解決策を考える", "相手が安心できるように優しく見守る"] },
    4: { text: "恋愛で大切にしたいことは？", options: ["深い絆と一途な愛情", "安心できる穏やかな関係", "お互いを高め合える関係", "言葉にしなくても通じ合える感覚"] },
    5: { text: "褒められて一番うれしい言葉は？", options: ["「一緒にいると癒される」", "「信頼できる」", "「発想が面白い」", "「頭がいい」"] },
    6: { text: "物事を決めるときは？", options: ["直感でこれだと思う方を選ぶ", "情報を集めて冷静に判断する", "周りの人の気持ちも考えて決める", "自分の理想に近い方を選ぶ"] },
    7: { text: "集団の中での立ち位置は？", options: ["場を明るくするムードメーカー", "みんなをさりげなく支える存在", "静かに全体を見ている観察者", "独自のアイデアを出す変わり者"] },
    8: { text: "苦手な状況は？", options: ["大切な人との距離を感じること", "自分らしさを押し殺すこと", "騒がしすぎて心が休まらないこと", "誰かが傷ついているのに何もできないこと"] },
    9: { text: "仕事や役割で力を発揮しやすいのは？", options: ["人と人をつなぐ役割", "コツコツ信頼を積み上げる役割", "分析して最適解を見つける役割", "新しいものを生み出す役割"] },
    10: { text: "あなたの魅力に近いものは？", options: ["ふんわりした優しさ", "まっすぐな誠実さ", "華やかな存在感", "ミステリアスな知性"] },
    11: { text: "子どもの頃から変わらないところは？", options: ["好きな人やものを大切にするところ", "知らないことを知りたくなるところ", "空想や自分だけの世界があるところ", "人の気持ちに敏感なところ"] },
    12: { text: "理想の自分は？", options: ["誰かの心を明るくできる人", "大切な人に信頼される人", "自分の美学を持っている人", "物事の本質を見抜ける人"] },
    13: { text: "トラブルが起きたときは？", options: ["まず落ち着いて状況を整理する", "みんなを安心させようとする", "逆転のアイデアを考える", "とにかく動いて空気を変える"] },
    14: { text: "ひとつだけ魔法を使えるなら？", options: ["誰かの悲しみをやわらげる魔法", "大切な人との絆を守る魔法", "未来のヒントが見える魔法", "新しい世界を作る魔法"] },
    15: { text: "あなたが惹かれる世界は？", options: ["花と光に包まれた優しい庭", "静かな月明かりの森", "本と星図が並ぶ秘密の書斎", "白い城と湖が輝く美しい国"] },
    16: { text: "最後に、今のあなたの心に一番近いものは？", options: ["誰かに優しくしたい", "大切なものを守りたい", "もっと自由に生きたい", "まだ見ぬ未来へ進みたい"] },
  },
  en: {
    1: { text: "In a place full of people you're meeting for the first time?", options: ["Naturally strike up conversation and brighten the room", "Without standing out, gradually get close to those nearby", "Observe and figure out what kind of people they are", "Intuitively find someone you'd click with"] },
    2: { text: "Your ideal way to spend a day off?", options: ["Go out and have fun with friends", "Spend relaxed time with someone dear", "Dive into creating or hobbies alone", "Calm my heart in a quiet place"] },
    3: { text: "If a friend is feeling down?", options: ["Cheer them up with bright words", "Say nothing and just listen beside them", "Sort out the cause and think of a solution", "Watch over them gently so they feel safe"] },
    4: { text: "What you want to value in love?", options: ["Deep bonds and devoted love", "A calm, reassuring relationship", "A relationship that lifts each other up", "Understanding each other without words"] },
    5: { text: "The compliment that makes you happiest?", options: ["\"You're so soothing to be around\"", "\"I can trust you\"", "\"Your ideas are interesting\"", "\"You're smart\""] },
    6: { text: "When you decide things?", options: ["Pick what intuitively feels right", "Gather info and judge calmly", "Decide considering others' feelings too", "Choose what's closer to your ideal"] },
    7: { text: "Your position within a group?", options: ["The mood-maker who brightens things", "The one who quietly supports everyone", "The observer quietly watching the whole", "The eccentric with original ideas"] },
    8: { text: "A situation you struggle with?", options: ["Feeling distance from someone dear", "Suppressing who you really are", "Too much noise to rest your heart", "Being unable to help someone who's hurting"] },
    9: { text: "Where you shine in work or roles?", options: ["Connecting people", "Steadily building trust", "Analyzing to find the best answer", "Creating something new"] },
    10: { text: "What's closest to your charm?", options: ["Soft, gentle kindness", "Straightforward sincerity", "Dazzling presence", "Mysterious intellect"] },
    11: { text: "What hasn't changed since childhood?", options: ["Cherishing the people and things you love", "Wanting to know what you don't know", "Having daydreams and a world of your own", "Being sensitive to others' feelings"] },
    12: { text: "Your ideal self?", options: ["Someone who can brighten others' hearts", "Someone trusted by those they love", "Someone with their own aesthetic", "Someone who sees the essence of things"] },
    13: { text: "When trouble arises?", options: ["First calm down and sort the situation", "Try to reassure everyone", "Think up a game-changing idea", "Just act and change the mood"] },
    14: { text: "If you could use just one magic?", options: ["Magic to ease someone's sorrow", "Magic to protect a bond with someone dear", "Magic to glimpse hints of the future", "Magic to create a new world"] },
    15: { text: "The world that draws you?", options: ["A gentle garden wrapped in flowers and light", "A quiet moonlit forest", "A secret study lined with books and star charts", "A beautiful land of white castles and shining lakes"] },
    16: { text: "Finally, what's closest to your heart right now?", options: ["I want to be kind to someone", "I want to protect what's precious", "I want to live more freely", "I want to move toward an unseen future"] },
  },
  ko: {
    1: { text: "처음 만나는 사람이 많은 곳에서는?", options: ["자연스럽게 말을 걸어 분위기를 밝게 한다", "무리하게 튀지 않고 가까운 사람과 조금씩 친해진다", "주위를 관찰하며 어떤 사람들인지 파악한다", "마음이 맞을 것 같은 사람을 직감으로 찾는다"] },
    2: { text: "휴일의 이상적인 보내는 방법은?", options: ["친구나 동료와 즐겁게 외출하고 싶다", "소중한 사람과 느긋하게 보내고 싶다", "혼자 창작이나 취미에 몰두하고 싶다", "조용한 곳에서 마음을 다스리고 싶다"] },
    3: { text: "친구가 의기소침해 있다면?", options: ["밝은 말로 격려한다", "아무 말 없이 곁에서 이야기를 듣는다", "원인을 정리하고 해결책을 생각한다", "상대가 안심할 수 있도록 부드럽게 지켜본다"] },
    4: { text: "연애에서 중요하게 여기고 싶은 것은?", options: ["깊은 유대와 한결같은 사랑", "안심할 수 있는 온화한 관계", "서로를 끌어올려 주는 관계", "말하지 않아도 통하는 감각"] },
    5: { text: "칭찬받아서 가장 기쁜 말은?", options: ["「함께 있으면 힐링돼」", "「믿음직해」", "「발상이 재밌어」", "「똑똑해」"] },
    6: { text: "무언가를 결정할 때는?", options: ["직감으로 이거다 싶은 쪽을 고른다", "정보를 모아 냉정하게 판단한다", "주위 사람의 마음도 생각해 결정한다", "자신의 이상에 가까운 쪽을 고른다"] },
    7: { text: "집단 속에서의 위치는?", options: ["분위기를 밝게 하는 무드메이커", "모두를 은근히 받쳐 주는 존재", "조용히 전체를 보는 관찰자", "독자적인 아이디어를 내는 별난 사람"] },
    8: { text: "어려워하는 상황은?", options: ["소중한 사람과의 거리를 느끼는 것", "자기다움을 억누르는 것", "너무 시끄러워 마음이 쉬지 못하는 것", "누군가 상처받는데 아무것도 못 하는 것"] },
    9: { text: "일이나 역할에서 힘을 발휘하기 쉬운 것은?", options: ["사람과 사람을 잇는 역할", "차곡차곡 신뢰를 쌓는 역할", "분석해 최적의 답을 찾는 역할", "새로운 것을 만들어 내는 역할"] },
    10: { text: "당신의 매력에 가까운 것은?", options: ["포근한 다정함", "올곧은 성실함", "화려한 존재감", "신비로운 지성"] },
    11: { text: "어릴 적부터 변하지 않은 점은?", options: ["좋아하는 사람이나 것을 소중히 하는 점", "모르는 것을 알고 싶어 하는 점", "공상이나 나만의 세계가 있는 점", "사람의 마음에 민감한 점"] },
    12: { text: "이상적인 나의 모습은?", options: ["누군가의 마음을 밝게 할 수 있는 사람", "소중한 사람에게 신뢰받는 사람", "자신의 미학을 지닌 사람", "사물의 본질을 꿰뚫는 사람"] },
    13: { text: "문제가 생겼을 때는?", options: ["우선 침착하게 상황을 정리한다", "모두를 안심시키려 한다", "역전의 아이디어를 생각한다", "일단 움직여 분위기를 바꾼다"] },
    14: { text: "단 하나의 마법을 쓸 수 있다면?", options: ["누군가의 슬픔을 누그러뜨리는 마법", "소중한 사람과의 유대를 지키는 마법", "미래의 힌트가 보이는 마법", "새로운 세계를 만드는 마법"] },
    15: { text: "당신이 끌리는 세계는?", options: ["꽃과 빛에 둘러싸인 다정한 정원", "고요한 달빛의 숲", "책과 별자리표가 늘어선 비밀의 서재", "하얀 성과 호수가 빛나는 아름다운 나라"] },
    16: { text: "마지막으로, 지금 당신의 마음에 가장 가까운 것은?", options: ["누군가에게 다정하게 대하고 싶다", "소중한 것을 지키고 싶다", "더 자유롭게 살고 싶다", "아직 보지 못한 미래로 나아가고 싶다"] },
  },
  "zh-TW": {
    1: { text: "在初次見面的人很多的場合，你會？", options: ["自然地搭話、炒熱氣氛", "不勉強出風頭，和身旁的人慢慢熟絡", "觀察周遭，看清楚是怎樣的人", "憑直覺找出合得來的人"] },
    2: { text: "假日理想的度過方式是？", options: ["想和朋友、夥伴開心出遊", "想和重要的人悠閒共度", "想獨自沉浸於創作或興趣", "想在安靜的地方整理心緒"] },
    3: { text: "如果朋友情緒低落？", options: ["用開朗的話語鼓勵", "什麼也不說，在身旁傾聽", "梳理原因、思考解決方法", "溫柔守候，讓對方安心"] },
    4: { text: "戀愛中你想重視的是？", options: ["深刻的羈絆與專一的愛", "令人安心的平穩關係", "能彼此提升的關係", "無需言語也能心意相通的感覺"] },
    5: { text: "最讓你開心的稱讚是？", options: ["「和你在一起很療癒」", "「值得信賴」", "「想法很有趣」", "「很聰明」"] },
    6: { text: "做決定的時候？", options: ["憑直覺選出覺得對的那個", "蒐集資訊、冷靜判斷", "也顧及他人的心情再決定", "選擇更接近自己理想的那個"] },
    7: { text: "在團體中的定位是？", options: ["炒熱氣氛的開心果", "默默支撐大家的存在", "靜靜觀察全局的觀察者", "提出獨特點子的怪咖"] },
    8: { text: "你不擅長的情境是？", options: ["感受到與重要之人的距離", "壓抑真實的自己", "太吵雜讓心無法休息", "有人受傷自己卻無能為力"] },
    9: { text: "在工作或角色中容易發揮的是？", options: ["連結人與人的角色", "踏實累積信賴的角色", "分析並找出最佳解的角色", "創造新事物的角色"] },
    10: { text: "最接近你魅力的是？", options: ["柔軟溫柔的善意", "率直的誠懇", "華麗的存在感", "神秘的知性"] },
    11: { text: "從小到大不變的地方是？", options: ["珍惜喜歡的人事物", "對未知充滿求知欲", "擁有幻想與專屬自己的世界", "對他人心情敏感"] },
    12: { text: "理想中的自己是？", options: ["能照亮他人內心的人", "被重要之人信賴的人", "擁有自己美學的人", "能看穿事物本質的人"] },
    13: { text: "發生麻煩時？", options: ["先冷靜下來梳理狀況", "試著讓大家安心", "思考翻盤的點子", "總之先行動、改變氣氛"] },
    14: { text: "如果只能使用一種魔法？", options: ["撫平他人悲傷的魔法", "守護與重要之人羈絆的魔法", "能看見未來提示的魔法", "創造新世界的魔法"] },
    15: { text: "吸引你的世界是？", options: ["被花與光包圍的溫柔庭園", "靜謐月光下的森林", "擺滿書與星圖的祕密書房", "白色城堡與湖泊閃耀的美麗國度"] },
    16: { text: "最後，最貼近此刻你內心的是？", options: ["想對某人溫柔", "想守護重要的事物", "想活得更自由", "想邁向尚未可見的未來"] },
  },
};

/** 言語別の結果オーバーライド（未訳は空＝ja フォールバック） */
export type BirdResultOverride = {
  name?: string;
  catchCopy?: string;
  description?: string;
  love?: string;
  work?: string;
  compatible?: string;
  message?: string;
};

export const birdResultOverrides: Record<Lang, Partial<Record<BirdId, BirdResultOverride>>> = {
  ja: {},
  en: {
    simaenaga: {
      name: "Long-tailed Tit",
      catchCopy: "The Long-tailed Tit type, called the fairy of the snow.",
      description: `You are a healing presence that naturally puts those around you at ease. The kindness and care you take for granted give many people a sense of security.

Disliking conflict, you are skilled at creating a warm atmosphere between people. You may rarely push forward forcefully, but your very presence is surely someone's support.`,
      love: `In love, you cherish a sense of security.

More than intense games, you're drawn to a relationship where you can be your natural self. To the one you love, you draw gently close and pour an enfolding affection.`,
      work: "You shine in roles that support others. You're often trusted as a coordinator or a support role.",
      compatible: "Cockatiel, Java Sparrow",
      message: `Your kindness saves more people than you realize.
Please, cherish that warm heart.`,
    },
    buncho: {
      name: "Java Sparrow",
      catchCopy: "The Java Sparrow type, valuing sincerity and trust.",
      description: `You are someone who cherishes a bond once formed. More than casual ties, you seek a relationship you can deeply trust.

With a strong sense of responsibility, you spare no effort to keep your promises.`,
      love: `In love, you are very devoted.

You cherish the one you fall for over a long time, finding joy in nurturing the relationship.`,
      work: "You're good at work built up steadily. You're often seen as someone things can be entrusted to with peace of mind.",
      compatible: "Lovebird, Long-tailed Tit",
      message: `There's no need to rush.
Your sincerity will surely return to you in the form of trust.`,
    },
    sekiseiinko: {
      name: "Budgerigar",
      catchCopy: "A bright, sociable favorite.",
      description: `You are full of curiosity and gain energy from interacting with people.

You enjoy new encounters and can naturally open up with anyone.`,
      love: `You're the type who wants love to go fun and positive.

Cherishing conversation and time spent together, love often develops from a friend-like relationship.`,
      work: "You shine in people-facing work like customer service, sales, and PR.",
      compatible: "Caique, Long-tailed Tit",
      message: "Your smile is magic that moves people's hearts.",
    },
    kozakurainko: {
      name: "Lovebird",
      catchCopy: "A deeply affectionate, passionate bird.",
      description: `You are someone who loves dear ones from the heart and tries to protect them with all your might.

Rich in expressing affection, you cherish bonds with people above all.`,
      love: `Very devoted and passionate.

You love the one you fall for deeply and try to cherish them for a long time.`,
      work: "Work that builds relationships of trust with people suits you.",
      compatible: "Java Sparrow, Barn Owl",
      message: "Your affection becomes a light that warms someone's life.",
    },
    okameinko: {
      name: "Cockatiel",
      catchCopy: "A calm healer.",
      description: `You are kind and able to consider others' feelings.

Even without forcing yourself to stand out, you're a presence that gives those around you a sense of security.`,
      love: `You prefer a calm, gentle romance.

You feel happy in a relationship where you can be at ease together.`,
      work: "You shine as a support or a teaching role.",
      compatible: "Long-tailed Tit, Barn Owl",
      message: `There's no need to rush.
Your own kind of gentleness is properly reaching someone.`,
    },
    urokoinko: {
      name: "Conure",
      catchCopy: "A creator with free ideas.",
      description: `You are full of curiosity and hold an unconventional charm.

You have the power to give birth to new ideas and a worldview all your own.`,
      love: "Disliking restraint, you seek a relationship where you can respect each other.",
      work: "You show your talent in creative fields and planning roles.",
      compatible: "Crow, Swan",
      message: `Your individuality is a treasure.
There's no need to be the same as anyone else.`,
    },
    siroharainko: {
      name: "Caique",
      catchCopy: "A mood-maker who brightens any place.",
      description: "You love fun things and have a talent for making people smile.",
      love: "You seek a romance that's fun to be in together.",
      work: "You can thrive in fields that delight people, like events and hospitality.",
      compatible: "Budgerigar, Long-tailed Tit",
      message: "Your brightness is making the world just a little gentler.",
    },
    youmu: {
      name: "African Grey Parrot",
      catchCopy: "A seeker of intellect.",
      description: `You are someone who can enjoy learning and thinking.

You hold a desire to understand not just the surface of things, but their essence.`,
      love: "You cherish intellectual exchange with a trustworthy partner.",
      work: "You show your power in fields like analysis, research, and education.",
      compatible: "Snowy Owl, Crow",
      message: "Your knowledge becomes a lamp that lights the future.",
    },
    sirohukurou: {
      name: "Snowy Owl",
      catchCopy: "A quiet sage.",
      description: `You are calm and excel in insight.

You hold the power to see through to an essence others overlook.`,
      love: "You value a spiritual connection.",
      work: "You thrive in strategy-making, analysis, and as an advisor.",
      compatible: "African Grey Parrot, Barn Owl",
      message: "It is within stillness that the true answer lies.",
    },
    menhukurou: {
      name: "Barn Owl",
      catchCopy: "A guardian who senses the heart.",
      description: "You have high empathy and can sensitively perceive others' feelings.",
      love: "You seek a deep connection of the heart.",
      work: "Roles like an advisor or counselor suit you.",
      compatible: "Cockatiel, Lovebird",
      message: "Your kindness has become a place where someone's heart can belong.",
    },
    hakucho: {
      name: "Swan",
      catchCopy: "A noble idealist.",
      description: `You are someone who pursues beauty and ideals.

Setting high goals, you have the power to keep refining yourself.`,
      love: "You're drawn to a relationship where you can respect each other.",
      work: "You can shine as a leader or a performer.",
      compatible: "Conure, Snowy Owl",
      message: `Please don't fear chasing your ideals.
Beyond them lies scenery that is yours alone.`,
    },
    karasu: {
      name: "Crow",
      catchCopy: "An original inventor.",
      description: `You hold flexible inventiveness and a sense of strategy.

You can see the world from a viewpoint different from others.`,
      love: "You prefer a stimulating, intellectual relationship.",
      work: "You show your talent in planning, development, and entrepreneurship.",
      compatible: "African Grey Parrot, Conure",
      message: "It is outside common sense that new possibilities sleep.",
    },
    haku: {
      name: "Haku",
      catchCopy: "A special bird that carries the light.",
      description: `Haku is a being that appears only very rarely, even in the kingdom of birds.

You hold kindness, hope, intuition, and guidance all together.

You naturally extend a hand to those in trouble, with the power to brightly light someone's future.`,
      love: "You hold a deep affection that enfolds your partner.",
      work: "You show great power in roles that support and guide people.",
      compatible: "Long-tailed Tit, Barn Owl, Swan",
      message: `Within you is a light you haven't noticed yet.

Please believe in that light.

Surely a day will come when it becomes someone's hope.`,
    },
  },
  ko: {
    simaenaga: {
      name: "오목눈이",
      catchCopy: "눈의 요정이라 불리는 오목눈이 타입.",
      description: `당신은 주위를 자연스럽게 누그러뜨리는 치유의 존재입니다. 스스로는 당연하다 여기는 다정함과 배려가, 많은 사람에게 안심을 줍니다.

다툼을 좋아하지 않고, 사람과 사람 사이에 따뜻한 공기를 만드는 데 능합니다. 억지로 앞에 나서는 일은 적을지 몰라도, 그 존재 자체가 누군가의 버팀목이 되어 있을 것입니다.`,
      love: `연애에서는 안심감을 소중히 하는 타입입니다.

격렬한 밀당보다, 자연스러운 그대로 있을 수 있는 관계에 끌립니다. 좋아하는 사람에게는 다정하게 다가가, 상대를 감싸 안는 듯한 애정을 쏟습니다.`,
      work: "사람을 받쳐 주는 역할에서 힘을 발휘합니다. 조율자나 서포트 역할로 신뢰받는 일이 많을 것입니다.",
      compatible: "왕관앵무・문조",
      message: `당신의 다정함은 생각보다 많은 사람을 구하고 있습니다.
그 따뜻한 마음을, 부디 소중히 하세요.`,
    },
    buncho: {
      name: "문조",
      catchCopy: "성실함과 신뢰를 소중히 하는 문조 타입.",
      description: `당신은 한 번 맺은 인연을 소중히 하는 사람입니다. 가벼운 사귐보다, 깊이 신뢰할 수 있는 관계를 원합니다.

책임감이 강하여, 약속을 지키기 위해 노력을 아끼지 않을 것입니다.`,
      love: `연애에서는 매우 한결같습니다.

좋아하게 된 상대를 오래 소중히 하며, 관계를 키워 가는 데에서 기쁨을 느낍니다.`,
      work: "차곡차곡 쌓아 가는 일을 잘합니다. 주위에서 안심하고 맡길 수 있는 사람이라 여기는 일이 많을 것입니다.",
      compatible: "모란앵무・오목눈이",
      message: `서두르지 않아도 괜찮습니다.
당신의 성실함은 반드시 신뢰라는 형태로 돌아옵니다.`,
    },
    sekiseiinko: {
      name: "사랑앵무",
      catchCopy: "밝고 사교적인 인기인.",
      description: `당신은 호기심이 왕성하여, 사람과의 교류에서 에너지를 얻는 타입입니다.

새로운 만남을 즐기고, 누구와도 자연스럽게 어울릴 수 있습니다.`,
      love: `연애는 즐겁고 긍정적으로 진행하고 싶은 타입.

대화나 함께 보내는 시간을 소중히 하며, 친구 같은 관계에서 사랑으로 발전하는 일도 많을 것입니다.`,
      work: "접객・영업・홍보 등 사람과 관계하는 일에서 빛납니다.",
      compatible: "흰배카이큐・오목눈이",
      message: "당신의 미소는, 사람의 마음을 움직이는 마법입니다.",
    },
    kozakurainko: {
      name: "모란앵무",
      catchCopy: "애정 깊고 정열적인 새.",
      description: `당신은 소중한 사람을 진심으로 사랑하고, 온 힘으로 지키려는 사람입니다.

애정 표현이 풍부하고, 사람과의 유대를 무엇보다 소중히 합니다.`,
      love: `매우 한결같고 정열적.

좋아하게 된 상대를 깊이 사랑하며, 오래 소중히 하려 합니다.`,
      work: "사람과의 신뢰 관계를 쌓는 일이 잘 맞습니다.",
      compatible: "문조・가면올빼미",
      message: "당신의 애정은, 누군가의 인생을 따뜻하게 하는 빛이 됩니다.",
    },
    okameinko: {
      name: "왕관앵무",
      catchCopy: "온화한 치유자.",
      description: `당신은 다정하고, 사람의 마음을 헤아릴 수 있는 사람입니다.

억지로 튀지 않아도, 주위에 안심을 주는 존재일 것입니다.`,
      love: `온화하고 다정한 연애를 좋아합니다.

함께 있어 편안해지는 관계에 행복을 느낍니다.`,
      work: "서포트 역할이나 교육 역할로 힘을 발휘합니다.",
      compatible: "오목눈이・가면올빼미",
      message: `초조해하지 않아도 괜찮습니다.
당신다운 다정함이, 분명 누군가에게 닿고 있습니다.`,
    },
    urokoinko: {
      name: "초록뺨코뉴어",
      catchCopy: "자유로운 발상을 지닌 창조자.",
      description: `당신은 호기심이 왕성하고, 틀에 얽매이지 않는 매력을 지니고 있습니다.

새로운 아이디어나 독자적인 세계관을 만들어 내는 힘이 있을 것입니다.`,
      love: "구속을 싫어하고, 서로 존중할 수 있는 관계를 원합니다.",
      work: "크리에이티브한 분야나 기획 직무에서 재능을 발휘합니다.",
      compatible: "까마귀・백조",
      message: `당신의 개성은 보물입니다.
누군가와 같을 필요는 없습니다.`,
    },
    siroharainko: {
      name: "흰배카이큐",
      catchCopy: "분위기를 밝게 하는 무드메이커.",
      description: "당신은 즐거운 일을 무척 좋아하고, 사람을 미소 짓게 하는 재능이 있습니다.",
      love: "함께 있어 즐거운 연애를 원합니다.",
      work: "이벤트나 접객 등, 사람을 즐겁게 하는 분야에서 활약할 수 있습니다.",
      compatible: "사랑앵무・오목눈이",
      message: "당신의 밝음은, 세계를 조금 더 다정하게 만들고 있습니다.",
    },
    youmu: {
      name: "회색앵무",
      catchCopy: "지성의 탐구자.",
      description: `당신은 배우고 생각하는 것을 즐길 수 있는 사람입니다.

사물의 표면뿐 아니라, 본질을 이해하고 싶은 욕구를 지니고 있습니다.`,
      love: "신뢰할 수 있는 상대와의 지적인 교류를 소중히 합니다.",
      work: "분석・연구・교육 등의 분야에서 힘을 발휘합니다.",
      compatible: "흰올빼미・까마귀",
      message: "당신의 지식은, 미래를 비추는 등불이 됩니다.",
    },
    sirohukurou: {
      name: "흰올빼미",
      catchCopy: "고요한 현자.",
      description: `당신은 냉정하고 통찰력이 뛰어납니다.

사람이 놓치는 본질을 꿰뚫어 보는 힘을 지니고 있습니다.`,
      love: "정신적인 이어짐을 중시합니다.",
      work: "전략 수립이나 분석, 상담역으로 활약합니다.",
      compatible: "회색앵무・가면올빼미",
      message: "고요함 속에야말로, 진짜 답이 있습니다.",
    },
    menhukurou: {
      name: "가면올빼미",
      catchCopy: "마음을 헤아리는 수호자.",
      description: "당신은 공감력이 높아, 사람의 마음을 민감하게 알아챌 수 있습니다.",
      love: "깊은 마음의 이어짐을 원합니다.",
      work: "상담역이나 카운슬러 같은 역할이 잘 맞습니다.",
      compatible: "왕관앵무・모란앵무",
      message: "당신의 다정함은, 누군가의 마음의 안식처가 되어 있습니다.",
    },
    hakucho: {
      name: "백조",
      catchCopy: "고결한 이상가.",
      description: `당신은 아름다움과 이상을 추구하는 사람입니다.

높은 목표를 내걸고, 자기 자신을 계속 갈고닦는 힘이 있습니다.`,
      love: "서로 존경할 수 있는 관계에 끌립니다.",
      work: "리더나 표현가로서 빛날 수 있습니다.",
      compatible: "초록뺨코뉴어・흰올빼미",
      message: `이상을 좇는 것을 두려워하지 마세요.
그 너머에, 당신만의 풍경이 있습니다.`,
    },
    karasu: {
      name: "까마귀",
      catchCopy: "독창적인 발명가.",
      description: `당신은 유연한 발상력과 전략성을 지니고 있습니다.

남과 다른 시점으로 세계를 볼 수 있을 것입니다.`,
      love: "자극적이고 지적인 관계를 좋아합니다.",
      work: "기획・개발・창업 등에서 재능을 발휘합니다.",
      compatible: "회색앵무・초록뺨코뉴어",
      message: "상식의 바깥쪽에야말로, 새로운 가능성이 잠들어 있습니다.",
    },
    haku: {
      name: "하쿠",
      catchCopy: "빛을 나르는 특별한 새.",
      description: `하쿠는, 새들의 왕국에서도 아주 드물게 나타나는 존재입니다.

당신은 다정함, 희망, 직감, 인도를 함께 지니고 있습니다.

곤란한 사람에게 자연스럽게 손을 내밀며, 사람의 미래를 밝게 비추는 힘이 있을 것입니다.`,
      love: "상대를 감싸 안는 듯한 깊은 애정을 지니고 있습니다.",
      work: "사람을 받치고 인도하는 역할에서 큰 힘을 발휘합니다.",
      compatible: "오목눈이・가면올빼미・백조",
      message: `당신 안에는, 아직 알아채지 못한 빛이 있습니다.

그 빛을 믿으세요.

분명 누군가의 희망이 되는 날이 찾아올 것입니다.`,
    },
  },
  "zh-TW": {
    simaenaga: {
      name: "銀喉長尾山雀",
      catchCopy: "被稱為雪之精靈的銀喉長尾山雀類型。",
      description: `你是自然地讓周遭緩和下來的療癒存在。你視為理所當然的溫柔與體貼，給予許多人安心。

不喜爭鬥，擅長在人與人之間營造溫暖的氛圍。或許鮮少強行出頭，但你的存在本身，已成為某人的支柱。`,
      love: `在戀愛中，是珍視安心感的類型。

比起激烈的拉鋸，你更受能保持自然本色之關係吸引。對喜歡的人溫柔靠近，傾注如包覆般的愛意。`,
      work: "在支撐他人的角色中發揮力量。常以協調者或輔助角色受信賴。",
      compatible: "玄鳳鸚鵡、文鳥",
      message: `你的溫柔，拯救著比你想像中更多的人。
那顆溫暖的心，請務必好好珍惜。`,
    },
    buncho: {
      name: "文鳥",
      catchCopy: "珍視誠懇與信賴的文鳥類型。",
      description: `你是珍惜一旦結下之緣分的人。比起淺淡的交往，你更追求能深深信賴的關係。

責任感強，為了守住約定不惜努力。`,
      love: `在戀愛中非常專一。

會長久珍惜所喜歡的對象，在培育關係中感到喜悅。`,
      work: "擅長踏實累積的工作。常被周遭視為能安心託付的人。",
      compatible: "牡丹鸚鵡、銀喉長尾山雀",
      message: `不必著急。
你的誠懇，必定會以信賴的形式回到你身上。`,
    },
    sekiseiinko: {
      name: "虎皮鸚鵡",
      catchCopy: "開朗而善於社交的人氣王。",
      description: `你好奇心旺盛，從與人的交流中獲得能量。

享受新的相遇，能與任何人自然地打成一片。`,
      love: `戀愛是想開心而正向推進的類型。

珍視交談與共處的時光，常從朋友般的關係發展為戀情。`,
      work: "在接待、業務、公關等與人互動的工作中閃耀。",
      compatible: "白腹凱克鸚鵡、銀喉長尾山雀",
      message: "你的笑容，是撼動人心的魔法。",
    },
    kozakurainko: {
      name: "牡丹鸚鵡",
      catchCopy: "深情而熱情的鳥。",
      description: `你是打從心底愛著重要之人、全力想守護對方的人。

愛意的表達豐富，比什麼都珍視與人的羈絆。`,
      love: `非常專一而熱情。

深愛所喜歡的對象，想長久珍惜。`,
      work: "適合建立人際信賴關係的工作。",
      compatible: "文鳥、倉鴞",
      message: "你的愛情，會成為溫暖某人人生的光。",
    },
    okameinko: {
      name: "玄鳳鸚鵡",
      catchCopy: "溫和的療癒者。",
      description: `你溫柔，且能設身處地為他人著想。

即使不勉強出風頭，也是給周遭帶來安心的存在。`,
      love: `偏好平穩而溫柔的戀愛。

在一起能令人安定的關係，讓你感到幸福。`,
      work: "在輔助角色或教育角色中發揮力量。",
      compatible: "銀喉長尾山雀、倉鴞",
      message: `不必焦急。
屬於你的溫柔，確實正傳達給某個人。`,
    },
    urokoinko: {
      name: "綠頰錐尾鸚鵡",
      catchCopy: "擁有自由發想的創造者。",
      description: `你好奇心旺盛，擁有不落俗套的魅力。

擁有催生新點子與獨特世界觀的力量。`,
      love: "厭惡束縛，追求能彼此尊重的關係。",
      work: "在創意領域或企劃職務中發揮才能。",
      compatible: "烏鴉、天鵝",
      message: `你的個性是寶物。
無須與任何人相同。`,
    },
    siroharainko: {
      name: "白腹凱克鸚鵡",
      catchCopy: "炒熱氣氛的開心果。",
      description: "你非常喜歡歡樂的事，擁有讓人露出笑容的才能。",
      love: "追求在一起很開心的戀愛。",
      work: "能在活動、接待等讓人歡樂的領域中大放異彩。",
      compatible: "虎皮鸚鵡、銀喉長尾山雀",
      message: "你的開朗，正讓世界變得稍微溫柔一些。",
    },
    youmu: {
      name: "非洲灰鸚鵡",
      catchCopy: "知性的探究者。",
      description: `你是能享受學習與思考的人。

懷有不只想了解事物表面、更想理解其本質的渴望。`,
      love: "珍視與值得信賴之對象的知性交流。",
      work: "在分析、研究、教育等領域發揮力量。",
      compatible: "雪鴞、烏鴉",
      message: "你的知識，會成為照亮未來的燈火。",
    },
    sirohukurou: {
      name: "雪鴞",
      catchCopy: "靜謐的賢者。",
      description: `你冷靜且洞察力出眾。

擁有看穿他人忽略之本質的力量。`,
      love: "重視精神上的連結。",
      work: "在策略擬定、分析與顧問角色中活躍。",
      compatible: "非洲灰鸚鵡、倉鴞",
      message: "唯有在寂靜之中，才有真正的答案。",
    },
    menhukurou: {
      name: "倉鴞",
      catchCopy: "感受人心的守護者。",
      description: "你同理心高，能敏銳地察覺他人的心情。",
      love: "追求深刻的心靈連結。",
      work: "適合顧問或諮商師之類的角色。",
      compatible: "玄鳳鸚鵡、牡丹鸚鵡",
      message: "你的溫柔，已成為某人心靈的歸屬。",
    },
    hakucho: {
      name: "天鵝",
      catchCopy: "高潔的理想家。",
      description: `你是追求美與理想的人。

揭示崇高的目標，擁有不斷磨練自我的力量。`,
      love: "受能彼此敬重之關係吸引。",
      work: "能以領導者或表演者之姿閃耀。",
      compatible: "綠頰錐尾鸚鵡、雪鴞",
      message: `請別害怕追逐理想。
在那之後，有著只屬於你的風景。`,
    },
    karasu: {
      name: "烏鴉",
      catchCopy: "獨創的發明家。",
      description: `你擁有靈活的發想力與策略性。

能以與眾不同的視角看世界。`,
      love: "偏好刺激而知性的關係。",
      work: "在企劃、開發、創業等領域發揮才能。",
      compatible: "非洲灰鸚鵡、綠頰錐尾鸚鵡",
      message: "唯有在常識的外側，才沉睡著新的可能。",
    },
    haku: {
      name: "哈庫",
      catchCopy: "運送光的特別之鳥。",
      description: `哈庫，是在鳥兒們的王國中也極為罕見才會現身的存在。

你同時兼具溫柔、希望、直覺與引導。

會自然地對陷入困境的人伸出援手，擁有明亮照亮他人未來的力量。`,
      love: "擁有如包覆對方般深刻的愛情。",
      work: "在支撐並引導他人的角色中發揮巨大的力量。",
      compatible: "銀喉長尾山雀、倉鴞、天鵝",
      message: `在你之中，有著你尚未察覺的光。

請相信那道光。

總有一天，它必將成為某人的希望。`,
    },
  },
};

/** 日本語の結果に指定言語のオーバーライドを合成（未訳は ja フォールバック）。 */
export function localizeBirdResult(base: BirdType, lang: Lang): BirdType {
  if (lang === "ja") return base;
  const ov = birdResultOverrides[lang]?.[base.id];
  if (!ov) return base;
  return {
    ...base,
    name: ov.name ?? base.name,
    catchCopy: ov.catchCopy ?? base.catchCopy,
    description: ov.description ?? base.description,
    love: ov.love ?? base.love,
    work: ov.work ?? base.work,
    compatible: ov.compatible ?? base.compatible,
    message: ov.message ?? base.message,
  };
}
