// 魔女タイプ診断ページの多言語文言。
// - UI文言・質問/選択肢は ja/en/ko/zh-TW を全訳。
// - 16タイプの結果本文は witch.ts(日本語)を正とし、未訳は ja フォールバック。
//   言語別の翻訳は resultOverrides に少しずつ追加できる（localizeResult で合成）。
import type { Lang } from "@/lib/i18n/config";
import type { MBTIType, WitchResult } from "@/lib/majyosindan/witch";

/** ページUIの文言 */
export type MajyosindanUI = {
  pageTitle: string;
  pageDescription: string;
  backLabel: string;
  bottomButtonLabel: string;
  introEyebrow: string;
  introHeading: string;
  introLead: (questionCount: number) => string;
  startButton: string;
  shareIntroButton: string;
  questionLabel: (current: number, total: number) => string;
  backButton: string;
  resultEyebrow: string;
  loveHeading: (name: string) => string;
  compatHeading: string;
  rivalHeading: string;
  messageHeading: (name: string) => string;
  keywordsHeading: string;
  fallbackHeading: string;
  shareButton: string;
  saveImageButton: string;
  savingImage: string;
  retryButton: string;
  imageSaved: string;
  imageFailed: string;
  shareIntroText: string;
  shareResultText: (name: string, mbti: string, catchCopy: string) => string;
  mangaEyebrow: string;
  mangaTitle: string;
  mangaDescription: string;
};

/** 質問文・選択肢（option の順序は witch.ts の options 配列と一致させること） */
export type QuestionText = { text: string; options: [string, string] };

export const majyosindanUI: Record<Lang, MajyosindanUI> = {
  ja: {
    pageTitle: "魔女タイプ診断",
    pageDescription: "白の魔女ルミナが導く、16の魔女の物語",
    backLabel: "トップへ戻る",
    bottomButtonLabel: "トップへ戻る",
    introEyebrow: "Witch Type",
    introHeading: "あなたの中に眠る魔女を見つけましょう",
    introLead: (n) =>
      `${n}つの質問に直感で答えるだけ。\nあなたの心の傾きから、16タイプの魔女のうち、いまのあなたに重なる一人を白の魔女ルミナがそっとお伝えします。`,
    startButton: "診断をはじめる",
    shareIntroButton: "友達にこの診断をシェア",
    questionLabel: (c, t) => `QUESTION ${c} / ${t}`,
    backButton: "← 戻る",
    resultEyebrow: "Your Witch Type",
    loveHeading: (name) => `${name}の恋愛`,
    compatHeading: "相性の良い魔女",
    rivalHeading: "少し刺激的な相手",
    messageHeading: (name) => `${name}からのメッセージ`,
    keywordsHeading: "キーワード",
    fallbackHeading: "魔女からのことば",
    shareButton: "Xでシェアする",
    saveImageButton: "画像を保存する",
    savingImage: "画像を生成中…",
    retryButton: "もう一度診断する",
    imageSaved: "画像を保存しました。",
    imageFailed: "画像の生成に失敗しました。時間をおいて再度お試しください。",
    shareIntroText:
      "白の魔女ルミナが導く、16の魔女の物語。あなたの中に眠る魔女タイプは？【魔女タイプ診断】",
    shareResultText: (name, mbti, catchCopy) =>
      `私の魔女タイプは「${name}」でした。\n（${mbti}）\n\n${catchCopy}\n\nあなたの魔女タイプは？ #魔女タイプ診断 #LUMINA`,
    mangaEyebrow: "Comic",
    mangaTitle: "魔女たちの日常",
    mangaDescription: "白の庭に暮らす魔女たちの、小さな物語",
  },
  en: {
    pageTitle: "Witch Type Diagnosis",
    pageDescription: "16 witch stories guided by Lumina, the White Witch",
    backLabel: "Back to top",
    bottomButtonLabel: "Back to top",
    introEyebrow: "Witch Type",
    introHeading: "Discover the witch sleeping within you",
    introLead: (n) =>
      `Just answer ${n} questions with your intuition.\nFrom the leanings of your heart, Lumina the White Witch will gently tell you which of the 16 witch types resonates with you now.`,
    startButton: "Start the diagnosis",
    shareIntroButton: "Share this diagnosis with friends",
    questionLabel: (c, t) => `QUESTION ${c} / ${t}`,
    backButton: "← Back",
    resultEyebrow: "Your Witch Type",
    loveHeading: (name) => `${name} — Love`,
    compatHeading: "Witches you're compatible with",
    rivalHeading: "A slightly thrilling match",
    messageHeading: (name) => `Message from ${name}`,
    keywordsHeading: "Keywords",
    fallbackHeading: "Words from the witch",
    shareButton: "Share on X",
    saveImageButton: "Save image",
    savingImage: "Generating image…",
    retryButton: "Take the diagnosis again",
    imageSaved: "Image saved.",
    imageFailed: "Failed to generate the image. Please try again later.",
    shareIntroText:
      "16 witch stories guided by Lumina the White Witch. Which witch type sleeps within you? [Witch Type Diagnosis]",
    shareResultText: (name, mbti, catchCopy) =>
      `My witch type is "${name}" (${mbti}).\n\n${catchCopy}\n\nWhat's your witch type? #WitchTypeDiagnosis #LUMINA`,
    mangaEyebrow: "Comic",
    mangaTitle: "Daily life of the witches",
    mangaDescription: "Little stories of the witches living in the White Garden",
  },
  ko: {
    pageTitle: "마녀 타입 진단",
    pageDescription: "흰 마녀 루미나가 이끄는 16가지 마녀 이야기",
    backLabel: "메인으로 돌아가기",
    bottomButtonLabel: "메인으로 돌아가기",
    introEyebrow: "Witch Type",
    introHeading: "당신 안에 잠든 마녀를 찾아보세요",
    introLead: (n) =>
      `${n}개의 질문에 직감으로 답하기만 하면 됩니다.\n마음의 기울기로부터, 16가지 마녀 타입 중 지금의 당신과 겹치는 한 명을 흰 마녀 루미나가 살며시 알려드립니다.`,
    startButton: "진단 시작하기",
    shareIntroButton: "친구에게 이 진단 공유하기",
    questionLabel: (c, t) => `QUESTION ${c} / ${t}`,
    backButton: "← 뒤로",
    resultEyebrow: "Your Witch Type",
    loveHeading: (name) => `${name}의 연애`,
    compatHeading: "궁합이 좋은 마녀",
    rivalHeading: "조금 자극적인 상대",
    messageHeading: (name) => `${name}의 메시지`,
    keywordsHeading: "키워드",
    fallbackHeading: "마녀의 말",
    shareButton: "X에 공유하기",
    saveImageButton: "이미지 저장",
    savingImage: "이미지 생성 중…",
    retryButton: "다시 진단하기",
    imageSaved: "이미지를 저장했습니다.",
    imageFailed: "이미지 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    shareIntroText:
      "흰 마녀 루미나가 이끄는 16가지 마녀 이야기. 당신 안에 잠든 마녀 타입은? 【마녀 타입 진단】",
    shareResultText: (name, mbti, catchCopy) =>
      `제 마녀 타입은 「${name}」(${mbti})였어요.\n\n${catchCopy}\n\n당신의 마녀 타입은? #마녀타입진단 #LUMINA`,
    mangaEyebrow: "Comic",
    mangaTitle: "마녀들의 일상",
    mangaDescription: "흰 정원에 사는 마녀들의 작은 이야기",
  },
  "zh-TW": {
    pageTitle: "女巫類型診斷",
    pageDescription: "白之魔女露米娜引導的16個女巫故事",
    backLabel: "返回首頁",
    bottomButtonLabel: "返回首頁",
    introEyebrow: "Witch Type",
    introHeading: "找出沉睡在你心中的女巫",
    introLead: (n) =>
      `只要憑直覺回答${n}個問題。\n白之魔女露米娜會從你內心的傾向，悄悄告訴你16種女巫類型中，此刻與你重疊的那一位。`,
    startButton: "開始診斷",
    shareIntroButton: "把這個診斷分享給朋友",
    questionLabel: (c, t) => `QUESTION ${c} / ${t}`,
    backButton: "← 返回",
    resultEyebrow: "Your Witch Type",
    loveHeading: (name) => `${name}的戀愛`,
    compatHeading: "契合的女巫",
    rivalHeading: "略帶刺激的對象",
    messageHeading: (name) => `來自${name}的訊息`,
    keywordsHeading: "關鍵字",
    fallbackHeading: "女巫的話語",
    shareButton: "分享到 X",
    saveImageButton: "儲存圖片",
    savingImage: "圖片產生中…",
    retryButton: "再次診斷",
    imageSaved: "已儲存圖片。",
    imageFailed: "圖片產生失敗，請稍後再試。",
    shareIntroText:
      "白之魔女露米娜引導的16個女巫故事。沉睡在你心中的女巫類型是？【女巫類型診斷】",
    shareResultText: (name, mbti, catchCopy) =>
      `我的女巫類型是「${name}」（${mbti}）。\n\n${catchCopy}\n\n你的女巫類型是？ #女巫類型診斷 #LUMINA`,
    mangaEyebrow: "Comic",
    mangaTitle: "女巫們的日常",
    mangaDescription: "住在白之庭園的女巫們的小故事",
  },
};

/** 質問・選択肢の翻訳（id をキーに、options 順は witch.ts と一致） */
export const questionTexts: Record<Lang, Record<number, QuestionText>> = {
  ja: {
    1: { text: "休日の過ごし方として、心が満たされるのは？", options: ["誰かと出かけたり、人と過ごす時間", "ひとりで静かに過ごす時間"] },
    2: { text: "あなたが元気を取り戻すのは、どんなとき？", options: ["大勢の集まりで会話が弾むとき", "ひとりになって心を休めるとき"] },
    3: { text: "初めての場所に着いたとき、あなたは？", options: ["自分から声をかけて輪に入る", "まずは様子をうかがう"] },
    4: { text: "物事を見るとき、自然と意識が向くのは？", options: ["目の前の事実や現実的な情報", "その奥にある可能性や意味"] },
    5: { text: "誰かに話をするとき、あなたが大切にするのは？", options: ["実際の経験や具体的な出来事", "思いついた発想やイメージ"] },
    6: { text: "心が惹かれるのは、どちらの世界？", options: ["今ここで役に立つ確かなもの", "まだ見ぬ未来や物事の本質"] },
    7: { text: "何かを決めるとき、よりどころにするのは？", options: ["筋道と公平さ、論理的な納得", "自分や相手の気持ち、調和"] },
    8: { text: "悩んでいる人がそばにいたら、まず？", options: ["解決のための道筋を一緒に考える", "気持ちに寄り添って共感する"] },
    9: { text: "あなたがより心地よくいられるのは？", options: ["物事の筋が通っている状態", "誰の心も傷ついていない状態"] },
    10: { text: "予定や計画について、あなたに近いのは？", options: ["前もってきちんと組み立てたい", "その時の流れに任せたい"] },
    11: { text: "締め切りがあるとき、あなたは？", options: ["早めに片づけて安心したい", "ぎりぎりで一気に集中できる"] },
    12: { text: "あなたの持ち物や部屋は、どちらに近い？", options: ["いつも整理整頓されている", "必要なものがそろっていればよい"] },
  },
  en: {
    1: { text: "Which way of spending a day off fills your heart?", options: ["Going out with someone, time spent with people", "Quiet time spent alone"] },
    2: { text: "When do you regain your energy?", options: ["When conversation flows at a large gathering", "When I'm alone and resting my heart"] },
    3: { text: "When you arrive at a new place, you…", options: ["Speak up and join the circle", "First observe how things are"] },
    4: { text: "When you look at things, your attention naturally goes to…", options: ["The facts before you and realistic information", "The possibilities and meaning behind them"] },
    5: { text: "When talking to someone, what do you value?", options: ["Actual experiences and concrete events", "Ideas and images that come to mind"] },
    6: { text: "Which world draws your heart?", options: ["Reliable things useful here and now", "The unseen future and the essence of things"] },
    7: { text: "When deciding something, what do you rely on?", options: ["Logic, fairness, and rational conviction", "Feelings of yourself and others, harmony"] },
    8: { text: "If someone troubled is beside you, you first…", options: ["Think through a path to a solution together", "Stay close to their feelings and empathize"] },
    9: { text: "You feel more at ease when…", options: ["Things are logically consistent", "No one's heart is hurt"] },
    10: { text: "Regarding plans and schedules, which is closer to you?", options: ["I want to plan it out properly in advance", "I want to go with the flow of the moment"] },
    11: { text: "When there's a deadline, you…", options: ["Finish early to feel at ease", "Focus intensely at the last minute"] },
    12: { text: "Your belongings and room are closer to…", options: ["Always neat and organized", "Fine as long as I have what I need"] },
  },
  ko: {
    1: { text: "휴일을 보내는 방법으로 마음이 채워지는 것은?", options: ["누군가와 외출하거나 사람과 보내는 시간", "혼자 조용히 보내는 시간"] },
    2: { text: "당신이 기운을 되찾는 것은 어떤 때인가요?", options: ["많은 사람이 모인 자리에서 대화가 무르익을 때", "혼자가 되어 마음을 쉴 때"] },
    3: { text: "처음 간 장소에 도착했을 때, 당신은?", options: ["먼저 말을 걸어 무리에 들어간다", "우선 분위기를 살핀다"] },
    4: { text: "사물을 볼 때 자연스럽게 의식이 향하는 것은?", options: ["눈앞의 사실과 현실적인 정보", "그 너머에 있는 가능성과 의미"] },
    5: { text: "누군가에게 이야기할 때 당신이 중요하게 여기는 것은?", options: ["실제 경험과 구체적인 사건", "떠오른 발상과 이미지"] },
    6: { text: "마음이 끌리는 것은 어느 쪽 세계인가요?", options: ["지금 여기서 도움이 되는 확실한 것", "아직 보지 못한 미래와 사물의 본질"] },
    7: { text: "무언가를 결정할 때 기준으로 삼는 것은?", options: ["논리와 공정함, 논리적인 납득", "나와 상대의 마음, 조화"] },
    8: { text: "고민하는 사람이 곁에 있다면, 우선?", options: ["해결을 위한 방법을 함께 생각한다", "마음에 다가가 공감한다"] },
    9: { text: "당신이 더 편안하게 있을 수 있는 것은?", options: ["사물의 이치가 통하는 상태", "누구의 마음도 다치지 않은 상태"] },
    10: { text: "예정이나 계획에 대해 당신에게 가까운 것은?", options: ["미리 제대로 짜고 싶다", "그때의 흐름에 맡기고 싶다"] },
    11: { text: "마감이 있을 때, 당신은?", options: ["일찍 끝내고 안심하고 싶다", "막판에 한 번에 집중할 수 있다"] },
    12: { text: "당신의 소지품이나 방은 어느 쪽에 가까운가요?", options: ["항상 정리정돈되어 있다", "필요한 것만 갖춰져 있으면 된다"] },
  },
  "zh-TW": {
    1: { text: "怎樣度過假日會讓你內心感到充實？", options: ["和某人外出、與人共度的時間", "獨自靜靜度過的時間"] },
    2: { text: "你會在什麼時候恢復活力？", options: ["在人多的聚會中聊得熱絡時", "獨處讓心休息時"] },
    3: { text: "抵達初次到訪的地方時，你會？", options: ["主動搭話、加入大家", "先觀察一下情況"] },
    4: { text: "看待事物時，你的注意力自然會放在？", options: ["眼前的事實與現實的資訊", "其背後的可能性與意義"] },
    5: { text: "與人交談時，你重視的是？", options: ["實際的經驗與具體的事件", "靈光一閃的想法與意象"] },
    6: { text: "你的心更受哪個世界吸引？", options: ["此時此地實用而確實的事物", "尚未可見的未來與事物的本質"] },
    7: { text: "做決定時，你的依據是？", options: ["條理與公平、合乎邏輯的信服", "自己與對方的心情、和諧"] },
    8: { text: "若身旁有人正煩惱，你會先？", options: ["一起思考解決的方法", "貼近對方的心情、給予共鳴"] },
    9: { text: "你在什麼狀態下更自在？", options: ["事情合情合理的狀態", "沒有人的心受傷的狀態"] },
    10: { text: "對於行程與計畫，哪個比較像你？", options: ["想事先好好安排", "想順著當下的情況走"] },
    11: { text: "有截止期限時，你會？", options: ["想提早完成求安心", "能在最後關頭一口氣專注"] },
    12: { text: "你的物品與房間比較接近哪種？", options: ["總是整理得井然有序", "有需要的東西就好"] },
  },
};

/**
 * 言語別の結果オーバーライド（未訳は空＝ja フォールバック）。
 * 翻訳が用意でき次第、各タイプを少しずつ追加できる。
 */
export type ResultOverride = {
  name?: string;
  catchCopy?: string;
  description?: string;
  detail?: {
    body?: string;
    love?: string;
    message?: string;
    keywords?: string[];
    compatibility?: { name?: string; text?: string }[];
    rival?: { name?: string; text?: string };
  };
};

