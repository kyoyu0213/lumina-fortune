// オーラカラー診断ページ（intro + quiz）と結果ページ（/aura/result）の多言語文言。
// UI文言・質問/選択肢は ja/en/ko/zh-TW を全訳。結果本文は ja フォールバック（localizeAuraResult）。
import type { Lang } from "@/lib/i18n/config";
import type { AuraColor, AuraId } from "@/lib/aura/aura";

export type AuraUI = {
  backTop: string;
  introTitle: string;
  introLead: string;
  introInfo1: string;
  introInfo2: string;
  startButton: string;
  questionLabel: (current: number, total: number) => string;
  backButton: string;
  showResultButton: string;
  incompleteNote: string;
};

export type QuestionText = { text: string; options: string[] };

export const auraUI: Record<Lang, AuraUI> = {
  ja: {
    backTop: "← トップへ戻る",
    introTitle: "あなたのオーラカラー診断",
    introLead: "白の魔女ルミナが導く、\n12色の魂の輝き",
    introInfo1: "10問の質問に答えるだけで、\nあなたの魂が放つオーラの色を診断します。",
    introInfo2: "今のあなたは、どんな光をまとっているのでしょう。",
    startButton: "診断をはじめる",
    questionLabel: (c, t) => `QUESTION ${c} / ${t}`,
    backButton: "← 戻る",
    showResultButton: "診断結果を見る",
    incompleteNote: "未回答の質問があります。すべての質問に答えてください。",
  },
  en: {
    backTop: "← Back to top",
    introTitle: "Your Aura Color Diagnosis",
    introLead: "12 colors of the soul's glow,\nguided by Lumina the White Witch",
    introInfo1: "Just answer 10 questions and we'll\ndiagnose the aura color your soul gives off.",
    introInfo2: "What light are you wearing right now?",
    startButton: "Start the diagnosis",
    questionLabel: (c, t) => `QUESTION ${c} / ${t}`,
    backButton: "← Back",
    showResultButton: "See the result",
    incompleteNote: "Some questions are unanswered. Please answer them all.",
  },
  ko: {
    backTop: "← 메인으로 돌아가기",
    introTitle: "당신의 오라 컬러 진단",
    introLead: "흰 마녀 루미나가 이끄는,\n12색 영혼의 빛",
    introInfo1: "10개의 질문에 답하기만 하면,\n당신의 영혼이 발하는 오라의 색을 진단합니다.",
    introInfo2: "지금의 당신은 어떤 빛을 두르고 있을까요.",
    startButton: "진단 시작하기",
    questionLabel: (c, t) => `QUESTION ${c} / ${t}`,
    backButton: "← 뒤로",
    showResultButton: "진단 결과 보기",
    incompleteNote: "답하지 않은 질문이 있습니다. 모든 질문에 답해 주세요.",
  },
  "zh-TW": {
    backTop: "← 返回首頁",
    introTitle: "你的氣場色彩診斷",
    introLead: "白之魔女露米娜引導的，\n12色靈魂光輝",
    introInfo1: "只要回答10個問題，\n就為你診斷靈魂散發的氣場色彩。",
    introInfo2: "此刻的你，正披著怎樣的光呢。",
    startButton: "開始診斷",
    questionLabel: (c, t) => `QUESTION ${c} / ${t}`,
    backButton: "← 返回",
    showResultButton: "查看診斷結果",
    incompleteNote: "還有未回答的問題，請回答所有問題。",
  },
};

/** 質問・選択肢（id をキー、options 順は aura.ts と一致） */
export const questionTexts: Record<Lang, Record<number, QuestionText>> = {
  ja: {
    1: { text: "休日の理想は？", options: ["新しいことに挑戦する", "友達と楽しく過ごす", "本や動画で学ぶ", "自然の中でゆっくり過ごす"] },
    2: { text: "人からよく言われるのは？", options: ["行動力がある", "話しやすい", "頭がいい", "優しい"] },
    3: { text: "悩んだとき、あなたはどうする？", options: ["とにかく動いてみる", "誰かに相談する", "徹底的に調べる", "一人でじっくり考える"] },
    4: { text: "惹かれる場所は？", options: ["ライブやイベント会場", "図書館や美術館", "海や空が見える場所", "神社やパワースポット"] },
    5: { text: "恋愛で大切にしたいものは？", options: ["情熱", "安心感", "理解し合えること", "運命的なつながり"] },
    6: { text: "もし願いが一つ叶うなら？", options: ["夢を叶えたい", "大切な人を幸せにしたい", "自由になりたい", "真実を知りたい"] },
    7: { text: "あなたの強みは？", options: ["決断力", "コミュニケーション力", "分析力", "共感力"] },
    8: { text: "どんな物語が好き？", options: ["英雄が活躍する物語", "仲間との友情物語", "謎を解くミステリー", "心があたたかくなる癒し系"] },
    9: { text: "人生で大事にしたいものは？", options: ["成功", "自由", "愛", "成長"] },
    10: { text: "あなたを一言で表すなら？", options: ["情熱家", "冒険家", "賢者", "導き手"] },
  },
  en: {
    1: { text: "Your ideal day off?", options: ["Take on something new", "Have fun with friends", "Learn from books or videos", "Relax in nature"] },
    2: { text: "What people often say about you?", options: ["You take action", "Easy to talk to", "Smart", "Kind"] },
    3: { text: "When troubled, what do you do?", options: ["Just try taking action", "Consult someone", "Research thoroughly", "Think it over alone"] },
    4: { text: "The place that draws you?", options: ["Concerts and event venues", "Libraries and museums", "Places with a view of sea or sky", "Shrines and power spots"] },
    5: { text: "What you want to value in love?", options: ["Passion", "A sense of security", "Understanding each other", "A fated connection"] },
    6: { text: "If one wish came true?", options: ["Make my dream come true", "Make a loved one happy", "Become free", "Know the truth"] },
    7: { text: "Your strength?", options: ["Decisiveness", "Communication", "Analysis", "Empathy"] },
    8: { text: "What kind of story do you like?", options: ["Tales of heroes", "Stories of friendship", "Mysteries to solve", "Heartwarming, soothing ones"] },
    9: { text: "What you want to value in life?", options: ["Success", "Freedom", "Love", "Growth"] },
    10: { text: "Describe yourself in a word?", options: ["Passionate", "Adventurer", "Sage", "Guide"] },
  },
  ko: {
    1: { text: "휴일의 이상은?", options: ["새로운 것에 도전한다", "친구와 즐겁게 보낸다", "책이나 영상으로 배운다", "자연 속에서 느긋하게 보낸다"] },
    2: { text: "사람들에게 자주 듣는 말은?", options: ["행동력이 있다", "말 걸기 편하다", "똑똑하다", "다정하다"] },
    3: { text: "고민될 때, 당신은 어떻게 하나요?", options: ["일단 움직여 본다", "누군가에게 상담한다", "철저히 알아본다", "혼자 차분히 생각한다"] },
    4: { text: "끌리는 장소는?", options: ["라이브나 이벤트 장소", "도서관이나 미술관", "바다나 하늘이 보이는 곳", "신사나 파워 스폿"] },
    5: { text: "연애에서 중요하게 여기고 싶은 것은?", options: ["열정", "안정감", "서로 이해하는 것", "운명적인 인연"] },
    6: { text: "만약 소원 하나가 이뤄진다면?", options: ["꿈을 이루고 싶다", "소중한 사람을 행복하게 하고 싶다", "자유로워지고 싶다", "진실을 알고 싶다"] },
    7: { text: "당신의 강점은?", options: ["결단력", "커뮤니케이션 능력", "분석력", "공감력"] },
    8: { text: "어떤 이야기를 좋아하나요?", options: ["영웅이 활약하는 이야기", "동료와의 우정 이야기", "수수께끼를 푸는 미스터리", "마음이 따뜻해지는 힐링물"] },
    9: { text: "인생에서 소중히 하고 싶은 것은?", options: ["성공", "자유", "사랑", "성장"] },
    10: { text: "당신을 한마디로 표현한다면?", options: ["열정가", "모험가", "현자", "인도자"] },
  },
  "zh-TW": {
    1: { text: "理想的假日是？", options: ["挑戰新事物", "和朋友開心相處", "透過書或影片學習", "在大自然中悠閒度過"] },
    2: { text: "別人常說你？", options: ["很有行動力", "很好聊", "很聰明", "很溫柔"] },
    3: { text: "煩惱時，你會怎麼做？", options: ["總之先行動看看", "找人商量", "徹底查清楚", "獨自仔細思考"] },
    4: { text: "吸引你的地方是？", options: ["演唱會或活動會場", "圖書館或美術館", "看得見海或天空的地方", "神社或能量景點"] },
    5: { text: "戀愛中想重視的是？", options: ["熱情", "安心感", "彼此理解", "命中註定的連結"] },
    6: { text: "若能實現一個願望？", options: ["想實現夢想", "想讓重要的人幸福", "想變得自由", "想知道真相"] },
    7: { text: "你的優勢是？", options: ["決斷力", "溝通能力", "分析力", "同理心"] },
    8: { text: "你喜歡怎樣的故事？", options: ["英雄活躍的故事", "與夥伴的友情故事", "解謎的推理故事", "暖心療癒系"] },
    9: { text: "人生中想重視的是？", options: ["成功", "自由", "愛", "成長"] },
    10: { text: "用一句話形容你？", options: ["熱情家", "冒險家", "賢者", "引導者"] },
  },
};

/** 結果ページ（/aura/result）のUI文言 */
export type AuraResultUI = {
  backTop: string;
  resultEyebrow: string;
  resultHeading: (name: string) => string;
  themeLabel: (theme: string) => string;
  illustrationPending: string;
  readingPending: string;
  overviewTitle: string;
  personalityTitle: string;
  loveTitle: string;
  workTitle: string;
  letterTitle: string;
  retryButton: string;
  backTopButton: string;
  notFoundTitle: string;
  notFoundBody: string;
  startButton: string;
};

export const auraResultUI: Record<Lang, AuraResultUI> = {
  ja: {
    backTop: "← トップへ戻る",
    resultEyebrow: "Your Aura Color",
    resultHeading: (name) => `あなたのオーラは「${name}」です`,
    themeLabel: (theme) => `テーマ：${theme}`,
    illustrationPending: "イラストは準備中です",
    readingPending: "この鑑定文は後ほど追加します。",
    overviewTitle: "概要",
    personalityTitle: "性格",
    loveTitle: "恋愛傾向",
    workTitle: "才能と適職",
    letterTitle: "ルミナからの手紙",
    retryButton: "もう一度診断する",
    backTopButton: "トップへ戻る",
    notFoundTitle: "診断結果が見つかりませんでした",
    notFoundBody: "もう一度、最初から診断してみてください。",
    startButton: "診断をはじめる",
  },
  en: {
    backTop: "← Back to top",
    resultEyebrow: "Your Aura Color",
    resultHeading: (name) => `Your aura is "${name}"`,
    themeLabel: (theme) => `Theme: ${theme}`,
    illustrationPending: "Illustration coming soon",
    readingPending: "This reading will be added later.",
    overviewTitle: "Overview",
    personalityTitle: "Personality",
    loveTitle: "In love",
    workTitle: "Talents & ideal work",
    letterTitle: "A letter from Lumina",
    retryButton: "Take the diagnosis again",
    backTopButton: "Back to top",
    notFoundTitle: "Result not found",
    notFoundBody: "Please take the diagnosis again from the start.",
    startButton: "Start the diagnosis",
  },
  ko: {
    backTop: "← 메인으로 돌아가기",
    resultEyebrow: "Your Aura Color",
    resultHeading: (name) => `당신의 오라는 「${name}」입니다`,
    themeLabel: (theme) => `테마: ${theme}`,
    illustrationPending: "일러스트는 준비 중입니다",
    readingPending: "이 해설은 추후 추가됩니다.",
    overviewTitle: "개요",
    personalityTitle: "성격",
    loveTitle: "연애 성향",
    workTitle: "재능과 적성",
    letterTitle: "루미나의 편지",
    retryButton: "다시 진단하기",
    backTopButton: "메인으로 돌아가기",
    notFoundTitle: "진단 결과를 찾을 수 없습니다",
    notFoundBody: "처음부터 다시 진단해 주세요.",
    startButton: "진단 시작하기",
  },
  "zh-TW": {
    backTop: "← 返回首頁",
    resultEyebrow: "Your Aura Color",
    resultHeading: (name) => `你的氣場是「${name}」`,
    themeLabel: (theme) => `主題：${theme}`,
    illustrationPending: "插圖準備中",
    readingPending: "此解讀稍後補上。",
    overviewTitle: "概要",
    personalityTitle: "性格",
    loveTitle: "戀愛傾向",
    workTitle: "才能與適職",
    letterTitle: "露米娜的信",
    retryButton: "再次診斷",
    backTopButton: "返回首頁",
    notFoundTitle: "找不到診斷結果",
    notFoundBody: "請從頭再診斷一次。",
    startButton: "開始診斷",
  },
};

/** 言語別の結果オーバーライド（未訳は空＝ja フォールバック） */
export type AuraResultOverride = {
  name?: string;
  theme?: string;
  reading?: {
    overview?: string;
    personality?: string;
    love?: string;
    work?: string;
    letter?: string;
  };
};

