// 前世診断（/pastlife）の結果データ
// 通常12種類 + シークレット1種類（星の旅人）= 合計13種類。
// 結果文・画像は後から差し替えやすいよう、ここに分離して管理する。
//
// 画像は /public/images/pastlife/results/<id>.png を想定。
// 画像未実装時はクライアント側でプレースホルダー画像にフォールバックする。

export type PastLifeId =
  | "tragic_princess"
  | "loyal_knight"
  | "white_witch"
  | "light_priest"
  | "star_seer"
  | "alchemist"
  | "bard"
  | "forest_guardian"
  | "sea_priestess"
  | "wanderer"
  | "healer"
  | "dragon_contract"
  | "star_traveler";

/** 前世の物語（アコーディオンで展開する長文。現時点では仮テキスト「準備中」） */
export type PastLifeStory = {
  /** 第一章 前世の物語 */
  chapter1: string;
  /** 第二章 残された想い */
  chapter2: string;
  /** 第三章 今世への影響 */
  chapter3: string;
  /** 第四章 ルミナからのメッセージ */
  chapter4: string;
};

export type PastLifeResult = {
  id: PastLifeId;
  /** 結果タイトル（例: 悲劇の王女） */
  name: string;
  /** サブタイトル（タイトル直下の一言） */
  subtitle: string;
  /** 結果画像（/public からの絶対パス） */
  image: string;
  /**
   * 概要版。最初に表示するのはこの概要のみ（長文は出さない）。
   * 改行は \n で表現する。
   */
  overview: string;
  /** 今世に残る特徴 */
  traits: string;
  /** 魂の課題 */
  soulTask: string;
  /** ルミナからの一言 */
  luminaWord: string;
  /** 前世の物語（4章・アコーディオン展開） */
  story: PastLifeStory;
  /** シークレット結果か */
  secret?: boolean;
};

/** 画像未実装時のプレースホルダー */
export const PLACEHOLDER_IMAGE = "/images/pastlife/results/placeholder.svg";

const resultImage = (id: PastLifeId) => `/images/pastlife/results/${id}.png`;

// 仮テキスト。後から鑑定文を投入する。
const STORY_PLACEHOLDER: PastLifeStory = {
  chapter1: "準備中",
  chapter2: "準備中",
  chapter3: "準備中",
  chapter4: "準備中",
};