export const resultOverrides: Record<Lang, Partial<Record<MBTIType, ResultOverride>>> = {
  ja: {},
  en: {
    INTJ: {
      name: "The White Witch",
      catchCopy: "The witch of strategy who quietly sees the future.",
      description:
        "You are the White Witch type, quietly foreseeing the future and seeing through to the essence of things. Rather than being swept away by emotion, you calmly survey the whole and draw your own answers. You gather strength in solitude and offer deep guidance only to those who truly need it.",
      detail: {
        body: `You are the "White Witch."

A being who lights the future with quiet light and sees farther than anyone.

While most people let their hearts sway with the emotions and events before them, you gaze at the whole flow from a step back. Unmoved by emotion, you see through to the essence and can map the path toward the best possible future.

At first glance you may seem cool and hard to approach, yet within you hide a strong conviction and gentleness. You are the type to carve out your destiny by your own power, without depending on anyone. That is precisely why so many seek your wisdom and judgment for guidance.

The White Witch's mission is "to turn unseen possibilities into reality."

There is no need to rush. The future you believe in will steadily take shape. The light of your intellect and will shall, in time, illuminate not only your own future but the futures of those around you.`,
        love: `In love you are cautious, opening your heart only to those you can truly trust.

You have no interest in games or shallow connections; you naturally ask, "Can I build a future with this person?" It takes time for you to fall in love, but once you decide someone matters, you pour deep affection and sincerity into them.

However, since putting feelings into words is a little difficult for you, others may think "I can't tell what you're thinking." At times, putting your thoughts into words will help you nurture an even stronger bond.`,
        compatibility: [
          { name: "The Moon Witch", text: "Your reason and the Moon Witch's intuition mesh in surprising beauty. Because she understands your feelings without words, she is a fated partner with whom you can build deep trust." },
          { name: "The Flower Witch", text: "A presence who teaches you the warmth of the heart the White Witch tends to overlook. She adds gentleness and color to your design for the future." },
          { name: "The Star Witch", text: "The finest companion, connected through intellectual curiosity. Before you know it, you can talk for hours, widening each other's worlds." },
        ],
        rival: { name: "The Black Witch", text: "Fellow bearers of the power to envision the future. You can become the strongest of partners or the greatest of rivals. When your values align you wield overwhelming power, but beware struggles over who leads." },
        message: `"The future is not chance, but something created by choice."

You have the power to draw that future.
Believe in your own intellect and conviction, and walk on.
For the white light is always illuminating the path you should take.`,
        keywords: ["Intellect", "Strategy", "Foresight", "Independence", "Inquiry"],
      },
    },
    INFJ: {
      name: "The Moon Witch",
      catchCopy: "The witch of compassion who lights the depths of the heart.",
      description:
        "You are the Moon Witch type, gently sensing feelings that go unspoken. Even without showing it, you deeply understand others' pain and wishes and quietly stay close. Holding ideals in your heart, you give your all for others, yet you may find it hard to notice your own heart's voice. Your kindness, like the moon lighting the night, softly enfolds the hearts of those who are lost.",
      detail: {
        body: `You are the "Moon Witch."

Like quiet moonlight, you gently illuminate the hearts of others.

When someone carries feelings they cannot put into words, you sense it with uncanny ease. What they seek, what wounds them, what they wish for — just as the moon reflects the night sea, your heart reflects the emotions of others.

Others often see you as a calm, gentle person. Yet within you sleeps a conviction not easily shaken by anyone.

The Moon Witch does not love conflict. But to protect what truly matters, you hold the courage to quietly rise.

You are not a dazzling light, but the moonlight that shows the way when people are lost.

That is why so many rely on you without realizing it, gathering around you in search of comfort.

The Moon Witch's mission is "to light a lamp of hope in people's hearts."

Your kindness is not weakness. It is precious magic that saves, heals, and helps others move forward.`,
        love: `In love, you are someone with deeper affection than anyone.

Yet that love is very careful.

Surface charm or fleeting emotion alone will not open your heart. Only to those you feel you can truly trust will you show your true feelings and your weakness.

When you fall for someone, you put their happiness first — but at times you push your own feelings aside too much.

You are a being worthy of love.

Just as you cherish your partner, please cherish your own heart too.

The place where the Moon Witch can smile in peace is the very place where truly happy love grows.`,
        compatibility: [
          { name: "The White Witch", text: "Your intuition and the White Witch's intellect are the finest pairing. The signs of the future the Moon Witch senses, the White Witch guides into reality. You are partners with a special bond, each making up for what the other lacks." },
          { name: "The Flower Witch", text: "A bond that resonates through kindness and sensitivity. Even without words your hearts connect, and simply being together brings healing. You can share calm time like a spring garden in bloom." },
          { name: "The Dawn Witch", text: "Fellow bearers of the power to guide others. When the Dawn Witch's drive meets the Moon Witch's insight, you can lead many toward happiness. A compatibility bound by respect and trust." },
        ],
        rival: { name: "The Secret Witch", text: "Free-spirited and unpredictable, the Secret Witch is a thrilling presence to the Moon Witch. You may be drawn to each other, yet often puzzled by differing values. Still, when you step toward understanding each other, they will show you a world you never knew." },
        message: `"Your kindness is a light that illuminates someone's life."

You don't have to fear being hurt.

For there are surely far more people saved by the hand you offered than you imagine.

The moon always shines quietly.

And you, too, radiate a beautiful light just as you are.`,
        keywords: ["Intuition", "Empathy", "Insight", "Idealism", "Healing"],
      },
    },
    INTP: {
      name: "The Star Witch",
      catchCopy: "The witch of contemplation who keeps seeking the truth.",
      description:
        "You are the Star Witch type, forever searching for how the world works and \"why.\" Unbound by convention, you find joy in thinking things through with your own mind. Time spent quietly turning thoughts over alone is the source of your magic. Gathering new knowledge as curiosity leads you, you open paths with ideas no one else conceives. Like a distant star, your inquiry will one day become a sure light.",
      detail: {
        body: `You are the "Star Witch."

Like the stars shining in the endless night sky, you keep searching for truths no one else notices.

Even toward what most accept as "obvious," you naturally feel doubt.

Why is it so?
What is really happening?
Could there be an answer no one knows yet?

Such a spirit of inquiry constantly leads you to new discoveries.

The Star Witch does not merely gather knowledge.

You hold the power to connect dots and find possibilities no one has ever seen.

You love time spent thinking alone, and may build a world all your own.

At times others may think "I can't tell what you're thinking," but that is because your thoughts reach farther and deeper than others'.

The Star Witch's mission is "to unravel the secrets of the world."

The questions and curiosity you hold are precious magic for opening up the future.`,
        love: `In love, your intellect is drawn before your heart.

No matter how attractive someone is, if your conversations don't click or you can't share values, it rarely grows into love.

Conversely, you are strongly drawn to someone who makes you think, "I want to know this person more."

For you, love is not only emotion but an intellectual adventure too.

However, you are a little weak at expressing your feelings.

The more you like someone, the more unnatural the distance can become, or you may analyze too much.

Don't overthink — at times, convey honest feelings.

That is an important key for the Star Witch to nurture love.`,
        compatibility: [
          { name: "The White Witch", text: "A partner with whom you resonate deeply through intellect and a hunger for the future. Needing no wasted explanation, before you know it you talk for hours. The finest of understanding partners, and a companion for life." },
          { name: "The Moon Witch", text: "Where the Star Witch arrives by logic, the Moon Witch arrives by intuition. Two who gaze at the same truth by different means are drawn to each other with uncanny strength." },
          { name: "The Wind Witch", text: "A bond that shares boundless curiosity. Time spent talking over new ideas is, for the Star Witch, the greatest stimulation of all." },
        ],
        rival: { name: "The Dream Witch", text: "Free and sensory, the Dream Witch is your complete opposite. At first there will be much you can't understand. Yet that freedom and drive can carry you to worlds you've never known. If you can enjoy your differing values, it can become a relationship of great growth." },
        message: `"Love the questions that have no answers."

It's fine if there are things you can't understand right away.

For each and every doubt you hold becomes a door leading to a future no one has seen.

Though the stars are far apart,
together they form a single night sky.

Your knowledge, too,
will one day become a light that illuminates the world.`,
        keywords: ["Intellect", "Inquiry", "Originality", "Logic", "Curiosity"],
      },
    },
    ENFJ: {
      name: "The Dawn Witch",
      catchCopy: "The witch of daybreak who guides and illuminates.",
      description:
        "You are the Dawn Witch type, believing in people's potential and gently nudging them forward. You have the power to warm a room and naturally turn those around you positive. You wholeheartedly wish for others' growth and happiness, offering your hand without reserve. At times you try too hard for others' sake, but your words, like the light of dawn, give people the strength to begin their day.",
      detail: {
        body: `You are the "Dawn Witch."

A being who announces the end of night and guides people into a new morning.

You can find possibilities no one has yet noticed, and believe in the true radiance a person holds.

When someone has lost their confidence.
When they have lost their way.
When they are about to lose sight of hope.

You naturally stand beside them, lighting the direction they should go.

The Dawn Witch holds the power to move people's hearts.

It is not a power that drags them forcibly.

"You can do it."

It is a warm light that can change someone's future with a single word.

You rejoice in others' growth and happiness as if your own, and feel great joy in cheering on someone's dream.

The Dawn Witch's mission is "to pass on the flame of hope."

The light you kindle is handed from one person to the next.

That kindness and passion are special magic that goes on illuminating the lives of many.`,
        love: `In love you are very sincere, pouring out devoted affection.

You wholeheartedly wish for the happiness of the one you love, and the desire to support them wells up naturally.

Because you sensitively pick up on their feelings, you are good at thoughtful care too.

However, by putting others first, you sometimes push your own true feelings aside.

"If it makes them happy" —

and you may keep pushing yourself.

Truly happy love is a relationship where you support each other.

At times, honestly conveying your own weakness and wishes lets you build a deeper bond.

Your affection holds the power of a sun that illuminates others.

So please, turn that light toward yourself as well.`,
        compatibility: [
          { name: "The Moon Witch", text: "Fellow cherishers of the human heart. The Dawn Witch's drive and the Moon Witch's deep insight harmonize beautifully. Together you become a special pair, each gentler and stronger for the other." },
          { name: "The Flower Witch", text: "With her pure kindness, the Flower Witch gently heals the Dawn Witch's heart. Talking over ideals and dreams, you can build a warm future together." },
          { name: "The White Witch", text: "Emotion and reason. Precisely because you hold different powers, you are strongly drawn to each other. The Dawn Witch guides people, the White Witch draws the future. Joining forces, you could move even great destiny." },
        ],
        rival: { name: "The Abyss Witch", text: "Valuing reality over emotion, the Abyss Witch is your opposite. At first they may feel cold. Yet there is much to learn from that composure and independence, holding the potential for a relationship in which you both grow." },
        message: `"The light you believe in becomes someone's hope."

Even what you think is a small kindness —
there are people saved by your words and deeds.

Please, take pride in that kindness.

Dawn will surely come.

And you are the one who carries that very first light.`,
        keywords: ["Empathy", "Passion", "Leadership", "Devotion", "Hope"],
      },
    },
    ISFJ: {
      name: "The Forest Witch",
      catchCopy: "The witch of compassion who quietly protects and nurtures.",
      description:
        "You are the Forest Witch type, quietly protecting and nurturing the people and places you cherish. You value sincerity over flash, carefully keeping your promises and the small things of each day. You hold a kindness that draws close to those in trouble and supports them without seeking anything in return. Beside you is a place as safe as the shade of a forest. That calm strength heals the hearts around you.",
      detail: {
        body: `You are the "Forest Witch."

Like a deep forest quietly nurturing life, you hold the power to gently support and protect people.

You are by no means the type to stand out flashily.

Yet when someone is in trouble or hurting, you are the one who can quietly offer a hand.

You notice even small changes around you, and can sense what someone needs even when they don't put it into words.

That kindness is never manufactured.

Just as a forest enfolds its trees and creatures as a matter of course, a warm heart that wishes to cherish others lives naturally within you.

At times you put others before yourself too much.

But your very presence gives many people a sense of security.

The Forest Witch's mission is "to protect a place where people can return."

The refuge and kindness you create have become an irreplaceable treasure to someone.`,
        love: `In love, you are a very sincere and devoted type.

You cherish the one you fall for, nurturing the relationship while wishing for their happiness.

Rather than flashy romance or thrilling games, you seek a relationship where you can feel at ease together.

You often remember your partner's preferences and small changes, sometimes surprising them: "You even noticed that?"

However, you tend to accommodate your partner too much.

You may endure when you're actually lonely, or swallow your feelings even when something upsets you.

Your kindness is a wonderful gift.

That is exactly why you should cherish your own feelings just as much.

Only when the forest is healthy can it protect many lives.`,
        compatibility: [
          { name: "The Flower Witch", text: "A partner with whom you resonate deeply through kindness and care. Just being together calms the heart, and you can both be your natural selves. Like flowers blooming in a forest, you can build a beautiful, gentle relationship." },
          { name: "The Moon Witch", text: "Fellow cherishers of others' feelings. Even without words your hearts connect, and you can nurture deep trust. Your kindnesses resonate pleasantly with each other." },
          { name: "The Time Witch", text: "Fellow bearers of sincerity and responsibility. You easily build a relationship full of security, and over long time can grow a strong bond. An excellent match as life partners." },
        ],
        rival: { name: "The Wind Witch", text: "Loving freedom and seeking change, the Wind Witch is your complete opposite. You may feel swept along, yet that free thinking and drive will greatly widen your world. When you come to understand each other, it becomes a relationship that brings unexpected growth." },
        message: `"Your kindness holds a power greater than you think."

Supporting someone is never a given.

The small kindnesses and care you offered are, in places you don't notice, saving many hearts.

A forest does not grow in haste.

And still it keeps nurturing life surely.

You, too, may go forward at your own pace.`,
        keywords: ["Kindness", "Devotion", "Security", "Compassion", "Sincerity"],
      },
    },
    INFP: {
      name: "The Flower Witch",
      catchCopy: "The witch of innocence who blooms the heart's ideals.",
      description:
        "You are the Flower Witch type, holding your own ideals and beauty in your heart. With a soft heart you sense things, cherishing people's feelings and small joys. You pour quiet passion into what truly matters, with a core strength that won't bend your true self. Your sensibility, like flowers coloring the seasons, gently enriches the world around you.",
      detail: {
        body: `You are the "Flower Witch."

Holding kindness and imagination in your heart, you are a being who gives this world beautiful color.

A flower does not bloom to be praised by anyone.

It simply blooms as itself, and with that figure heals people's hearts.

You, too, hold such a flower-like soul.

Sensitive to others' pain, when someone grieves you ache as if it were your own.

With gentle words and small acts of care, you have surely saved many hearts.

Within you, too, are rich imagination and ideals.

Believing in beauty and possibility that cannot be measured by reality alone, you carefully nurture a world all your own.

At times others may say you "overthink" or are "a dreamer."

Yet that is the special power the Flower Witch holds.

You can find seeds of hope no one else can find, and make them bloom in the future.

The Flower Witch's mission is "to bloom beautiful flowers in the heart."

Your kindness and imagination are magic to make the world just a little gentler.`,
        love: `In love, you are a type who holds a devoted, pure affection.

You think deeply of the one you fall for, drawing a future with them in your heart again and again.

For you, love is not merely being together.

It is heart connecting with heart.

Being able to share each other's true feelings and dreams.

You cherish such a special bond above all.

However, you may idealize your partner too much.

You may be hurt by the gap with reality, or suffer from being unable to convey your feelings.

Even so, your affection is very warm and deep.

A flower is not forced to bloom.

Love, too, is something that grows within a natural flow.`,
        compatibility: [
          { name: "The Moon Witch", text: "A partner who gives you a sense of security, as if you'd known each other for ages. Cherishing each other's emotions and values, you can nurture a deep bond. A special relationship where hearts connect without words." },
          { name: "The Forest Witch", text: "A pairing full of kindness and care. So that the Flower Witch can bloom freely, the Forest Witch warmly supports you. You can build a calm, comfortable relationship." },
          { name: "The Dawn Witch", text: "A being who genuinely cheers on your dreams and ideals. Believing in the possibilities the Flower Witch holds, they give you the courage to move forward. A wonderful partner with whom you can grow together." },
        ],
        rival: { name: "The Black Witch", text: "Facing reality and advancing powerfully, the Black Witch is your complete opposite. You may be puzzled by differing values, yet you may also be drawn to that strength and decisiveness. When you come to understand each other, it holds the potential for a relationship where ideal and reality harmonize beautifully." },
        message: `"Please, do not deny your own kindness."

Being easily hurt is not weakness.

It means you feel that many things, and can stay close to others' pain.

A flower does not bloom to be compared with others.

You, too, may simply bloom as yourself.

That beauty is already saving someone's heart.`,
        keywords: ["Kindness", "Idealism", "Imagination", "Empathy", "Pure love"],
      },
    },
    ISFP: {
      name: "The Sea Witch",
      catchCopy: "The witch of sensibility who savors and loves the now.",
      description:
        "You are the Sea Witch type, savoring the beauty of this very moment with all five senses. With a free heart, you live honestly toward what you love and what feels good. You convey affection through action and atmosphere more than words — gentle yet with a firm core. You may seem calm, but within you hold a deep sea of emotion. Your presence, like waves, quietly settles and nourishes people's hearts.",
      detail: {
        body: `You are the "Sea Witch."

Living like a free wave, loving beautiful things, you sense the world with a sensibility all your own.

The sea never shows the same face.

There are calm days and raging days.

Yet it is always deep, beautiful, enfolding many lives.

Your heart, too, closely resembles such a sea.

With rich sensitivity, you can notice small beauties and moments of wonder that others overlook.

The color of the sky.
The scent of the wind.
The feelings within music and words.

You can feel these more deeply than anyone.

You are also someone who greatly cherishes being yourself.

Rather than forcing yourself to match others, you would choose a way of living that your own heart can accept.

The Sea Witch's mission is "to find the beauty of the world."

The small radiance you discover spreads gentle ripples through the hearts of those around you too.`,
        love: `In love, you greatly value emotion.

Not conditions or logic, but —

"My heart calms when I'm with this person."

"I want to be together more."

You trust such feelings above all.

To the one you love, you pour affection gently and naturally.

You rarely seek anything in return, holding a pure wish for your partner's happiness.

However, you are a little weak at putting your feelings into words.

You may endure when you're actually lonely, or hide your hurt behind a smile.

Your heart, too, is a precious treasure.

Just as the sea hides its true depth, your feelings won't reach your partner unless you express them.

At times, holding the courage to confess your honest feelings lets you nurture a deeper love.`,
        compatibility: [
          { name: "The Flower Witch", text: "Fellow lovers of beautiful things. Your sensibilities and values resonate naturally, and just being together fills the heart. You can accept each other as you are, without trying to force change." },
          { name: "The Forest Witch", text: "The Forest Witch who gently enfolds you gives the Sea Witch a sense of security. So that you can swim freely, they quietly support you. You can nurture a calm, warm bond." },
          { name: "The Dream Witch", text: "The finest partner with whom to share fun and wonder. Just being together, you meet new scenes and experiences. They color your life more vividly." },
        ],
        rival: { name: "The Time Witch", text: "Cautious and realistic, the Time Witch is the opposite of the freedom-loving Sea Witch. You may be puzzled by differing values, yet you may be drawn to that sincerity and stability. When you can respect your differences, it grows into a relationship of deep mutual trust." },
        message: `"Cherish what your heart feels to be beautiful."

You don't have to be the same as others.

There is scenery only you can see,
and wonder only you can feel.

Just as the sea freely draws its waves,
you, too, may live as yourself.

For that very sensibility
is magic all your own.`,
        keywords: ["Sensibility", "Freedom", "Artistry", "Kindness", "Aesthetics"],
      },
    },
    ENTP: {
      name: "The Wind Witch",
      catchCopy: "The witch of transformation who stirs a new wind.",
      description:
        "You are the Wind Witch type, breathing in a new wind with free ideas. Brimming with curiosity, you find intriguing possibilities within debate and inspiration. Unbound by convention, you have the power to lightly move stagnant air. You hate boredom and are always searching for the next adventure. The wind you stir repaints the worlds of those around you anew.",
      detail: {
        body: `You are the "Wind Witch."

Carrying ideas no one else conceives, you are a being who brings new possibilities to the world.

The wind has no form.

That is precisely why it can go anywhere.

Crossing walls, crossing nations, it runs freely between people.

You, too, hold such a wind-like soul.

Unbound by convention, you are skilled at finding new thoughts and intriguing possibilities.

Even toward what others give up on as "impossible," you can ask —

"Is that really so?"

That flexible thinking and curiosity give many people stimulation and change.

However, staying in the same place is a little hard for you.

It is precisely because there are new discoveries and challenges that your magic shines.

The Wind Witch's mission is "to bring change to a stagnant world."

Your words and ideas will become a tailwind that greatly moves someone's life.`,
        love: `In love, you cherish a relationship where you can chat as easily as friends.

Being fun together.

Being able to share values and ideas.

And above all, being free.

That is the Wind Witch's ideal romance.

Restraint or relationships that are too heavy may be a little hard for you.

But that is not because your affection is shallow.

You are someone who thinks, "Precisely because I love them, I want them to be free too."

In love as well, you are full of curiosity.

You feel joy in learning sides of your partner no one else knows.

However, since your interests shift one after another, others may think "I can't tell what you're thinking."

To the one who truly matters, put your feelings into words.

That is the Wind Witch's secret to nurturing love for the long term.`,
        compatibility: [
          { name: "The Star Witch", text: "A partner bound by inexhaustible intellectual curiosity. You can talk over new ideas and curious tales for hours. The finest partner with whom to widen each other's worlds." },
          { name: "The Dream Witch", text: "Fellow lovers of freedom. Just being together turns every day into an adventure. They carry you to unexpected places and show you new scenery." },
          { name: "The Dawn Witch", text: "The Dawn Witch guides the possibilities the Wind Witch finds into reality. A very appealing pairing where stimulation and trust coexist." },
        ],
        rival: { name: "The Forest Witch", text: "Cherishing stability, the Forest Witch is the complete opposite of the change-loving Wind Witch. At first you may feel confined. Yet that kindness and sincerity will teach you new values. When you can respect your differences, you can build a surprisingly good relationship." },
        message: `"Don't fear your curiosity."

What you found interesting.
What moved your heart.

All of it is a signpost leading to a new future.

The wind does not stay in one place.

That is precisely why it can reach far.

You, too, believe in your own possibilities and take flight.

For that free soul is magic all your own.`,
        keywords: ["Freedom", "Inventiveness", "Curiosity", "Challenge", "Change"],
      },
    },
    ISTJ: {
      name: "The Time Witch",
      catchCopy: "The witch of sincerity who keeps promises and builds them up.",
      description:
        "You are the Time Witch type, carefully stacking up time and promises. Unafraid of steady effort, you hold the responsibility to see what must be done through to the end. Without flash, your reliability earns much trust. Valuing order and rules, you bring stability to those around you. The time you have built up becomes an unshakable foundation that supports the future.",
      detail: {
        body: `You are the "Time Witch."

A being who watches over flowing time and protects the history and promises that have been stacked up.

People are often captivated by the events and emotions before them.

But you are different.

Not only the now, but gazing toward the future that continues beyond it, you can advance step by step, surely.

The Time Witch is not a witch who works flashy miracles.

Yet you hold a power surer than anyone's.

Daily effort.
Promises kept.
Experience stacked up.

Even unseen, these surely shape the future.

You have a strong sense of responsibility, and rarely throw aside what you've once taken on.

That sincerity is the very reason so many trust you.

The Time Witch's mission is "to protect what should be passed on to the future."

What you have protected will, in time, become someone's support, connecting to a new age.`,
        love: `In love, you are a very sincere and devoted type.

You rarely fall in love easily.

But when you feel someone is truly trustworthy, that affection continues long and deep.

For you, love is not a momentary emotion but something like a promise to walk through life together.

So light games or ambiguous relationships may be hard for you.

To the one you love, you often show affection through action rather than words —

"They always help when I'm in trouble."

"They keep their promises properly."

You build trust in such forms.

However, expressing your feelings is a little hard for you.

Even when you cherish someone, it may not reach them.

At times, putting it into words lets you nurture a deeper bond.`,
        compatibility: [
          { name: "The Forest Witch", text: "Fellow bearers of sincerity and care. You give each other a sense of security and can build a calm, stable relationship. The more time you spend together, the deeper the trust — an ideal partner." },
          { name: "The White Witch", text: "The White Witch who gazes at the future, and the Time Witch who walks surely. The finest combination, connecting ideal and reality. You can grow while respecting each other." },
          { name: "The Mirror Witch", text: "The Mirror Witch, who values harmony with others, understands the Time Witch's sincerity better than anyone. Supporting each other, you can build a warm relationship." },
        ],
        rival: { name: "The Wind Witch", text: "Loving freedom and seeking change, the Wind Witch is unpredictable to the Time Witch. You may be puzzled by differing values. Yet that flexible thinking and willingness to challenge show you new scenery. When you can accept your differences, you can become a relationship that greatly widens each other's worlds." },
        message: `"You don't have to rush."

Just as a flower needs time to bloom,
the truly precious things grow slowly.

The effort you have stacked up,
even unseen now, surely connects to the future.

Time never betrays.

If you treasure and stack each day called today,
you will, in time, reach the future you wish for.

That very sincerity is magic all your own.`,
        keywords: ["Sincerity", "Responsibility", "Perseverance", "Trust", "Steadiness"],
      },
    },
    ESFJ: {
      name: "The Mirror Witch",
      catchCopy: "The witch of harmony who reflects hearts to one another.",
      description:
        "You are the Mirror Witch type, sensitively reflecting the feelings of those around you. Valuing the harmony of a place, you naturally take care so everyone can feel at ease. Caring and good with people, you shine within human connections. Being appreciated is your greatest joy. Your warm gaze, like a mirror, tells those around you, \"You are cherished.\"",
      detail: {
        body: `You are the "Mirror Witch."

A being who reflects people's hearts and makes their true charm shine.

A mirror does not only reflect a figure.

At times it shows you a beauty or possibility you hadn't noticed yourself.

You, too, are very good at finding people's strengths and charms.

When someone has lost their confidence, you encourage them.

When they carry anxiety, you stay close.

When sharing joy, you show a smile bigger than anyone's.

You hold such a warm power.

Valuing harmony with those around you, you often become a bridge connecting person to person.

Simply by your being there, the air softens and a sense of security is born in people's hearts.

The Mirror Witch's mission is "to reflect the radiance sleeping within people."

Your kindness and care are magic that brightly illuminates many hearts.`,
        love: `In love, you are a very affectionate and devoted type.

You naturally want to give to the one you love, and feel happy seeing them pleased.

Cherishing anniversaries, remembering your partner's preferences, stacking up small acts of care.

Your affection appears not only in words but in daily actions.

You also greatly cherish time with your partner, finding joy in making memories together.

However, by prioritizing your partner too much, you may endure your own feelings.

You may pretend to be fine when actually lonely, or swallow your dissatisfaction.

For the Mirror Witch to be happy, cherish your own heart too.

Please be as kind to yourself as you are to the one you love.`,
        compatibility: [
          { name: "The Forest Witch", text: "Fellow bearers of care. You naturally look out for each other and can build a relationship wrapped in security. A heart-soothing compatibility, like being within a calm forest." },
          { name: "The Dawn Witch", text: "A partner with whom you can share the wish to make others happy. Being together, you can have a good influence on those around you too — a warm relationship." },
          { name: "The Time Witch", text: "The sincere, trustworthy Time Witch gives the Mirror Witch a great sense of security. Supporting each other, you can nurture a long, stable bond." },
        ],
        rival: { name: "The Secret Witch", text: "Free-spirited and unpredictable, the Secret Witch may sweep the Mirror Witch along. Yet you may often be drawn to that drive and brightness. The difference in values is great, but it holds the potential for a special relationship that widens each other's worlds." },
        message: `"The kindness you find becomes someone's courage."

Being able to notice the good in people.

Being able to cheer someone on.

That is not an ordinary talent.

There are many people saved by the words and smiles you offered.

A mirror reflects a person's figure.

And you are a being who reflects the radiance of people's hearts.

Please, take pride in that kindness.`,
        keywords: ["Care", "Harmony", "Devotion", "Empathy", "Power to support"],
      },
    },
    ENFP: {
      name: "The Thread Witch",
      catchCopy: "The witch of bonds who ties people to possibility.",
      description:
        "You are the Thread Witch type, lightly tying person to person, dream to reality. With rich sensitivity and curiosity, you quickly find the charm and possibility in those you meet. With bright energy you draw others in, spinning new bonds one after another. Your freedom to move as your heart leads is part of your charm. The threads you tie connect unexpected happiness.",
      detail: {
        body: `You are the "Thread Witch."

A being who ties together person and person, dream and future, chance and destiny.

Countless invisible threads are woven throughout this world.

Threads of meeting.
Threads of possibility.
Threads of destiny leading to the future.

The Thread Witch can sense the trembling of those threads more keenly than anyone.

You are full of curiosity and can truly enjoy encounters and new experiences.

"That looks interesting."
"I want to try it."

Acting on such intuition, you often draw to yourself unexpected bonds and good fortune.

You are also good at finding people's charm.

You may find possibility within a dream someone is about to give up on, or give hope to someone who has lost their confidence.

The Thread Witch's mission is "to re-tie destiny."

The small bonds you spin will, in time, connect to great miracles.`,
        love: `In love, you greatly cherish the moment your heart moves.

Not logic, but —

"It's fun being with this person."

"I want to talk with them more."

Love often begins from such feelings.

You are very honest toward the one you love, and rich in expressing affection.

You feel great happiness in time spent laughing together, talking of dreams, and making new memories.

However, as your feelings grow too large, you may be swayed by every reaction of your partner.

And by chasing ideals, you may be hurt by the gap with reality.

Still, your love is very pure.

Being able to truly fall for someone.

That itself is the beautiful magic the Thread Witch holds.`,
        compatibility: [
          { name: "The Dream Witch", text: "A partner who makes every day fun just by being together. You can share challenges and exciting experiences, enjoying life itself like an adventure." },
          { name: "The Flower Witch", text: "A relationship that resonates deeply through sensitivity and kindness. Understanding each other's dreams and ideals, you can stay your natural selves — a special partner." },
          { name: "The Wind Witch", text: "A pairing connected by curiosity and inventiveness. New ideas are born one after another, and just being together your world keeps widening." },
        ],
        rival: { name: "The Time Witch", text: "Cautious and steady, the Time Witch is the complete opposite of the free Thread Witch. At first you may be puzzled by differing values. Yet the Time Witch's sincerity and stability teach you a new value called security. Precisely because your differences are great, there is much to learn from them." },
        message: `"Believe in your encounters."

What you think is coincidence may, in truth, be guided by threads of destiny.

If your heart moves, cherish that feeling.

Going to a new place.

Meeting a new person.

Each of these becomes a chance to change the future.

For you are not one who waits for destiny,
but one who spins destiny yourself.`,
        keywords: ["Curiosity", "Encounter", "Possibility", "Freedom", "Power to spin fate"],
      },
    },
    ESFP: {
      name: "The Dream Witch",
      catchCopy: "The witch of joy who makes the now shine.",
      description:
        "You are the Dream Witch type, brightly and gorgeously coloring any place. Enjoying this very moment to the fullest, you share smiles and energy with those around you. Emotionally rich and active, you have the lightness to move the instant you decide. A born light-like being who loves to delight others. Just by your being there, the everyday turns into a glittering stage of dreams.",
      detail: {
        body: `You are the "Dream Witch."

A being who awakens the wishes and longings sleeping in people's hearts and brings joy and radiance to this world.

A dream is not only something you see while asleep.

"I want to try it."
"I want to go there."
"How wonderful it would be if the future were like this."

Such a flutter of the heart is the true beginning of a dream.

You can sense that radiance more than anyone.

Your interest in new things never runs out, and you hold the power to enjoy life to the fullest.

When you laugh, those around you smile too; when you're excited, that feeling naturally spreads to others.

The Dream Witch is a being who gives people hope.

More than difficult logic, you advance toward the future while cherishing the feeling of "This looks fun!"

That brightness and drive are pushing many people forward.

The Dream Witch's mission is "to make life shine."

The smiles and wonder you create are magic that brightens this world just a little.`,
        love: `In love, you are a very passionate and honest type.

Toward the one you fall for, feelings naturally overflow, and you try to truly enjoy the time you spend together.

You love sharing dates, trips, and new experiences, and would idealize a romance where "every day is fun with this person."

You are also good at delighting your partner.

You think up surprises, offer fun topics, and try to make time with your loved one special.

However, since you are emotionally rich, you may also feel loneliness and anxiety.

At such times, it's important not to force yourself to act cheerful, but to honestly convey your feelings.

The one who truly matters will accept not only your smile but your weakness too.`,
        compatibility: [
          { name: "The Thread Witch", text: "The finest companion, and the finest adventure partner. Just being together, fun events happen one after another, and life itself begins to shine. An ideal partner with whom to talk of dreams and the future." },
          { name: "The Sea Witch", text: "A pairing whose sensibilities resonate beautifully. The Dream Witch carries you out, and the Sea Witch teaches the beauty of that scenery. You can build a natural, comfortable relationship." },
          { name: "The Wind Witch", text: "A partner bound by curiosity and drive. Far from boredom, they show you new worlds one after another. You can share thrilling, fun times." },
        ],
        rival: { name: "The White Witch", text: "Rational and cautious, the White Witch is the complete opposite of the free Dream Witch. At first you may be puzzled by the difference in thinking. Yet the White Witch can give you the power to gaze at the future, and you can teach the White Witch the joy of enjoying life. A partner with a mysterious bond, drawn together precisely because you differ." },
        message: `"Go in the direction your heart flutters."

Life is shorter than you think,
and the world is wider than you think.

If there's something you want to do, try it.

If there's someone you want to meet, go meet them.

That single step brings a new future.

A dream does not have value only because it comes true.

The very time spent chasing a dream
is what makes your life shine.`,
        keywords: ["Freedom", "Fun", "Drive", "Charm", "Power to make dreams come true"],
      },
    },
    ENTJ: {
      name: "The Black Witch",
      catchCopy: "The sovereign witch who carves a path by will.",
      description:
        "You are the Black Witch type, pressing toward your goal with strong will. Surveying the whole and discerning what must be done, you have the power to guide people without hesitation. Fearless before difficulty, you hold the spirit to turn the future you believe in into reality. That strength becomes a compass showing those around you the way forward. Your decisions powerfully move even a stagnant situation.",
      detail: {
        body: `You are the "Black Witch."

A being who, unafraid of shadow, carves out destiny by their own will.

When many stop within anxiety and hesitation, you can make the decision to move forward.

That is not coldness.

It is because you hold the resolve to bear responsibility when someone must move ahead.

The Black Witch is a symbol of strength.

Even placed in difficult situations, you are not swallowed by emotion; you consider the best move while facing reality.

You also hold superb insight, skilled at seeing through people, organizations, and the flow of things.

You have the power not to leave ideals as mere dreams.

You can not only think, but act to make them real.

That itself is the Black Witch's greatest magic.

At times others may think you "scary" or "hard to approach."

But the true you is someone who holds higher ideals than anyone, and spares no effort to realize them.

The Black Witch's mission is "to create the future."

The path you carve will, in time, become a road many people walk.`,
        love: `In love, you are a very serious and sincere type.

At a glance, you may seem to prioritize work and goals over romance.

Yet to the one you truly cherish, you pour deep affection.

You ask growth of your partner too.

Not merely being together, but —

"Can we build a future together?"

"Is it a relationship where we respect each other?"

You value these.

So you have little interest in surface relationships.

However, you may say too much that's "correct," or push your own thinking through.

At times, accepting your partner's feelings matters more than producing an answer.

When your strength and gentleness coexist, you can build a truly unshakable love.`,
        compatibility: [
          { name: "The White Witch", text: "The strongest of understanding partners, and the greatest of rivals. The White Witch who sees the future, and the Black Witch who realizes it. When the two face the same direction, you create a power no one can stop. A special partner you can deeply respect." },
          { name: "The Dawn Witch", text: "Fellow bearers of the power to guide others. The Black Witch moves reality, the Dawn Witch moves people's hearts. You can become the finest partners who give ideals form." },
          { name: "The Moon Witch", text: "A being who teaches you the emotions and subtleties of the heart the Black Witch tends to overlook. She gives gentleness to your strength and guides you toward an even greater power." },
        ],
        rival: { name: "The Flower Witch", text: "The Flower Witch who believes in ideals, and the Black Witch who values reality. Your values differ greatly. Yet you may often be moved by that purity and kindness. The Flower Witch is a being who reminds the Black Witch of a dream nearly forgotten. When you come to understand each other, ideal and reality will harmonize beautifully." },
        message: `"Don't fear your strength."

You have the power to bear greater responsibility than others.

That is exactly why you may feel lonely at times.

Yet that strength was given not to dominate someone,
but to protect someone.

It is precisely because there is shadow that light shines.

The will and resolve within you
are precious magic for carving out the future.`,
        keywords: ["Will", "Decisiveness", "Leadership", "Ambition", "Future creation"],
      },
    },
    ESTJ: {
      name: "The Twilight Witch",
      catchCopy: "The witch of command who binds order together.",
      description:
        "You are the Twilight Witch type, firmly facing reality and bringing things together. With a strong sense of responsibility, you hold the drive to steadily give form to what you decide. Organizing those around you and guiding roles precisely, you are a dependable presence. You prefer clarity over ambiguity and spare no effort. Like the twilight that lights the day's end, you bring sure order to chaos.",
      detail: {
        body: `You are the "Twilight Witch."

A being who sees the day's end through and connects the path to the next age.

Twilight is not a symbol of endings.

It is the border where day and night meet.

A precious time when the old finishes its role and the new begins.

You, too, hold the power to organize things, create order, and arrange an environment where people can move forward with peace of mind.

With a strong sense of responsibility, you keep your promises and see what you're entrusted with through to the end.

You are often relied upon, and not rarely told, "I feel at ease when you're here."

The Twilight Witch does not judge by emotion alone.

What is right.
What is needed.
How everyone can move forward.

You can consider these calmly and carry them into action.

At times you may have to make harsh decisions.

But that is not because you wish to hurt anyone.

It is because you understand the choices necessary for the future.

The Twilight Witch's mission is "to connect the ages."

Your judgment and action have become the foundation that supports the futures of many.`,
        love: `In love, you are a very sincere and realistic type.

You are rarely swept away by momentary emotion, valuing —

"Can I build a relationship of trust with this person?"

To the one you fall for, you take responsibility and try to build a long, stable relationship.

You also show affection through action more than words —

Helping when they're in trouble.
Keeping promises.
Seriously thinking about the future.

You convey love in such forms.

However, even when you mean it as kindness, your words may come out harsh.

It is precisely because your feelings for them are strong that your expectations grow large too.

At times, choosing gentleness over correctness.

That will be precious magic for the Twilight Witch to nurture love.`,
        compatibility: [
          { name: "The Time Witch", text: "The finest partner with whom to share sincerity and responsibility. Because you both value trust, you can build a stable relationship. An ideal pairing who can support each other's futures." },
          { name: "The Mirror Witch", text: "A being who gives warmth to the world the Twilight Witch protects. Understanding your effort and responsibility, they become a support for your heart." },
          { name: "The White Witch", text: "The White Witch who draws the future, and the Twilight Witch who arranges reality. Ideal and drive mesh beautifully, a relationship that can realize great goals." },
        ],
        rival: { name: "The Wind Witch", text: "Free-spirited and unpredictable, the Wind Witch may trouble the Twilight Witch. Yet that inventiveness and flexibility will show you possibilities you've never seen. Your values differ greatly, but you are partners who can learn from each other." },
        message: `"Don't fear bearing responsibility."

Many people wish for freedom.

But what supports that freedom is someone's sincere effort.

You are one of the few who can take on that role.

At times you may not be understood.

Even so, what you have protected has surely become someone's peace of mind.

Twilight is not an ending.

It is a beautiful beginning that continues into a new future.`,
        keywords: ["Responsibility", "Order", "Drive", "Trust", "Stability"],
      },
    },
    ISTP: {
      name: "The Abyss Witch",
      catchCopy: "The solitary witch who quietly sees through to the essence.",
      description:
        "You are the Abyss Witch type, calmly seeing through how things work. Speaking little, you hold a rational strength that moves precisely when needed. Cherishing solitary time and freedom, you deepen understanding while verifying with your own hands. Behind a calm expression, you hide quiet, deep insight. Your composure is the very stillness of an abyss, unshaken even within a storm.",
      detail: {
        body: `You are the "Abyss Witch."

A being who ventures into unknown realms where no one sets foot, and finds the truth sleeping in their depths.

The abyss is a feared place.

Dark, quiet — many will not try to approach it.

But you are different.

You know that value lies precisely in the places people avoid.

Scenery no one has seen.
Mysteries no one has unraveled.
Possibilities not yet discovered.

You are strongly drawn to these.

The Abyss Witch hates waste.

More than emotion or logic, you can first look at reality and judge.

When a problem arises, you calmly analyze the situation and find the most rational solution.

You also prefer to live by your own power.

You neither depend on anyone more than necessary, nor dominate anyone.

Free, yet strong.

That is the essence of the Abyss Witch.

The Abyss Witch's mission is "to find hidden truths."

Your inquiry and composure are special magic for reaching answers that many have overlooked.`,
        love: `In love, you are a very go-at-your-own-pace type.

You rarely fall in love swept by emotion, valuing —

"Is it comfortable being together?"

"Can I be my natural self?"

You also cherish your own time and freedom, so love never becomes everything in your life.

But that does not mean your affection is shallow.

To the one who truly matters, you show your feelings through action rather than words.

Helping when they're in trouble.

Always being there when needed.

You stack up trust in such forms.

However, expressing your own emotions is a little hard for you.

From your partner's view, they may think "I can't tell what you're thinking."

That is exactly why, at times, conveying your feelings in words matters.

The one to whom the Abyss Witch opens their heart is a very special being.`,
        compatibility: [
          { name: "The Sea Witch", text: "Fellow lovers of freedom. Without interfering too much, you can be your natural selves — a comfortable relationship. There is a mysterious sense of security where you understand each other even with few words." },
          { name: "The Star Witch", text: "A partner bound by intellectual curiosity. Time spent talking over deep topics and fields of interest becomes the Abyss Witch's greatest pleasure. A relationship where you can grow while respecting each other's worlds." },
          { name: "The Black Witch", text: "The Black Witch, with drive and decisiveness, highly values the Abyss Witch's abilities. Because you both hate waste, trust easily arises — a fitting pairing." },
        ],
        rival: { name: "The Dawn Witch", text: "Cherishing connections with people, the Dawn Witch is the opposite of the Abyss Witch. At first you may be puzzled by the difference in distance. Yet the Dawn Witch's warmth shows you a world you don't usually see. When you come to understand each other, it becomes a relationship that brings great growth." },
        message: `"Beyond fear is where truth sleeps."

Choosing the road many avoid
sometimes comes with solitude.

Yet you have the courage to gaze at what lies beyond.

An answer no one could find.

A place no one could reach.

You were born to head toward it.

The abyss is not something to fear.

For there, a possibility no one yet knows is sleeping.`,
        keywords: ["Inquiry", "Composure", "Freedom", "Rationality", "Power to see truth"],
      },
    },
    ESTP: {
      name: "The Secret Witch",
      catchCopy: "The bold witch who races through the moment.",
      description:
        "You are the Secret Witch type, reading the flow of a place and moving boldly. With sharp intuition and drive, you seize chances without letting them slip. Practice over theory, acting over thinking — you carve out your path. Enjoying thrills and change, you hold a charm that draws others in. With a secret card never revealed to anyone, today too you play through life vividly.",
      detail: {
        body: `You are the "Secret Witch."

A being who finds a door no one knows and dives beyond it first of all.

Many secrets are hidden in the world.

Possibilities people haven't noticed.
Scenery yet unseen.
Adventure beyond a closed door.

The Secret Witch's heart leaps at finding these more than anyone.

You are blessed with drive.

Not "I'll do it someday," but —

"It looks interesting, so I'll give it a try."

That is how you think.

While many hesitate, you take a step forward, finding answers through your own experience.

You also hold the flexibility to adapt quickly to any environment.

Even when the unexpected happens, you don't panic, making the best choice on the spot.

The Secret Witch hates boredom.

Always seeking new stimulation and discovery, you try to enjoy life to the fullest.

The Secret Witch's mission is "to release closed possibilities."

Beyond the door you open, a future many do not yet know is waiting.`,
        love: `In love, you are a very charming and natural type.

You actively approach the one you fall for, trying to spend fun time together.

For you, love is "enjoying life together."

Laughing together, adventuring, sharing new experiences.

You feel great happiness in such time.

You also hold a charm that draws people, so without noticing you are often the object of someone's affection.

However, since you cherish freedom, being tied down is hard for you.

When a relationship becomes confining, you may unconsciously put distance between you.

Truly good love is a relationship where freedom and trust coexist.

The one with whom you can be yourself is the fated partner you can love for a long time.`,
        compatibility: [
          { name: "The Dream Witch", text: "A partner who turns life into an adventure just by being together. Because you can share curiosity and drive, every day becomes fun and full of stimulation. They can be your finest playmate and finest lover." },
          { name: "The Wind Witch", text: "A pairing that resonates through free thinking and drive. New ideas and challenges are born one after another, never boring. A relationship where you widen each other's possibilities." },
          { name: "The Thread Witch", text: "Fellow cherishers of bonds and new encounters. Being together, you can draw to yourselves unexpected fortune and chances. A partner who makes life richer." },
        ],
        rival: { name: "The Moon Witch", text: "Delicate and deep-hearted, the Moon Witch is the complete opposite of the Secret Witch. At first you may be puzzled by the difference in thinking. Yet the Moon Witch makes you aware of \"the true feelings deep in your heart.\" And you can give the Moon Witch \"the courage to step into a new world.\" When you come to understand each other, it becomes a very special relationship." },
        message: `"Don't fear opening the door."

What you felt looked interesting.

What somehow caught your attention.

That intuition has meaning.

Many people try to stay in safe places.

But you have the courage to head into the unknown.

That single step gives birth to new encounters,
and brings a new future.

The world is wider than you think.

And you were born to find its secrets.`,
        keywords: ["Drive", "Freedom", "Adventurous spirit", "Adaptability", "Power to open possibility"],
      },
    },
  },
  ko: {
    INTJ: {
      name: "흰 마녀",
      catchCopy: "조용히 미래를 꿰뚫어 보는 전략의 마녀.",
      description:
        "당신은 조용히 미래를 내다보고 사물의 본질을 꿰뚫어 보는 흰 마녀 타입입니다. 감정에 휩쓸리기보다 냉정하게 전체를 바라보며 자신만의 답을 이끌어 내는 힘이 있습니다. 혼자만의 시간으로 힘을 비축하고, 필요한 사람에게만 깊은 인도를 건네는 존재입니다.",
      detail: {
        body: `당신은 「흰 마녀」.

조용한 빛으로 미래를 비추며, 누구보다 멀리 내다보는 힘을 지닌 존재입니다.

많은 이들이 눈앞의 감정이나 일에 마음이 흔들릴 때, 당신은 한 발 물러선 곳에서 전체의 흐름을 바라봅니다. 감정에 휩쓸리지 않고 본질을 꿰뚫어, 최선의 미래로 향하는 길을 그려 낼 수 있습니다.

언뜻 냉정하고 다가가기 어려워 보이기도 하지만, 그 안쪽에는 강한 신념과 다정함을 품고 있습니다. 당신은 누군가에게 의존하지 않고 스스로의 힘으로 운명을 개척하는 타입. 그렇기에 많은 사람이 당신의 지혜와 판단력에서 인도를 구하는 것입니다.

흰 마녀의 사명은 「아직 보지 못한 가능성을 현실로 바꾸는 것」.

서두를 필요는 없습니다. 당신이 믿은 미래는 착실히 형태를 갖춰 갑니다. 그 지성과 의지의 빛은 머지않아 자신뿐 아니라 주위 사람들의 미래까지 비추어 갈 것입니다.`,
        love: `연애에서는 신중하여, 정말로 신뢰할 수 있는 상대에게만 마음을 엽니다.

밀고 당기기나 표면적인 관계에는 흥미가 없고, 「이 사람과 미래를 쌓을 수 있을까」를 자연스럽게 생각합니다. 좋아하기까지 시간은 걸리지만, 한 번 소중하다고 정한 상대에게는 깊은 애정과 성실함을 쏟습니다.

다만 감정을 말로 표현하는 것이 조금 서툴러 「무슨 생각을 하는지 모르겠다」고 여겨지기도 합니다. 때로는 생각을 말로 전함으로써 더 강한 유대를 키울 수 있을 것입니다.`,
        compatibility: [
          { name: "달의 마녀", text: "당신의 이성과 달의 마녀의 직감은 놀라우리만치 아름답게 맞물립니다. 말하지 않아도 마음을 이해해 주기에, 깊은 신뢰 관계를 쌓을 수 있는 운명적인 상대입니다." },
          { name: "꽃의 마녀", text: "흰 마녀가 놓치기 쉬운 마음의 따뜻함을 알려 주는 존재. 당신의 미래 설계에 다정함과 빛깔을 더해 줍니다." },
          { name: "별의 마녀", text: "지적 호기심으로 이어지는 최고의 파트너. 어느새 몇 시간이고 이야기 나누며 서로의 세계를 넓혀 갈 수 있습니다." },
        ],
        rival: { name: "검은 마녀", text: "마찬가지로 미래를 내다보는 힘을 지닌 자들끼리. 최강의 파트너도, 최대의 라이벌도 될 수 있습니다. 가치관이 일치하면 압도적인 힘을 발휘하지만, 주도권 다툼에는 주의가 필요합니다." },
        message: `「미래는 우연이 아니라, 선택으로 만들어지는 것.」

당신에게는 그 미래를 그릴 힘이 있습니다.
자신의 지성과 신념을 믿고 나아가세요.
하얀 빛은 언제나 당신이 나아갈 길을 비추고 있으니까요.`,
        keywords: ["지성", "전략", "미래 통찰", "독립심", "탐구심"],
      },
    },
    INFJ: {
      name: "달의 마녀",
      catchCopy: "사람의 마음 깊은 곳을 비추는 자애의 마녀.",
      description:
        "당신은 말이 되지 못한 마음을 살며시 헤아리는 달의 마녀 타입입니다. 겉으로 드러내지 않아도 사람의 아픔과 바람을 깊이 이해하고 조용히 곁에 머물 수 있습니다. 이상을 가슴에 품고 누군가를 위해 힘을 다하는 한편, 자신의 마음의 소리에는 잘 알아차리지 못하기도 합니다. 당신의 다정함은 밤을 비추는 달처럼, 길 잃은 이의 마음을 부드럽게 감쌉니다.",
      detail: {
        body: `당신은 「달의 마녀」.

고요한 달빛처럼 사람의 마음을 부드럽게 비추는 존재입니다.

누군가가 말로 표현하지 못한 마음을 품고 있을 때, 당신은 신기하리만치 자연스럽게 그 기척을 알아챕니다. 상대가 무엇을 원하고, 무엇에 상처받고, 무엇을 바라는지. 마치 달이 밤바다를 비추듯, 당신의 마음은 사람들의 감정을 비춥니다.

주위에서는 온화하고 다정한 사람으로 여기는 경우가 많을 것입니다. 그러나 그 안쪽에는 누구도 쉽게 흔들 수 없는 강한 신념이 잠들어 있습니다.

달의 마녀는 다툼을 좋아하지 않습니다. 하지만 정말 소중한 것을 지키기 위해서라면, 조용히 일어설 용기를 지니고 있습니다.

당신은 눈에 띄는 빛이 아니라, 사람들이 길을 잃었을 때 나아갈 길을 비추는 달빛.

그렇기에 많은 사람이 자기도 모르게 당신을 의지하며, 안심을 찾아 모여드는 것입니다.

달의 마녀의 사명은 「사람의 마음에 희망의 등불을 밝히는 것」.

당신의 다정함은 약함이 아닙니다. 그것은 누군가를 구하고, 치유하고, 앞으로 나아가게 하는 소중한 마법입니다.`,
        love: `연애에서 당신은 누구보다 깊은 애정을 지닌 사람입니다.

다만 그 사랑은 매우 신중합니다.

표면적인 매력이나 한때의 감정만으로는 마음을 열지 않습니다. 정말로 신뢰할 수 있다고 느낀 상대에게만 자신의 본심과 약함을 보일 것입니다.

좋아하는 사람이 생기면 상대의 행복을 가장 먼저 생각하지만, 때로는 자신의 마음을 지나치게 뒤로 미루기도 합니다.

당신은 사랑받을 가치가 있는 존재입니다.

상대를 소중히 하듯, 자기 자신의 마음도 소중히 해 주세요.

달의 마녀가 안심하고 미소 지을 수 있는 곳이야말로, 진정 행복한 사랑이 자라는 곳입니다.`,
        compatibility: [
          { name: "흰 마녀", text: "당신의 직감과 흰 마녀의 지성은 최고의 조합. 달의 마녀가 느낀 미래의 조짐을 흰 마녀가 현실로 이끌어 줍니다. 서로 부족한 부분을 메워 주는, 특별한 인연을 지닌 상대입니다." },
          { name: "꽃의 마녀", text: "다정함과 감수성으로 공명하는 관계. 말이 없어도 마음이 통하고, 함께 있는 것만으로 치유를 느낄 수 있습니다. 마치 봄 꽃밭 같은 온화한 시간을 함께할 수 있습니다." },
          { name: "새벽의 마녀", text: "사람을 인도하는 힘을 지닌 자들끼리. 새벽의 마녀의 행동력과 달의 마녀의 깊은 통찰력이 합쳐지면 많은 사람을 행복으로 이끌 수 있습니다. 존경과 신뢰로 맺어지는 궁합입니다." },
        ],
        rival: { name: "비밀의 마녀", text: "자유분방하고 예측 불가능한 비밀의 마녀는 달의 마녀에게 자극적인 존재. 서로 끌리기도 하지만 가치관의 차이에 당황하는 일도 적지 않습니다. 그러나 서로를 이해하려 다가설 수 있을 때, 지금껏 몰랐던 세계를 보여 줄 것입니다." },
        message: `「당신의 다정함은 누군가의 인생을 비추는 빛.」

상처받는 것을 두려워하지 않아도 괜찮습니다.

당신이 내민 손에 구원받은 사람은, 분명 당신이 생각하는 것보다 훨씬 많으니까요.

달은 언제나 조용히 빛납니다.

당신 또한 그대로 아름다운 빛을 발하고 있습니다.`,
        keywords: ["직감", "공감", "통찰력", "이상주의", "치유"],
      },
    },
    INTP: {
      name: "별의 마녀",
      catchCopy: "진리를 계속 찾아가는 사색의 마녀.",
      description:
        "당신은 세계의 구조와 「왜」를 계속 탐구하는 별의 마녀 타입입니다. 상식에 얽매이지 않고 스스로 끝까지 생각하는 데에서 기쁨을 느낍니다. 혼자 조용히 생각을 굴리는 시간이 당신의 마력의 원천. 호기심이 이끄는 대로 새로운 지식을 모으고, 누구도 떠올리지 못한 발상으로 길을 엽니다. 먼 별처럼, 당신의 탐구는 언젠가 확실한 빛이 됩니다.",
      detail: {
        body: `당신은 「별의 마녀」.

끝없는 밤하늘에 빛나는 별들처럼, 누구도 알아채지 못한 진리를 계속 찾아가는 존재입니다.

많은 사람이 「당연하다」며 받아들이는 것에도 당신은 자연스럽게 의문을 품습니다.

왜 그럴까.
사실은 어떻게 되어 있을까.
아직 아무도 모르는 답이 있는 것은 아닐까.

그런 탐구심이 당신을 늘 새로운 발견으로 이끌고 있습니다.

별의 마녀는 지식을 모으기만 하지 않습니다.

점과 점을 잇고, 누구도 본 적 없는 가능성을 찾아내는 힘을 지니고 있습니다.

혼자 생각하는 시간을 사랑하며, 자기만의 세계를 쌓아 올리기도 할 것입니다.

때로는 주위에서 「무슨 생각을 하는지 모르겠다」고 여기기도 하지만, 그것은 당신이 남보다 멀리, 깊이 사고를 굴리고 있기 때문입니다.

별의 마녀의 사명은 「세계의 비밀을 풀어내는 것」.

당신이 품는 의문과 호기심은 미래를 열어 가기 위한 소중한 마법입니다.`,
        love: `연애에서는 마음보다 먼저 지성이 끌리는 타입입니다.

아무리 매력적인 상대라도 대화가 맞지 않거나 가치관을 공유할 수 없으면 좀처럼 연심으로 발전하지 않습니다.

반대로 「이 사람을 더 알고 싶다」고 느끼는 상대에게는 강하게 끌립니다.

당신에게 연애란 감정뿐 아니라 지적 모험이기도 합니다.

다만 자신의 마음을 표현하는 것은 조금 서툽니다.

좋아하는 상대일수록 거리감이 어색해지거나, 그만 지나치게 분석해 버리기도 합니다.

너무 생각하지 말고, 때로는 솔직한 감정을 전할 것.

그것이 별의 마녀가 연애를 키우는 소중한 열쇠가 됩니다.`,
        compatibility: [
          { name: "흰 마녀", text: "지성과 미래에 대한 탐구심으로 깊이 공명하는 상대. 서로 군더더기 설명이 필요 없어, 어느새 몇 시간이고 이야기를 나눕니다. 최고의 이해자이자 인생의 동반자도 될 수 있는 존재입니다." },
          { name: "달의 마녀", text: "별의 마녀가 논리로 다다르는 곳에, 달의 마녀는 직감으로 다다릅니다. 다른 방법으로 같은 진실을 바라보는 두 사람은 신기하리만치 강하게 끌립니다." },
          { name: "바람의 마녀", text: "끝없는 호기심을 공유할 수 있는 관계. 새로운 발상과 아이디어를 나누는 시간은 별의 마녀에게 무엇보다도 큰 자극이 됩니다." },
        ],
        rival: { name: "꿈의 마녀", text: "자유롭고 감각적인 꿈의 마녀는 별의 마녀와 정반대의 존재. 처음에는 이해되지 않는 부분도 많을 것입니다. 그러나 그 자유로움과 행동력은 당신이 모르는 세계로 데려가 줍니다. 가치관의 차이를 즐길 수 있다면 크게 성장할 수 있는 관계가 될 것입니다." },
        message: `「답이 없는 물음을 사랑하세요.」

바로 이해되지 않는 일이 있어도 괜찮습니다.

당신이 품는 의문 하나하나가, 누구도 본 적 없는 미래로 이어지는 문이 될 테니까요.

별들은 멀리 떨어져 있어도, 하나의 밤하늘을 이룹니다.

당신의 지식 또한, 언젠가 세계를 비추는 빛이 될 것입니다.`,
        keywords: ["지성", "탐구심", "독창성", "논리성", "호기심"],
      },
    },
    ENFJ: {
      name: "새벽의 마녀",
      catchCopy: "사람을 인도하고 비추는 동트는 마녀.",
      description:
        "당신은 사람의 가능성을 믿고 그 등을 살며시 밀어 주는 새벽의 마녀 타입입니다. 자리의 분위기를 따뜻하게 데우고 주위를 자연스럽게 긍정적으로 만드는 힘이 있습니다. 누군가의 성장과 행복을 진심으로 바라며 아낌없이 손을 내미는 존재. 때로는 남을 위해 너무 애쓰지만, 당신의 말은 새벽빛처럼 사람의 하루를 시작하게 하는 힘이 됩니다.",
      detail: {
        body: `당신은 「새벽의 마녀」.

밤의 끝을 알리고 새로운 아침으로 사람들을 인도하는 존재입니다.

아직 누구도 알아채지 못한 가능성을 찾아내고, 그 사람이 지닌 본래의 빛을 믿을 수 있습니다.

누군가가 자신감을 잃었을 때.
길을 헤맬 때.
희망을 잃을 것 같을 때.

당신은 자연스럽게 그 사람 곁에 서서, 나아갈 방향을 비추고 있을 것입니다.

새벽의 마녀는 사람의 마음을 움직이는 힘을 지니고 있습니다.

그것은 억지로 끌어당기는 힘이 아닙니다.

「당신이라면 할 수 있어」

그 한마디로 사람의 미래를 바꿔 버리는 듯한 따뜻한 빛입니다.

사람의 성장과 행복을 자기 일처럼 기뻐하고, 누군가의 꿈을 응원하는 데에서 큰 기쁨을 느낄 것입니다.

새벽의 마녀의 사명은 「희망의 불씨를 이어 가는 것」.

당신이 밝힌 빛은 한 사람에게서 또 다음 누군가에게로 이어집니다.

그 다정함과 열정은 많은 사람의 인생을 비추어 가는 특별한 마법입니다.`,
        love: `연애에서는 매우 성실하고 한결같은 사랑을 쏟는 타입입니다.

좋아하는 사람의 행복을 진심으로 바라며, 지지하고 싶다는 마음이 자연스럽게 솟아납니다.

상대의 마음을 민감하게 느낄 수 있어 세심한 배려도 잘합니다.

다만 사람을 우선하는 나머지, 자신의 본심을 뒤로 미루기도 합니다.

「상대가 기뻐한다면」

하고 무리를 계속하는 일도 적지 않습니다.

정말 행복한 연애란 서로 받쳐 주는 관계.

때로는 자신의 약함과 바람을 솔직하게 전함으로써 더 깊은 유대를 쌓을 수 있을 것입니다.

당신의 애정은 누군가를 비추는 태양 같은 힘을 지니고 있습니다.

그러니 자기 자신에게도 그 빛을 비춰 주세요.`,
        compatibility: [
          { name: "달의 마녀", text: "서로 사람의 마음을 소중히 하는 자들끼리. 새벽의 마녀의 행동력과 달의 마녀의 깊은 통찰력은 아름답게 조화를 이룹니다. 함께함으로써 서로가 더 다정하고 더 강해지는 특별한 관계입니다." },
          { name: "꽃의 마녀", text: "순수한 다정함을 지닌 꽃의 마녀는 새벽의 마녀의 마음을 온화하게 치유해 줍니다. 이상과 꿈을 나누며 따뜻한 미래를 쌓아 갈 수 있을 것입니다." },
          { name: "흰 마녀", text: "감정과 이성. 다른 힘을 지닌 자들이기에 강하게 끌립니다. 새벽의 마녀가 사람들을 인도하고, 흰 마녀가 미래를 그린다. 두 사람이 힘을 합치면 커다란 운명마저 움직일 수 있을 것입니다." },
        ],
        rival: { name: "심연의 마녀", text: "감정보다 현실을 중시하는 심연의 마녀는 새벽의 마녀와 대조적인 존재입니다. 처음에는 차갑게 느껴질지도 모릅니다. 그러나 그 냉정함과 자립심에서 배울 점도 많아, 서로 성장할 수 있는 관계가 될 가능성을 품고 있습니다." },
        message: `「당신이 믿은 빛은 누군가의 희망이 됩니다.」

스스로는 작은 친절이라 여겨도, 당신의 말과 행동에 구원받은 사람이 있습니다.

부디 그 다정함을 자랑스러워하세요.

새벽은 반드시 찾아옵니다.

그리고 당신은, 그 첫 빛을 나르는 존재입니다.`,
        keywords: ["공감력", "열정", "리더십", "헌신", "희망"],
      },
    },
    ISFJ: {
      name: "숲의 마녀",
      catchCopy: "조용히 지키고 길러 내는 자애의 마녀.",
      description:
        "당신은 소중한 사람이나 장소를 조용히 지키고 길러 내는 숲의 마녀 타입입니다. 화려함보다 성실함을 소중히 하며, 약속과 매일의 쌓임을 정성껏 지킵니다. 곤란한 사람에게 살며시 다가가 보답을 바라지 않고 받쳐 주는 다정함의 소유자. 당신의 곁은 숲 그늘처럼 안심할 수 있는 곳. 그 온화한 강인함이 주위의 마음을 치유해 갑니다.",
      detail: {
        body: `당신은 「숲의 마녀」.

깊은 숲이 조용히 생명을 길러 내듯, 사람들을 다정하게 받치고 지키는 힘을 지닌 존재입니다.

당신은 결코 화려하게 튀는 타입이 아닙니다.

하지만 누군가가 곤란할 때, 상처받았을 때, 살며시 손을 내밀 수 있는 사람입니다.

주위의 작은 변화도 잘 알아채고, 상대가 말로 표현하지 않아도 필요로 하는 것을 헤아릴 수 있을 것입니다.

그 다정함은 결코 꾸며 낸 것이 아닙니다.

숲이 당연하다는 듯 나무와 생명을 감싸 안듯, 당신 안에는 사람을 소중히 하고 싶다는 따뜻한 마음이 자연스럽게 숨 쉬고 있습니다.

때로는 자신보다 남을 지나치게 우선하기도 합니다.

그러나 당신의 존재 자체가 많은 사람에게 안심을 줍니다.

숲의 마녀의 사명은 「사람들이 돌아올 수 있는 곳을 지키는 것」.

당신이 만드는 보금자리와 다정함은, 누군가에게 둘도 없는 보물이 되어 있습니다.`,
        love: `연애에서는 매우 성실하고 헌신적인 타입입니다.

좋아하게 된 상대를 소중히 하며, 그 사람의 행복을 바라며 관계를 키워 갑니다.

화려한 연애나 자극적인 밀당보다, 함께 있어 안심할 수 있는 관계를 원할 것입니다.

연인의 취향이나 작은 변화를 기억하는 일도 많아 「이런 것까지 알아챘어?」 하고 놀라게 하기도 합니다.

다만 상대에게 지나치게 맞추는 경향이 있습니다.

사실은 외로운데 참거나, 싫은 일이 있어도 삼켜 버리기도 할 것입니다.

당신의 다정함은 훌륭한 재능입니다.

그렇기에 자기 자신의 마음도 그만큼 소중히 해 주세요.

숲이 건강해야 비로소 많은 생명을 지킬 수 있으니까요.`,
        compatibility: [
          { name: "꽃의 마녀", text: "다정함과 배려로 깊이 공명하는 상대입니다. 함께 있는 것만으로 마음이 차분해지고, 서로 자연스럽게 지낼 수 있을 것입니다. 마치 숲에 핀 꽃처럼, 아름답고 온화한 관계를 쌓을 수 있습니다." },
          { name: "달의 마녀", text: "상대의 마음을 소중히 하는 자들끼리. 말하지 않아도 마음이 통하고, 깊은 신뢰 관계를 키울 수 있습니다. 서로의 다정함이 기분 좋게 울려 퍼질 것입니다." },
          { name: "시간의 마녀", text: "성실함과 책임감을 지닌 자들끼리. 안심할 수 있는 관계를 쌓기 쉽고, 오랜 시간을 들여 강한 유대를 길러 갈 수 있습니다. 인생의 동반자로서 매우 잘 맞는 조합입니다." },
        ],
        rival: { name: "바람의 마녀", text: "자유를 사랑하고 변화를 추구하는 바람의 마녀는 숲의 마녀와 정반대의 존재입니다. 휘둘리기도 하지만, 그 자유로운 발상과 행동력은 당신의 세계를 크게 넓혀 줄 것입니다. 서로를 이해할 수 있을 때, 뜻밖의 성장을 가져오는 관계가 됩니다." },
        message: `「당신의 다정함은 생각보다 훨씬 큰 힘을 지니고 있습니다.」

누군가를 받쳐 주는 일은 결코 당연한 일이 아닙니다.

당신이 내민 작은 친절과 배려는, 알아채지 못하는 곳에서 많은 사람의 마음을 구하고 있습니다.

숲은 서둘러 자라지 않습니다.

그래도 분명히 생명을 계속 길러 냅니다.

당신 또한 자기다운 보폭으로 나아가면 됩니다.`,
        keywords: ["다정함", "헌신", "안심감", "배려", "성실"],
      },
    },
    INFP: {
      name: "꽃의 마녀",
      catchCopy: "마음의 이상을 피워 내는 순진의 마녀.",
      description:
        "당신은 자신만의 이상과 아름다움을 가슴에 품은 꽃의 마녀 타입입니다. 부드러운 마음으로 사물을 느끼며, 사람의 마음과 작은 행복을 소중히 합니다. 정말 중요한 것에는 조용한 열정을 쏟고, 자기다움을 굽히지 않는 심지도 지녔습니다. 당신의 감성은 계절을 물들이는 꽃처럼, 주위 세계를 살며시 풍요롭게 물들여 갑니다.",
      detail: {
        body: `당신은 「꽃의 마녀」.

다정함과 상상력을 가슴에 품고, 이 세계에 아름다운 빛깔을 더하는 존재입니다.

꽃은 누군가에게 칭찬받기 위해 피지 않습니다.

그저 자기답게 피어, 그 모습으로 사람들의 마음을 치유합니다.

당신 또한 그런 꽃 같은 영혼을 지니고 있습니다.

사람의 아픔에 민감하여, 누군가 슬퍼할 때는 자기 일처럼 가슴 아파할 것입니다.

다정한 말과 작은 배려로, 많은 사람의 마음을 구해 왔을 것입니다.

또한 당신 안에는 풍부한 상상력과 이상이 있습니다.

현실만으로는 잴 수 없는 아름다움과 가능성을 믿으며, 자기만의 세계를 소중히 길러 갑니다.

때로는 주위에서 「생각이 너무 많다」 「몽상가」라는 말을 들을지도 모릅니다.

하지만 그것은 꽃의 마녀가 지닌 특별한 힘.

누구도 찾지 못하는 희망의 씨앗을 찾아내, 미래에 피워 낼 수 있는 것입니다.

꽃의 마녀의 사명은 「마음에 아름다운 꽃을 피우는 것」.

당신의 다정함과 상상력은, 세계를 조금 더 다정하게 만들기 위한 마법입니다.`,
        love: `연애에서는 매우 한결같고 순수한 사랑을 품는 타입입니다.

좋아하게 된 상대를 깊이 생각하며, 그 사람과의 미래를 마음속으로 몇 번이고 그릴 것입니다.

당신에게 연애란 그저 함께 있는 것이 아닙니다.

마음과 마음이 이어지는 것.

서로의 본심과 꿈을 나눌 수 있는 것.

그런 특별한 유대를 무엇보다 소중히 합니다.

다만 상대를 지나치게 이상화하기도 합니다.

현실과의 괴리에 상처받거나, 자신의 마음을 전하지 못해 괴로워하기도 할 것입니다.

그래도 당신의 애정은 매우 따뜻하고 깊습니다.

꽃은 억지로 피우는 것이 아닙니다.

사랑 또한 자연스러운 흐름 속에서 자라 가는 것입니다.`,
        compatibility: [
          { name: "달의 마녀", text: "마치 오래전부터 알아 온 듯한 안심을 주는 상대. 서로의 감정과 가치관을 소중히 하며 깊은 유대를 키울 수 있습니다. 말이 없어도 마음이 통하는 특별한 관계입니다." },
          { name: "숲의 마녀", text: "다정함과 배려로 가득한 조합. 꽃의 마녀가 자유롭게 필 수 있도록, 숲의 마녀가 따뜻하게 받쳐 줍니다. 온화하고 편안한 관계를 쌓을 수 있을 것입니다." },
          { name: "새벽의 마녀", text: "당신의 꿈과 이상을 진심으로 응원해 주는 존재. 꽃의 마녀가 품은 가능성을 믿고, 앞으로 나아갈 용기를 줍니다. 함께 성장할 수 있는 멋진 상대입니다." },
        ],
        rival: { name: "검은 마녀", text: "현실을 직시하며 힘차게 나아가는 검은 마녀는 꽃의 마녀와 정반대의 존재입니다. 가치관의 차이에 당황하기도 하지만, 그 강인함과 결단력에 끌리기도 할 것입니다. 서로를 이해할 수 있을 때, 이상과 현실이 아름답게 조화를 이루는 관계가 될 가능성을 품고 있습니다." },
        message: `「당신의 다정함을, 부디 부정하지 마세요.」

상처받기 쉬운 것은 약함이 아닙니다.

그만큼 많은 것을 느끼고, 사람의 아픔에 다가설 수 있다는 뜻이니까요.

꽃은 누군가와 비교하기 위해 피지 않습니다.

당신 또한 당신답게 피면 됩니다.

그 아름다움은, 이미 누군가의 마음을 구하고 있습니다.`,
        keywords: ["다정함", "이상주의", "상상력", "공감력", "순수한 사랑"],
      },
    },
    ISFP: {
      name: "바다의 마녀",
      catchCopy: "지금을 음미하고 사랑하는 감성의 마녀.",
      description:
        "당신은 지금 이 순간의 아름다움을 오감으로 음미하는 바다의 마녀 타입입니다. 자유로운 마음으로, 좋아하는 것과 편안함에 솔직하게 살아갑니다. 말보다 행동과 분위기로 애정을 전하는, 다정하면서도 심지 있는 사람. 온화해 보여도 안에는 깊은 감정의 바다를 품고 있습니다. 당신의 존재는 파도처럼 사람의 마음을 조용히 가다듬고 적셔 갑니다.",
      detail: {
        body: `당신은 「바다의 마녀」.

자유로운 파도처럼 살며, 아름다운 것을 사랑하고, 자기만의 감성으로 세계를 느끼는 존재입니다.

바다는 결코 같은 모습을 보이지 않습니다.

잔잔한 날도 있고, 거세게 몰아치는 날도 있습니다.

그래도 늘 깊고, 아름다우며, 많은 생명을 감싸 안습니다.

당신의 마음 또한 그런 바다와 꼭 닮았습니다.

풍부한 감수성을 지녀, 사람들이 지나쳐 버리는 작은 아름다움과 감동을 알아챌 수 있을 것입니다.

하늘의 빛깔.
바람의 냄새.
음악과 말에 담긴 마음.

당신은 그것들을 누구보다 깊이 느낄 수 있습니다.

또한 자기다움을 매우 소중히 하는 사람이기도 합니다.

억지로 누군가에게 맞추기보다, 자신의 마음이 납득하는 삶을 택하고 싶을 것입니다.

바다의 마녀의 사명은 「세계의 아름다움을 찾아내는 것」.

당신이 찾아낸 작은 빛은, 주위 사람들의 마음에도 다정한 파문을 넓혀 갑니다.`,
        love: `연애에서는 감정을 매우 소중히 하는 타입입니다.

조건이나 이치가 아니라,

「이 사람과 함께 있으면 마음이 편안하다」

「더 함께 있고 싶다」

그런 감각을 무엇보다 믿습니다.

좋아하는 상대에게는 다정하게, 자연스럽게 애정을 쏟습니다.

보답을 바라는 일은 적고, 상대의 행복을 바라는 순수한 마음을 지니고 있을 것입니다.

다만 자신의 마음을 말로 표현하는 것은 조금 서툽니다.

사실은 외로워도 참거나, 상처받아도 미소로 감춰 버리기도 합니다.

당신의 마음 또한 소중한 보물입니다.

바다가 진정한 깊이를 감추듯, 당신의 마음도 전하지 않으면 상대에게 닿지 않습니다.

때로는 솔직한 마음을 털어놓을 용기를 냄으로써, 더 깊은 사랑을 키울 수 있을 것입니다.`,
        compatibility: [
          { name: "꽃의 마녀", text: "아름다운 것을 사랑하는 자들끼리. 감성과 가치관이 자연스럽게 울려 퍼져, 함께 있는 것만으로 마음이 채워지는 관계입니다. 서로를 억지로 바꾸려 하지 않고, 그대로 받아들일 수 있을 것입니다." },
          { name: "숲의 마녀", text: "다정하게 감싸 주는 숲의 마녀는 바다의 마녀에게 안심을 주는 존재입니다. 당신이 자유롭게 헤엄칠 수 있도록 살며시 받쳐 줄 것입니다. 온화하고 따뜻한 유대를 키울 수 있습니다." },
          { name: "꿈의 마녀", text: "즐거움과 감동을 나눌 수 있는 최고의 상대. 함께 있는 것만으로 새로운 풍경과 경험을 만납니다. 인생을 더욱 선명하게 물들여 줄 것입니다." },
        ],
        rival: { name: "시간의 마녀", text: "신중하고 현실적인 시간의 마녀는 자유를 사랑하는 바다의 마녀와 대조적인 존재입니다. 가치관의 차이에 당황하기도 하지만, 그 성실함과 안정감에 끌리기도 할 것입니다. 서로의 차이를 존중할 수 있을 때, 깊이 신뢰하는 관계로 성장해 갑니다." },
        message: `「당신의 마음이 아름답다고 느끼는 것을 소중히 하세요.」

남과 같을 필요는 없습니다.

당신에게만 보이는 풍경이 있고, 당신만이 느낄 수 있는 감동이 있습니다.

바다가 자유롭게 파도를 그리듯, 당신도 자기답게 살아도 됩니다.

그 감성이야말로, 당신만의 특별한 마법이니까요.`,
        keywords: ["감성", "자유", "예술성", "다정함", "미의식"],
      },
    },
    ENTP: {
      name: "바람의 마녀",
      catchCopy: "새로운 바람을 일으키는 변혁의 마녀.",
      description:
        "당신은 자유로운 발상으로 새로운 바람을 불어넣는 바람의 마녀 타입입니다. 호기심이 왕성하여, 논의와 영감 속에서 흥미로운 가능성을 찾아냅니다. 상식에 얽매이지 않고, 멈춰 버린 공기를 가볍게 움직이는 힘을 지닌 사람. 지루함을 싫어하며, 늘 다음 모험을 찾고 있습니다. 당신이 일으키는 바람은 주위 사람들의 세계를 새롭게 칠해 갑니다.",
      detail: {
        body: `당신은 「바람의 마녀」.

누구도 떠올리지 못한 발상을 실어 나르며, 새로운 가능성을 세계에 가져오는 존재입니다.

바람은 형태를 갖지 않습니다.

그렇기에 어디로든 갈 수 있습니다.

벽을 넘고, 나라를 넘어, 사람들 사이를 자유롭게 내달립니다.

당신 또한 그런 바람 같은 영혼을 지니고 있습니다.

상식에 얽매이지 않고, 새로운 생각이나 흥미로운 가능성을 찾아내는 데 능할 것입니다.

사람들이 「무리야」 하고 포기하는 일에도,

「정말 그럴까?」

하고 의문을 던질 수 있습니다.

그 유연한 발상력과 호기심은 많은 사람에게 자극과 변화를 주고 있습니다.

다만 같은 곳에 계속 머무는 것은 조금 어려워합니다.

새로운 발견과 도전이 있기에, 당신의 마법은 빛납니다.

바람의 마녀의 사명은 「정체된 세계에 변화를 가져오는 것」.

당신의 말과 아이디어는 누군가의 인생을 크게 움직이는 순풍이 될 것입니다.`,
        love: `연애에서는 친구처럼 편하게 이야기할 수 있는 관계를 소중히 합니다.

함께 있어 즐거울 것.

가치관과 발상을 공유할 수 있을 것.

그리고 무엇보다, 자유로울 수 있을 것.

그것이 바람의 마녀에게 이상적인 연애입니다.

구속이나 너무 무거운 관계는 조금 어려워할지도 모릅니다.

하지만 그것은 애정이 얕아서가 아닙니다.

당신은 「좋아하기에 상대도 자유롭길 바란다」고 생각하는 사람입니다.

또한 연애에서도 호기심이 왕성합니다.

상대의 몰랐던 면을 알아 가는 데에서 기쁨을 느낍니다.

다만 흥미가 잇따라 옮겨 가기에, 「무슨 생각을 하는지 모르겠다」고 여겨지기도 할 것입니다.

정말 소중한 상대에게는 자신의 마음을 말로 전할 것.

그것이 바람의 마녀가 사랑을 오래 키우는 비결입니다.`,
        compatibility: [
          { name: "별의 마녀", text: "끝없는 지적 호기심으로 맺어지는 상대. 새로운 아이디어와 신기한 이야기를 몇 시간이고 나눌 수 있습니다. 서로의 세계를 넓혀 가는 최고의 파트너입니다." },
          { name: "꿈의 마녀", text: "자유를 사랑하는 자들끼리. 함께 있는 것만으로 매일이 모험이 됩니다. 뜻밖의 장소로 데려가, 새로운 풍경을 보여 줄 것입니다." },
          { name: "새벽의 마녀", text: "바람의 마녀가 찾아낸 가능성을, 새벽의 마녀가 현실로 이끌어 줍니다. 자극과 신뢰가 공존하는 매우 매력적인 조합입니다." },
        ],
        rival: { name: "숲의 마녀", text: "안정을 소중히 하는 숲의 마녀는 변화를 사랑하는 바람의 마녀와 정반대. 처음에는 답답하게 느껴질 수도 있습니다. 그러나 그 다정함과 성실함은 당신에게 새로운 가치관을 알려 줄 것입니다. 서로의 차이를 존중할 수 있을 때, 의외로 좋은 관계를 쌓을 수 있습니다." },
        message: `「호기심을 두려워하지 마세요.」

당신이 재미있다고 느낀 것.

마음이 움직인 것.

그 모든 것이 새로운 미래로 이어지는 이정표입니다.

바람은 같은 곳에 머물지 않습니다.

그렇기에 멀리까지 닿을 수 있습니다.

당신 또한 자신의 가능성을 믿고 날아오르세요.

그 자유로운 영혼이야말로, 당신만의 마법이니까요.`,
        keywords: ["자유", "발상력", "호기심", "도전", "변화"],
      },
    },
    ISTJ: {
      name: "시간의 마녀",
      catchCopy: "약속을 지키고 쌓아 올리는 성실의 마녀.",
      description:
        "당신은 시간과 약속을 소중히 쌓아 가는 시간의 마녀 타입입니다. 묵묵한 노력을 마다하지 않고, 해야 할 일을 끝까지 해내는 책임감의 소유자. 화려함은 없어도 그 확실함이 많은 신뢰를 낳습니다. 질서와 규칙을 중시하며, 주위에 안정을 가져오는 존재. 당신이 쌓아 온 시간은 흔들리지 않는 토대가 되어 미래를 떠받칩니다.",
      detail: {
        body: `당신은 「시간의 마녀」.

흘러가는 시간을 지켜보며, 쌓여 온 역사와 약속을 지키는 존재입니다.

사람은 흔히 눈앞의 일이나 감정에 마음을 빼앗깁니다.

하지만 당신은 다릅니다.

지금만이 아니라 그 너머로 이어지는 미래까지 내다보며, 한 걸음씩 착실히 나아갈 수 있을 것입니다.

시간의 마녀는 화려한 기적을 일으키는 마녀가 아닙니다.

그러나 누구보다 확실한 힘을 지니고 있습니다.

매일의 노력.
지켜 온 약속.
쌓아 온 경험.

그것들은 눈에 보이지 않아도 확실히 미래를 빚어 가고 있습니다.

당신은 책임감이 강하여, 한 번 맡은 일을 도중에 내던지는 일이 거의 없습니다.

그 성실함은 많은 사람에게 신뢰받는 이유이기도 합니다.

시간의 마녀의 사명은 「미래로 이어 가야 할 것을 지키는 것」.

당신이 지켜 온 것은 머지않아 누군가의 버팀목이 되어, 새로운 시대로 이어져 갈 것입니다.`,
        love: `연애에서는 매우 성실하고 한결같은 타입입니다.

쉽게 사랑에 빠지는 일은 적을 것입니다.

하지만 정말 신뢰할 수 있는 상대라고 느꼈을 때, 그 애정은 길고 깊게 이어집니다.

당신에게 연애란 한때의 감정이 아니라 인생을 함께 걷는 약속과도 같은 것.

그래서 가벼운 밀당이나 애매한 관계는 어려워할지도 모릅니다.

좋아하는 상대에게는 말보다 행동으로 애정을 보이는 일이 많아,

"곤란할 때는 반드시 도와준다"

"약속을 제대로 지킨다"

그런 형태로 신뢰를 쌓아 갈 것입니다.

다만 자신의 마음을 표현하는 것은 조금 서툽니다.

소중히 여겨도 상대에게 전해지지 않기도 합니다.

때로는 말로 전함으로써 더 깊은 유대를 키울 수 있을 것입니다.`,
        compatibility: [
          { name: "숲의 마녀", text: "성실함과 배려를 지닌 자들끼리. 서로 안심을 주며, 온화하고 안정된 관계를 쌓을 수 있습니다. 오랜 시간을 함께할수록 신뢰가 깊어지는 이상적인 상대입니다." },
          { name: "흰 마녀", text: "미래를 내다보는 흰 마녀와, 착실히 나아가는 시간의 마녀. 이상과 현실을 잇는 최고의 조합입니다. 서로 존경하며 성장할 수 있을 것입니다." },
          { name: "거울의 마녀", text: "사람과의 조화를 소중히 하는 거울의 마녀는, 시간의 마녀의 성실함을 누구보다 이해해 줍니다. 서로 받쳐 주며 따뜻한 관계를 쌓을 수 있을 것입니다." },
        ],
        rival: { name: "바람의 마녀", text: "자유를 사랑하고 변화를 추구하는 바람의 마녀는, 시간의 마녀에게 예측 불가능한 존재입니다. 가치관의 차이에 당황하기도 할 것입니다. 그러나 그 유연한 발상과 도전하는 자세는 당신에게 새로운 풍경을 보여 줍니다. 차이를 받아들일 수 있을 때, 서로의 세계를 크게 넓히는 관계가 될 수 있습니다." },
        message: `"서두르지 않아도 됩니다."

꽃이 피기까지 시간이 필요하듯, 정말 소중한 것일수록 천천히 자라 갑니다.

당신이 쌓아 온 노력도, 지금은 아직 보이지 않아도 확실히 미래로 이어지고 있습니다.

시간은 결코 배신하지 않습니다.

오늘이라는 하루를 소중히 쌓아 가면, 머지않아 바라는 미래에 다다를 수 있을 것입니다.

그 성실함이야말로, 당신만의 마법입니다.`,
        keywords: ["성실", "책임감", "지속력", "신뢰", "견실"],
      },
    },
    ESFJ: {
      name: "거울의 마녀",
      catchCopy: "사람과 마음을 비춰 주는 조화의 마녀.",
      description:
        "당신은 주위 사람의 마음을 민감하게 비춰 내는 거울의 마녀 타입입니다. 자리의 화합을 소중히 하며, 누구나 편안할 수 있도록 자연스럽게 마음을 씁니다. 잘 챙기고, 사람과의 이어짐 속에서 힘을 발휘하는 사람. 감사받는 것이 무엇보다 큰 기쁨입니다. 당신의 따뜻한 눈빛은 거울처럼, 주위 사람에게 자신은 소중히 여겨지고 있다고 알려 줍니다.",
      detail: {
        body: `당신은 「거울의 마녀」.

사람의 마음을 비춰 내어, 그 사람이 지닌 본래의 매력을 빛나게 하는 존재입니다.

거울은 그저 모습을 비추기만 하지 않습니다.

때로는 스스로 알아채지 못한 아름다움이나 가능성을 알려 주기도 합니다.

당신 또한 사람의 장점과 매력을 찾아내는 데 매우 능할 것입니다.

누군가가 자신감을 잃었을 때는 격려하고,

불안을 안고 있을 때는 곁에 있어 주며,

기쁨을 나눌 때는 누구보다 환한 미소를 보입니다.

그런 따뜻한 힘을 지니고 있습니다.

주위와의 조화를 소중히 하며, 사람과 사람을 잇는 다리가 되는 일도 적지 않습니다.

당신이 있는 것만으로 자리의 분위기가 누그러지고, 사람들의 마음에 안심이 생겨납니다.

거울의 마녀의 사명은 「사람 안에 잠든 빛을 비춰 내는 것」.

당신의 다정함과 배려는, 많은 사람의 마음을 밝게 비추는 마법입니다.`,
        love: `연애에서는 매우 애정 깊고 헌신적인 타입입니다.

좋아하는 사람에게는 자연스럽게 헌신하고 싶어지고, 그 사람이 기뻐하는 모습을 보는 데에서 행복을 느낄 것입니다.

기념일을 소중히 하거나, 상대의 취향을 기억하거나, 작은 배려를 쌓아 가거나.

당신의 애정은 말뿐 아니라 매일의 행동 속에 드러납니다.

또한 연인과의 시간을 매우 소중히 하기에, 함께 추억을 만드는 데에서도 기쁨을 느낄 것입니다.

다만 상대를 지나치게 우선하여 자신의 마음을 참기도 합니다.

사실은 외로운데 괜찮은 척하거나, 불만을 삼켜 버리기도 할 것입니다.

거울의 마녀가 행복해지기 위해서는, 자신의 마음도 소중히 할 것.

사랑하는 사람만큼, 자기 자신에게도 다정하게 대해 주세요.`,
        compatibility: [
          { name: "숲의 마녀", text: "배려로 가득한 자들끼리. 서로 자연스럽게 챙기며, 안심에 둘러싸인 관계를 쌓을 수 있습니다. 마치 온화한 숲속에 있는 듯, 마음이 편안해지는 궁합입니다." },
          { name: "새벽의 마녀", text: "사람을 행복하게 하고 싶은 마음을 나눌 수 있는 상대. 함께함으로써 주위에도 좋은 영향을 줄 수 있는 따뜻한 관계가 될 것입니다." },
          { name: "시간의 마녀", text: "성실하고 신뢰할 수 있는 시간의 마녀는, 거울의 마녀에게 큰 안심을 줍니다. 서로 받쳐 주며 길고 안정된 유대를 키울 수 있을 것입니다." },
        ],
        rival: { name: "비밀의 마녀", text: "자유분방하고 예측 불가능한 비밀의 마녀는, 거울의 마녀를 휘두르기도 합니다. 그러나 그 행동력과 밝음에 끌리는 일도 적지 않습니다. 가치관의 차이는 크지만, 서로의 세계를 넓혀 주는 특별한 관계가 될 가능성을 품고 있습니다." },
        message: `"당신이 찾아내는 다정함은, 누군가의 용기가 됩니다."

사람의 좋은 점을 알아챌 수 있는 것.

누군가를 응원할 수 있는 것.

그것은 당연한 재능이 아닙니다.

당신이 내민 말과 미소에 구원받은 사람이 많이 있습니다.

거울은 사람의 모습을 비춥니다.

그리고 당신은 사람의 마음의 빛을 비춰 내는 존재입니다.

그 다정함을, 부디 자랑스러워하세요.`,
        keywords: ["배려", "조화", "헌신", "공감", "사람을 받치는 힘"],
      },
    },
    ENFP: {
      name: "실의 마녀",
      catchCopy: "사람과 가능성을 잇는 인연의 마녀.",
      description:
        "당신은 사람과 사람, 꿈과 현실을 가볍게 잇는 실의 마녀 타입입니다. 풍부한 감수성과 호기심으로, 만나는 사람의 매력과 가능성을 금세 찾아냅니다. 밝은 에너지로 주위를 끌어들이며, 새로운 인연을 잇따라 자아내는 사람. 마음이 이끄는 대로 움직이는 자유로움도 매력입니다. 당신이 잇는 실은 뜻밖의 행복을 이어 갑니다.",
      detail: {
        body: `당신은 「실의 마녀」.

사람과 사람, 꿈과 미래, 우연과 운명을 이어 주는 존재입니다.

이 세계에는 눈에 보이지 않는 무수한 실이 둘러쳐져 있습니다.

만남의 실.
가능성의 실.
미래로 이어지는 운명의 실.

실의 마녀는 그 실의 떨림을 누구보다 민감하게 느낄 수 있습니다.

당신은 호기심이 왕성하여, 사람과의 만남이나 새로운 경험을 진심으로 즐길 수 있는 사람입니다.

"재밌겠다"
"해 보고 싶다"

그런 직감에 따라 행동한 결과, 생각지도 못한 인연이나 행운을 끌어당기는 일도 적지 않습니다.

또한 사람의 매력을 찾아내는 데에도 능합니다.

누군가가 포기하려는 꿈 속에서 가능성을 발견하거나, 자신감을 잃은 사람에게 희망을 주기도 할 것입니다.

실의 마녀의 사명은 「운명을 다시 잇는 것」.

당신이 자아낸 작은 인연은 머지않아 커다란 기적으로 이어져 갑니다.`,
        love: `연애에서는 마음이 움직이는 순간을 매우 소중히 합니다.

이치가 아니라,

"이 사람과 있으면 즐겁다"

"더 이야기해 보고 싶다"

그런 감각에서 사랑이 시작되는 일이 많을 것입니다.

당신은 좋아하는 사람에게 매우 솔직하고, 애정 표현도 풍부합니다.

함께 웃거나, 꿈을 이야기하거나, 새로운 추억을 만드는 시간에 큰 행복을 느낍니다.

다만 자신의 마음이 너무 커진 나머지, 상대의 반응에 일희일비하기도 합니다.

또한 이상을 좇은 나머지 현실과의 괴리에 상처받기도 할 것입니다.

그래도 당신의 연애는 매우 순수합니다.

누군가를 진심으로 좋아할 수 있는 것.

그 자체가 실의 마녀가 지닌 아름다운 마법입니다.`,
        compatibility: [
          { name: "꿈의 마녀", text: "함께 있는 것만으로 매일이 즐거워지는 상대. 새로운 도전과 설레는 경험을 나눌 수 있어, 인생 자체를 모험처럼 즐길 수 있습니다." },
          { name: "꽃의 마녀", text: "감성과 다정함으로 깊이 공명할 수 있는 관계. 서로의 꿈과 이상을 이해하며, 자연스러운 그대로 있을 수 있는 특별한 상대입니다." },
          { name: "바람의 마녀", text: "호기심과 발상력으로 이어지는 조합. 잇따라 새로운 아이디어가 생겨나, 함께 있는 것만으로 세계가 넓어져 갈 것입니다." },
        ],
        rival: { name: "시간의 마녀", text: "신중하고 견실한 시간의 마녀는, 자유로운 실의 마녀와 정반대의 존재입니다. 처음에는 가치관의 차이에 당황할지도 모릅니다. 그러나 시간의 마녀의 성실함과 안정감은, 당신에게 안심이라는 새로운 가치를 알려 줄 것입니다. 차이가 크기에 배울 점도 많은 상대입니다." },
        message: `"만남을 믿으세요."

당신이 우연이라 여기는 것도, 사실은 운명의 실이 이끌고 있는지도 모릅니다.

마음이 움직였다면, 그 감각을 소중히 하세요.

새로운 곳으로 가는 것.

새로운 사람을 만나는 것.

그 하나하나가 미래를 바꾸는 계기가 됩니다.

당신은 운명을 기다리는 사람이 아니라, 스스로 운명을 자아내는 사람이니까요.`,
        keywords: ["호기심", "만남", "가능성", "자유", "운명을 자아내는 힘"],
      },
    },
    ESFP: {
      name: "꿈의 마녀",
      catchCopy: "지금을 빛나게 하는 환희의 마녀.",
      description:
        "당신은 그 자리를 밝고 화려하게 물들이는 꿈의 마녀 타입입니다. 지금 이 순간을 온 힘으로 즐기고, 주위 사람에게도 미소와 활기를 나눠 줍니다. 감정이 풍부하고 행동적이며, 마음먹으면 바로 움직이는 가벼움의 소유자. 사람을 즐겁게 하는 것을 무척 좋아하는, 타고난 빛 같은 존재. 당신이 있는 것만으로 일상은 반짝이는 꿈의 무대로 바뀝니다.",
      detail: {
        body: `당신은 「꿈의 마녀」.

사람들의 마음에 잠든 소원과 동경을 깨워, 이 세계에 기쁨과 빛을 가져오는 존재입니다.

꿈은 그저 잠들었을 때 꾸는 것이 아닙니다.

"해 보고 싶다"
"가 보고 싶다"
"이런 미래가 된다면 멋지겠다"

그런 마음의 설렘이야말로 진정한 꿈의 시작입니다.

당신은 누구보다 그 빛을 느낄 수 있습니다.

새로운 것에 대한 흥미가 끝이 없고, 인생을 마음껏 즐기는 힘을 지니고 있습니다.

당신이 웃으면 주위도 미소 짓고, 당신이 설레면 그 마음은 자연스럽게 주변으로 전해질 것입니다.

꿈의 마녀는 사람들에게 희망을 주는 존재입니다.

어려운 이치보다,

"재밌겠다!"

하는 마음을 소중히 하며 미래로 나아갑니다.

그 밝음과 행동력은 많은 사람의 등을 밀어 주고 있습니다.

꿈의 마녀의 사명은 「인생을 빛나게 하는 것」.

당신이 자아내는 미소와 감동은, 이 세계를 조금 더 밝게 만드는 마법입니다.`,
        love: `연애에서는 매우 정열적이고 솔직한 타입입니다.

좋아하게 된 상대에게는 자연스럽게 마음이 넘쳐흘러, 함께 있는 시간을 진심으로 즐기려 합니다.

데이트나 여행, 새로운 체험을 나누는 것을 무척 좋아하여,

"이 사람과 있으면 매일이 즐겁다"

그런 연애를 이상으로 삼을 것입니다.

또한 상대를 기쁘게 하는 데에도 능합니다.

서프라이즈를 생각하거나, 즐거운 화제를 제공하거나, 연인과의 시간을 특별하게 만들려 합니다.

다만 감정이 풍부한 만큼, 외로움이나 불안을 느끼기도 합니다.

그럴 때는 억지로 밝게 행동하지 말고, 솔직하게 마음을 전하는 것도 중요합니다.

정말 소중한 상대는 당신의 미소뿐 아니라 약함도 받아 줄 것입니다.`,
        compatibility: [
          { name: "실의 마녀", text: "최고의 단짝이자, 최고의 모험 동료. 함께 있는 것만으로 즐거운 일이 잇따라 일어나, 인생 자체가 빛나기 시작합니다. 꿈과 미래를 나눌 수 있는 이상적인 상대입니다." },
          { name: "바다의 마녀", text: "감성이 아름답게 울려 퍼지는 조합. 꿈의 마녀가 데리고 나가고, 바다의 마녀가 그 풍경의 아름다움을 알려 줍니다. 자연스럽고 편안한 관계를 쌓을 수 있을 것입니다." },
          { name: "바람의 마녀", text: "호기심과 행동력으로 맺어지는 상대. 지루함과는 무관하게, 잇따라 새로운 세계를 보여 줍니다. 자극적이고 즐거운 시간을 나눌 수 있을 것입니다." },
        ],
        rival: { name: "흰 마녀", text: "이성적이고 신중한 흰 마녀는, 자유로운 꿈의 마녀와 정반대의 존재입니다. 처음에는 사고방식의 차이에 당황하기도 합니다. 그러나 흰 마녀는 당신에게 미래를 내다보는 힘을 주고, 당신은 흰 마녀에게 인생을 즐기는 기쁨을 알려 줄 수 있을 것입니다. 다르기에 끌리는, 신기한 인연을 지닌 상대입니다." },
        message: `"마음이 설레는 방향으로 나아가세요."

인생은 생각보다 짧고, 세계는 생각보다 넓습니다.

하고 싶은 것이 있다면 도전해 보세요.

만나고 싶은 사람이 있다면 만나러 가세요.

그 한 걸음이 새로운 미래를 데려옵니다.

꿈은 이뤄지기에 가치 있는 것이 아닙니다.

꿈을 좇는 시간 그 자체가, 당신의 인생을 빛나게 하고 있습니다.`,
        keywords: ["자유", "즐거움", "행동력", "매력", "꿈을 이루는 힘"],
      },
    },
    ENTJ: {
      name: "검은 마녀",
      catchCopy: "의지로 길을 개척하는 패왕의 마녀.",
      description:
        "당신은 강한 의지로 목표를 향해 돌진하는 검은 마녀 타입입니다. 전체를 둘러보고 해야 할 일을 간파하여, 망설임 없이 사람을 인도하는 힘이 있습니다. 어려움을 두려워하지 않고, 자신이 믿는 미래를 현실로 바꿔 가는 패기의 소유자. 그 강인함은 주위에 나아갈 방향을 알려 주는 나침반이 됩니다. 당신의 결단은 정체된 상황마저 힘차게 움직여 갑니다.",
      detail: {
        body: `당신은 「검은 마녀」.

그림자를 두려워하지 않고, 스스로의 의지로 운명을 개척하는 존재입니다.

많은 사람이 불안과 망설임 속에서 멈춰 설 때, 당신은 앞으로 나아갈 결단을 내릴 수 있습니다.

그것은 냉정함이 아닙니다.

누군가 나아가야 할 때, 책임을 짊어질 각오를 지니고 있기 때문입니다.

검은 마녀는 강함의 상징.

어려운 상황에 놓여도 감정에 휩쓸리지 않고, 현실을 직시하며 최선의 한 수를 생각합니다.

또한 뛰어난 통찰력을 지녀, 사람과 조직, 일의 흐름을 꿰뚫어 보는 데에도 능할 것입니다.

당신에게는 이상을 꿈으로 끝내지 않는 힘이 있습니다.

생각만 하는 것이 아니라, 실현하기 위해 행동할 수 있습니다.

그것이야말로 검은 마녀의 최대의 마법입니다.

때로는 주위에서 「무섭다」 「다가가기 어렵다」고 여기기도 할 것입니다.

하지만 진정한 당신은 누구보다 높은 이상을 품고, 그 실현을 위해 노력을 아끼지 않는 사람.

검은 마녀의 사명은 「미래를 창조하는 것」.

당신이 개척한 길은 머지않아 많은 사람이 걷는 길이 될 것입니다.`,
        love: `연애에서는 매우 진지하고 성실한 타입입니다.

언뜻 보기에는 연애보다 일이나 목표를 우선하는 것처럼 보일지도 모릅니다.

하지만 정말 소중하다고 여긴 상대에게는 깊은 애정을 쏟습니다.

당신은 연인에게도 성장을 바랍니다.

그저 함께 있는 것만이 아니라,

"함께 미래를 쌓을 수 있는가"

"서로 존경할 수 있는 관계인가"

를 중시할 것입니다.

그래서 표면적인 관계에는 그다지 흥미를 느끼지 않습니다.

다만 그만 정론을 너무 내세우거나, 자신의 생각을 밀어붙이기도 합니다.

때로는 답을 내는 것보다, 상대의 마음을 받아 주는 것이 중요합니다.

당신의 강함과 다정함이 양립할 때, 정말 흔들림 없는 사랑을 쌓을 수 있을 것입니다.`,
        compatibility: [
          { name: "흰 마녀", text: "최강의 이해자이자 최대의 라이벌. 미래를 보는 흰 마녀와, 미래를 실현하는 검은 마녀. 두 사람이 같은 방향을 향할 때, 누구도 막을 수 없는 힘을 만들어 냅니다. 깊이 존경할 수 있는 특별한 상대입니다." },
          { name: "새벽의 마녀", text: "사람을 인도하는 힘을 지닌 자들끼리. 검은 마녀가 현실을 움직이고, 새벽의 마녀가 사람의 마음을 움직입니다. 이상을 형태로 만드는 최고의 파트너가 될 수 있을 것입니다." },
          { name: "달의 마녀", text: "검은 마녀가 놓치기 쉬운 감정이나 마음의 기미를 알려 주는 존재. 당신의 강함에 다정함을 더해, 더 큰 힘으로 이끌어 줍니다." },
        ],
        rival: { name: "꽃의 마녀", text: "이상을 믿는 꽃의 마녀와, 현실을 중시하는 검은 마녀. 가치관은 크게 다릅니다. 하지만 그 순수함과 다정함에 마음이 움직이는 일도 적지 않습니다. 꽃의 마녀는 검은 마녀에게 잊고 있던 꿈을 떠올리게 해 주는 존재입니다. 서로를 이해할 수 있을 때, 이상과 현실이 아름답게 조화를 이룰 것입니다." },
        message: `"강함을 두려워하지 마세요."

당신에게는 남보다 큰 책임을 짊어질 힘이 있습니다.

그렇기에 고독을 느낄 때도 있을 것입니다.

하지만 그 강함은 누군가를 지배하기 위해서가 아니라, 누군가를 지키기 위해 주어진 것입니다.

그림자가 있기에 빛은 빛납니다.

당신 안에 있는 의지와 각오는, 미래를 개척하기 위한 소중한 마법입니다.`,
        keywords: ["의지", "결단력", "통솔력", "야심", "미래 창조"],
      },
    },
    ESTJ: {
      name: "황혼의 마녀",
      catchCopy: "질서를 아우르는 통솔의 마녀.",
      description:
        "당신은 현실을 똑바로 직시하며 일을 정리하는 황혼의 마녀 타입입니다. 책임감이 강하여, 정한 일을 착실히 형태로 만들어 가는 실행력의 소유자. 주위를 정리하고 역할을 정확히 이끄는 믿음직한 존재입니다. 애매함보다 명확함을 좋아하며, 노력을 아끼지 않습니다. 하루의 끝을 비추는 황혼처럼, 당신은 혼돈에 확실한 질서를 가져옵니다.",
      detail: {
        body: `당신은 「황혼의 마녀」.

하루의 끝을 지켜보고, 다음 시대로 길을 잇는 존재입니다.

황혼은 끝의 상징이 아닙니다.

낮과 밤이 교차하는 경계.

낡은 것이 역할을 마치고, 새로운 것이 시작되는 소중한 시간입니다.

당신 또한 일을 정리하고, 질서를 만들며, 사람들이 안심하고 앞으로 나아갈 수 있는 환경을 갖추는 힘을 지니고 있습니다.

책임감이 강하여, 약속을 지키고 맡은 일을 끝까지 해낼 것입니다.

주위에서 의지하는 일도 많아,

"당신이 있으면 안심돼"

라는 말을 듣는 일도 적지 않습니다.

황혼의 마녀는 감정만으로 판단하지 않습니다.

무엇이 옳은가.
무엇이 필요한가.
어떻게 하면 모두가 앞으로 나아갈 수 있는가.

그것을 냉정하게 생각하고 행동으로 옮길 수 있습니다.

때로는 엄한 결단을 내리기도 할 것입니다.

하지만 그것은 누군가를 상처 입히고 싶어서가 아닙니다.

미래를 위해 필요한 선택을 이해하고 있기 때문입니다.

황혼의 마녀의 사명은 「시대를 잇는 것」.

당신의 판단과 행동은, 많은 사람의 미래를 떠받치는 토대가 되어 있습니다.`,
        love: `연애에서는 매우 성실하고 현실적인 타입입니다.

한때의 감정에 휩쓸리는 일은 적고,

"이 사람과 신뢰 관계를 쌓을 수 있는가"

를 소중히 합니다.

좋아하게 된 상대에게는 책임을 지고, 길고 안정된 관계를 쌓으려 할 것입니다.

또한 말보다 행동으로 애정을 보이는 일이 많아,

곤란할 때 돕는다.
약속을 지킨다.
장래를 진지하게 생각한다.

그런 형태로 사랑을 전해 갑니다.

다만 스스로는 다정함이라 여겨도, 그만 엄한 말이 되어 버리기도 합니다.

상대를 생각하는 마음이 강하기에, 기대도 커지는 것입니다.

때로는 옳음보다 다정함을 택할 것.

그것이 황혼의 마녀가 사랑을 키우는 소중한 마법이 될 것입니다.`,
        compatibility: [
          { name: "시간의 마녀", text: "성실함과 책임감을 나눌 수 있는 최고의 상대. 서로 신뢰를 중시하기에 안정된 관계를 쌓을 수 있습니다. 함께 미래를 떠받칠 수 있는 이상적인 조합입니다." },
          { name: "거울의 마녀", text: "황혼의 마녀가 지키는 세계에 따뜻함을 더해 주는 존재. 당신의 노력과 책임감을 이해하고, 마음의 버팀목이 되어 줄 것입니다." },
          { name: "흰 마녀", text: "미래를 그리는 흰 마녀와, 현실을 정돈하는 황혼의 마녀. 이상과 실행력이 아름답게 맞물려, 큰 목표를 실현할 수 있는 관계입니다." },
        ],
        rival: { name: "바람의 마녀", text: "자유분방하고 예측 불가능한 바람의 마녀는, 황혼의 마녀를 곤란하게 하기도 합니다. 그러나 그 발상력과 유연함은, 당신이 본 적 없는 가능성을 보여 줄 것입니다. 가치관은 크게 다르지만, 서로 배울 수 있는 상대입니다." },
        message: `"책임을 짊어지는 것을 두려워하지 마세요."

많은 사람은 자유를 바랍니다.

하지만 그 자유를 떠받치는 것은, 누군가의 성실한 노력입니다.

당신은 그 역할을 맡을 수 있는 몇 안 되는 존재.

때로는 이해받지 못할 때도 있을 것입니다.

그래도 당신이 지켜 온 것은, 분명 누군가의 안심이 되어 있습니다.

황혼은 끝이 아닙니다.

새로운 미래로 이어지는, 아름다운 시작입니다.`,
        keywords: ["책임감", "질서", "실행력", "신뢰", "안정"],
      },
    },
    ISTP: {
      name: "심연의 마녀",
      catchCopy: "조용히 본질을 꿰뚫는 고고한 마녀.",
      description:
        "당신은 사물의 구조를 냉정하게 꿰뚫어 보는 심연의 마녀 타입입니다. 많이 말하지 않고, 필요할 때 정확히 움직이는 합리적인 강인함을 지니고 있습니다. 혼자만의 시간과 자유를 소중히 하며, 자기 손으로 확인하면서 이해를 깊이는 사람. 온화한 표정 안쪽에 조용하고 깊은 통찰을 숨기고 있습니다. 당신의 차분함은 폭풍 속에서도 흔들리지 않는 심연의 고요 그 자체입니다.",
      detail: {
        body: `당신은 「심연의 마녀」.

누구도 발을 들이지 않는 미지의 영역으로 나아가, 그 깊은 곳에 잠든 진실을 찾아내는 존재입니다.

심연은 두려움받는 곳입니다.

어둡고, 고요하여, 많은 사람이 다가가려 하지 않습니다.

하지만 당신은 다릅니다.

사람이 피하는 곳에야말로 가치가 있음을 알고 있습니다.

누구도 본 적 없는 풍경.
누구도 풀어내지 못한 수수께끼.
아직 발견되지 않은 가능성.

당신은 그것들에 강하게 끌릴 것입니다.

심연의 마녀는 낭비를 싫어합니다.

감정이나 이치보다, 먼저 현실을 보고 판단할 수 있습니다.

문제가 생기면 냉정하게 상황을 분석하여, 가장 합리적인 해결책을 찾아낼 것입니다.

또한 자신의 힘으로 사는 것을 좋아합니다.

필요 이상으로 누군가에게 의존하지도, 누군가를 지배하지도 않습니다.

자유로우면서도 강하다.

그것이 심연의 마녀의 본질입니다.

심연의 마녀의 사명은 「숨겨진 진실을 찾아내는 것」.

당신이 지닌 탐구심과 냉정함은, 많은 사람이 놓친 답에 다다르기 위한 특별한 마법입니다.`,
        love: `연애에서는 매우 마이페이스인 타입입니다.

감정에 휩쓸려 사랑에 빠지는 일은 적고,

"함께 있어 편안한가"

"자연스러운 그대로 있을 수 있는가"

를 소중히 합니다.

또한 자신의 시간과 자유를 소중히 하기에, 연애가 인생의 전부가 되는 일은 없습니다.

하지만 그것은 애정이 얕다는 뜻이 아닙니다.

정말 소중한 상대에게는, 말보다 행동으로 마음을 보입니다.

곤란할 때 돕는다.

필요할 때는 반드시 곁에 있는다.

그런 형태로 신뢰를 쌓아 갈 것입니다.

다만 자신의 감정을 표현하는 것은 조금 서툽니다.

상대로서는,

"무슨 생각을 하는지 모르겠다"

고 여기기도 할 것입니다.

그렇기에 때로는 말로 마음을 전하는 것도 중요합니다.

심연의 마녀가 마음을 연 상대는, 매우 특별한 존재입니다.`,
        compatibility: [
          { name: "바다의 마녀", text: "자유를 사랑하는 자들끼리. 서로 지나치게 간섭하지 않고, 자연스러운 그대로 있을 수 있는 편안한 관계입니다. 말이 적어도 서로 이해할 수 있는, 신기한 안심감이 있습니다." },
          { name: "별의 마녀", text: "지적 호기심으로 맺어지는 상대. 깊은 이야기나 관심 분야를 나누는 시간은, 심연의 마녀에게 최고의 즐거움이 될 것입니다. 서로의 세계를 존중하며 성장할 수 있는 관계입니다." },
          { name: "검은 마녀", text: "행동력과 결단력을 지닌 검은 마녀는, 심연의 마녀의 능력을 높이 평가해 줍니다. 서로 낭비를 싫어하기에, 신뢰 관계가 생기기 쉬운 조합입니다." },
        ],
        rival: { name: "새벽의 마녀", text: "사람과의 이어짐을 소중히 하는 새벽의 마녀는, 심연의 마녀와 대조적인 존재입니다. 처음에는 거리감의 차이에 당황할 수도 있습니다. 그러나 새벽의 마녀의 따뜻함은, 당신이 평소 보지 않는 세계를 알려 줍니다. 서로 이해할 수 있을 때, 큰 성장을 가져오는 관계가 될 것입니다." },
        message: `"두려움의 끝에야말로, 진실은 잠들어 있습니다."

많은 사람이 피하는 길을 택하는 것은, 때로 고독을 동반합니다.

하지만 당신에게는 그 너머를 응시하는 용기가 있습니다.

누구도 찾지 못한 답.

누구도 다다르지 못한 곳.

그곳으로 향하기 위해, 당신은 태어났습니다.

심연은 두려워할 것이 아닙니다.

그곳에는, 아직 누구도 모르는 가능성이 잠들어 있으니까요.`,
        keywords: ["탐구심", "냉정함", "자유", "합리성", "진실을 꿰뚫는 힘"],
      },
    },
    ESTP: {
      name: "비밀의 마녀",
      catchCopy: "순간을 내달리는 대담한 마녀.",
      description:
        "당신은 그 자리의 흐름을 읽고 대담하게 움직이는 비밀의 마녀 타입입니다. 날카로운 직감과 행동력으로, 기회를 놓치지 않고 거머쥡니다. 이치보다 실천, 생각보다 움직임으로 길을 개척하는 사람. 스릴과 변화를 즐기며, 주위를 끌어당기는 매력의 소유자입니다. 누구에게도 밝히지 않는 비밀의 카드를 가슴에 품고, 당신은 오늘도 선명하게 인생을 즐깁니다.",
      detail: {
        body: `당신은 「비밀의 마녀」.

누구도 모르는 문을 찾아내, 그 너머로 가장 먼저 뛰어드는 존재입니다.

세계에는 수많은 비밀이 숨겨져 있습니다.

사람들이 알아채지 못한 가능성.
아직 보지 못한 풍경.
닫힌 문 너머에 있는 모험.

비밀의 마녀는 그것들을 찾는 데 누구보다 가슴이 뜁니다.

당신은 행동력을 타고났습니다.

「언젠가 하자」가 아니라,

「재밌어 보이니까 해 보자」

라고 생각하는 사람입니다.

많은 사람이 망설이는 사이에 한 걸음 내디뎌, 스스로 경험하며 답을 찾아 갈 것입니다.

또한 어떤 환경에도 재빨리 적응하는 유연함을 지니고 있습니다.

예상치 못한 일이 일어나도 당황하지 않고, 그 자리에서 최선의 선택을 할 수 있습니다.

비밀의 마녀는 지루함을 싫어합니다.

늘 새로운 자극과 발견을 찾으며, 인생을 마음껏 즐기려 할 것입니다.

비밀의 마녀의 사명은 「닫힌 가능성을 해방하는 것」.

당신이 연 문 너머에는, 많은 사람이 아직 모르는 미래가 기다리고 있습니다.`,
        love: `연애에서는 매우 매력적이고 자연스러운 타입입니다.

좋아하게 된 상대에게는 적극적으로 다가가, 함께 즐거운 시간을 보내려 합니다.

당신에게 연애란,

"함께 인생을 즐기는 것".

함께 웃거나, 모험하거나, 새로운 경험을 나누거나.

그런 시간에 큰 행복을 느낄 것입니다.

또한 사람을 끌어당기는 매력을 지녔기에, 자기도 모르는 사이에 호감을 받는 일도 적지 않습니다.

다만 자유를 소중히 하기에, 구속받는 것은 어려워합니다.

답답한 관계가 되면, 자기도 모르게 거리를 두기도 할 것입니다.

정말 좋은 연애란, 자유와 신뢰가 공존하는 관계.

당신답게 있을 수 있는 상대야말로, 오래 사랑할 수 있는 운명의 상대입니다.`,
        compatibility: [
          { name: "꿈의 마녀", text: "함께 있는 것만으로 인생이 모험이 되는 상대. 호기심과 행동력을 나눌 수 있어, 매일이 즐겁고 자극으로 가득해질 것입니다. 최고의 놀이 친구이자, 최고의 연인이 될 수 있는 존재입니다." },
          { name: "바람의 마녀", text: "자유로운 발상과 행동력으로 공명하는 조합. 잇따라 새로운 아이디어와 도전이 생겨나, 지루할 틈이 없습니다. 서로의 가능성을 넓혀 가는 관계입니다." },
          { name: "실의 마녀", text: "사람과의 인연이나 새로운 만남을 소중히 하는 자들끼리. 함께 있는 것으로 뜻밖의 행운이나 기회를 끌어당길 수 있을 것입니다. 인생을 더욱 풍요롭게 해 주는 상대입니다." },
        ],
        rival: { name: "달의 마녀", text: "섬세하고 깊은 마음을 지닌 달의 마녀는, 비밀의 마녀와 정반대의 존재입니다. 처음에는 사고방식의 차이에 당황할지도 모릅니다. 그러나 달의 마녀는 당신에게 「마음 깊은 곳에 있는 진짜 마음」을 깨닫게 해 줄 것입니다. 당신은 달의 마녀에게 「새로운 세계로 내딛는 용기」를 줄 수 있습니다. 서로 이해할 수 있을 때, 매우 특별한 관계가 될 것입니다." },
        message: `"문을 여는 것을 두려워하지 마세요."

당신이 재밌어 보인다고 느낀 것.

왠지 마음이 쓰인 것.

그 직감에는 의미가 있습니다.

많은 사람은 안전한 곳에 머물려 합니다.

하지만 당신에게는 미지로 나아가는 용기가 있습니다.

그 한 걸음이 새로운 만남을 낳고,

새로운 미래를 데려옵니다.

세계는 생각보다 넓습니다.

그리고 그 비밀을 찾기 위해 당신은 태어났으니까요.`,
        keywords: ["행동력", "자유", "모험심", "적응력", "가능성을 여는 힘"],
      },
    },
  },
  "zh-TW": {
    INTJ: {
      name: "白之魔女",
      catchCopy: "靜靜洞悉未來的策略魔女。",
      description:
        "你是靜靜洞悉未來、看穿事物本質的白之魔女類型。比起被情緒左右，你更能冷靜地綜觀全局、導出屬於自己的答案。你在獨處的時光裡蓄積力量，只為真正需要的人獻上深刻的指引。",
      detail: {
        body: `你是「白之魔女」。

以靜謐之光照亮未來，擁有比誰都看得更遠的力量。

當許多人因眼前的情緒與事件而心緒搖動時，你卻從退後一步之處凝視整體的流向。不被情緒左右、看穿本質，描繪出通往最佳未來的道路。

乍看冷靜而難以親近，內心卻藏著堅定的信念與溫柔。你是不依賴他人、憑自身之力開創命運的類型。正因如此，許多人才會向你的智慧與判斷力尋求指引。

白之魔女的使命是「將尚未可見的可能化為現實」。

無須焦急。你所相信的未來，會穩穩地成形。那份智性與意志之光，終將不僅照亮你自己，也照亮周遭人們的未來。`,
        love: `在戀愛中你很謹慎，只對真正能信賴的對象敞開心扉。

你對欲擒故縱或表面的關係毫無興趣，總是自然而然地思索「能否與這個人共築未來」。雖然要喜歡上一個人需要時間，但一旦認定對方重要，便會傾注深刻的愛情與真誠。

不過，由於不太擅長把情感化為言語，有時會被認為「猜不透你在想什麼」。偶爾把想法說出口，能孕育出更堅韌的羈絆。`,
        compatibility: [
          { name: "月之魔女", text: "你的理性與月之魔女的直覺契合得出奇地美。她無需言語便能理解你的心意，是能建立深厚信任的命中註定之人。" },
          { name: "花之魔女", text: "她會教會白之魔女容易忽略的內心的溫暖。為你的未來藍圖增添溫柔與色彩。" },
          { name: "星之魔女", text: "以求知欲相連的最佳夥伴。不知不覺便能暢談數小時，彼此拓展世界。" },
        ],
        rival: { name: "黑之魔女", text: "同樣擁有洞見未來之力的彼此。既可能成為最強的夥伴，也可能成為最大的勁敵。價值觀一致時將發揮壓倒性的力量，但要當心主導權之爭。" },
        message: `「未來並非偶然，而是由選擇所創造。」

你擁有描繪那未來的力量。
請相信自己的智性與信念，向前邁進。
因為那道白光，始終照亮著你該走的路。`,
        keywords: ["智性", "策略", "洞見未來", "獨立心", "探究心"],
      },
    },
    INFJ: {
      name: "月之魔女",
      catchCopy: "照亮人心深處的慈愛魔女。",
      description:
        "你是悄悄感知那些化不成言語之心意的月之魔女類型。即使不形於外，你也能深刻理解他人的痛楚與心願，靜靜地相伴。你將理想藏於心中、為了某人盡心竭力，卻往往不易察覺自己內心的聲音。你的溫柔如照亮夜晚的月，柔柔包覆迷惘之人的心。",
      detail: {
        body: `你是「月之魔女」。

如靜謐的月光，溫柔照亮人心的存在。

當有人懷著說不出口的心意時，你會以不可思議的自然察覺那份氣息。對方渴求什麼、為何受傷、又在期盼什麼——正如月映照夜海，你的心映照著人們的情感。

周遭的人多半覺得你是溫和而善良的人。然而你的內心，沉睡著不易被任何人撼動的堅定信念。

月之魔女不喜爭鬥。但為了守護真正重要的事物，你擁有靜靜挺身而起的勇氣。

你並非耀眼之光，而是在人們迷途時指引方向的月光。

正因如此，許多人在不知不覺間倚靠著你，為尋求安心而聚集而來。

月之魔女的使命是「在人心點亮希望的燈火」。

你的溫柔並非軟弱。那是拯救、療癒、並推動他人前行的珍貴魔法。`,
        love: `在戀愛中，你是比誰都懷有深厚愛情的人。

只是，那份愛十分謹慎。

僅憑表面的魅力或一時的情感，無法開啟你的心。只有對真正能信賴的對象，你才會展現自己的真心與脆弱。

喜歡上某人時，你會把對方的幸福放在第一位，但有時也會過度把自己的心情往後擺。

你是值得被愛的存在。

如同珍惜對方那般，也請珍惜你自己的心。

月之魔女能安心微笑之處，正是真正幸福的戀情萌芽之地。`,
        compatibility: [
          { name: "白之魔女", text: "你的直覺與白之魔女的智性是最佳組合。月之魔女感知到的未來徵兆，由白之魔女引向現實。你們是能互補不足、擁有特殊緣分的對象。" },
          { name: "花之魔女", text: "以溫柔與感受力相互共鳴的關係。即使沒有言語，心也能相通，光是在一起便能感到療癒。能共享宛如春日花園般平穩的時光。" },
          { name: "曉之魔女", text: "同樣擁有引導他人之力的彼此。曉之魔女的行動力與月之魔女的深刻洞察力相結合，便能引領眾人走向幸福。是以敬重與信賴相繫的契合。" },
        ],
        rival: { name: "秘密之魔女", text: "自由奔放、難以預測的秘密之魔女，對月之魔女而言是充滿刺激的存在。雖會相互吸引，卻也常因價值觀的差異而困惑。然而當你們願意彼此理解、靠近時，他將為你展現前所未見的世界。" },
        message: `「你的溫柔，是照亮某人人生的光。」

不必害怕受傷。

因為被你伸出的手所拯救的人，肯定遠比你想像的更多。

月始終靜靜地閃耀。

而你，也正以原本的模樣，散發著美麗的光。`,
        keywords: ["直覺", "共鳴", "洞察力", "理想主義", "療癒"],
      },
    },
    INTP: {
      name: "星之魔女",
      catchCopy: "不斷追尋真理的思索魔女。",
      description:
        "你是不斷探尋世界運作與「為何」的星之魔女類型。不被常識束縛，以自己的頭腦徹底思考為樂。獨自靜靜運轉思緒的時光，正是你魔力的泉源。任憑好奇心蒐集新知，以無人想得到的發想開創道路。如同遙遠的星，你的探究終將化為確實的光。",
      detail: {
        body: `你是「星之魔女」。

如閃耀於無垠夜空的群星，不斷追尋無人察覺之真理的存在。

即使是多數人視為「理所當然」的事，你也會自然地心生疑問。

為何會如此。
實際上究竟如何。
是否存在著無人知曉的答案。

這樣的探究心，總是引領你走向新的發現。

星之魔女不只是蒐集知識。

你擁有連結點與點、找出無人見過之可能性的力量。

你熱愛獨自思考的時光，有時也會築起只屬於自己的世界。

偶爾會被周遭認為「猜不透你在想什麼」，但那是因為你的思緒比他人走得更遠、更深。

星之魔女的使命是「解開世界的祕密」。

你所懷的疑問與好奇，是開創未來的珍貴魔法。`,
        love: `在戀愛中，是智性比心更早被吸引的類型。

無論對方多麼有魅力，若談話不投機、無法共享價值觀，便難以發展成戀情。

相反地，對於讓你覺得「想更了解這個人」的對象，你會強烈受到吸引。

對你而言，戀愛不只是情感，也是一場智性的冒險。

只是，你不太擅長表達自己的心情。

愈是喜歡的對象，距離感愈容易變得不自然，或不自覺地過度分析。

別想太多，偶爾把率直的情感傳達出去。

那正是星之魔女培育戀情的重要關鍵。`,
        compatibility: [
          { name: "白之魔女", text: "以智性與對未來的探究心深深共鳴的對象。彼此無需多餘的解釋，不知不覺便能暢談數小時。是最佳的理解者，也能成為人生的夥伴。" },
          { name: "月之魔女", text: "星之魔女以邏輯抵達之處，月之魔女以直覺抵達。以不同方法凝視同一真實的兩人，會以不可思議的強度相互吸引。" },
          { name: "風之魔女", text: "能共享無盡好奇心的關係。暢談新發想與點子的時光，對星之魔女而言是無上的刺激。" },
        ],
        rival: { name: "夢之魔女", text: "自由而感性的夢之魔女，與星之魔女正好相反。起初會有許多無法理解之處。然而那份自由與行動力，能帶你前往未知的世界。若能享受價值觀的差異，將成為大幅成長的關係。" },
        message: `「請愛上沒有答案的提問。」

即使有無法立刻理解的事也無妨。

因為你所懷的每一個疑問，都將成為通往無人見過之未來的門扉。

群星雖相距遙遠，卻共同構成同一片夜空。

你的知識，也終將化為照亮世界的光。`,
        keywords: ["智性", "探究心", "獨創性", "邏輯性", "好奇心"],
      },
    },
    ENFJ: {
      name: "曉之魔女",
      catchCopy: "引導並照亮人們的破曉魔女。",
      description:
        "你是相信人的可能、悄悄推他一把的曉之魔女類型。你擁有溫暖整個場合、讓周遭自然轉為正向的力量。你打從心底盼望他人的成長與幸福，毫不吝惜地伸出援手。有時會為了他人過度努力，但你的話語如破曉之光，是讓人開啟一天的力量。",
      detail: {
        body: `你是「曉之魔女」。

宣告夜之終結、引領人們走向嶄新清晨的存在。

你能找出無人察覺的可能，相信那個人原本擁有的光輝。

當有人失去自信時。
迷失方向時。
快要看不見希望時。

你會自然地站在那人身旁，照亮他該前進的方向。

曉之魔女擁有撼動人心的力量。

那不是強行拉扯的力量。

「你一定做得到」

是能以這一句話改變他人未來的溫暖之光。

你會將他人的成長與幸福當作自己的事般欣喜，並在為某人的夢想加油中感到莫大的喜悅。

曉之魔女的使命是「傳承希望的火苗」。

你點亮的光，會從一人傳向下一個人。

那份溫柔與熱情，是不斷照亮眾人人生的特別魔法。`,
        love: `在戀愛中非常真誠，傾注專一之愛的類型。

你打從心底盼望所愛之人的幸福，想要支持對方的心情自然湧現。

由於能敏銳感受對方的心情，也擅長細膩的體貼。

只是，因為太以他人為先，有時會把自己的真心往後擺。

「只要對方開心就好」

而持續勉強自己的情況也不少。

真正幸福的戀愛，是彼此支撐的關係。

偶爾坦率地傳達自己的脆弱與心願，能築起更深的羈絆。

你的愛情擁有如太陽般照亮他人之力。

正因如此，也請把那道光照向你自己。`,
        compatibility: [
          { name: "月之魔女", text: "同樣珍視人心的彼此。曉之魔女的行動力與月之魔女的深刻洞察力會美麗地調和。彼此相伴，能讓對方變得更溫柔、更堅強的特別關係。" },
          { name: "花之魔女", text: "擁有純粹溫柔的花之魔女，會溫和地療癒曉之魔女的心。一邊暢談理想與夢想，一邊築起溫暖的未來。" },
          { name: "白之魔女", text: "情感與理性。正因擁有不同之力，才會強烈相互吸引。曉之魔女引導眾人，白之魔女描繪未來。兩人合力，甚至能撼動巨大的命運。" },
        ],
        rival: { name: "深淵之魔女", text: "重視現實勝於情感的深淵之魔女，與曉之魔女恰成對比。起初或許覺得冷淡。然而從那份冷靜與自立中能學到許多，潛藏著彼此成長之關係的可能。" },
        message: `「你所相信的光，會成為某人的希望。」

即使自己以為只是微小的善意，也有人因你的話語與行動而獲得救贖。

請務必以那份溫柔為傲。

破曉必將到來。

而你，正是運送那第一道光的存在。`,
        keywords: ["共鳴力", "熱情", "領導力", "奉獻", "希望"],
      },
    },
    ISFJ: {
      name: "森之魔女",
      catchCopy: "靜靜守護與培育的慈愛魔女。",
      description:
        "你是靜靜守護並培育重要之人或場所的森之魔女類型。比起華麗，你更珍視誠懇，細心守護約定與每日的累積。你會悄悄貼近陷入困境的人，不求回報地給予支持。你的身旁如林蔭般令人安心。那份溫和的堅強，療癒著周遭的心。",
      detail: {
        body: `你是「森之魔女」。

如深邃森林靜靜孕育生命，擁有溫柔支撐並守護人們之力的存在。

你絕非華麗出風頭的類型。

但當有人陷入困境、受傷時，你是能悄悄伸出援手的人。

你也能察覺周遭微小的變化，即使對方沒說出口，也能體會其所需。

那份溫柔絕非刻意做作。

正如森林理所當然地包覆樹木與生靈，想珍惜他人的溫暖之心，自然地在你心中呼吸著。

有時你會過度把他人置於自己之前。

然而你的存在本身，便給予許多人安心。

森之魔女的使命是「守護人們能夠歸返之處」。

你所打造的容身之所與溫柔，已成為某人無可取代的寶物。`,
        love: `在戀愛中，是非常真誠而奉獻的類型。

你珍惜所喜歡的對象，一邊盼望那人的幸福，一邊培育關係。

比起華麗的戀愛或刺激的拉鋸，你更追求在一起能感到安心的關係。

你常記得戀人的喜好與細微的變化，有時會讓對方驚訝「連這個也注意到了？」。

只是，你有過度配合對方的傾向。

明明寂寞卻忍耐，遇到不愉快也吞下去，這樣的情況都可能發生。

你的溫柔是出色的才能。

正因如此，也請同樣珍惜你自己的心情。

唯有森林健康，才能守護眾多生命。`,
        compatibility: [
          { name: "花之魔女", text: "以溫柔與體貼深深共鳴的對象。光是在一起便能讓心平靜，彼此都能自然地相處。宛如綻放於森林的花，能築起美麗而平穩的關係。" },
          { name: "月之魔女", text: "同樣珍視對方心意的彼此。即使不說出口心也能相通，能培育深厚的信任。彼此的溫柔會舒服地相互共鳴。" },
          { name: "時之魔女", text: "同樣懷有誠懇與責任感的彼此。容易建立令人安心的關係，能花長時間培育堅固的羈絆。作為人生伴侶非常契合的組合。" },
        ],
        rival: { name: "風之魔女", text: "熱愛自由、追求變化的風之魔女，與森之魔女正好相反。雖會被牽著走，但那份自由的發想與行動力，會大大拓展你的世界。當你們能彼此理解時，便成為帶來意外成長的關係。" },
        message: `「你的溫柔，擁有比想像中更強大的力量。」

支撐某人，絕非理所當然之事。

你所獻出的微小善意與體貼，正在你未察覺之處，拯救著許多人的心。

森林不會急著成長。

即便如此，仍確實地持續孕育生命。

你也只要以屬於自己的步幅前行就好。`,
        keywords: ["溫柔", "奉獻", "安心感", "體貼", "誠懇"],
      },
    },
    INFP: {
      name: "花之魔女",
      catchCopy: "綻放心中理想的純真魔女。",
      description:
        "你是將專屬自己的理想與美藏於心中的花之魔女類型。以柔軟的心感受事物，珍惜他人的心情與微小的幸福。對真正重要之物傾注靜謐的熱情，也擁有不扭曲自我的堅定核心。你的感性如妝點季節的花，悄悄將周遭世界染得豐盈。",
      detail: {
        body: `你是「花之魔女」。

懷抱溫柔與想像力，為這世界增添美麗色彩的存在。

花並非為了被誰稱讚而綻放。

它只是活出自己地盛開，以那姿態療癒人們的心。

你也擁有如此花一般的靈魂。

對他人的痛楚敏感，當有人悲傷時，你會如自己之事般心痛。

以溫柔的話語與微小的體貼，你必定拯救過許多人的心。

你的內在，也擁有豐沛的想像力與理想。

相信無法僅以現實衡量的美與可能，珍惜地培育只屬於自己的世界。

有時或許會被周遭說「想太多」「愛作夢」。

但那正是花之魔女所擁有的特別之力。

你能找出無人能尋得的希望種子，使其在未來綻放。

花之魔女的使命是「在心中綻放美麗的花」。

你的溫柔與想像力，是讓世界稍稍變得溫柔的魔法。`,
        love: `在戀愛中，是懷抱專一而純粹之愛的類型。

你深深思念所喜歡的對象，在心中一次次描繪與那人的未來。

對你而言，戀愛並非只是在一起。

而是心與心的相連。

是能分享彼此真心與夢想。

你比什麼都珍視這樣特別的羈絆。

只是，你也可能把對方過度理想化。

因與現實的落差而受傷，或因無法傳達心意而痛苦。

即便如此，你的愛情仍非常溫暖而深刻。

花並非勉強就能綻放。

戀愛亦然，是在自然的流動中孕育而成。`,
        compatibility: [
          { name: "月之魔女", text: "宛如自古便相識般給予安心的對象。一邊珍視彼此的情感與價值觀，一邊培育深厚的羈絆。是無需言語也能心意相通的特別關係。" },
          { name: "森之魔女", text: "充滿溫柔與體貼的組合。為了讓花之魔女能自由綻放，森之魔女會溫暖地支撐你。能築起平穩而舒適的關係。" },
          { name: "曉之魔女", text: "真心為你的夢想與理想加油的存在。相信花之魔女所懷的可能，給予你向前邁進的勇氣。是能一同成長的絕佳對象。" },
        ],
        rival: { name: "黑之魔女", text: "直視現實、強而有力地前行的黑之魔女，與花之魔女正好相反。雖會因價值觀的差異而困惑，卻也可能受那份堅強與決斷力吸引。當你們能彼此理解時，潛藏著理想與現實美麗交融之關係的可能。" },
        message: `「請別否定你自己的溫柔。」

容易受傷並非軟弱。

那代表你能感受得更多，能貼近他人的痛。

花並非為了與誰比較而綻放。

你也只要活出自己地綻放就好。

那份美麗，早已拯救著某人的心。`,
        keywords: ["溫柔", "理想主義", "想像力", "共鳴力", "純粹之愛"],
      },
    },
    ISFP: {
      name: "海之魔女",
      catchCopy: "品味並深愛當下的感性魔女。",
      description:
        "你是以五感品味此刻之美的海之魔女類型。以自由的心，對喜歡之物與舒適感誠實地活著。比起言語，你更以行動與氛圍傳遞愛意，溫柔卻有核心的人。看似平靜，內裡卻懷著深邃的情感之海。你的存在如波浪，靜靜地撫平並滋潤人心。",
      detail: {
        body: `你是「海之魔女」。

如自由的波浪般生活，深愛美麗之物，以專屬自己的感性感受世界的存在。

海從不展現相同的模樣。

有平靜的日子，也有狂亂的日子。

即便如此，它始終深邃、美麗，包容著眾多生命。

你的心，也與這樣的海十分相似。

懷有豐沛的感受力，能察覺人們忽略的微小之美與感動。

天空的色彩。
風的氣味。
音樂與話語中蘊含的心意。

這些，你都能比誰都更深刻地感受。

你也是非常珍視自我的人。

比起勉強配合他人，你更想選擇能讓自己內心信服的生活方式。

海之魔女的使命是「找出世界的美麗」。

你所找到的微小光輝，也會在周遭人們的心中漾開溫柔的漣漪。`,
        love: `在戀愛中，是非常珍視情感的類型。

不是條件或道理，而是——

「和這個人在一起，心很安定」

「想更常在一起」

你比什麼都相信這樣的感覺。

對喜歡的對象，你會溫柔而自然地傾注愛意。

鮮少求取回報，懷著盼望對方幸福的純粹之心。

只是，你不太擅長把自己的心情化為言語。

明明寂寞卻忍耐，受了傷也用微笑藏起來，這樣的情況都可能發生。

你的心，也是珍貴的寶物。

正如海隱藏著真正的深度，你的心意若不傳達，也無法抵達對方。

偶爾鼓起坦露真心的勇氣，便能孕育更深的愛。`,
        compatibility: [
          { name: "花之魔女", text: "同樣深愛美麗之物的彼此。感性與價值觀自然共鳴，光是在一起便能讓心充盈的關係。彼此不勉強改變對方，能如實接納。" },
          { name: "森之魔女", text: "溫柔包覆你的森之魔女，是給予海之魔女安心的存在。為了讓你能自由悠游，會悄悄地支撐你。能培育平穩而溫暖的羈絆。" },
          { name: "夢之魔女", text: "能共享歡樂與感動的絕佳對象。光是在一起，便能遇見嶄新的風景與體驗。會把你的人生妝點得更加鮮明。" },
        ],
        rival: { name: "時之魔女", text: "謹慎而現實的時之魔女，與熱愛自由的海之魔女恰成對比。雖會因價值觀的差異而困惑，卻也可能受那份誠懇與穩定吸引。當你們能尊重彼此的不同時，便會成長為深深信賴的關係。" },
        message: `「請珍惜你的心覺得美麗的事物。」

無須與他人相同。

有只有你看得見的風景，也有只有你能感受的感動。

正如海自由地描繪波浪，你也可以活出自己。

因為那份感性，正是專屬於你的特別魔法。`,
        keywords: ["感性", "自由", "藝術性", "溫柔", "美感"],
      },
    },
    ENTP: {
      name: "風之魔女",
      catchCopy: "掀起新風的變革魔女。",
      description:
        "你是以自由發想吹進新風的風之魔女類型。好奇心旺盛，在討論與靈光之中找出有趣的可能。不被常識束縛，擁有輕巧撼動停滯空氣之力的人。厭惡無聊，總在尋找下一場冒險。你掀起的風，會將周遭人們的世界重新塗上新色。",
      detail: {
        body: `你是「風之魔女」。

承載無人想得到的發想，為世界帶來新可能的存在。

風沒有形體。

正因如此，才能去往任何地方。

越過高牆、越過國界，在人們之間自由奔馳。

你也擁有如此風一般的靈魂。

不被常識束縛，擅長找出新的想法與有趣的可能。

即使是人們認為「不可能」而放棄之事，

「真的是這樣嗎？」

你也能拋出這樣的疑問。

那份靈活的發想力與好奇心，正帶給許多人刺激與改變。

只是，你不太擅長一直停留在同一個地方。

正因有新的發現與挑戰，你的魔法才會閃耀。

風之魔女的使命是「為停滯的世界帶來變化」。

你的話語與點子，將成為大大推動某人人生的順風。`,
        love: `在戀愛中，你珍視能像朋友般輕鬆交談的關係。

在一起很開心。

能共享價值觀與發想。

而最重要的是，能夠自由。

那便是風之魔女理想的戀愛。

束縛或太過沉重的關係，或許讓你有點吃力。

但那並非因為愛情淺薄。

你是會想「正因喜歡，才希望對方也能自由」的人。

在戀愛中你也好奇心旺盛。

對於了解對方無人知曉的一面，你會感到喜悅。

只是，由於興趣接連轉移，也可能被認為「猜不透你在想什麼」。

對真正重要的對象，要把自己的心意化為言語。

那正是風之魔女讓戀情長久的祕訣。`,
        compatibility: [
          { name: "星之魔女", text: "以無盡的求知欲相繫的對象。能就新點子與奇妙的話題暢談數小時。是能彼此拓展世界的最佳夥伴。" },
          { name: "夢之魔女", text: "同樣熱愛自由的彼此。光是在一起，每天都會變成冒險。會帶你前往意想不到的地方，看見嶄新的風景。" },
          { name: "曉之魔女", text: "風之魔女找到的可能，由曉之魔女引向現實。是刺激與信賴並存、非常有魅力的組合。" },
        ],
        rival: { name: "森之魔女", text: "珍視安定的森之魔女，與熱愛變化的風之魔女正好相反。起初或許覺得拘束。然而那份溫柔與誠懇，會教會你新的價值觀。當你們能尊重彼此的不同時，便能建立出乎意料地融洽的關係。" },
        message: `「別害怕你的好奇心。」

你覺得有趣的事。

讓你心動的事。

那一切，都是通往嶄新未來的路標。

風不會停留在同一處。

正因如此，才能抵達遠方。

你也請相信自己的可能，展翅飛翔。

因為那自由的靈魂，正是專屬於你的魔法。`,
        keywords: ["自由", "發想力", "好奇心", "挑戰", "變化"],
      },
    },
    ISTJ: {
      name: "時之魔女",
      catchCopy: "守護約定、層層累積的誠懇魔女。",
      description:
        "你是珍惜地累積時間與約定的時之魔女類型。不畏踏實的努力，擁有把該做之事貫徹到底的責任感。雖無華麗，但那份確實生出許多信賴。重視秩序與規則，為周遭帶來安定的存在。你所累積的時間，化為不可動搖的根基，撐起未來。",
      detail: {
        body: `你是「時之魔女」。

守望流逝的時間，守護層層累積之歷史與約定的存在。

人常被眼前的事件與情緒奪去心神。

但你不同。

不只是此刻，你能放眼延續至其後的未來，一步步踏實地前行。

時之魔女並非掀起華麗奇蹟的魔女。

但你擁有比誰都確實的力量。

每日的努力。
持續守護的約定。
層層累積的經驗。

即使肉眼看不見，它們確實在塑造著未來。

你責任感強，鮮少把一旦承擔之事中途丟下。

那份誠懇，也是你受眾人信賴的理由。

時之魔女的使命是「守護應傳向未來之物」。

你所守護的，終將成為某人的依靠，連往嶄新的時代。`,
        love: `在戀愛中，是非常真誠而專一的類型。

你鮮少輕易墜入愛河。

但當你感到對方真正值得信賴時，那份愛情會長久而深刻地延續。

對你而言，戀愛並非一時的情感，而是如同共度人生的約定。

因此，輕浮的拉鋸或曖昧的關係，或許讓你吃力。

對喜歡的對象，你常以行動而非言語表達愛意，

"遇到困難時一定會幫忙"

"會好好守住約定"

以這樣的形式建立信賴。

只是，你不太擅長表達自己的心情。

即使珍視對方，有時也未能傳達。

偶爾化為言語，便能孕育更深的羈絆。`,
        compatibility: [
          { name: "森之魔女", text: "同樣懷有誠懇與體貼的彼此。彼此給予安心，能築起平穩而安定的關係。共處的時間愈長，信賴愈深的理想對象。" },
          { name: "白之魔女", text: "放眼未來的白之魔女，與踏實前行的時之魔女。是連結理想與現實的最佳組合。能在彼此敬重中一同成長。" },
          { name: "鏡之魔女", text: "珍視與人和諧的鏡之魔女，比誰都更能理解時之魔女的誠懇。能彼此支撐，築起溫暖的關係。" },
        ],
        rival: { name: "風之魔女", text: "熱愛自由、追求變化的風之魔女，對時之魔女而言是難以預測的存在。或許會因價值觀的差異而困惑。然而那份靈活的發想與勇於挑戰的姿態，會為你展現新的風景。當你們能接納彼此的不同時，便能成為大大拓展彼此世界的關係。" },
        message: `「不必焦急。」

正如花需要時間才能綻放，愈是真正珍貴之物，愈是緩緩成長。

你所累積的努力，即使此刻尚未可見，也確實連往未來。

時間絕不背叛。

只要珍惜地累積「今天」這一天，終將抵達你所期盼的未來。

那份誠懇，正是專屬於你的魔法。`,
        keywords: ["誠懇", "責任感", "持續力", "信賴", "穩健"],
      },
    },
    ESFJ: {
      name: "鏡之魔女",
      catchCopy: "彼此映照人心的和諧魔女。",
      description:
        "你是敏銳映照周遭人心情的鏡之魔女類型。珍視場合的和睦，自然地用心讓每個人都能自在。善於照顧人，在人與人的連結中發揮力量。被感謝是你最大的喜悅。你溫暖的目光如鏡，告訴周遭的人「你是被珍惜的」。",
      detail: {
        body: `你是「鏡之魔女」。

映照人心，讓那人原有的魅力閃耀的存在。

鏡子並非只映出身影。

有時也會讓你看見自己未曾察覺的美與可能。

你也非常擅長找出他人的優點與魅力。

當有人失去自信時，你會給予鼓勵，

懷著不安時，你會陪伴在側，

分享喜悅時，你會展露比誰都燦爛的笑容。

你擁有這樣溫暖的力量。

珍視與周遭的和諧，常成為連結人與人的橋梁。

光是你在場，氣氛便會緩和，人們心中生出安心。

鏡之魔女的使命是「映照出沉睡於人心中的光輝」。

你的溫柔與體貼，是明亮照耀眾多人心的魔法。`,
        love: `在戀愛中，是非常深情而奉獻的類型。

對喜歡的人，你會自然地想付出，看見對方歡喜的模樣便感到幸福。

珍惜紀念日、記得對方的喜好、累積細微的體貼。

你的愛情不僅在言語，更展現於每日的行動之中。

你也非常珍視與戀人的時光，在一起創造回憶中找到喜悅。

只是，你會因過度以對方為先而忍住自己的心情。

明明寂寞卻裝作沒事，或把不滿吞下去，這樣的情況都可能發生。

鏡之魔女要幸福，也要珍惜自己的心。

請像對待所愛之人那般，也溫柔地對待你自己。`,
        compatibility: [
          { name: "森之魔女", text: "充滿體貼的彼此。自然地相互關照，能築起被安心包圍的關係。宛如置身平穩森林般，令心安寧的契合。" },
          { name: "曉之魔女", text: "能共享「想讓他人幸福」之心意的對象。彼此相伴，也能為周遭帶來好的影響，是溫暖的關係。" },
          { name: "時之魔女", text: "誠懇而值得信賴的時之魔女，給予鏡之魔女莫大的安心。能彼此支撐，培育長久而安定的羈絆。" },
        ],
        rival: { name: "秘密之魔女", text: "自由奔放、難以預測的秘密之魔女，有時會牽著鏡之魔女走。然而受那份行動力與開朗吸引的情況也不少。價值觀的差異雖大，卻潛藏著拓展彼此世界之特別關係的可能。" },
        message: `「你所找到的溫柔，會成為某人的勇氣。」

能察覺他人的優點。

能為某人加油。

那並非理所當然的才能。

被你獻出的話語與笑容所拯救的人，有很多。

鏡映照人的身影。

而你，是映照出人心光輝的存在。

請務必以那份溫柔為傲。`,
        keywords: ["體貼", "和諧", "奉獻", "共鳴", "支撐他人之力"],
      },
    },
    ENFP: {
      name: "絲之魔女",
      catchCopy: "牽繫人與可能的緣分魔女。",
      description:
        "你是輕巧牽繫人與人、夢與現實的絲之魔女類型。以豐沛的感受力與好奇心，迅速找出所遇之人的魅力與可能。以開朗的能量帶動周遭，接連紡出新的緣分。隨心而動的自由也是你的魅力。你所牽起的絲，串起意想不到的幸福。",
      detail: {
        body: `你是「絲之魔女」。

牽繫人與人、夢與未來、偶然與命運的存在。

這世界佈滿了無數看不見的絲。

相遇之絲。
可能之絲。
通往未來的命運之絲。

絲之魔女能比誰都更敏銳地感受那些絲的顫動。

你好奇心旺盛，能真心享受與人的相遇及嶄新的體驗。

「好像很有趣」
「想試試看」

依循這樣的直覺行動，往往會引來意想不到的緣分與幸運。

你也擅長找出他人的魅力。

或在某人快要放棄的夢中發現可能，或為失去自信的人帶來希望。

絲之魔女的使命是「重新牽繫命運」。

你所紡出的小小緣分，終將連往巨大的奇蹟。`,
        love: `在戀愛中，你非常珍視心動的瞬間。

不是道理，而是——

「和這個人在一起很開心」

「想多聊一些」

戀情常從這樣的感覺開始。

你對喜歡的人非常坦率，愛意的表達也很豐富。

在一起歡笑、暢談夢想、創造新回憶的時光，讓你感到莫大的幸福。

只是，由於自己的心意過於膨脹，你也會因對方的反應而患得患失。

又因追逐理想，可能因與現實的落差而受傷。

但你的戀愛十分純粹。

能真心地喜歡上某人。

那本身，正是絲之魔女所擁有的美麗魔法。`,
        compatibility: [
          { name: "夢之魔女", text: "光是在一起便讓每天變得歡樂的對象。能共享對新事物的挑戰與令人雀躍的體驗，把人生本身當作冒險般享受。" },
          { name: "花之魔女", text: "能以感性與溫柔深深共鳴的關係。彼此理解夢想與理想，能保持自然本色的特別對象。" },
          { name: "風之魔女", text: "以好奇心與發想力相連的組合。新點子接連誕生，光是在一起世界便會不斷拓展。" },
        ],
        rival: { name: "時之魔女", text: "謹慎而穩健的時之魔女，與自由的絲之魔女正好相反。起初或許會因價值觀的差異而困惑。然而時之魔女的誠懇與穩定，會教會你「安心」這項新的價值。正因差異很大，能向對方學到的也很多。" },
        message: `「請相信相遇。」

你以為是偶然的事，其實或許正由命運之絲牽引著。

若心動了，請珍惜那份感覺。

前往新的地方。

結識新的人。

那一個個，都會成為改變未來的契機。

因為你並非等待命運的人，而是親手紡織命運的人。`,
        keywords: ["好奇心", "相遇", "可能性", "自由", "紡織命運之力"],
      },
    },
    ESFP: {
      name: "夢之魔女",
      catchCopy: "讓當下閃耀的歡喜魔女。",
      description:
        "你是將當下妝點得明亮華麗的夢之魔女類型。全力享受此刻，也將笑容與活力分享給周遭的人。情感豐富而行動派，一旦想到便能立刻行動的輕盈。天生熱愛逗人開心、如光一般的存在。光是你在場，日常便化為閃耀的夢之舞台。",
      detail: {
        body: `你是「夢之魔女」。

喚醒沉睡於人們心中的願望與憧憬，為這世界帶來喜悅與光輝的存在。

夢，並非只在沉睡時才能見到。

「想試試看」
「想去看看」
「若未來能變成這樣就好了」

那樣的心動，正是真正的夢的起點。

你能比誰都更感受到那份光輝。

對新事物的興趣永不枯竭，擁有盡情享受人生的力量。

你一笑，周遭也跟著微笑；你一雀躍，那份心情便自然傳向四周。

夢之魔女是給予人們希望的存在。

比起艱深的道理，

「好像很好玩！」

你更珍視這樣的心情，朝未來前行。

那份開朗與行動力，正推著許多人的背。

夢之魔女的使命是「讓人生閃耀」。

你所創造的笑容與感動，是讓這世界稍稍變亮的魔法。`,
        love: `在戀愛中，是非常熱情而坦率的類型。

對喜歡上的對象，心意會自然滿溢，想盡情享受相處的時光。

你很愛分享約會、旅行與新體驗，

「和這個人在一起，每天都很開心」

會把這樣的戀愛當作理想。

你也擅長逗對方開心。

想驚喜、提供有趣的話題、努力讓與戀人的時光變得特別。

只是，正因情感豐富，有時也會感到寂寞與不安。

那時，別勉強裝開朗，坦率地傳達心情也很重要。

真正重要的對象，不僅會接住你的笑容，也會接住你的脆弱。`,
        compatibility: [
          { name: "絲之魔女", text: "最佳的搭檔，也是最佳的冒險夥伴。光是在一起，歡樂之事便接連發生，人生本身開始閃耀。是能暢談夢想與未來的理想對象。" },
          { name: "海之魔女", text: "感性美麗共鳴的組合。夢之魔女帶你出走，海之魔女教你那風景之美。能築起自然而舒適的關係。" },
          { name: "風之魔女", text: "以好奇心與行動力相繫的對象。與無聊絕緣，接連為你展現新世界。能共享刺激而歡樂的時光。" },
        ],
        rival: { name: "白之魔女", text: "理性而謹慎的白之魔女，與自由的夢之魔女正好相反。起初或許會因思考方式的差異而困惑。然而白之魔女能給你放眼未來之力，你也能教白之魔女享受人生的喜悅。正因不同才相互吸引，是擁有奇妙緣分的對象。" },
        message: `「往內心雀躍的方向前進吧。」

人生比想像中更短，世界比想像中更廣。

若有想做的事，就去挑戰看看。

若有想見的人，就去見他。

那一步，會帶來嶄新的未來。

夢，並非因實現了才有價值。

追逐夢想的時光本身，正讓你的人生閃耀。`,
        keywords: ["自由", "歡樂", "行動力", "魅力", "圓夢之力"],
      },
    },
    ENTJ: {
      name: "黑之魔女",
      catchCopy: "以意志開拓道路的霸王魔女。",
      description:
        "你是以強烈意志朝目標突進的黑之魔女類型。綜觀全局、看清該做之事，擁有毫不猶豫引導他人的力量。不畏艱難，將自己所信之未來化為現實的氣魄之主。那份堅強，化為向周遭指示前進方向的羅盤。你的決斷，連停滯的局面也能強而有力地推動。",
      detail: {
        body: `你是「黑之魔女」。

不畏陰影，以自身意志開拓命運的存在。

當許多人在不安與迷惘中止步時，你能做出向前邁進的決斷。

那並非冷漠。

而是因為當有人必須前行時，你懷著扛起責任的覺悟。

黑之魔女是堅強的象徵。

即使身處困境，也不被情緒淹沒，直視現實思索最佳的一手。

你也擁有卓越的洞察力，擅長看穿人、組織與事物的流向。

你擁有不讓理想止於夢想之力。

不只是思考，更能為了實現而行動。

那正是黑之魔女最大的魔法。

有時或許會被周遭認為「可怕」「難以親近」。

但真正的你，是懷有比誰都更高之理想、為其實現不惜努力的人。

黑之魔女的使命是「創造未來」。

你所開拓的道路，終將成為許多人行走的路。`,
        love: `在戀愛中，是非常認真而真誠的類型。

乍看之下，或許像是把工作與目標看得比戀愛更重。

然而對真正珍視的對象，你會傾注深刻的愛情。

你對戀人也會要求成長。

不只是單純在一起，而是更重視——

「能否一同築起未來」

「是否是能彼此敬重的關係」。

因此，你對表面的關係不太感興趣。

只是，你也可能不小心把「正論」說得太多，或硬推自己的想法。

偶爾，比起給出答案，接住對方的心情更為重要。

當你的堅強與溫柔並存時，便能築起真正堅定不移的愛。`,
        compatibility: [
          { name: "白之魔女", text: "最強的理解者，也是最大的勁敵。看見未來的白之魔女，與實現未來的黑之魔女。當兩人朝同一方向，便能生出無人能擋的力量。是能深深敬重彼此的特別對象。" },
          { name: "曉之魔女", text: "同樣擁有引導他人之力的彼此。黑之魔女推動現實，曉之魔女撼動人心。能成為讓理想成形的最佳夥伴。" },
          { name: "月之魔女", text: "為黑之魔女補上容易忽略之情感與心思的存在。為你的堅強添上溫柔，引你走向更大的力量。" },
        ],
        rival: { name: "花之魔女", text: "相信理想的花之魔女，與重視現實的黑之魔女。價值觀大不相同。然而受那份純粹與溫柔打動的情況也不少。花之魔女是讓黑之魔女想起幾乎遺忘之夢的存在。當你們能彼此理解時，理想與現實將美麗地交融。" },
        message: `「別害怕你的堅強。」

你擁有比他人扛起更大責任的力量。

正因如此，有時也會感到孤獨。

但那份堅強，並非為了支配誰，而是為了守護誰而被賦予的。

正因有影，光才會閃耀。

你心中的意志與覺悟，正是開拓未來的珍貴魔法。`,
        keywords: ["意志", "決斷力", "統率力", "野心", "創造未來"],
      },
    },
    ESTJ: {
      name: "黃昏之魔女",
      catchCopy: "統御秩序的統率魔女。",
      description:
        "你是確實直視現實、把事情整合起來的黃昏之魔女類型。責任感強，擁有把決定之事踏實化為形體的執行力。整理周遭、精準引導職責的可靠存在。比起曖昧更偏好明確，不吝努力。如照亮一日終結的黃昏，你為混沌帶來確實的秩序。",
      detail: {
        body: `你是「黃昏之魔女」。

見證一日的終結，將道路連往下一個時代的存在。

黃昏並非終結的象徵。

而是晝與夜交會的邊界。

是舊事物完成使命、新事物開始的重要時刻。

你也擁有整理事物、建立秩序、為人們打造能安心前行之環境的力量。

責任感強，守住約定，把受託之事貫徹到底。

常被周遭倚靠，

「有你在就安心」

這樣的話也聽過不少。

黃昏之魔女不只憑情感判斷。

何者為正確。
何者為必要。
如何才能讓所有人前行。

你能冷靜地思考，並付諸行動。

有時也會做出嚴厲的決斷。

但那並非想傷害誰。

而是因為你理解為了未來所需的選擇。

黃昏之魔女的使命是「連結時代」。

你的判斷與行動，已成為撐起許多人未來的根基。`,
        love: `在戀愛中，是非常真誠而現實的類型。

鮮少被一時的情感左右，重視——

「能否與這個人建立信賴關係」。

對喜歡上的對象負起責任，努力築起長久而安定的關係。

你也常以行動而非言語表達愛意——

遇到困難時伸出援手。
守住約定。
認真思考將來。

以這樣的形式傳遞愛。

只是，即使自己以為是溫柔，話語有時也會變得嚴厲。

正因為在乎對方的心很強，期待也隨之變大。

偶爾，要選擇溫柔勝於正確。

那將成為黃昏之魔女培育戀情的珍貴魔法。`,
        compatibility: [
          { name: "時之魔女", text: "能共享誠懇與責任感的最佳對象。彼此都重視信賴，能築起安定的關係。是能一同撐起未來的理想組合。" },
          { name: "鏡之魔女", text: "為黃昏之魔女所守護的世界增添溫暖的存在。理解你的努力與責任感，成為你內心的依靠。" },
          { name: "白之魔女", text: "描繪未來的白之魔女，與整頓現實的黃昏之魔女。理想與執行力美麗地契合，是能實現宏大目標的關係。" },
        ],
        rival: { name: "風之魔女", text: "自由奔放、難以預測的風之魔女，有時會讓黃昏之魔女困擾。然而那份發想力與靈活，會為你展現未曾見過的可能。價值觀雖大不相同，卻是能彼此學習的對象。" },
        message: `「別害怕扛起責任。」

許多人渴望自由。

但撐起那份自由的，是某人誠懇的努力。

你是能擔起那角色的少數存在。

有時或許不被理解。

即便如此，你所守護的，確實成了某人的安心。

黃昏並非終結。

而是通往嶄新未來的美麗開端。`,
        keywords: ["責任感", "秩序", "執行力", "信賴", "安定"],
      },
    },
    ISTP: {
      name: "深淵之魔女",
      catchCopy: "靜靜看穿本質的孤高魔女。",
      description:
        "你是冷靜看穿事物機制的深淵之魔女類型。話不多，卻擁有在必要時精準行動的理性堅強。珍視獨處的時光與自由，親手驗證、加深理解的人。平和的神情背後，藏著靜謐而深邃的洞察。你的沉著，正是即使身處風暴也不動搖的深淵之靜。",
      detail: {
        body: `你是「深淵之魔女」。

踏入無人涉足的未知領域，找出沉睡於其深處之真實的存在。

深淵是令人畏懼之地。

幽暗、寂靜，許多人不願靠近。

但你不同。

你知道，正是人們迴避之處才藏有價值。

無人見過的風景。
無人解開的謎。
尚未被發現的可能。

你會強烈地受其吸引。

深淵之魔女厭惡無謂。

比起情感或道理，你能先看現實再做判斷。

問題發生時，你會冷靜分析狀況，找出最合理的解決之道。

你也喜歡憑自身之力而活。

不會過度依賴誰，也不支配誰。

自由卻堅強。

那正是深淵之魔女的本質。

深淵之魔女的使命是「找出隱藏的真實」。

你所擁有的探究心與冷靜，是抵達眾人忽略之答案的特別魔法。`,
        love: `在戀愛中，是非常我行我素的類型。

鮮少被情感沖昏而墜入愛河，重視——

「在一起是否自在」

「能否保持自然本色」。

你也珍視自己的時間與自由，因此戀愛不會成為人生的全部。

但那並不代表愛情淺薄。

對真正重要的對象，你會以行動而非言語表達心意。

遇到困難時伸出援手。

需要時必定在身旁。

以這樣的形式累積信賴。

只是，你不太擅長表達自己的情感。

在對方看來，

「猜不透你在想什麼」

或許會這麼覺得。

正因如此，偶爾用言語傳達心意也很重要。

深淵之魔女願意敞開心扉的對象，是非常特別的存在。`,
        compatibility: [
          { name: "海之魔女", text: "同樣熱愛自由的彼此。不過度干涉，能保持自然本色的舒適關係。即使話少也能彼此理解，有種奇妙的安心感。" },
          { name: "星之魔女", text: "以求知欲相繫的對象。暢談深刻話題或感興趣領域的時光，對深淵之魔女而言是最大的樂趣。是能在尊重彼此世界中成長的關係。" },
          { name: "黑之魔女", text: "擁有行動力與決斷力的黑之魔女，高度肯定深淵之魔女的能力。彼此都厭惡無謂，是容易生出信賴關係的組合。" },
        ],
        rival: { name: "曉之魔女", text: "珍視與人連結的曉之魔女，與深淵之魔女恰成對比。起初或許會因距離感的差異而困惑。然而曉之魔女的溫暖，會教你看見平日不曾見的世界。當你們能彼此理解時，便會成為帶來巨大成長的關係。" },
        message: `「唯有畏懼的彼端，真實才得安眠。」

選擇眾人迴避之路，有時伴隨著孤獨。

但你擁有凝視其彼端的勇氣。

無人能尋得的答案。

無人能抵達的地方。

你正是為了前往那裡而生。

深淵並非可懼之物。

因為那裡，沉睡著尚無人知曉的可能。`,
        keywords: ["探究心", "冷靜", "自由", "合理性", "看穿真實之力"],
      },
    },
    ESTP: {
      name: "秘密之魔女",
      catchCopy: "馳騁瞬間的大膽魔女。",
      description:
        "你是讀懂當下情勢、大膽行動的秘密之魔女類型。以敏銳的直覺與行動力，不放過機會地一把抓住。比起道理更重實踐，比起思考更愛行動地開拓道路。享受刺激與變化，擁有吸引周遭的魅力。胸懷不向任何人揭露的秘密之牌，你今天也鮮明地玩味人生。",
      detail: {
        body: `你是「秘密之魔女」。

找出無人知曉的門扉，搶先躍入其後的存在。

世界藏著許多祕密。

人們未曾察覺的可能。
尚未得見的風景。
緊閉之門後的冒險。

秘密之魔女比誰都更為尋找這些而雀躍。

你天生擁有行動力。

不是「總有一天再做」，而是——

「看起來很有趣，那就試試看」

你是這樣想的人。

在許多人猶豫之際邁出一步，親自體驗、從中尋得答案。

你也擁有能迅速適應任何環境的靈活。

即使發生意外之事也不慌張，能當場做出最佳選擇。

秘密之魔女厭惡無聊。

總在尋求新的刺激與發現，想盡情享受人生。

秘密之魔女的使命是「解放被封閉的可能」。

你所開啟的門扉之後，等待著許多人尚未知曉的未來。`,
        love: `在戀愛中，是非常有魅力而自然的類型。

對喜歡上的對象會積極靠近，想一起共度歡樂的時光。

對你而言，戀愛是——

「一起享受人生」。

一起歡笑、冒險、分享新體驗。

在這樣的時光中感到莫大的幸福。

你也擁有吸引人的魅力，常在不知不覺間被人傾心。

只是，由於珍視自由，你不擅長被束縛。

當關係變得拘束，你也可能在不知不覺間拉開距離。

真正美好的戀愛，是自由與信賴並存的關係。

能讓你保持自我的對象，正是能長久相愛的命定之人。`,
        compatibility: [
          { name: "夢之魔女", text: "光是在一起人生便成為冒險的對象。能共享好奇心與行動力，每天都會變得歡樂而充滿刺激。是能成為最佳玩伴、也是最佳戀人的存在。" },
          { name: "風之魔女", text: "以自由發想與行動力共鳴的組合。新點子與挑戰接連誕生，毫無無聊之時。是能彼此拓展可能的關係。" },
          { name: "絲之魔女", text: "同樣珍視人緣與新相遇的彼此。在一起便能引來意想不到的幸運與機會。是讓人生更加豐盈的對象。" },
        ],
        rival: { name: "月之魔女", text: "纖細而懷有深邃之心的月之魔女，與秘密之魔女正好相反。起初或許會因思考方式的差異而困惑。然而月之魔女會讓你察覺「藏於內心深處的真實心意」。而你能給月之魔女「邁向新世界的勇氣」。當你們能彼此理解時，便會成為非常特別的關係。" },
        message: `「別害怕推開那扇門。」

你覺得有趣的事物。

不知為何在意的事物。

那份直覺，是有意義的。

許多人想停留在安全的地方。

但你擁有邁向未知的勇氣。

那一步，會孕育新的相遇，

帶來嶄新的未來。

世界比想像中更廣。

而你，正是為了找到那祕密而生的。`,
        keywords: ["行動力", "自由", "冒險心", "適應力", "開啟可能之力"],
      },
    },
  },
};