export const auraResultOverrides: Record<Lang, Partial<Record<AuraId, AuraResultOverride>>> = {
  ja: {},
  en: {
    red: {
      name: "Red Aura",
      theme: "Passion · Drive · Challenge",
      reading: {
        overview: `The light enfolding you is a red aura, like a burning flame.

People with a red aura are challengers brimming with passion and drive.

You hold the power to move the instant you think "I want to try," with the courage to step one pace ahead of others.

Rather than waiting still, you're the type to carve open the future with your own hands.

That energy reaches those around you, becoming a driving force that moves many people.`,
        personality: `With a red aura, you are a very straightforward person.

All-out for what you love.
Serious about what you decide to do.

That stance can sometimes look stubborn, but it's proof that you cherish your own convictions.

You're also strong in hard situations, with a side that burns brighter in adversity.

You hold the power to choose a road no one challenges and carve open the way yourself.

On the other hand, absorbed in running on, you may stop noticing your own fatigue.

At times, pausing and resting your heart matters too.`,
        love: `In love, too, you are passionate.

To the one you fall for, you actively convey your feelings and try to move the relationship forward.

Straightforward over games.

You're the type who wants a clear relationship rather than an ambiguous one.

However, thinking so much of your partner, your intensity can sometimes run a little too high.

Love is not something you advance alone, but something the two of you nurture together.

By respecting your partner's pace, you can build an even better relationship.`,
        work: `The talent of the red aura lies in

"the power to move people."

・Business owner
・Sales
・Leadership roles
・Event planning
・Sports-related work
・Entrepreneur

and other work where you stand at the front suits you well.

The strength to decide even when those around you waver is a great weapon of yours.`,
        letter: `Red light is proof that the soul is trying to move forward.

Within you is a flame that illuminates others.

At times you may feel it's too strong.

Yet it's precisely because of that passion that you've been able to walk this far.

Please, do not fear the fire dwelling in your heart.

Your courage becomes someone's hope.

And that flame will become a light that carves open the future.

Lumina, the White Witch ✨`,
      },
    },
    orange: {
      name: "Orange Aura",
      theme: "Sociability · Brightness · Fun",
      reading: {
        overview: `The light enfolding you is a warm orange aura, like a sunset sky.

People with an orange aura are like a bright sun that connects people to people.

Just by being there, you soften the air, and people naturally gather around you.

You hold a talent for enjoyment and a power to deliver smiles and energy to those around you.

Not thinking about life too seriously, advancing positively with "let's just try it first" is also your charm.`,
        personality: `With an orange aura, you are a very approachable person.

You can converse naturally with anyone and are good at finding people's good points.

Even at a first meeting, you build no walls, and you're easily liked by many.

You're also full of curiosity, with the power to enjoy new experiences.

Excellent at sensing what's fun and interesting, you have a side that dislikes boredom.

However, prioritizing others too much, you may put your own true feelings last.

Not only delighting those around you — please cherish your own heart too.`,
        love: `In love, you seek a relationship that's fun to be in together.

You're the type who cherishes being able to laugh like friends and share casual moments.

Since you naturally close the distance with the one you like, love often springs from conversation or shared hobbies.

You also like to delight your partner, so you're good at surprises and thoughtful care.

On the other hand, not wanting to ruin the fun mood, you may hide your real worries and anxieties.

By conveying your honest feelings, a deeper bond will be born.`,
        work: `The talent of the orange aura lies in

"the power to make people smile."

・Customer service
・Sales
・Event planning
・PR / social media management
・Education
・Entertainment industry

and other people-facing work suits you well.

Your brightness holds the power to change the atmosphere around you.

It's precisely where people gather that your talent should shine greatly.`,
        letter: `Orange light is the color of a soul that shares joy.

You may not have noticed, but many people are saved by that smile.

A casual word or kindness has become a great support for someone.

Please, never lose your own brightness from here on.

And don't forget to make yourself happy too, not only to illuminate others.

Your light is a warm lamp that connects people to people.

Lumina, the White Witch ✨`,
      },
    },
    yellow: {
      name: "Yellow Aura",
      theme: "Intellect · Curiosity · Inventiveness",
      reading: {
        overview: `The light enfolding you is a yellow aura with a radiance reminiscent of the morning sun.

People with a yellow aura are seekers blessed with intellect and curiosity.

Your heart leaps at new knowledge and discovery, and you gaze at the world while cherishing "why?" and "how come?"

You have the power to think about things from many angles, and you're good at finding possibilities and ideas others don't notice.

Your light is a light of wisdom that finds hints for the future.`,
        personality: `With a yellow aura, you are a very curious person.

You become absorbed in what interests you, tending to research and learn until you're satisfied.

Not only gathering knowledge, you also hold the power to combine it and give birth to new ideas.

Quick-witted, you can naturally show unique viewpoints even in conversation.

On the other hand, loving to think, you may worry too much before acting.

At times, stepping forward without waiting for the perfect answer matters too.`,
        love: `In love, you value "whether the conversation clicks" over looks or momentum.

You're easily drawn to someone who brings learning and discovery and gives you intellectual stimulation.

When you fall for someone, you want to know them deeply.

You're the type who takes interest in their thinking and values, nurturing the relationship slowly.

However, analyzing your emotions too much, you may struggle to express your feelings honestly.

Love is something felt with the heart, not only logic.

At times, convey your honest feelings before you think.`,
        work: `The talent of the yellow aura lies in

"the power to discover and give form."

・Research
・Education
・Writer
・Planning roles
・Designer
・Marketing
・IT / technical roles

and other work that uses knowledge and inventiveness suits you well.

Your ideas find possibilities many people overlook.

By continuing to learn, that talent should blossom even more greatly.`,
        letter: `Yellow light is proof of wisdom and curiosity.

In your heart dwells a pure wish to know the world more.

You may sometimes choose a road that looks like a detour to others.

Yet the knowledge and experience gained on that detour will one day become a treasure all your own.

Please, never stop holding questions.

And believe in your own flashes of insight.

The light you find will become a new possibility that illuminates the future.

Lumina, the White Witch ✨`,
      },
    },
    green: {
      name: "Green Aura",
      theme: "Healing · Harmony · Kindness",
      reading: {
        overview: `The light enfolding you is a calm green aura, like a wind blowing through a forest.

People with a green aura are beings who hold the power of healing and harmony.

Disliking conflict, you can naturally stand between people and bridge them.

Those around you strangely feel a sense of security.

That's because the kindness and capacity your soul holds is conveyed beyond words.

Your light is a light of peace that gently calms people's hearts.`,
        personality: `With a green aura, you are a very compassionate person.

Excellent at sensing others' feelings, you can't leave someone in trouble alone.

Rather than being swept by emotion, you can consider the balance of the whole.

So you're trusted by many and often become someone people consult.

On the other hand, prioritizing others too much, you may put your own feelings last.

The kinder the person, the more they need to be kind to themselves too.

At times, the courage to say "I can't" becomes a precious power to protect yourself.`,
        love: `In love, you cherish a relationship where you can feel secure above all.

More than a thrilling romance, you're drawn to someone whose presence calms your heart.

You face the one you fall for sincerely, nurturing the relationship over a long time.

Your wish for your partner's happiness is strong, and you often naturally become the supporting side.

However, be careful of the tendency to give too much.

Love is not only supporting, but supporting each other.

Please don't forget that you, too, are someone worthy of being loved.`,
        work: `The talent of the green aura lies in

"the power to heal and reassure people."

・Medical / welfare work
・Counselor
・Education
・Customer service
・Childcare worker
・Therapist
・Work involving animals or nature

and other work that supports people's hearts and lives suits you well.

Your very presence gives people a sense of security.

That kindness should become an irreplaceable value to many.`,
        letter: `Green light is proof of healing and harmony.

Without knowing it, you support the hearts of many people.

That kindness is a special talent.

Yet if you wear yourself out completely, that light grows weaker too.

Please, rest at times.

You don't need to sacrifice yourself to heal someone.

When you yourself are calm and fulfilled, that light shines most beautifully.

Your kindness is a light this world needs.

Lumina, the White Witch ✨`,
      },
    },
    lightblue: {
      name: "Light Blue Aura",
      theme: "Freedom · Flexibility · Purity",
      reading: {
        overview: `The light enfolding you is a light blue aura, like the endlessly spreading sky and sea.

People with a light blue aura are beings with free ideas and a flexible heart.

Unbound by common sense or fixed notions, you cherish a way of living that's true to yourself.

Unafraid of change, you can naturally accept new environments and values.

Your light is a light as airy as the wind, guiding people toward a future full of possibility.`,
        personality: `With a light blue aura, you are someone with a very free heart.

Full of curiosity, you're strongly drawn to new things and unknown worlds.

Not clinging to one way of thinking, you can flexibly change your perspective with the situation, so many will see you as "a person of broad horizons."

You're also good at accepting differences in people, and showing understanding of diverse values is your charm too.

On the other hand, cherishing freedom so much, you may feel confined by staying in the same place.

By sometimes turning your eyes to the value of "continuing," you can gain even greater growth.`,
        love: `In love, you seek a natural relationship with little restraint.

More than being together every moment, you feel secure in a relationship where you can respect each other's time and values.

Love often develops from a friend-like distance with the one you like.

Since you respect your partner's individuality, they often find being with you comfortable.

However, cherishing freedom so much, you may miss the timing to convey your feelings.

For someone truly important, you also need the courage to put your feelings into words.`,
        work: `The talent of the light blue aura lies in

"the power to find new possibilities."

・Travel / tourism
・Creator
・Writer
・Designer
・Social media management
・Freelance
・International work

and other work that uses free ideas and flexible adaptability suits you well.

Rather than living only within a set frame, you're the type who shines greatly in an environment where you can express yourself.

Your ideas will show many people new scenery.`,
        letter: `Light blue light is proof of a free soul.

You were not born to walk the same road as someone else.

You have a sky all your own.

At times others may call you "restless."

But that's because your soul seeks growth and change.

Please, never lose your true self.

Just as the wind travels the world, you, too, will meet many possibilities.

That free heart is the greatest power that makes you shine.

Lumina, the White Witch ✨`,
      },
    },
    blue: {
      name: "Blue Aura",
      theme: "Sincerity · Composure · Trust",
      reading: {
        overview: `The light enfolding you is a blue aura, quiet and beautiful like a clear night sky.

People with a blue aura are people of trust who combine sincerity and composure.

Gazing at things without being swept by emotion, you often become someone others rely on.

You're not the type to stand out flashily, but that stability and responsibility give many a sense of security.

Your light is a light of trust that calms people's hearts.`,
        personality: `With a blue aura, you are a very earnest and sincere person.

You keep your promises and try to take responsibility for your words and actions.

You also have the power to sort out a situation and judge calmly before becoming emotional.

Others often see you as "reliable" and "trustworthy."

On the other hand, being hard on yourself, you tend to dislike showing failure or weakness.

The stronger one's sense of responsibility, the easier it is to carry things alone.

At times, relying on someone is by no means weakness.`,
        love: `In love, you cherish a relationship of trust above all.

More than a momentary high, you're the type who seeks a relationship you can be in for a long time with peace of mind.

You face the one you fall for sincerely and dislike lies and games.

So it may take a little time for love to begin, but to someone you've once opened your heart to, you pour deep affection.

However, since you're not good at showing emotion outwardly, others may think "I can't tell what you're thinking."

Your true feelings are better conveyed in words more than you imagine.

Your kindness reaches your partner's heart only when properly conveyed.`,
        work: `The talent of the blue aura lies in

"the power to build up trust."

・Civil servant
・Teacher
・Administrative work
・Medical work
・Engineer
・Accounting / bookkeeping
・Legal work

and other work that demands accuracy and responsibility suits you well.

Rather than flashy success, you're the type who produces great results through steady accumulation.

As someone others can entrust things to with peace of mind, you'll be needed in many places.`,
        letter: `Blue light is proof of trust and sincerity.

Even without standing out, you're trusted by many people.

That's not something gained in a day.

The kindness and responsibility you've built up are creating the light you have now.

But you don't always have to be strong.

Even those who support others sometimes need support.

Please don't carry it all alone — rest your heart at times.

Your blue light, though quiet, has become a signpost for many people.

Lumina, the White Witch ✨`,
      },
    },
    purple: {
      name: "Purple Aura",
      theme: "Intuition · Mystery · Spirituality",
      reading: {
        overview: `The light enfolding you is a purple aura, mysterious like the moon shining in the night sky.

People with a purple aura are beings with sharp intuition and deep spirituality.

You have the power to sense not only what's visible, but the essence and meaning behind it.

You sensitively perceive people's emotions and the mood of a place, and your "I just had a feeling" hits the mark surprisingly often.

Your light is a mysterious light that guides toward unseen truth.`,
        personality: `With a purple aura, you are a very sensitive person.

More than surface conversation or relationships, you seek a deep connection where heart meets heart.

You also cherish time spent thinking alone, naturally facing your own inner self.

Others may sometimes see you as a slightly mysterious person, someone with a unique sensibility.

But that distinctive viewpoint is your charm.

On the other hand, you may grow tired from absorbing others' emotions too much or thinking too deeply.

At times, holding a realistic viewpoint and protecting your own heart matters.`,
        love: `In love, you tend to seek a connection of souls.

Not only conditions or looks, you cherish a feeling like "I sense some bond with this person."

The ones you fall for are likely those who resonate with your values and spirituality.

And to someone you've once let into your heart, you pour very deep affection.

However, by setting ideals too high or thinking too much about your partner's true feelings, you may complicate love yourself.

At times, seeing the reality before you, not only intuition, matters.

A truly important bond will grow naturally, even without forcing the chase.`,
        work: `The talent of the purple aura lies in

"the power to see through to the essence."

・Counselor
・Fortune-teller
・Therapist
・Psychology-related work
・Author
・Artist
・Research

and other work that handles people's hearts and unseen value suits you well.

You can sense what can't be noticed from surface information alone.

That sensibility should become a power that gives many people new realizations.`,
        letter: `Purple light is proof of the depth of the soul.

You are a little more sensitive to the unseen than others.

That's exactly why you may feel a loneliness hard for others to understand.

Yet that sensibility is by no means a mistake.

The kindness you sensed, the discomfort, the flashes of insight —

all are precious messages from the soul.

Please believe in your intuition.

And cherish yourself, too, who lives in the real world.

When you accept both mystery and reality, your light will begin to shine even more beautifully.

Lumina, the White Witch ✨`,
      },
    },
    pink: {
      name: "Pink Aura",
      theme: "Love · Empathy · Compassion",
      reading: {
        overview: `The light enfolding you is a pink aura, gentle and warm like the petals of spring.

People with a pink aura are beings brimming with love, empathy, and compassion.

You rejoice in others' joy as if your own, and can naturally stay close to others' sorrow too.

That kindness is by no means weakness.

Rather, it's an expression of the strength to try to understand people's hearts.

Your light is a light of love that gently enfolds wounded hearts.`,
        personality: `With a pink aura, you are a very kindhearted person.

Cherishing connections with people, you feel happy when those around you can smile.

You're also excellent at sensing others' feelings, able to notice emotions that don't become words.

So you're often consulted by or relied upon by many.

On the other hand, prioritizing others' feelings too much, you may push down your own true feelings.

Kindness is not sacrificing yourself.

First filling your own heart is also a precious form of love.`,
        love: `In love, you seek deep affection and a connection of hearts.

You're very devoted to the one you love and sincerely wish for their happiness.

And since you can naturally support and encourage your partner, you become someone who gives security to be with.

Easily noticing your partner's small changes, your delicate care is your charm too.

However, the deeper your affection, the more you may accommodate your partner too much.

A truly good relationship is not one where one side endures.

Cherishing your own feelings while nurturing love is a shortcut to happiness.`,
        work: `The talent of the pink aura lies in

"the power to warm people's hearts."

・Counselor
・Childcare worker
・Nurse
・Welfare work
・Customer service
・Education
・Therapist

and other work that involves people deeply suits you well.

Your compassion gives people security and hope.

Within work that supports someone, that talent should shine especially greatly.`,
        letter: `Pink light is proof of love.

You are someone who knows how to love people.

That's exactly why you may ache at someone's sorrow, or put your partner before yourself.

But please don't forget.

Just as you treasure someone, you, too, are someone who should be treasured.

Love is not only giving, but receiving too.

Please be kind to your own heart as well.

Your affection holds the power to save many people.

And that warm light will go on illuminating the hearts of many.

Lumina, the White Witch ✨`,
      },
    },
    white: {
      name: "White Aura",
      theme: "Purification · Hope · Guidance",
      reading: {
        overview: `The light enfolding you is a white aura, pure like light shining into morning dew.

People with a white aura are beings who hold the power of purification, hope, and guidance.

In any situation you try to find the light, able to deliver hope to people's hearts.

You're not the type to assert strongly, but your very presence gives those around you a sense of security.

You also have the power to see things fairly, with a purity that holds no prejudice toward people or situations.

Your light is a signpost light that illuminates those lost in confusion.`,
        personality: `With a white aura, you are a very sincere and straightforward person.

You dislike hurting people and wish to be as kind as you can.

You can also naturally reach out a hand when you see someone in trouble.

That kindness is not calculation, but something born from your essence.

On the other hand, cherishing ideals so much, you may become hard on yourself.

"I must try harder."
"I must be a better person."

You may think this way at times.

But you don't need to be perfect.

You are a being of sufficient worth just as you are now.`,
        love: `In love, you cherish a connection of hearts above all.

You're the type who seeks a sincere relationship over games or calculation.

You treat the one you love with true heart, with a strong wish for their happiness.

You also have the capacity to accept not only your partner's strengths but their faults too.

So you're often loved as a presence one can feel secure with.

However, prioritizing your partner too much, you may endure your own feelings.

Love is not only giving, but receiving too.

Please don't forget that you, too, are someone worthy of being cherished.`,
        work: `The talent of the white aura lies in

"the power to guide and support people."

・Education
・Medical / welfare work
・Counselor
・Therapist
・Coach
・Customer service
・Volunteer activities

and other work involving people's growth and happiness suits you well.

You can believe in people's possibilities.

That power should become a chance for someone to face forward.`,
        letter: `White light is proof of hope.

Without knowing it, you illuminate the hearts of many.

Even if you don't think you're doing anything special, there are people saved by your words and kindness.

But those who give light often don't notice their own heart's fatigue.

Please don't forget.

You, too, are someone who should be protected and healed.

You don't have to force yourself to be strong.

When lost, believe in the light your heart turns toward.

The lamp of hope within you will never go out.

And that light will go on gently illuminating someone's future.

Lumina, the White Witch ✨`,
      },
    },
    silver: {
      name: "Silver Aura",
      theme: "Insight · Wisdom · Observation",
      reading: {
        overview: `The light enfolding you is a silver aura, shining quietly like moonlight.

People with a silver aura are observers equipped with sharp insight and deep wisdom.

You can naturally sense small changes others overlook and the emotion behind someone's true feelings.

You have the power to view things objectively without being swept by emotion, and others often see you as "a calm person" or "someone who sees things well."

Your light is a light of wisdom that illuminates the truth.`,
        personality: `With a silver aura, you are a very observant person.

You receive much information not only from people's words, but from their expressions, attitudes, and the atmosphere.

So you can notice changes in relationships and situations very quickly.

You also avoid emotional judgments, tending to think about things from many angles.

The more those around you are confused, the more you keep your composure and try to find the best option.

On the other hand, since you see more than others, you may overthink and grow tired.

At times, you need time to stop searching for answers and rest your heart.`,
        love: `In love, your wish to deeply understand your partner is strong.

You rarely fall in love by looks or momentum alone; you're drawn by getting to know their values and character.

You're also sensitive to your partner's small changes, able to notice feelings left unspoken.

On the other hand, you may overthink your partner's true feelings or analyze love too much.

Even when you're actually liked, you may grow too cautious out of anxiety.

Love can't be measured by analysis alone.

At times, by believing in the sense of your heart, a new door will open.`,
        work: `The talent of the silver aura lies in

"the power to see through to the essence."

・Research
・Analysis
・Writer
・Editor
・Consultant
・Psychology-related work
・Data analysis
・Education

and other work that uses observation and thinking suits you well.

You're not fooled by surface information and try to seek the essence of things.

That wisdom should become a precious signpost for many people.`,
        letter: `Silver light is proof of wisdom and insight.

You see a little more than others.

That's exactly why you may carry worries and discomfort others can't understand.

Yet that sensibility is by no means a flaw.

What you noticed, what you sensed, holds meaning.

Please believe in your intuition and wisdom.

And don't forget that it's okay not to try to understand everything.

Just as moonlight quietly illuminates the night, your wisdom, too, illuminates many people's paths.

Lumina, the White Witch ✨`,
      },
    },
    black: {
      name: "Black Aura",
      theme: "Transformation · Resolve · Solitude",
      reading: {
        overview: `The light enfolding you is a quiet black aura, reminiscent of the abyss of night.

People with a black aura are beings who hold the power of transformation, resolve, and solitude.

You don't turn your eyes from the reality many try to avoid, or from your own weakness.

You hold the strength to walk your own road while accepting not only light but shadow too.

At times you're hard to understand and may feel lonely.

But that solitude is not something that weakens you — it's time to nurture true strength.

Your light is a light of transformation that presides over endings and beginnings.`,
        personality: `With a black aura, you are a very strong-willed person.

Rarely swept along by those around you, you cherish your own values and convictions.

You also tend to seek a relationship where you can face each other honestly, over surface ties.

So even if you don't have many friends, you cherish bonds with those connected by deep ties.

You also hold the power to see the back side of things.

You notice problems and contradictions no one else notices, and try to see through to the essence.

On the other hand, you may become too hard on yourself and others.

Rather than trying to carry everything alone, relying on people at times matters.`,
        love: `In love, you are a very cautious type.

You rarely fall for someone easily, showing your true self only to someone you feel you can truly trust.

You're also not very drawn to surface kindness or games.

Since you value a partner's essence and sincerity, love may take time to begin.

But to someone you've once loved, you pour very deep affection.

However, since you're not good at showing your weakness, you may carry your solitude alone.

To someone you can truly trust, try opening your heart little by little.

That courage will lead to a deeper bond.`,
        work: `The talent of the black aura lies in

"the power to give birth to change."

・Entrepreneur
・Research
・Author
・Psychology-related work
・Consultant
・Strategic planning
・Artist
・Divination / spiritual work

and other work that gives birth to new value, unbound by existing common sense, suits you well.

You are someone born not to walk the same road as others, but to carve open a road all your own.

That viewpoint and resolve are a special talent many do not have.`,
        letter: `Black light is proof of ending and rebirth.

Many people seek the light.

Yet true growth is born from knowing the shadow.

In your life, you may have faced more conflict and trials than others.

That's exactly why you know people's weakness, and your own.

That experience is by no means wasted.

For only those who know the dark can understand the preciousness of true light.

Please, do not fear solitude.

The road you have walked will, in time, become a light that guides someone.

And that black light is not an ending, but a light that announces the beginning of a new future.

Lumina, the White Witch ✨`,
      },
    },
    gold: {
      name: "Gold Aura",
      theme: "Charisma · Mission · Success",
      reading: {
        overview: `The light enfolding you is a gold aura, shining powerfully like the sun.

People with a gold aura are beings blessed with charisma, a sense of mission, and luck for success.

You hold a charm that naturally draws people, influencing those around you without even noticing.

It's not just standing out — hiding a strong will to "achieve something" and "create a better future" is also a trait.

Your light is the light of the sun, guiding many people forward.`,
        personality: `With a gold aura, you are a very aspiring person.

Rather than being satisfied with the present, you tend to think of growing further.

You also hold your own ideals and goals, with the power to keep striving toward them.

Others often see you as "reliable" and "a person of presence."

You have the power to bring people together and are often entrusted with a leadership role.

On the other hand, imposing high standards on yourself, you may try too hard.

Aiming for success matters, but at times you also need time to let the tension leave your shoulders and care for yourself.`,
        love: `In love, you're the type drawn to someone you can respect.

Not just the feeling of liking, you seek a relationship where you can think "I want to grow together with this person."

You also have a strong power to support your partner, able to cheer on a loved one's dreams and goals.

On the other hand, you may prioritize work or goals over love.

So your partner may sometimes ask you to "lean on them more" or "show your true feelings."

A truly strong person is not someone who can try hard alone, but someone who can trust others.

In love too, the courage to show weakness leads to happiness.`,
        work: `The talent of the gold aura lies in

"the power to guide people and produce results."

・Business owner
・Entrepreneur
・Management
・Producer
・Politics / public administration
・Consultant
・Sales
・Influencer

and other work that moves many people or takes on big goals suits you well.

You are not merely a hard worker.

You hold the power to turn goals into reality.

That talent will greatly change not only your own future, but the future of those around you.`,
        letter: `Gold light is proof of a mission.

Your soul was born to achieve something in this world.

That's exactly why you hold higher ideals than others, and may become hard on yourself at times.

But please don't forget.

Success is not about beating someone.

It's walking a life you can truly accept in your heart.

The light that guides people is also a light that illuminates yourself.

Please don't rush — advance at your own stride.

Beyond it await a mission and radiance all your own.

And that gold light will deliver courage and hope to many people.

Lumina, the White Witch ✨`,
      },
    },
    rainbow: {
      name: "Rainbow Aura",
      theme: "Awakening · Multifaceted · Change",
      reading: {
        overview: `The light enfolding you is a special rainbow aura, radiating a seven-colored brilliance.

The rainbow aura is a very rare secret aura.

It holds diverse possibility and the power of change that cannot be expressed by a single color alone.

The passion of red, the sincerity of blue, the intuition of purple, the sense of mission of gold.

You are a being who grows while holding the color needed for each phase of life.

You don't fit into a set mold.

You are a soul that updates itself many times throughout life, reborn into a new self.

Your light is a miraculous light symbolizing change and awakening.`,
        personality: `With a rainbow aura, you are a very adaptable person.

No matter what environment you're placed in, you can grow to fit the situation.

Since you hold multifaceted charm, different people may have completely different impressions of you.

To some, a gentle healer.

To some, a challenger with drive.

And to some, a mysterious seeker.

These are not an act.

All of them are the real you.

On the other hand, you may sometimes feel "I don't know my true self."

That's not hesitation, but proof that your soul isn't fixed into a single form.

A rainbow is beautiful precisely because it's not one color, but seven.`,
        love: `In love, you hold a very mysterious charm.

Even without being aware of it, you have a power that draws people in.

And since the expression you show changes with the partner, you're often thought of as "a type I've never met before."

What you seek in love also changes easily with life's phases —

at times you seek security,

at times you seek stimulation,

and at times you seek a connection of souls.

So you may experience several precious encounters throughout life.

However, take care not to lose yourself by accommodating your partner too much.

Your charm is not in changing, but in being able to change in your own way.`,
        work: `The talent of the rainbow aura lies in

"the power to widen possibilities."

・Creator
・Entrepreneur
・Education
・Counselor
・Planning roles
・Marketing
・Entertainment industry
・Freelance

and other work not bound to a single frame suits you well.

You don't fear changes in environment.

Rather, it's within change that you show your talent.

You're also excellent at connecting person to person, value to value.

The very road you've walked will go on giving birth to new possibilities.`,
        letter: `Rainbow light is proof of awakening.

Your soul was not born to fulfill only one role.

That's exactly why you've experienced great turning points and mysterious encounters throughout life.

At times it may feel like a detour.

Yet all of it has meaning.

The passion of red.

The sincerity of blue.

The intuition of purple.

The mission of gold.

Within you, many lights are sleeping.

Please don't try to "become only one of them."

You are a rainbow.

While holding all seven colors of light, shine in your own way.

That very existence will become a miracle that delivers hope to someone.

Lumina, the White Witch ✨`,
      },
    },
  },
  ko: {
    red: {
      name: "빨강 오라",
      theme: "열정・행동력・도전",
      reading: {
        overview: `당신을 감싸는 빛은, 타오르는 불꽃 같은 빨강 오라.

빨강 오라를 지닌 사람은, 열정과 행동력이 넘치는 도전자입니다.

「해 보고 싶다」고 생각한 순간에 움직일 수 있는 힘을 지녔고, 남보다 한 걸음 앞서 나아갈 용기가 있습니다.

가만히 기다리기보다, 자신의 손으로 미래를 개척해 가는 타입.

그 에너지는 주위에도 전해져, 많은 사람을 움직이는 원동력이 됩니다.`,
        personality: `빨강 오라를 지닌 당신은, 매우 올곧은 사람입니다.

좋아하는 것에는 전력.
하기로 정한 일에는 진심.

그 자세는 때로 고집스럽게 보이기도 하지만, 그것은 당신이 자신의 신념을 소중히 한다는 증거입니다.

또한 어려운 상황에 강하여, 역경일수록 불타오르는 면도 있습니다.

누구도 도전하지 않는 길을 택해, 스스로 길을 개척해 가는 힘을 지니고 있습니다.

한편으로, 계속 달리는 데 몰두하여, 자신의 피로를 알아채지 못하기도 합니다.

때로는 멈춰 서서, 마음을 쉬게 하는 것도 중요합니다.`,
        love: `연애에서도 정열적입니다.

좋아하게 된 상대에게는 적극적으로 마음을 전하고, 관계를 진전시키려 합니다.

밀당보다 직진.

애매한 관계보다, 분명한 관계를 원하는 타입입니다.

다만, 상대를 생각하는 나머지 열량이 조금 너무 높아지기도 합니다.

연애는 혼자 진행하는 것이 아니라, 둘이서 키워 가는 것.

상대의 페이스를 존중함으로써, 더 좋은 관계를 쌓을 수 있을 것입니다.`,
        work: `빨강 오라의 재능은,

「사람을 움직이는 힘」

에 있습니다.

・경영자
・영업직
・리더 직무
・이벤트 기획
・스포츠 관련
・창업가

등, 스스로 선두에 서는 일과 잘 맞을 것입니다.

주위가 망설일 때도 결단할 수 있는 강인함은, 당신의 큰 무기입니다.`,
        letter: `붉은 빛은, 영혼이 앞으로 나아가려 한다는 증거.

당신 안에는, 사람을 비추는 불꽃이 있습니다.

때로는 너무 강하다고 느낄 때도 있을 것입니다.

하지만, 그 열정이 있었기에 여기까지 걸어올 수 있었습니다.

부디 자신의 마음에 깃든 불을 두려워하지 마세요.

당신의 용기는, 누군가의 희망이 됩니다.

그리고 그 불꽃은, 미래를 개척하는 빛이 될 것입니다.

흰 마녀 루미나 ✨`,
      },
    },
    orange: {
      name: "주황 오라",
      theme: "사교성・밝음・즐거움",
      reading: {
        overview: `당신을 감싸는 빛은, 노을 진 하늘처럼 따뜻한 주황 오라.

주황 오라를 지닌 사람은, 사람과 사람을 잇는 밝은 태양 같은 존재입니다.

그 자리에 있는 것만으로 분위기를 누그러뜨리고, 자연스럽게 사람이 모여듭니다.

즐기는 재능을 지녀, 주위에 미소와 활기를 전하는 힘을 품고 있습니다.

인생을 너무 심각하게 생각하지 않고, 「우선 해 보자」며 긍정적으로 나아가는 것도 당신의 매력입니다.`,
        personality: `주황 오라를 지닌 당신은, 매우 친근한 사람입니다.

누구와도 자연스럽게 대화할 수 있고, 사람의 좋은 점을 찾아내는 데 능합니다.

처음 만나도 벽을 세우지 않아, 많은 사람에게 호감을 사기 쉬울 것입니다.

또한 호기심이 왕성하여, 새로운 경험을 즐기는 힘이 있습니다.

즐겁고 재미있는 것을 찾아내는 감각이 뛰어나, 지루함을 싫어하는 면도 있습니다.

다만 사람을 지나치게 우선하여, 자신의 본심을 뒤로 미루기도 합니다.

주위를 즐겁게 하는 것뿐 아니라, 자기 자신의 마음도 소중히 해 주세요.`,
        love: `연애에서는, 함께 있어 즐거운 관계를 원합니다.

친구처럼 웃을 수 있거나, 사소한 시간을 나눌 수 있는 것을 소중히 하는 타입입니다.

좋아하는 사람과는 자연스럽게 거리를 좁혀 가기에, 연애의 계기도 대화나 공통 취미에서 생기기 쉬울 것입니다.

또한 상대를 기쁘게 하는 것을 좋아하기에, 서프라이즈나 배려도 잘합니다.

한편으로, 즐거운 분위기를 깨고 싶지 않은 나머지, 진짜 고민이나 불안을 감추기도 합니다.

당신의 솔직한 마음을 전함으로써, 더 깊은 유대가 생길 것입니다.`,
        work: `주황 오라의 재능은,

「사람을 미소 짓게 하는 힘」

에 있습니다.

・접객업
・영업직
・이벤트 기획
・홍보・SNS 운영
・교육 관련
・엔터테인먼트 업계

등, 사람과 관계하는 일과 잘 맞을 것입니다.

당신의 밝음은 주위 분위기를 바꾸는 힘을 지니고 있습니다.

사람이 모이는 곳에서야말로, 그 재능은 크게 빛날 것입니다.`,
        letter: `주황 빛은, 기쁨을 나누는 영혼의 색.

당신은 알아채지 못할지도 모르지만, 그 미소에 구원받은 사람이 많이 있습니다.

사소한 한마디나 다정함이, 누군가에게 큰 버팀목이 되고 있는 것입니다.

부디 앞으로도, 당신다운 밝음을 잃지 마세요.

그리고 사람을 비추는 것뿐 아니라, 자기 자신도 행복하게 하는 것을 잊지 마세요.

당신의 빛은, 사람과 사람을 잇는 따뜻한 등불입니다.

흰 마녀 루미나 ✨`,
      },
    },
    yellow: {
      name: "노랑 오라",
      theme: "지성・호기심・발상력",
      reading: {
        overview: `당신을 감싸는 빛은, 아침 해를 떠올리게 하는 빛을 지닌 노랑 오라.

노랑 오라를 지닌 사람은, 지성과 호기심을 타고난 탐구자입니다.

새로운 지식이나 발견에 마음이 설레고, 「왜?」 「어째서?」를 소중히 하며 세계를 바라봅니다.

사물을 다각도로 생각하는 힘이 있어, 사람이 알아채지 못하는 가능성이나 아이디어를 찾아내는 데 능합니다.

당신의 빛은, 미래를 향한 힌트를 찾아내는 지혜의 빛입니다.`,
        personality: `노랑 오라를 지닌 당신은, 매우 호기심이 왕성한 사람입니다.

흥미를 가진 것에는 몰두하여, 납득할 때까지 알아보고 배우는 경향이 있습니다.

지식을 모으는 것뿐 아니라, 그것들을 조합해 새로운 발상을 만들어 내는 힘도 지니고 있습니다.

또한 두뇌 회전이 빨라, 대화 중에도 자연스럽게 독특한 관점을 보일 수 있을 것입니다.

한편으로, 생각하는 것을 좋아하는 나머지, 행동하기 전에 너무 고민하기도 합니다.

때로는 완벽한 답을 기다리지 않고, 한 걸음 내디뎌 보는 것도 중요합니다.`,
        love: `연애에서는, 외모나 기세보다 「대화가 맞는가」를 중시합니다.

함께 있어 배움과 발견이 있고, 지적인 자극을 주는 상대에게 끌리기 쉬울 것입니다.

좋아하는 사람이 생기면, 그 사람을 깊이 알고 싶어집니다.

상대의 사고방식이나 가치관에 흥미를 가지고, 차분히 관계를 키워 가는 타입입니다.

다만 감정을 너무 분석하여, 자신의 마음을 솔직하게 표현하는 것이 서툰 면도 있습니다.

연애는 이치만으로 잴 수 없고, 마음으로 느끼는 것이기도 합니다.

때로는 생각하기 전에, 솔직한 마음을 전해 보세요.`,
        work: `노랑 오라의 재능은,

「발견하고, 형태로 만드는 힘」

에 있습니다.

・연구직
・교육 관련
・작가
・기획직
・디자이너
・마케팅
・IT・기술직

등, 지식이나 발상력을 살릴 수 있는 일과 잘 맞을 것입니다.

당신의 아이디어는, 많은 사람이 놓치고 있는 가능성을 찾아냅니다.

계속 배움으로써, 그 재능은 더욱 크게 꽃필 것입니다.`,
        letter: `노란 빛은, 지혜와 호기심의 증거.

당신의 마음에는, 세계를 더 알고 싶다는 순수한 바람이 깃들어 있습니다.

남보다 돌아가는 길을 택하는 일이 있을지도 모릅니다.

하지만, 그 우회 속에서 얻은 지식과 경험은, 언젠가 당신만의 보물이 됩니다.

부디 의문을 갖기를 멈추지 마세요.

그리고 자신의 영감을 믿으세요.

당신이 찾아낸 빛은, 미래를 비추는 새로운 가능성이 될 것입니다.

흰 마녀 루미나 ✨`,
      },
    },
    green: {
      name: "초록 오라",
      theme: "치유・조화・다정함",
      reading: {
        overview: `당신을 감싸는 빛은, 숲을 스치는 바람처럼 온화한 초록 오라.

초록 오라를 지닌 사람은, 치유와 조화의 힘을 지닌 존재입니다.

다툼을 좋아하지 않고, 사람과 사람 사이에 서서 다리를 놓는 일을 자연스럽게 할 수 있습니다.

당신의 주위에 있는 사람은, 신기하게도 안심을 느낍니다.

그것은, 당신의 영혼이 지닌 다정함과 포용력이 말 이상으로 전해지기 때문입니다.

당신의 빛은, 사람의 마음을 살며시 가라앉히는 안식의 빛입니다.`,
        personality: `초록 오라를 지닌 당신은, 매우 배려심이 깊은 사람입니다.

상대의 마음을 헤아리는 힘이 뛰어나, 곤란한 사람을 보면 그냥 두지 못합니다.

또한 감정에 휩쓸리지 않고, 주위 전체의 균형을 생각할 수 있습니다.

그래서 많은 사람에게 신뢰받고, 상담 상대가 되는 일도 많을 것입니다.

한편으로, 사람을 지나치게 우선하여, 자신의 마음을 뒤로 미루기도 합니다.

다정한 사람일수록, 자기 자신에게도 다정할 필요가 있습니다.

때로는 「무리예요」라고 말하는 용기도, 자신을 지키는 소중한 힘이 될 것입니다.`,
        love: `연애에서는, 안심할 수 있는 관계를 무엇보다 소중히 합니다.

자극적인 사랑보다, 함께 있어 마음이 차분해지는 상대에게 끌릴 것입니다.

좋아하게 된 사람에게는 성실하게 마주하며, 오래 관계를 키워 가는 타입입니다.

또한 상대의 행복을 바라는 마음이 강하여, 자연스럽게 받쳐 주는 쪽이 되는 일도 적지 않습니다.

다만, 지나치게 헌신하는 경향에는 주의가 필요합니다.

연애는 받쳐 주기만 하는 것이 아니라, 서로 받쳐 주는 것.

당신 자신도 사랑받아도 좋은 존재임을 잊지 마세요.`,
        work: `초록 오라의 재능은,

「사람을 치유하고, 안심시키는 힘」

에 있습니다.

・의료・복지 관련
・카운슬러
・교육 관련
・접객업
・보육 교사
・세러피스트
・동물이나 자연과 관계하는 일

등, 사람의 마음이나 생활을 받치는 일과 잘 맞을 것입니다.

당신의 존재 자체가, 사람에게 안심을 줍니다.

그 다정함은, 많은 사람에게 둘도 없는 가치가 될 것입니다.`,
        letter: `초록 빛은, 치유와 조화의 증거.

당신은 자기도 모르게, 많은 사람의 마음을 받치고 있습니다.

그 다정함은 특별한 재능입니다.

하지만, 당신이 지쳐 버리면, 그 빛도 약해져 버립니다.

부디 때로는 쉬세요.

누군가를 치유하기 위해, 자신을 희생할 필요는 없습니다.

당신 자신이 온화하고 채워져 있을 때, 그 빛은 가장 아름답게 빛납니다.

당신의 다정함은, 이 세계에 필요한 빛입니다.

흰 마녀 루미나 ✨`,
      },
    },
    lightblue: {
      name: "하늘색 오라",
      theme: "자유・유연성・순수함",
      reading: {
        overview: `당신을 감싸는 빛은, 끝없이 펼쳐지는 하늘이나 바다 같은 하늘색 오라.

하늘색 오라를 지닌 사람은, 자유로운 발상과 유연한 마음을 지닌 존재입니다.

상식이나 고정관념에 얽매이지 않고, 자기다운 삶의 방식을 소중히 합니다.

변화를 두려워하지 않고, 새로운 환경이나 가치관을 자연스럽게 받아들일 수 있을 것입니다.

당신의 빛은, 바람처럼 가볍고, 가능성으로 가득한 미래로 사람을 인도하는 빛입니다.`,
        personality: `하늘색 오라를 지닌 당신은, 매우 자유로운 마음의 소유자입니다.

호기심이 왕성하여, 새로운 것이나 미지의 세계에 강하게 끌립니다.

하나의 사고방식에 집착하지 않고, 상황에 따라 유연하게 생각을 바꿀 수 있어, 많은 사람에게 「시야가 넓은 사람」이라 여겨질 것입니다.

또한 사람의 차이를 받아들이는 데 능하여, 다양한 가치관에 이해를 보일 수 있는 것도 당신의 매력입니다.

한편으로, 자유를 너무 소중히 하는 나머지, 같은 곳에 계속 머무는 것에 답답함을 느끼기도 합니다.

때로는 「계속하는 것」의 가치에도 눈을 돌림으로써, 더욱 큰 성장을 손에 넣을 수 있을 것입니다.`,
        love: `연애에서는, 구속이 적은 자연스러운 관계를 원합니다.

하루 종일 함께 있는 것보다, 서로의 시간이나 가치관을 존중할 수 있는 관계에 안심을 느낄 것입니다.

좋아하는 사람과는 친구 같은 거리감에서 연애로 발전하는 일도 적지 않습니다.

또한 상대의 개성을 존중하기에, 함께 있어 편하다고 느껴지는 일이 많을 것입니다.

다만, 자유를 소중히 하는 나머지, 마음을 전할 타이밍을 놓치기도 합니다.

정말 소중한 사람에게는, 당신의 마음을 말로 표현하는 용기도 필요합니다.`,
        work: `하늘색 오라의 재능은,

「새로운 가능성을 찾아내는 힘」

에 있습니다.

・여행・관광업
・크리에이터
・작가
・디자이너
・SNS 운영
・프리랜서
・국제 관계 일

등, 자유로운 발상이나 유연한 대응력을 살릴 수 있는 일과 잘 맞을 것입니다.

정해진 틀 안에서만 사는 것보다, 자기다움을 발휘할 수 있는 환경에서 크게 빛나는 타입입니다.

당신의 발상은, 많은 사람에게 새로운 풍경을 보여 줄 것입니다.`,
        letter: `하늘색 빛은, 자유로운 영혼의 증거.

당신은 누군가와 같은 길을 걷기 위해 태어난 것이 아닙니다.

당신에게는, 당신만의 하늘이 있습니다.

때로는 주위에서 「차분함이 없다」는 말을 들을지도 모릅니다.

하지만, 그것은 당신의 영혼이 성장과 변화를 원하기 때문입니다.

부디 자기다움을 잃지 마세요.

바람이 세계를 도는 것처럼, 당신 또한 많은 가능성과 만날 것입니다.

그 자유로운 마음이야말로, 당신을 빛나게 하는 최대의 힘입니다.

흰 마녀 루미나 ✨`,
      },
    },
    blue: {
      name: "파랑 오라",
      theme: "성실・냉정・신뢰",
      reading: {
        overview: `당신을 감싸는 빛은, 맑게 갠 밤하늘처럼 고요하고 아름다운 파랑 오라.

파랑 오라를 지닌 사람은, 성실함과 냉정함을 겸비한 신뢰의 사람입니다.

감정에 휩쓸리지 않고 사물을 바라보아, 주위에서 의지하는 존재가 되는 일이 많을 것입니다.

화려하게 튀는 타입은 아니지만, 그 안정감과 책임감은 많은 사람에게 안심을 줍니다.

당신의 빛은, 사람들의 마음을 가라앉히는 신뢰의 빛입니다.`,
        personality: `파랑 오라를 지닌 당신은, 매우 성실하고 진실한 사람입니다.

약속을 지키고, 자신의 말과 행동에 책임을 지려 합니다.

또한 감정적이 되기 전에 상황을 정리하고, 냉정하게 판단하는 힘을 지니고 있습니다.

주위에서는 「착실한 사람」 「신뢰할 수 있는 사람」이라 여기는 일이 많을 것입니다.

한편으로, 자신에게도 엄격하기에, 실패나 약함을 보이는 것을 어려워하는 경향이 있습니다.

책임감이 강한 사람일수록, 혼자 떠안기 쉬운 법.

때로는 누군가에게 기대는 것도, 결코 약함이 아닙니다.`,
        love: `연애에서는, 신뢰 관계를 무엇보다 소중히 합니다.

일시적인 들뜸보다, 오래 안심하고 함께 있을 수 있는 관계를 원하는 타입입니다.

좋아하게 된 상대에게는 성실하게 마주하며, 거짓이나 밀당을 좋아하지 않습니다.

그래서 연애가 시작되기까지 조금 시간이 걸리기도 하지만, 한 번 마음을 연 상대에게는 깊은 애정을 쏟습니다.

다만, 감정을 겉으로 드러내는 것이 능숙하지 않기에, 「무슨 생각을 하는지 모르겠다」고 여겨지기도 합니다.

진짜 마음은, 생각보다 더 말로 전하는 편이 좋습니다.

당신의 다정함은, 제대로 전해져야 비로소 상대의 마음에 닿습니다.`,
        work: `파랑 오라의 재능은,

「신뢰를 쌓아 가는 힘」

에 있습니다.

・공무원
・교사
・사무직
・의료 관련
・엔지니어
・회계・경리
・법무 관련

등, 정확함이나 책임감이 요구되는 일과 잘 맞을 것입니다.

당신은 화려한 성공보다, 착실한 쌓임으로 큰 성과를 만들어 내는 타입입니다.

주위가 안심하고 맡길 수 있는 존재로서, 많은 곳에서 필요로 할 것입니다.`,
        letter: `파란 빛은, 신뢰와 성실함의 증거.

당신은 눈에 띄지 않아도, 많은 사람에게 신뢰받고 있습니다.

그것은 하루 만에 손에 넣을 수 있는 것이 아닙니다.

당신이 쌓아 온 다정함과 책임감이, 지금의 빛을 만들어 내고 있는 것입니다.

하지만, 언제나 강하려 하지 않아도 괜찮습니다.

누군가를 받치는 사람에게도, 받침이 필요할 때가 있습니다.

부디 혼자 떠안지 말고, 때로는 마음을 쉬게 하세요.

당신의 파란 빛은, 고요하면서도 많은 사람의 길잡이가 되고 있습니다.

흰 마녀 루미나 ✨`,
      },
    },
    purple: {
      name: "보라 오라",
      theme: "직감・신비・정신성",
      reading: {
        overview: `당신을 감싸는 빛은, 밤하늘에 빛나는 달처럼 신비로운 보라 오라.

보라 오라를 지닌 사람은, 날카로운 직감과 깊은 정신성을 지닌 존재입니다.

눈에 보이는 것뿐 아니라, 그 안쪽에 있는 본질이나 의미를 느끼는 힘이 있습니다.

사람의 감정이나 자리의 분위기를 민감하게 감지하여, 「왠지 그렇게 느꼈다」가 맞는 일도 적지 않습니다.

당신의 빛은, 아직 보지 못한 진실로 인도하는 신비의 빛입니다.`,
        personality: `보라 오라를 지닌 당신은, 매우 감수성이 풍부한 사람입니다.

표면적인 대화나 관계보다, 마음과 마음이 통하는 깊은 이어짐을 원합니다.

또한 혼자 생각하는 시간을 소중히 하며, 자기 자신의 내면과 마주하는 것을 자연스럽게 합니다.

주위에서는 조금 신비로운 사람, 독특한 감성을 지닌 사람이라 여기기도 할 것입니다.

하지만, 그 독자적인 시점이야말로 당신의 매력입니다.

한편으로, 사람의 감정을 너무 받아들이거나, 너무 골똘히 생각하여 지쳐 버리기도 합니다.

때로는 현실적인 시점을 가지고, 자신의 마음을 지키는 것도 중요합니다.`,
        love: `연애에서는, 영혼의 이어짐을 원하는 경향이 있습니다.

조건이나 외모뿐 아니라, 「이 사람과는 뭔가 인연이 있는 것 같다」는 감각을 소중히 할 것입니다.

좋아하게 되는 상대도, 가치관이나 정신성에 공명할 수 있는 사람이 많을 것입니다.

또한 한 번 마음을 허락한 상대에게는 매우 깊은 애정을 쏟습니다.

다만, 이상이 너무 높아지거나, 상대의 본심을 너무 생각하여, 스스로 연애를 복잡하게 만들기도 합니다.

때로는 직감뿐 아니라, 눈앞의 현실을 보는 것도 중요합니다.

정말 소중한 인연은, 무리하게 좇지 않아도 자연스럽게 자라 갈 것입니다.`,
        work: `보라 오라의 재능은,

「본질을 꿰뚫어 보는 힘」

에 있습니다.

・카운슬러
・점술가
・세러피스트
・심리학 관련
・작가
・예술가
・연구직

등, 사람의 마음이나 보이지 않는 가치를 다루는 일과 잘 맞을 것입니다.

당신은 표면적인 정보만으로는 알아챌 수 없는 것을 느낄 수 있습니다.

그 감성은, 많은 사람에게 새로운 깨달음을 주는 힘이 될 것입니다.`,
        letter: `보라 빛은, 영혼의 깊이를 나타내는 증거.

당신은 남보다 조금, 보이지 않는 것에 민감합니다.

그렇기에, 사람에게 이해받기 어려운 고독을 느낄 때도 있을 것입니다.

하지만, 그 감성은 결코 틀린 것이 아닙니다.

당신이 느낀 다정함도, 위화감도, 영감도.

모두 영혼으로부터의 소중한 메시지입니다.

부디 자신의 직감을 믿으세요.

그리고, 현실 세계를 사는 자기 자신도 소중히 해 주세요.

신비와 현실 모두를 받아들였을 때, 당신의 빛은 더욱 아름답게 빛나기 시작할 것입니다.

흰 마녀 루미나 ✨`,
      },
    },
    pink: {
      name: "분홍 오라",
      theme: "애정・공감・배려",
      reading: {
        overview: `당신을 감싸는 빛은, 봄의 꽃잎처럼 다정하고 따뜻한 분홍 오라.

분홍 오라를 지닌 사람은, 애정・공감・배려가 넘치는 존재입니다.

사람의 기쁨을 자기 일처럼 기뻐하고, 사람의 슬픔에도 자연스럽게 다가설 수 있습니다.

그 다정함은 결코 약함이 아닙니다.

오히려, 사람의 마음을 이해하려는 강함의 표현입니다.

당신의 빛은, 상처받은 마음을 다정하게 감싸 안는 사랑의 빛입니다.`,
        personality: `분홍 오라를 지닌 당신은, 매우 마음씨 고운 사람입니다.

사람과의 이어짐을 소중히 하고, 주위 사람이 미소 지을 수 있는 것에 행복을 느낍니다.

또한 상대의 마음을 헤아리는 힘이 뛰어나, 말이 되지 않은 감정도 알아챌 수 있을 것입니다.

그래서 많은 사람에게 상담을 받거나, 의지받는 일도 적지 않습니다.

한편으로, 사람의 마음을 지나치게 우선하는 나머지, 자신의 본심을 억눌러 버리기도 합니다.

다정함이란, 자신을 희생하는 것이 아닙니다.

우선 자신의 마음을 채우는 것도, 소중한 사랑의 형태입니다.`,
        love: `연애에서는, 깊은 애정과 마음의 이어짐을 원합니다.

좋아하는 사람에게는 매우 한결같고, 상대의 행복을 진심으로 바랄 것입니다.

또한 연인을 받치거나 격려하는 것을 자연스럽게 할 수 있어, 함께 있으면 안심을 주는 존재가 됩니다.

상대의 작은 변화도 알아채기 쉬워, 세심하게 배려할 수 있는 것도 당신의 매력입니다.

다만, 애정이 깊은 만큼, 상대에게 너무 맞춰 버리기도 합니다.

정말 좋은 관계란, 어느 한쪽이 참는 것이 아닙니다.

당신 자신의 마음도 소중히 하면서 사랑을 키워 가는 것이, 행복으로 가는 지름길이 될 것입니다.`,
        work: `분홍 오라의 재능은,

「사람의 마음을 따뜻하게 하는 힘」

에 있습니다.

・카운슬러
・보육 교사
・간호사
・복지 관련
・접객업
・교육 관련
・세러피스트

등, 사람과 깊이 관계하는 일과 잘 맞을 것입니다.

당신의 배려는, 사람에게 안심과 희망을 줍니다.

누군가를 받치는 일 속에서, 그 재능은 특히 크게 빛날 것입니다.`,
        letter: `분홍 빛은, 사랑의 증거.

당신은 사람을 사랑할 줄 아는 사람입니다.

그렇기에, 누군가의 슬픔에 마음 아파하거나, 자신보다 상대를 우선하기도 할 것입니다.

하지만, 잊지 마세요.

당신이 누군가를 소중히 여기듯, 당신 자신도 소중히 여겨져야 할 존재입니다.

사랑이란 주기만 하는 것이 아니라, 받는 것이기도 합니다.

부디 자신의 마음에도 다정하게 대해 주세요.

당신의 애정은, 많은 사람을 구하는 힘을 지니고 있습니다.

그리고 그 따뜻한 빛은, 앞으로도 많은 사람의 마음을 계속 비출 것입니다.

흰 마녀 루미나 ✨`,
      },
    },
    white: {
      name: "하양 오라",
      theme: "정화・희망・인도",
      reading: {
        overview: `당신을 감싸는 빛은, 아침 이슬에 스며드는 빛처럼 맑은 하양 오라.

하양 오라를 지닌 사람은, 정화・희망・인도의 힘을 지닌 존재입니다.

어떤 상황에서도 빛을 찾으려 하고, 사람의 마음에 희망을 전할 수 있습니다.

강하게 주장하는 타입은 아니지만, 그 존재 자체가 주위에 안심을 줍니다.

또한 사물을 공평하게 바라보는 힘이 있어, 사람이나 상황에 대해 편견을 갖지 않는 순수함도 지니고 있습니다.

당신의 빛은, 미혹 속에 있는 사람을 비추는 이정표의 빛입니다.`,
        personality: `하양 오라를 지닌 당신은, 매우 성실하고 올곧은 사람입니다.

사람을 상처 입히는 것을 좋아하지 않고, 될 수 있는 한 다정하고자 바랍니다.

또한 곤란한 사람을 보면 자연스럽게 손을 내밀 수 있을 것입니다.

그 다정함은 계산이 아니라, 당신의 본질에서 우러나는 것입니다.

한편으로, 이상을 소중히 하는 나머지, 자기 자신에게 엄격해지기도 합니다.

「더 노력해야 해」
「더 좋은 사람이어야 해」

그렇게 생각해 버리기도 할 것입니다.

하지만, 완벽할 필요는 없습니다.

당신은 지금 그대로도 충분히 가치 있는 존재입니다.`,
        love: `연애에서는, 마음의 이어짐을 무엇보다 소중히 합니다.

밀당이나 계산보다, 성실한 관계를 원하는 타입입니다.

좋아하는 사람에게는 진심으로 대하며, 상대의 행복을 바라는 마음이 강할 것입니다.

또한 상대의 장점뿐 아니라 단점도 받아들이려는 포용력이 있습니다.

그래서 함께 있으면 안심할 수 있는 존재로 사랑받는 일이 많을 것입니다.

다만, 상대를 지나치게 우선하여 자신의 마음을 참아 버리기도 합니다.

연애는 주기만 하는 것이 아니라, 받는 것도 중요합니다.

당신 자신도 소중히 여겨져도 좋은 존재임을 잊지 마세요.`,
        work: `하양 오라의 재능은,

「사람을 인도하고, 받치는 힘」

에 있습니다.

・교육 관련
・의료・복지 관련
・카운슬러
・세러피스트
・코치
・접객업
・자원봉사 활동

등, 사람의 성장이나 행복에 관계하는 일과 잘 맞을 것입니다.

당신은 사람의 가능성을 믿을 수 있습니다.

그 힘은, 누군가가 앞을 향하는 계기가 될 것입니다.`,
        letter: `하얀 빛은, 희망의 증거.

당신은 자기도 모르게, 많은 사람의 마음을 비추고 있습니다.

특별한 일을 하고 있다고 생각하지 않아도, 당신의 말과 다정함에 구원받은 사람이 있습니다.

하지만, 빛을 주는 사람일수록, 자신의 마음의 피로를 알아채지 못할 때가 있습니다.

부디 잊지 마세요.

당신 자신 또한, 지켜지고 치유받아야 할 존재입니다.

억지로 강하려 하지 않아도 괜찮습니다.

헤맬 때는, 자신의 마음이 향하는 빛을 믿으세요.

당신 안에 있는 희망의 등불은, 결코 꺼지지 않습니다.

그리고 그 빛은, 앞으로도 누군가의 미래를 다정하게 계속 비출 것입니다.

흰 마녀 루미나 ✨`,
      },
    },
    silver: {
      name: "은빛 오라",
      theme: "통찰・지혜・관찰력",
      reading: {
        overview: `당신을 감싸는 빛은, 달빛처럼 고요히 빛나는 은빛 오라.

은빛 오라를 지닌 사람은, 날카로운 통찰력과 깊은 지혜를 갖춘 관찰자입니다.

사람이 놓쳐 버리는 작은 변화나, 본심 안쪽에 있는 감정을 자연스럽게 느낄 수 있습니다.

감정에 휩쓸리지 않고 사물을 객관적으로 바라보는 힘이 있어, 주위에서는 「냉정한 사람」 「사물을 잘 보는 사람」이라 여기는 일도 많을 것입니다.

당신의 빛은, 진실을 비춰 내는 지혜의 빛입니다.`,
        personality: `은빛 오라를 지닌 당신은, 매우 관찰력이 뛰어난 사람입니다.

사람의 말뿐 아니라, 표정이나 태도, 분위기에서 많은 정보를 받아들이고 있습니다.

그래서 인간관계나 상황의 변화를 재빨리 알아챌 수 있을 것입니다.

또한 감정적인 판단을 피하고, 사물을 다각도로 생각하는 경향이 있습니다.

주위가 혼란스러울수록 냉정함을 유지하며, 최선의 선택지를 찾으려 합니다.

한편으로, 남보다 많은 것이 보이기에, 너무 생각하여 지쳐 버리기도 합니다.

때로는 답을 찾는 것을 멈추고, 마음을 쉬게 하는 시간도 필요합니다.`,
        love: `연애에서는, 상대를 깊이 이해하고 싶은 마음이 강한 타입입니다.

외모나 기세만으로 사랑에 빠지는 일은 적고, 그 사람의 가치관이나 인품을 알아 가며 끌립니다.

또한 상대의 작은 변화에도 민감하여, 말로 표현되지 않은 마음도 알아챌 수 있을 것입니다.

그 반면, 상대의 본심을 너무 생각하거나, 연애를 너무 분석하기도 합니다.

사실은 호감을 받고 있는데도, 불안에서 너무 신중해지기도 할 것입니다.

연애는 분석만으로 잴 수 없는 것.

때로는 마음의 감각을 믿음으로써, 새로운 문이 열릴 것입니다.`,
        work: `은빛 오라의 재능은,

「본질을 꿰뚫어 보는 힘」

에 있습니다.

・연구직
・분석직
・작가
・편집자
・컨설턴트
・심리학 관련
・데이터 분석
・교육 관련

등, 관찰력이나 사고력을 살릴 수 있는 일과 잘 맞을 것입니다.

당신은 표면적인 정보에 현혹되지 않고, 사물의 본질을 탐구하려 합니다.

그 지혜는, 많은 사람에게 귀중한 길잡이가 될 것입니다.`,
        letter: `은빛 빛은, 지혜와 통찰의 증거.

당신은 남보다 조금, 많은 것을 보고 있습니다.

그렇기에, 사람은 모르는 고민이나 위화감을 안기도 할 것입니다.

하지만, 그 감성은 결코 결점이 아닙니다.

당신이 알아챈 것, 느낀 것에는 의미가 있습니다.

부디 자신의 직감과 지혜를 믿으세요.

그리고, 모든 것을 이해하려 하지 않아도 괜찮다는 것도 잊지 마세요.

달빛이 고요히 밤을 비추듯, 당신의 지혜 또한, 많은 사람의 길을 비추고 있습니다.

흰 마녀 루미나 ✨`,
      },
    },
    black: {
      name: "검정 오라",
      theme: "변혁・각오・고고함",
      reading: {
        overview: `당신을 감싸는 빛은, 밤의 심연을 떠올리게 하는 고요한 검정 오라.

검정 오라를 지닌 사람은, 변혁・각오・고고함의 힘을 지닌 존재입니다.

많은 사람이 피하려는 현실이나, 자기 자신의 약함에서 눈을 돌리지 않습니다.

빛뿐 아니라 그림자도 받아들이며, 자신의 길을 걸어가는 강인함을 지니고 있습니다.

때로는 이해받기 어려워, 고독을 느낄 때도 있을 것입니다.

하지만, 그 고독은 당신을 약하게 하는 것이 아니라, 진정한 강함을 길러 내기 위한 시간입니다.

당신의 빛은, 끝과 시작을 주관하는 변혁의 빛입니다.`,
        personality: `검정 오라를 지닌 당신은, 매우 의지가 강한 사람입니다.

주위에 휩쓸리는 일이 적고, 자기 나름의 가치관과 신념을 소중히 합니다.

또한 표면적인 사귐보다, 본심으로 마주할 수 있는 관계를 원하는 경향이 있습니다.

그래서 친구는 많지 않아도, 깊은 유대로 맺어진 사람과의 인연을 소중히 할 것입니다.

당신은 사물의 이면을 보는 힘도 지니고 있습니다.

누구도 알아채지 못하는 문제나 모순을 알아채고, 본질을 꿰뚫어 보려 합니다.

한편으로, 자신에게도 남에게도 너무 엄격해지기도 합니다.

모든 것을 혼자 짊어지려 하지 말고, 때로는 사람을 의지하는 것도 중요합니다.`,
        love: `연애에서는, 매우 신중한 타입입니다.

쉽게 사람을 좋아하는 일은 적고, 진심으로 신뢰할 수 있다고 느낀 상대에게만 진짜 자신을 보입니다.

또한 표면적인 다정함이나 밀당에는 그다지 끌리지 않습니다.

상대의 본질이나 성실함을 중시하기에, 연애가 시작되기까지 시간이 걸리기도 할 것입니다.

하지만, 한 번 사랑한 상대에게는 매우 깊은 애정을 쏟습니다.

다만, 자신의 약함을 보이는 것이 서툴기에, 고독을 떠안아 버리기도 합니다.

정말 신뢰할 수 있는 사람에게는, 조금씩 마음을 열어 보세요.

그 용기가, 더 깊은 유대로 이어질 것입니다.`,
        work: `검정 오라의 재능은,

「변화를 만들어 내는 힘」

에 있습니다.

・창업가
・연구직
・작가
・심리학 관련
・컨설턴트
・전략 기획
・예술가
・점술・정신세계와 관계하는 일

등, 기존의 상식에 얽매이지 않고, 새로운 가치를 만들어 내는 일과 잘 맞을 것입니다.

당신은 사람과 같은 길을 걷기 위해서가 아니라, 자신만의 길을 개척하기 위해 태어난 사람입니다.

그 시점과 각오는, 많은 사람이 갖지 못한 특별한 재능입니다.`,
        letter: `검은 빛은, 끝과 재생의 증거.

많은 사람은 빛을 구합니다.

하지만, 진정한 성장은 그림자를 앎으로써 태어납니다.

당신은 인생 속에서, 남보다 많은 갈등과 시련과 마주해 왔을지도 모릅니다.

그렇기에, 사람의 약함도, 자신의 약함도 알고 있습니다.

그 경험은 결코 헛되지 않습니다.

어둠을 아는 사람만이, 진정한 빛의 소중함을 이해할 수 있기 때문입니다.

부디 고독을 두려워하지 마세요.

당신이 걸어온 길은, 머지않아 누군가를 인도하는 빛이 됩니다.

그리고 그 검은 빛은, 끝이 아니라, 새로운 미래의 시작을 알리는 빛입니다.

흰 마녀 루미나 ✨`,
      },
    },
    gold: {
      name: "금빛 오라",
      theme: "카리스마・사명・성공",
      reading: {
        overview: `당신을 감싸는 빛은, 태양처럼 힘차게 빛나는 금빛 오라.

금빛 오라를 지닌 사람은, 카리스마・사명감・성공운을 타고난 존재입니다.

자연스럽게 사람을 끌어당기는 매력을 지녀, 자기도 모르는 사이에 주위에 영향을 주고 있습니다.

단순히 눈에 띄는 것뿐 아니라, 「무언가를 이루고 싶다」 「더 나은 미래를 만들고 싶다」는 강한 의지를 품고 있는 것도 특징입니다.

당신의 빛은, 많은 사람을 앞으로 인도하는 태양의 빛입니다.`,
        personality: `금빛 오라를 지닌 당신은, 매우 향상심이 강한 사람입니다.

현재에 만족하기보다, 더욱 성장하려 생각하는 경향이 있습니다.

또한 자신의 이상이나 목표를 가지고, 그것을 향해 노력을 계속하는 힘이 있습니다.

주위에서는 「믿음직한 사람」 「존재감 있는 사람」이라 여기는 일도 많을 것입니다.

당신에게는 사람을 아우르는 힘이 있어, 리더 역할을 맡는 일도 적지 않습니다.

한편으로, 자신에게 높은 기준을 부과하여, 너무 애써 버리기도 합니다.

성공을 목표로 하는 것도 중요하지만, 때로는 어깨의 힘을 빼고, 자신을 보살피는 시간도 필요합니다.`,
        love: `연애에서는, 존경할 수 있는 상대에게 끌리는 타입입니다.

그저 좋아한다는 감정뿐 아니라, 「이 사람과 함께 성장하고 싶다」고 생각할 수 있는 관계를 원합니다.

또한 상대를 받치는 힘도 강하여, 소중한 사람의 꿈이나 목표를 응원할 수 있을 것입니다.

한편으로, 연애보다 일이나 목표를 우선해 버리기도 합니다.

그래서 상대에게서 「더 기대 줬으면」 「본심을 보여 줬으면」이라는 말을 들을지도 모릅니다.

정말 강한 사람이란, 혼자 애쓸 수 있는 사람이 아니라, 사람을 신뢰할 수 있는 사람입니다.

연애에서도, 약함을 보이는 용기가 행복으로 이어질 것입니다.`,
        work: `금빛 오라의 재능은,

「사람을 인도하고, 성과를 만들어 내는 힘」

에 있습니다.

・경영자
・창업가
・관리직
・프로듀서
・정치・행정 관련
・컨설턴트
・영업직
・인플루언서

등, 많은 사람을 움직이거나, 큰 목표에 도전하는 일과 잘 맞을 것입니다.

당신은 단순한 노력가가 아닙니다.

목표를 현실로 바꾸는 힘을 지니고 있습니다.

그 재능은, 자신뿐 아니라 주위의 미래도 크게 바꿔 갈 것입니다.`,
        letter: `금빛 빛은, 사명의 증거.

당신의 영혼은, 이 세계에서 무언가를 이루기 위해 태어났습니다.

그렇기에, 남보다 높은 이상을 가지고, 때로는 자신에게 엄격해지는 것입니다.

하지만, 잊지 마세요.

성공이란, 누군가를 이기는 것이 아닙니다.

당신 자신이 진심으로 납득할 수 있는 인생을 걷는 것입니다.

사람을 인도하는 빛은, 자기 자신을 비추는 빛이기도 합니다.

부디 서두르지 말고, 당신의 보폭으로 나아가세요.

그 앞에는, 당신만의 사명과 빛남이 기다리고 있습니다.

그리고 그 금빛 빛은, 많은 사람에게 용기와 희망을 전할 것입니다.

흰 마녀 루미나 ✨`,
      },
    },
    rainbow: {
      name: "무지개 오라",
      theme: "각성・다채・변화",
      reading: {
        overview: `당신을 감싸는 빛은, 일곱 빛깔의 광채를 발하는 특별한 무지개 오라.

무지개 오라는 매우 드문 시크릿 오라입니다.

하나의 색만으로는 표현할 수 없는, 다채로운 가능성과 변화의 힘을 지니고 있습니다.

빨강의 열정, 파랑의 성실함, 보라의 직감, 금의 사명감.

그때그때의 인생에 따라 필요한 색을 품으며 성장해 가는 존재입니다.

당신은 정해진 틀에 들어가지 않습니다.

인생 속에서 몇 번이고 자신을 갱신하며, 새로운 자신으로 다시 태어나는 영혼입니다.

당신의 빛은, 변화와 각성을 상징하는 기적의 빛입니다.`,
        personality: `무지개 오라를 지닌 당신은, 매우 적응력이 높은 사람입니다.

어떤 환경에 놓여도, 그 자리에 맞춰 성장할 수 있습니다.

또한 다면적인 매력을 지녔기에, 사람에 따라 전혀 다른 인상을 갖게 되기도 할 것입니다.

어떤 사람에게는 다정한 치유자.

어떤 사람에게는 행동력 있는 도전자.

또 어떤 사람에게는 신비로운 탐구자.

그것들은 연기가 아닙니다.

모두가 진짜 당신입니다.

한편으로, 스스로도 「진짜 나를 모르겠다」고 느낄 때가 있습니다.

그것은 망설임이 아니라, 당신의 영혼이 하나의 형태에 고정되어 있지 않다는 증거.

무지개는 한 색이 아니라, 일곱 색이기에 아름다운 것입니다.`,
        love: `연애에서는, 매우 신기한 매력을 지니고 있습니다.

스스로는 의식하지 않아도, 사람을 끌어당기는 힘이 있을 것입니다.

또한 상대에 따라 보이는 표정이 달라지기에, 「지금까지 만난 적 없는 타입」이라 여겨지는 일도 적지 않습니다.

연애에 바라는 것도 인생의 시기에 따라 변하기 쉬워,

어떤 때는 안심감을 원하고,

어떤 때는 자극을 원하며,

또 어떤 때는 영혼의 이어짐을 원합니다.

그래서 인생 속에서 여러 소중한 만남을 경험하기도 할 것입니다.

다만, 상대에게 너무 맞춰 자신을 잃지 않도록 주의가 필요합니다.

당신의 매력은 변하는 것이 아니라, 자기답게 변할 수 있다는 것입니다.`,
        work: `무지개 오라의 재능은,

「가능성을 넓히는 힘」

에 있습니다.

・크리에이터
・창업가
・교육 관련
・카운슬러
・기획직
・마케팅
・엔터테인먼트 업계
・프리랜서

등, 하나의 틀에 얽매이지 않는 일과 잘 맞을 것입니다.

당신은 환경의 변화를 두려워하지 않습니다.

오히려 변화 속에서야말로 재능을 발휘합니다.

또한 사람과 사람, 가치관과 가치관을 잇는 힘도 뛰어납니다.

당신이 걸어온 길 그 자체가, 새로운 가능성을 만들어 갈 것입니다.`,
        letter: `무지개 빛은, 각성의 증거.

당신의 영혼은, 하나의 역할만을 다하기 위해 태어난 것이 아닙니다.

그렇기에 인생 속에서, 큰 전환점이나 신기한 만남을 경험해 왔을 것입니다.

때로는 돌아가는 것처럼 느껴질 때도 있을지 모릅니다.

하지만, 그 모든 것에 의미가 있습니다.

빨강의 열정도.

파랑의 성실함도.

보라의 직감도.

금의 사명도.

당신 안에는, 수많은 빛이 잠들어 있습니다.

부디 「어느 하나가 되려」 하지 마세요.

당신은 무지개입니다.

일곱 빛깔의 빛을 품은 채, 자기답게 빛나 주세요.

그 존재 자체가, 누군가에게 희망을 전하는 기적이 될 것입니다.

흰 마녀 루미나 ✨`,
      },
    },
  },
  "zh-TW": {
    red: {
      name: "紅色氣場",
      theme: "熱情・行動力・挑戰",
      reading: {
        overview: `包覆你的光，是如燃燒火焰般的紅色氣場。

擁有紅色氣場的人，是洋溢熱情與行動力的挑戰者。

擁有在「想試試看」的瞬間便能行動之力，懷有比他人先邁出一步的勇氣。

比起靜靜等待，你更是憑自身之手開拓未來的類型。

那份能量也會傳遞給周遭，成為撼動許多人的原動力。`,
        personality: `擁有紅色氣場的你，是非常率直的人。

對喜歡的事物全力以赴。
對決定要做的事認真以待。

那份姿態有時被視為固執，但那正是你珍視自身信念的證明。

你也在困境中堅強，懷有愈是逆境愈燃燒的一面。

擁有選擇無人挑戰之路、親手開拓道路的力量。

另一方面，沉迷於不斷奔跑，可能會察覺不到自己的疲累。

偶爾停下腳步、讓心休息，也很重要。`,
        love: `在戀愛中也很熱情。

對喜歡上的對象會積極傳達心意，想推進關係。

比起拉鋸，更為直球。

是比起曖昧關係，更想要明確關係的類型。

只是，因太在乎對方，熱度有時會稍微過高。

戀愛並非一人推進，而是兩人一同培育。

藉由尊重對方的步調，能築起更好的關係。`,
        work: `紅色氣場的才能，在於

「撼動人心的力量」。

・經營者
・業務
・領導職
・活動企劃
・運動相關
・創業家

等，由自己站在最前線的工作與你十分契合。

在周遭猶豫時也能決斷的堅強，是你的一大武器。`,
        letter: `紅色之光，是靈魂試圖前行的證明。

在你之中，有一團照亮他人的火焰。

有時或許會覺得它太過強烈。

然而，正因有那份熱情，你才能走到這裡。

請別害怕你心中棲息的火。

你的勇氣，會成為某人的希望。

而那團火焰，將化為開拓未來的光。

白之魔女露米娜 ✨`,
      },
    },
    orange: {
      name: "橙色氣場",
      theme: "社交性・開朗・歡樂",
      reading: {
        overview: `包覆你的光，是如黃昏天空般溫暖的橙色氣場。

擁有橙色氣場的人，是連結人與人、如明亮太陽般的存在。

光是在場便能緩和氣氛，人們自然地聚集而來。

懷有享受的才能，藏著為周遭帶來笑容與活力的力量。

不把人生想得太嚴肅，以「先試試看吧」正向前行，也是你的魅力。`,
        personality: `擁有橙色氣場的你，是非常容易親近的人。

能與任何人自然交談，擅長找出他人的優點。

即使初次見面也不築起隔閡，容易受到許多人喜愛。

你也好奇心旺盛，擁有享受新體驗的力量。

對找出歡樂與有趣之事的感覺出眾，也有厭惡無聊的一面。

只是，因太以他人為先，可能把自己的真心往後擺。

不只逗樂周遭，也請珍惜你自己的心。`,
        love: `在戀愛中，追求在一起很開心的關係。

是珍視能像朋友般歡笑、能共享平凡時光的類型。

由於會自然地與喜歡的人拉近距離，戀愛的契機也常從交談或共同興趣中萌生。

你也喜歡逗對方開心，因此擅長驚喜與體貼。

另一方面，因不想破壞歡樂的氣氛，可能會藏起真正的煩惱與不安。

藉由傳達你坦率的心情，會生出更深的羈絆。`,
        work: `橙色氣場的才能，在於

「讓人露出笑容的力量」。

・接待業
・業務
・活動企劃
・公關・社群經營
・教育相關
・娛樂產業

等，與人互動的工作和你十分契合。

你的開朗，擁有改變周遭氛圍的力量。

正是在人群聚集之處，那份才能將大放異彩。`,
        letter: `橙色之光，是分享喜悅之靈魂的顏色。

你或許沒有察覺，但有許多人被那笑容所拯救。

不經意的一句話或溫柔，正成為某人莫大的支柱。

請今後也別失去屬於你的開朗。

並且別忘了，不只照亮他人，也要讓自己幸福。

你的光，是連結人與人的溫暖燈火。

白之魔女露米娜 ✨`,
      },
    },
    yellow: {
      name: "黃色氣場",
      theme: "知性・好奇心・發想力",
      reading: {
        overview: `包覆你的光，是擁有令人聯想晨曦之輝的黃色氣場。

擁有黃色氣場的人，是天生具備知性與好奇心的探究者。

對新知與發現感到雀躍，珍視著「為什麼？」「怎麼會？」凝望世界。

擁有多角度思考事物的力量，擅長找出他人未察覺的可能與點子。

你的光，是找出通往未來提示的智慧之光。`,
        personality: `擁有黃色氣場的你，是非常好奇心旺盛的人。

對感興趣之事會全心投入，傾向查到、學到滿意為止。

不只蒐集知識，也擁有將它們組合、催生新發想的力量。

而且思緒敏捷，在交談中也能自然展現獨特的觀點。

另一方面，因太愛思考，行動前可能會煩惱過多。

偶爾不等待完美的答案、先邁出一步，也很重要。`,
        love: `在戀愛中，比起外貌或氣勢，更重視「談話是否投機」。

容易受能帶來學習與發現、給予知性刺激的對象吸引。

喜歡上某人時，會想深入了解那個人。

是會對對方的思考方式與價值觀感興趣、慢慢培育關係的類型。

只是，因太過分析情感，有不擅長坦率表達自己心情的一面。

戀愛不能只用道理衡量，也是用心去感受的。

偶爾在思考之前，先把率直的心情傳達出去吧。`,
        work: `黃色氣場的才能，在於

「發現並化為形體的力量」。

・研究職
・教育相關
・作家
・企劃職
・設計師
・行銷
・IT・技術職

等，能活用知識與發想力的工作和你十分契合。

你的點子，能找出許多人忽略的可能。

藉由持續學習，那份才能將綻放得更加盛大。`,
        letter: `黃色之光，是智慧與好奇心的證明。

在你心中，棲息著想更了解世界的純粹心願。

你或許有時會選擇看似繞遠路的道路。

然而，在那段繞路中所獲得的知識與經驗，終將成為只屬於你的寶物。

請別停止懷抱疑問。

並請相信你的靈光。

你所找到的光，將成為照亮未來的新可能。

白之魔女露米娜 ✨`,
      },
    },
    green: {
      name: "綠色氣場",
      theme: "療癒・和諧・溫柔",
      reading: {
        overview: `包覆你的光，是如吹過森林之風般平穩的綠色氣場。

擁有綠色氣場的人，是懷有療癒與和諧之力的存在。

不喜爭鬥，能自然地站在人與人之間搭起橋梁。

在你身旁的人，會不可思議地感到安心。

那是因為，你的靈魂所懷的溫柔與包容，超越言語地傳達了出去。

你的光，是輕輕撫平人心的安寧之光。`,
        personality: `擁有綠色氣場的你，是非常有同理心的人。

擅長體察對方的心情，看到陷入困境的人便無法坐視不理。

而且不被情緒沖昏，能顧及周遭整體的平衡。

因此受許多人信賴，常成為人們傾訴的對象。

另一方面，因太以他人為先，可能把自己的心情往後擺。

愈溫柔的人，愈需要對自己也溫柔。

偶爾，說出「我做不到」的勇氣，也會成為守護自己的重要力量。`,
        love: `在戀愛中，比什麼都珍視能令人安心的關係。

比起刺激的戀情，你更受存在能讓你心安之人吸引。

對喜歡上的人會真誠相待，是長久培育關係的類型。

而且盼望對方幸福之心強烈，常自然地成為支持的一方。

只是，要當心過度付出的傾向。

戀愛不只是支撐，而是相互扶持。

請別忘了，你自己也是值得被愛的存在。`,
        work: `綠色氣場的才能，在於

「療癒並安撫人心的力量」。

・醫療・社福相關
・諮商師
・教育相關
・接待業
・幼教老師
・治療師
・與動物或自然相關的工作

等，支撐他人身心與生活的工作和你十分契合。

你的存在本身，便給予人安心。

那份溫柔，將成為許多人無可取代的價值。`,
        letter: `綠色之光，是療癒與和諧的證明。

你在不知不覺間，支撐著許多人的心。

那份溫柔是特別的才能。

然而，若你疲憊耗盡，那道光也會變弱。

請偶爾好好休息。

為了療癒某人，無須犧牲自己。

當你自身平穩而充盈時，那道光會綻放得最美。

你的溫柔，是這世界所需要的光。

白之魔女露米娜 ✨`,
      },
    },
    lightblue: {
      name: "水藍色氣場",
      theme: "自由・柔軟・純粹",
      reading: {
        overview: `包覆你的光，是如無垠延展的天空與大海般的水藍色氣場。

擁有水藍色氣場的人，是懷有自由發想與柔軟之心的存在。

不被常識或既定觀念束縛，珍視忠於自我的生活方式。

不畏改變，能自然地接納新的環境與價值觀。

你的光，是如風般輕盈、引領人通往充滿可能之未來的光。`,
        personality: `擁有水藍色氣場的你，是擁有非常自由之心的人。

好奇心旺盛，強烈受到新事物與未知世界的吸引。

不執著於單一思考方式，能依情況靈活轉換想法，因此常被許多人視為「視野寬廣的人」。

你也擅長接納他人的不同，能對多元價值觀展現理解，這也是你的魅力。

另一方面，因太珍視自由，可能會對持續停留在同一處感到拘束。

偶爾把目光也投向「持續」的價值，便能獲得更大的成長。`,
        love: `在戀愛中，追求束縛較少的自然關係。

比起時時刻刻在一起，你更在能尊重彼此時間與價值觀的關係中感到安心。

與喜歡的人常從朋友般的距離發展為戀愛。

而且因你尊重對方的個性，常讓人覺得與你相處很自在。

只是，因珍視自由，可能會錯過傳達心意的時機。

對真正重要的人，你也需要把心意化為言語的勇氣。`,
        work: `水藍色氣場的才能，在於

「找出新可能的力量」。

・旅遊・觀光業
・創作者
・作家
・設計師
・社群經營
・自由工作者
・國際相關工作

等，能活用自由發想與柔軟應變力的工作和你十分契合。

比起只活在既定的框架中，你更是在能發揮自我之環境中大放異彩的類型。

你的發想，將為許多人展現嶄新的風景。`,
        letter: `水藍色之光，是自由靈魂的證明。

你並非為了與誰走相同的路而生。

你擁有只屬於你的天空。

有時或許會被周遭說「靜不下來」。

然而，那是因為你的靈魂渴求成長與改變。

請別失去忠於自我的本色。

正如風巡遊世界，你也將與許多可能相遇。

那份自由的心，正是讓你閃耀的最大力量。

白之魔女露米娜 ✨`,
      },
    },
    blue: {
      name: "藍色氣場",
      theme: "誠懇・冷靜・信賴",
      reading: {
        overview: `包覆你的光，是如澄澈夜空般靜謐而美麗的藍色氣場。

擁有藍色氣場的人，是兼具誠懇與冷靜的信賴之人。

不被情緒沖昏地凝視事物，常成為周遭倚靠的存在。

雖非華麗出風頭的類型，但那份穩定與責任感，給予許多人安心。

你的光，是撫平人心的信賴之光。`,
        personality: `擁有藍色氣場的你，是非常認真而誠懇的人。

守住約定，想對自己的言行負起責任。

而且在情緒化之前，懷有梳理狀況、冷靜判斷的力量。

常被周遭視為「可靠的人」「值得信賴的人」。

另一方面，因對自己也嚴格，有不擅長展現失敗或脆弱的傾向。

責任感愈強的人，愈容易獨自承擔。

偶爾依靠某人，絕非軟弱。`,
        love: `在戀愛中，比什麼都珍視信賴關係。

比起一時的熱烈，你更是追求能長久安心相伴之關係的類型。

對喜歡上的對象真誠相待，不喜歡謊言與拉鋸。

因此戀愛開始前或許需要一些時間，但對一旦敞開心扉的對象，會傾注深刻的愛。

只是，因不擅長把情感表露於外，可能被認為「猜不透你在想什麼」。

真正的心意，比你想像的更該用言語傳達。

你的溫柔，唯有確實傳達，才能抵達對方的心。`,
        work: `藍色氣場的才能，在於

「累積信賴的力量」。

・公務員
・教師
・行政職
・醫療相關
・工程師
・會計・財務
・法務相關

等，要求精確與責任感的工作和你十分契合。

你是比起華麗的成功，更以踏實累積創造重大成果的類型。

作為周遭能安心託付的存在，你將在許多地方被需要。`,
        letter: `藍色之光，是信賴與誠懇的證明。

你即使不起眼，也受許多人信賴。

那並非一日就能得到的。

你所累積的溫柔與責任感，正孕育出此刻的光。

但是，你不必總是堅強。

支撐他人的人，也有需要被支撐的時候。

請別獨自承擔，偶爾讓心休息。

你的藍色之光，雖然靜謐，卻已成為許多人的路標。

白之魔女露米娜 ✨`,
      },
    },
    purple: {
      name: "紫色氣場",
      theme: "直覺・神秘・精神性",
      reading: {
        overview: `包覆你的光，是如夜空中閃耀之月般神秘的紫色氣場。

擁有紫色氣場的人，是懷有敏銳直覺與深邃精神性的存在。

不只感知肉眼可見之物，更擁有感受其背後本質與意義的力量。

敏銳察覺他人的情緒與場合的氛圍，「不知為何就這麼覺得」也常常命中。

你的光，是引向未見之真實的神秘之光。`,
        personality: `擁有紫色氣場的你，是非常感受力豐富的人。

比起表面的交談或關係，你更追求心與心相通的深刻連結。

你也珍視獨自思考的時光，自然地面對自己的內在。

周遭有時會覺得你是有點神秘、擁有獨特感性的人。

但那獨到的視角，正是你的魅力。

另一方面，可能因太過接收他人的情緒、或想得太深而感到疲憊。

偶爾懷有現實的視角、守護自己的心，也很重要。`,
        love: `在戀愛中，傾向於追求靈魂的連結。

不只是條件或外貌，你更珍視「總覺得和這個人有某種緣分」的感覺。

你會喜歡上的對象，多半是能在價值觀與精神性上共鳴的人。

而且對一旦交心的對象，會傾注非常深刻的愛。

只是，可能因理想過高、或太過揣想對方的真心，而自己把戀愛複雜化。

偶爾，不只憑直覺，也看看眼前的現實，很重要。

真正重要的緣分，即使不勉強追逐，也會自然地滋長。`,
        work: `紫色氣場的才能，在於

「看穿本質的力量」。

・諮商師
・占卜師
・治療師
・心理學相關
・作家
・藝術家
・研究職

等，處理人心或無形價值的工作和你十分契合。

你能感受到僅憑表面資訊無法察覺之物。

那份感性，將成為帶給許多人新領悟的力量。`,
        letter: `紫色之光，是顯示靈魂深度的證明。

你比他人稍微，更能敏銳感受看不見之物。

正因如此，有時也會懷有他人難以理解的孤獨。

然而，那份感性絕非錯誤。

你所感受到的溫柔、違和感、靈光——

全都是來自靈魂的珍貴訊息。

請相信你的直覺。

並且，也珍惜生活在現實世界的你自己。

當你同時接納神秘與現實時，你的光便會開始綻放得更加美麗。

白之魔女露米娜 ✨`,
      },
    },
    pink: {
      name: "粉紅色氣場",
      theme: "愛・共鳴・體貼",
      reading: {
        overview: `包覆你的光，是如春日花瓣般溫柔而溫暖的粉紅色氣場。

擁有粉紅色氣場的人，是洋溢愛、共鳴與體貼的存在。

把他人的喜悅當作自己的喜悅，也能自然地貼近他人的悲傷。

那份溫柔絕非軟弱。

反而是想理解人心之堅強的展現。

你的光，是溫柔包覆受傷之心的愛之光。`,
        personality: `擁有粉紅色氣場的你，是非常善良的人。

珍視與人的連結，因周遭的人能展露笑容而感到幸福。

你也擅長體察對方的心情，能察覺化不成言語的情感。

因此常被許多人傾訴、倚靠。

另一方面，因太以他人的心情為先，可能會壓抑自己的真心。

溫柔，並非犧牲自己。

先讓自己的心充盈，也是珍貴的愛的形式。`,
        love: `在戀愛中，追求深刻的愛與心靈的連結。

對喜歡的人非常專一，真心盼望對方的幸福。

而且能自然地支持、鼓勵戀人，成為相處時給予安心的存在。

容易察覺對方細微的變化，能細膩體貼也是你的魅力。

只是，愛得愈深，可能愈會過度配合對方。

真正美好的關係，並非由某一方忍耐。

一邊珍惜你自己的心、一邊培育愛，便是通往幸福的捷徑。`,
        work: `粉紅色氣場的才能，在於

「溫暖人心的力量」。

・諮商師
・幼教老師
・護理師
・社福相關
・接待業
・教育相關
・治療師

等，與人深入互動的工作和你十分契合。

你的體貼，給予人安心與希望。

在支撐某人的工作中，那份才能將格外閃耀。`,
        letter: `粉紅色之光，是愛的證明。

你是懂得愛人的人。

正因如此，可能會為某人的悲傷而心痛，或把對方擺在自己之前。

但請別忘了。

正如你珍惜某人，你自己也是該被珍惜的存在。

愛不只是給予，也是接受。

請也對你自己的心溫柔。

你的愛，擁有拯救許多人的力量。

而那道溫暖的光，今後也將持續照亮許多人的心。

白之魔女露米娜 ✨`,
      },
    },
    white: {
      name: "白色氣場",
      theme: "淨化・希望・引導",
      reading: {
        overview: `包覆你的光，是如照進晨露之光般清澈的白色氣場。

擁有白色氣場的人，是懷有淨化、希望與引導之力的存在。

無論何種處境都試圖尋找光，能為人心送上希望。

雖非強勢主張的類型，但你的存在本身便給予周遭安心。

你也擁有公平看待事物的力量，懷有對人或情境不抱偏見的純粹。

你的光，是照亮迷惘中之人的路標之光。`,
        personality: `擁有白色氣場的你，是非常誠懇而率直的人。

不喜歡傷害他人，盼望盡可能溫柔。

看到陷入困境的人，也能自然地伸出援手。

那份溫柔並非算計，而是源自你本質的東西。

另一方面，因太珍視理想，可能會對自己嚴格。

「我得更努力」
「我得做更好的人」

你或許會這樣想。

但是，你不必完美。

你即使保持現在的模樣，也是充分有價值的存在。`,
        love: `在戀愛中，比什麼都珍視心靈的連結。

是比起拉鋸或算計、更追求真誠關係的類型。

對喜歡的人以真心相待，盼望對方幸福之心強烈。

你也擁有不只接納對方優點、也接納其缺點的包容力。

因此常以令人安心的存在被愛。

只是，因太以對方為先，可能會忍住自己的心情。

戀愛不只是給予，接受也很重要。

請別忘了，你自己也是值得被珍惜的存在。`,
        work: `白色氣場的才能，在於

「引導並支撐人的力量」。

・教育相關
・醫療・社福相關
・諮商師
・治療師
・教練
・接待業
・志工活動

等，與他人成長或幸福相關的工作和你十分契合。

你能相信他人的可能。

那份力量，將成為某人重新面向前方的契機。`,
        letter: `白色之光，是希望的證明。

你在不知不覺間，照亮著許多人的心。

即使你不認為自己做了什麼特別的事，也有人被你的話語與溫柔所拯救。

然而，給予光的人，往往察覺不到自己內心的疲憊。

請別忘了。

你自己，也是該被守護、被療癒的存在。

不必勉強逞強。

迷惘時，請相信你內心所朝向的光。

你心中那盞希望的燈火，絕不會熄滅。

而那道光，今後也將溫柔地持續照亮某人的未來。

白之魔女露米娜 ✨`,
      },
    },
    silver: {
      name: "銀色氣場",
      theme: "洞察・智慧・觀察力",
      reading: {
        overview: `包覆你的光，是如月光般靜靜閃耀的銀色氣場。

擁有銀色氣場的人，是具備敏銳洞察力與深邃智慧的觀察者。

能自然地感受到他人忽略的微小變化，以及真心背後的情感。

擁有不被情緒沖昏、客觀凝視事物的力量，常被周遭視為「冷靜的人」「把事情看得很清楚的人」。

你的光，是照映真實的智慧之光。`,
        personality: `擁有銀色氣場的你，是觀察力非常出眾的人。

不只從他人的話語，也從表情、態度與氣氛中接收許多資訊。

因此能很快察覺人際關係與情境的變化。

你也避免情緒化的判斷，傾向多角度思考事物。

周遭愈是混亂，你愈保持冷靜，試圖找出最佳選項。

另一方面，因看得比他人多，可能會想得太多而疲憊。

偶爾停止尋找答案、讓心休息的時間，也很必要。`,
        love: `在戀愛中，是想深入理解對方之心強烈的類型。

鮮少只憑外貌或氣勢墜入愛河，而是透過認識對方的價值觀與人品而受吸引。

你也對對方的細微變化敏感，能察覺未說出口的心情。

另一方面，可能太過揣想對方的真心，或太過分析戀愛。

明明被對方喜歡著，卻可能因不安而過度謹慎。

戀愛無法只用分析衡量。

偶爾藉由相信內心的感覺，便會開啟新的門扉。`,
        work: `銀色氣場的才能，在於

「看穿本質的力量」。

・研究職
・分析職
・作家
・編輯
・顧問
・心理學相關
・資料分析
・教育相關

等，能活用觀察力與思考力的工作和你十分契合。

你不被表面資訊迷惑，試圖探究事物的本質。

那份智慧，將成為許多人寶貴的路標。`,
        letter: `銀色之光，是智慧與洞察的證明。

你比他人稍微，看見了更多東西。

正因如此，可能會懷有他人不解的煩惱與違和感。

然而，那份感性絕非缺點。

你所察覺到的、所感受到的，都有其意義。

請相信你的直覺與智慧。

並請別忘了，不必試圖理解一切也無妨。

正如月光靜靜照亮夜晚，你的智慧也照亮著許多人的路。

白之魔女露米娜 ✨`,
      },
    },
    black: {
      name: "黑色氣場",
      theme: "變革・覺悟・孤高",
      reading: {
        overview: `包覆你的光，是令人聯想夜之深淵般靜謐的黑色氣場。

擁有黑色氣場的人，是懷有變革、覺悟與孤高之力的存在。

不對許多人試圖迴避的現實、或自身的脆弱別開目光。

不只接納光、也接納影，懷有走自己之路的堅強。

有時難以被理解，也會感到孤獨。

然而，那份孤獨並非使你變弱，而是孕育真正堅強的時間。

你的光，是主宰終結與開端的變革之光。`,
        personality: `擁有黑色氣場的你，是意志非常堅強的人。

鮮少隨波逐流，珍視屬於自己的價值觀與信念。

你也傾向追求能以真心相對的關係，勝於表面的交往。

因此即使朋友不多，也珍惜與深厚羈絆相繫之人的緣分。

你也擁有看見事物背面的力量。

能察覺無人發現的問題與矛盾，試圖看穿本質。

另一方面，可能會對自己與他人都太過嚴格。

別試圖獨自扛起一切，偶爾依靠他人也很重要。`,
        love: `在戀愛中，是非常謹慎的類型。

鮮少輕易喜歡上某人，只對由衷感到能信賴的對象展現真實的自己。

你也不太受表面的溫柔或拉鋸吸引。

由於重視對方的本質與誠懇，戀愛開始前或許需要時間。

但對一旦愛上的對象，會傾注非常深刻的愛。

只是，因不擅長展現自己的脆弱，可能會獨自承擔孤獨。

對真正能信賴的人，請試著一點一點敞開心扉。

那份勇氣，將通往更深的羈絆。`,
        work: `黑色氣場的才能，在於

「催生變化的力量」。

・創業家
・研究職
・作家
・心理學相關
・顧問
・策略企劃
・藝術家
・與占術、精神世界相關的工作

等，不受既有常識束縛、催生新價值的工作和你十分契合。

你是為了開拓只屬於自己的道路、而非與他人走相同之路而生的人。

那份視角與覺悟，是許多人所不具備的特別才能。`,
        letter: `黑色之光，是終結與重生的證明。

許多人追求光。

然而，真正的成長，是藉由認識影而誕生。

你在人生中，或許面對了比他人更多的掙扎與試煉。

正因如此，你既知人的脆弱，也知自己的脆弱。

那份經驗絕非徒勞。

因為唯有知曉黑暗之人，才能理解真正之光的可貴。

請別害怕孤獨。

你所走過的路，終將成為引導某人的光。

而那道黑色之光，並非終結，而是宣告嶄新未來開端的光。

白之魔女露米娜 ✨`,
      },
    },
    gold: {
      name: "金色氣場",
      theme: "魅力・使命・成功",
      reading: {
        overview: `包覆你的光，是如太陽般強而有力地閃耀的金色氣場。

擁有金色氣場的人，是天生具備魅力、使命感與成功運的存在。

懷有自然吸引人的魅力，在自己未察覺間便影響著周遭。

不只是引人注目，藏著「想成就某事」「想創造更好的未來」之強烈意志，也是其特徵。

你的光，是引領眾人向前的太陽之光。`,
        personality: `擁有金色氣場的你，是非常有上進心的人。

比起滿足於現狀，傾向思考如何更進一步成長。

你也懷有自己的理想與目標，擁有朝其持續努力的力量。

常被周遭視為「可靠的人」「具存在感的人」。

你擁有凝聚眾人的力量，常被託付領導角色。

另一方面，因對自己課以高標準，可能會過度努力。

追求成功固然重要，但偶爾放鬆肩上的力量、體恤自己的時間，也很必要。`,
        love: `在戀愛中，是受能敬重之對象吸引的類型。

不只是喜歡的情感，更追求能讓你想「想與這個人一同成長」的關係。

你也擁有強大的支持對方之力，能為所愛之人的夢想與目標加油。

另一方面，可能會把工作或目標看得比戀愛更重。

因此對方或許會對你說「希望你多依賴我一點」「希望你展現真心」。

真正堅強的人，並非能獨自努力的人，而是能信賴他人的人。

在戀愛中，展現脆弱的勇氣，也將通往幸福。`,
        work: `金色氣場的才能，在於

「引導他人並創造成果的力量」。

・經營者
・創業家
・管理職
・製作人
・政治・行政相關
・顧問
・業務
・網紅

等，能撼動許多人、或挑戰宏大目標的工作和你十分契合。

你不只是個努力家。

你擁有把目標化為現實的力量。

那份才能，將大大改變的不只是自己、也包括周遭的未來。`,
        letter: `金色之光，是使命的證明。

你的靈魂，是為了在這世界成就某事而生。

正因如此，你懷有比他人更高的理想，有時也會對自己嚴格。

但請別忘了。

成功，並非戰勝某人。

而是走一條你自己由衷能信服的人生。

引導他人的光，也是照亮你自己的光。

請別焦急，以你自己的步幅前行。

在那之後，等待著只屬於你的使命與光輝。

而那道金色之光，將為許多人送上勇氣與希望。

白之魔女露米娜 ✨`,
      },
    },
    rainbow: {
      name: "彩虹氣場",
      theme: "覺醒・多彩・變化",
      reading: {
        overview: `包覆你的光，是綻放七彩光輝的特別彩虹氣場。

彩虹氣場是非常罕見的祕密氣場。

擁有無法以單一顏色表達的、多彩的可能與變化之力。

紅的熱情、藍的誠懇、紫的直覺、金的使命感。

你是依各個人生階段、懷著所需之色而成長的存在。

你不會被固定的框架所收束。

你是在人生中一次次更新自我、重生為嶄新自己的靈魂。

你的光，是象徵變化與覺醒的奇蹟之光。`,
        personality: `擁有彩虹氣場的你，是適應力非常高的人。

無論置身何種環境，都能配合當下而成長。

而且因擁有多面的魅力，不同的人可能對你有截然不同的印象。

對某些人，是溫柔的療癒者。

對某些人，是富行動力的挑戰者。

對某些人，又是神秘的探究者。

那些並非演技。

全都是真正的你。

另一方面，你自己有時也會覺得「不知道真正的我是誰」。

那並非迷惘，而是你的靈魂未被固定為單一形態的證明。

彩虹之所以美麗，正因它不是一色，而是七色。`,
        love: `在戀愛中，你擁有非常奇妙的魅力。

即使自己沒有意識到，也擁有吸引人的力量。

而且因展現的神情會因對象而變，常被認為「是至今不曾遇過的類型」。

你在戀愛中所追求的，也容易隨人生時期而變化——

有時追求安心感，

有時追求刺激，

有時又追求靈魂的連結。

因此你在人生中，可能會經歷數段重要的相遇。

只是，要當心別因太配合對方而迷失自己。

你的魅力並非在於改變，而在於能以忠於自我的方式改變。`,
        work: `彩虹氣場的才能，在於

「拓展可能的力量」。

・創作者
・創業家
・教育相關
・諮商師
・企劃職
・行銷
・娛樂產業
・自由工作者

等，不被單一框架束縛的工作和你十分契合。

你不畏環境的變化。

反而正是在變化之中，你才能發揮才能。

你也擅長連結人與人、價值觀與價值觀。

你所走過的路本身，將不斷催生新的可能。`,
        letter: `彩虹之光，是覺醒的證明。

你的靈魂，並非為了只扮演一種角色而生。

正因如此，你在人生中經歷了重大的轉機與奇妙的相遇。

有時或許會感覺像在繞遠路。

然而，那一切都有意義。

紅的熱情。

藍的誠懇。

紫的直覺。

金的使命。

在你之中，沉睡著許多光。

請別試圖「成為其中某一個」。

你是彩虹。

請懷抱著七彩之光，以忠於自我的方式閃耀。

那份存在本身，將成為為某人送上希望的奇蹟。

白之魔女露米娜 ✨`,
      },
    },
  },
};

/** 日本語の結果に指定言語のオーバーライドを合成（未訳は ja フォールバック）。 */
export function localizeAuraResult(base: AuraColor, lang: Lang): AuraColor {
  if (lang === "ja") return base;
  const ov = auraResultOverrides[lang]?.[base.id];
  if (!ov) return base;
  return {
    ...base,
    name: ov.name ?? base.name,
    theme: ov.theme ?? base.theme,
    reading: base.reading
      ? {
          overview: ov.reading?.overview ?? base.reading.overview,
          personality: ov.reading?.personality ?? base.reading.personality,
          love: ov.reading?.love ?? base.reading.love,
          work: ov.reading?.work ?? base.reading.work,
          letter: ov.reading?.letter ?? base.reading.letter,
        }
      : base.reading,
  };
}