// === 13タイプ定義 ===
export const pastLifeResults: Record<PastLifeId, PastLifeResult> = {
  tragic_princess: {
    id: "tragic_princess",
    name: "悲劇の王女",
    subtitle: "愛と使命のあいだで揺れた魂",
    image: resultImage("tragic_princess"),
    overview:
      "あなたの前世は\n「悲劇の王女」。\n\n国の未来を背負いながらも\n身分違いの恋をした王女。\n\n最後は愛する人を守るため、\n自ら別れを選んだ魂です。",
    traits:
      "責任感が強く、自分よりも周りを優先してしまう優しさを今も持っています。\n本当の気持ちを押し殺してでも、大切な人を守ろうとするところがあるでしょう。",
    soulTask:
      "「自分の幸せを諦めないこと」。\n誰かのために生きるだけでなく、あなた自身の願いも大切にしてあげてください。",
    luminaWord:
      "あなたはもう、誰かのために我慢しなくていいのです。\n今世では、あなた自身の幸せを選んでいいのですよ。",
    story: STORY_PLACEHOLDER,
  },
  loyal_knight: {
    id: "loyal_knight",
    name: "忠義の騎士",
    subtitle: "守ると誓ったものを貫いた魂",
    image: resultImage("loyal_knight"),
    overview:
      "あなたの前世は\n「忠義の騎士」。\n\n大切な人と守るべきものを\n生涯かけて守り抜いた騎士。\n\n約束を違えることなく、\n誇りを貫いた魂です。",
    traits:
      "一度決めたことや大切な人への想いを、簡単には曲げません。\n誠実で、頼られると最後まで責任を果たそうとする強さがあります。",
    soulTask:
      "「肩の力を抜くこと」。\nすべてを背負い込まず、ときには誰かに頼ることも覚えていきましょう。",
    luminaWord:
      "あなたの忠義は、今もあなたの芯を支えています。\nでも、あなた自身も誰かに守られていいのです。",
    story: STORY_PLACEHOLDER,
  },
  white_witch: {
    id: "white_witch",
    name: "白き魔女",
    subtitle: "人知れず人々を癒した魂",
    image: resultImage("white_witch"),
    overview:
      "あなたの前世は\n「白き魔女」。\n\n森の奥で薬と祈りを扱い、\n人知れず人々を救った魔女。\n\n孤独を抱えながらも、\n優しさを手放さなかった魂です。",
    traits:
      "人の痛みに敏感で、困っている人を放っておけません。\n独自の感性や直感を持ち、ひとりの時間を大切にするところがあります。",
    soulTask:
      "「自分から心を開くこと」。\n与えるだけでなく、あなたの弱さも誰かに見せていいのです。",
    luminaWord:
      "あなたの優しさは、見返りを求めない本物の魔法です。\n今世では、あなたも誰かに甘えていいのですよ。",
    story: STORY_PLACEHOLDER,
  },
  light_priest: {
    id: "light_priest",
    name: "光の神官",
    subtitle: "祈りで人々を導いた魂",
    image: resultImage("light_priest"),
    overview:
      "あなたの前世は\n「光の神官」。\n\n神殿で祈りを捧げ、\n迷える人々の心を導いた神官。\n\n清らかな志を胸に、\n人々の希望であり続けた魂です。",
    traits:
      "まっすぐで誠実な信念を持ち、人を安心させる落ち着きがあります。\n正しさや美しさを大切にし、自分を律する力が強いでしょう。",
    soulTask:
      "「完璧でなくてもいいと許すこと」。\n理想を追うあまり、自分を責めすぎないようにしましょう。",
    luminaWord:
      "あなたの内側には、人を照らす静かな光があります。\nまずは、その光であなた自身を照らしてあげてください。",
    story: STORY_PLACEHOLDER,
  },
  star_seer: {
    id: "star_seer",
    name: "星詠み",
    subtitle: "星に運命を読んだ魂",
    image: resultImage("star_seer"),
    overview:
      "あなたの前世は\n「星詠み」。\n\n夜空の星を読み解き、\n人々の運命を占った賢者。\n\n見えないものを信じ、\n未来を見つめ続けた魂です。",
    traits:
      "直感が鋭く、物事の本質や流れを感じ取る力があります。\n静かに観察し、深く考えてから動く慎重さを持っているでしょう。",
    soulTask:
      "「考えるより先に動いてみること」。\n答えを待つだけでなく、自分から未来へ踏み出してみましょう。",
    luminaWord:
      "あなたの直感は、今も正しく未来を指し示しています。\nその声を信じて、一歩を踏み出してみてください。",
    story: STORY_PLACEHOLDER,
  },
  alchemist: {
    id: "alchemist",
    name: "錬金術師",
    subtitle: "真理を探究し続けた魂",
    image: resultImage("alchemist"),
    overview:
      "あなたの前世は\n「錬金術師」。\n\n世界の真理を求め、\n探究に生涯を捧げた錬金術師。\n\n誰も見たことのない答えを、\n追い続けた魂です。",
    traits:
      "好奇心が強く、納得するまで突き詰めて考える探究心があります。\n人と違う発想や、独自の世界観を持っているでしょう。",
    soulTask:
      "「ひとりで抱え込まないこと」。\n知識や成果を、誰かと分かち合うことで世界は広がります。",
    luminaWord:
      "あなたの探究心は、世界を前に進める原動力です。\nその知恵を、どうか人の幸せのためにも使ってください。",
    story: STORY_PLACEHOLDER,
  },
  bard: {
    id: "bard",
    name: "吟遊詩人",
    subtitle: "歌で人々の心を繋いだ魂",
    image: resultImage("bard"),
    overview:
      "あなたの前世は\n「吟遊詩人」。\n\n国から国へと旅をしながら、\n歌と物語を届けた詩人。\n\n人々の心に灯をともし、\n自由に生きた魂です。",
    traits:
      "表現することが好きで、人の心を惹きつける魅力があります。\n明るく軽やかで、新しい出会いや変化を楽しめるでしょう。",
    soulTask:
      "「ひとつの場所に根を張ること」。\n自由でいながらも、深く続く絆を育てていきましょう。",
    luminaWord:
      "あなたの言葉や表現は、誰かの心を救う力を持っています。\nその声を、もっと世界に響かせてください。",
    story: STORY_PLACEHOLDER,
  },
  forest_guardian: {
    id: "forest_guardian",
    name: "森の守り人",
    subtitle: "命を見守り続けた魂",
    image: resultImage("forest_guardian"),
    overview:
      "あなたの前世は\n「森の守り人」。\n\n森と生き物たちを見守り、\n静かに命を守り続けた守人。\n\n自然とともに生き、\n調和を尊んだ魂です。",
    traits:
      "穏やかで安定感があり、一緒にいる人を安心させます。\n目立たなくても、確かな優しさで周りを支える力があるでしょう。",
    soulTask:
      "「自分の世界の外へ出てみること」。\n守るだけでなく、新しい縁や場所にも心を開いてみましょう。",
    luminaWord:
      "あなたのそばにいると、不思議と心が落ち着きます。\nその静かな優しさは、今世でも大切な人を守るでしょう。",
    story: STORY_PLACEHOLDER,
  },
  sea_priestess: {
    id: "sea_priestess",
    name: "海の巫女",
    subtitle: "祈りを海に捧げた魂",
    image: resultImage("sea_priestess"),
    overview:
      "あなたの前世は\n「海の巫女」。\n\n海辺の社で祈りを捧げ、\n人々の無事を願った巫女。\n\n大いなる流れに身を委ね、\n感受性豊かに生きた魂です。",
    traits:
      "感情が豊かで、人の気持ちを敏感に感じ取ります。\n優しく包み込むような愛情を持ち、共感する力が強いでしょう。",
    soulTask:
      "「自分と他人の感情に境界を引くこと」。\n相手の痛みを背負いすぎず、自分の心も守りましょう。",
    luminaWord:
      "あなたの豊かな感受性は、人を癒す尊い才能です。\nどうか、あなた自身の心も同じだけ大切にしてください。",
    story: STORY_PLACEHOLDER,
  },
  wanderer: {
    id: "wanderer",
    name: "旅する放浪者",
    subtitle: "自由を求めて旅した魂",
    image: resultImage("wanderer"),
    overview:
      "あなたの前世は\n「旅する放浪者」。\n\nひとつの場所に留まらず、\n世界を歩き続けた放浪者。\n\n自由を愛し、たくさんの景色を\n心に刻んだ魂です。",
    traits:
      "好奇心旺盛で、束縛を嫌い、自分の道を行く強さがあります。\n変化を恐れず、新しい世界へ飛び込んでいけるでしょう。",
    soulTask:
      "「立ち止まって振り返ること」。\n進み続けるだけでなく、出会った縁を大切に育てていきましょう。",
    luminaWord:
      "あなたの自由な魂は、誰にも縛れません。\nその歩みの先で、本当に帰りたい場所もきっと見つかります。",
    story: STORY_PLACEHOLDER,
  },
  healer: {
    id: "healer",
    name: "癒し手",
    subtitle: "傷ついた人々に寄り添った魂",
    image: resultImage("healer"),
    overview:
      "あなたの前世は\n「癒し手」。\n\n傷ついた人々のそばに寄り添い、\n心と体を癒した治療者。\n\n見返りを求めず、\nただ手を差し伸べ続けた魂です。",
    traits:
      "面倒見がよく、誰かのために動くことに喜びを感じます。\n優しく、人の弱さや痛みを受け止める包容力があるでしょう。",
    soulTask:
      "「自分を後回しにしないこと」。\n人を癒す前に、まずあなた自身を満たしてあげましょう。",
    luminaWord:
      "あなたの手には、人を癒す温かさが宿っています。\nその手で、たまにはあなた自身を抱きしめてあげてください。",
    story: STORY_PLACEHOLDER,
  },
  dragon_contract: {
    id: "dragon_contract",
    name: "竜の契約者",
    subtitle: "竜と絆を結んだ強き魂",
    image: resultImage("dragon_contract"),
    overview:
      "あなたの前世は\n「竜の契約者」。\n\n伝説の竜と絆を結び、\n大いなる力を託された者。\n\n強い意志と覚悟を胸に、\n運命に立ち向かった魂です。",
    traits:
      "芯が強く、いざという時に揺るがない覚悟を持っています。\nカリスマ性があり、人を導き引っ張っていく力があるでしょう。",
    soulTask:
      "「弱さも見せていいと知ること」。\n強くあろうとするほど、素直に頼る勇気も大切になります。",
    luminaWord:
      "あなたの内には、運命を変えるほどの強い力があります。\nその力を、どうか優しさとともに使ってください。",
    story: STORY_PLACEHOLDER,
  },
  star_traveler: {
    id: "star_traveler",
    name: "星の旅人",
    subtitle: "星々を巡ってきた特別な魂",
    image: resultImage("star_traveler"),
    overview:
      "あなたの前世は\n「星の旅人」。\n\nひとつの世界に留まらず、\n星々を巡ってきた稀有な魂。\n\n直感と運命に導かれ、\n大切な使命を携えて\n今ここに辿り着いた魂です。",
    traits:
      "強い直感と、運命を感じ取る不思議な力を持っています。\nどこか掴みどころがなく、人とは違う視点で世界を見ているでしょう。",
    soulTask:
      "「今この場所に心を置くこと」。\n遠くを見つめながらも、目の前の縁と時間を慈しみましょう。",
    luminaWord:
      "あなたは、たくさんの星を巡ってここへ来た特別な魂です。\nその旅の意味は、これからの今世で明らかになるでしょう。",
    story: STORY_PLACEHOLDER,
    secret: true,
  },
};

// 表示順（一覧などで使用。シークレットは最後）
export const pastLifeOrder: PastLifeId[] = [
  "tragic_princess",
  "loyal_knight",
  "white_witch",
  "light_priest",
  "star_seer",
  "alchemist",
  "bard",
  "forest_guardian",
  "sea_priestess",
  "wanderer",
  "healer",
  "dragon_contract",
  "star_traveler",
];