/**
 * 日本語の結果に、指定言語のオーバーライドを合成して返す。
 * 未訳フィールドは ja の値を保持する（段階追加できる構造）。
 */
export function localizeResult(base: WitchResult, lang: Lang): WitchResult {
  if (lang === "ja") return base;
  const ov = resultOverrides[lang]?.[base.mbti];
  if (!ov) return base;

  const detail = base.detail
    ? {
        ...base.detail,
        body: ov.detail?.body ?? base.detail.body,
        love: ov.detail?.love ?? base.detail.love,
        message: ov.detail?.message ?? base.detail.message,
        keywords: ov.detail?.keywords ?? base.detail.keywords,
        compatibility: base.detail.compatibility.map((c, i) => ({
          ...c,
          name: ov.detail?.compatibility?.[i]?.name ?? c.name,
          text: ov.detail?.compatibility?.[i]?.text ?? c.text,
        })),
        rival: {
          ...base.detail.rival,
          name: ov.detail?.rival?.name ?? base.detail.rival.name,
          text: ov.detail?.rival?.text ?? base.detail.rival.text,
        },
      }
    : base.detail;

  return {
    ...base,
    name: (ov.name ?? base.name) as WitchResult["name"],
    catchCopy: ov.catchCopy ?? base.catchCopy,
    description: ov.description ?? base.description,
    detail,
  };
}
