import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuminaLinkButton } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { TableOfContents } from "@/components/columns/table-of-contents";
import { getColumnArticle, getColumnDisplayContent, listColumnArticles } from "@/lib/columns";

const RELATED_COLUMNS: Record<string, { slug: string; title: string }[]> = {
  "wakare-danjo-shinri": [
    { slug: "motokare-kimochi", title: "元彼の気持ち——別れた後も気になるあの人は、今なにを想っているのか" },
    { slug: "kidoku-yoru", title: "既読がつかない夜に読んでほしい話" },
    { slug: "kidokumushi-dansei", title: "既読無視する男性の心の中で、本当は何が起きているのか" },
    { slug: "renraku-matsu", title: "連絡を待つ時間は、無駄じゃない" },
    { slug: "sukinanoni-renraku-shinai", title: "好きなのに連絡してこない男性は、何を考えているのか" },
  ],
  "motokare-kimochi": [
    { slug: "kidoku-yoru", title: "既読がつかない夜に読んでほしい話" },
    { slug: "kidokumushi-dansei", title: "既読無視する男性の心の中で、本当は何が起きているのか" },
    { slug: "renraku-matsu", title: "連絡を待つ時間は、無駄じゃない" },
    { slug: "sukinanoni-renraku-shinai", title: "好きなのに連絡してこない男性は、何を考えているのか" },
  ],
  "sukinanoni-renraku-shinai": [
    { slug: "kidoku-yoru", title: "既読がつかない夜に読んでほしい話" },
    { slug: "kidokumushi-dansei", title: "既読無視する男性の心の中で、本当は何が起きているのか" },
    { slug: "renraku-matsu", title: "連絡を待つ時間は、無駄じゃない" },
  ],
  "unmei-sign": [
    { slug: "kidoku-yoru", title: "既読がつかない夜に読んでほしい話" },
    { slug: "renraku-matsu", title: "連絡を待つ時間は、無駄じゃない" },
    { slug: "wakare-danjo-shinri", title: "別れた後の気持ちの変化——男女ですれ違う「悲しみのタイミング」と、復縁の可能性" },
    { slug: "motokare-kimochi", title: "元彼の気持ち——別れた後も気になるあの人は、今なにを想っているのか" },
    { slug: "kidokumushi-dansei", title: "既読無視する男性の心の中で、本当は何が起きているのか" },
    { slug: "sukinanoni-renraku-shinai", title: "好きなのに連絡してこない男性は、何を考えているのか" },
  ],
  "honki-koudou": [
    { slug: "sukinanoni-renraku-shinai", title: "好きなのに連絡してこない男性は、何を考えているのか" },
    { slug: "kidokumushi-dansei", title: "既読無視する男性の心の中で、本当は何が起きているのか" },
    { slug: "kidoku-yoru", title: "既読がつかない夜に読んでほしい話" },
    { slug: "renraku-matsu", title: "連絡を待つ時間は、無駄じゃない" },
    { slug: "unmei-sign", title: "運命の人に出会う前に現れる7つのサイン——今のつらさは、始まりの合図かもしれない" },
    { slug: "motokare-kimochi", title: "元彼の気持ち——別れた後も気になるあの人は、今なにを想っているのか" },
    { slug: "wakare-danjo-shinri", title: "別れた後の気持ちの変化——男女ですれ違う「悲しみのタイミング」と、復縁の可能性" },
  ],
  "renai-tenki": [
    { slug: "unmei-sign", title: "運命の人に出会う前に現れる7つのサイン——今のつらさは、始まりの合図かもしれない" },
    { slug: "renraku-matsu", title: "連絡を待つ時間は、無駄じゃない" },
    { slug: "kidoku-yoru", title: "既読がつかない夜に読んでほしい話" },
    { slug: "honki-koudou", title: "男性が本気で好きな女性にだけ見せる8つの行動——言葉にしない愛情の見つけ方" },
    { slug: "sukinanoni-renraku-shinai", title: "好きなのに連絡してこない男性は、何を考えているのか" },
    { slug: "wakare-danjo-shinri", title: "別れた後の気持ちの変化——男女ですれ違う「悲しみのタイミング」と、復縁の可能性" },
    { slug: "motokare-kimochi", title: "元彼の気持ち——別れた後も気になるあの人は、今なにを想っているのか" },
    { slug: "kidokumushi-dansei", title: "既読無視する男性の心の中で、本当は何が起きているのか" },
  ],
  "enkyori-aenai-fuan": [
    { slug: "renraku-matsu", title: "連絡を待つ時間は、無駄じゃない" },
    { slug: "sukinanoni-renraku-shinai", title: "好きなのに連絡してこない男性は、何を考えているのか" },
    { slug: "aishou-couple", title: "相性がいいカップルの5つの共通点" },
    { slug: "renai-tenki", title: "恋愛が動く5つのタイミング──止まっているように見える恋にも、転機は来る" },
    { slug: "honki-koudou", title: "男性が本気で好きな女性にだけ見せる8つの行動──言葉にしない愛情の見つけ方" },
  ],
  "shitsuren-anata": [
    { slug: "wakare-danjo-shinri", title: "別れた後の気持ちの変化──男女ですれ違う「悲しみのタイミング」と、復縁の可能性" },
    { slug: "motokare-kimochi", title: "元彼の気持ち──別れた後も気になるあの人は、今なにを想っているのか" },
    { slug: "fukuen-kanousei", title: "復縁できるカップルには共通点がある" },
    { slug: "unmei-sign", title: "運命の人に出会う前に現れる7つのサイン──今のつらさは、始まりの合図かもしれない" },
    { slug: "renai-tenki", title: "恋愛が動く5つのタイミング──止まっているように見える恋にも、転機は来る" },
  ],
  "motokare-renraku-zenchou": [
    { slug: "motokare-kimochi", title: "元彼の気持ち——別れた後も気になるあの人は、今なにを想っているのか" },
    { slug: "wakare-danjo-shinri", title: "別れた後の気持ちの変化——男女ですれ違う「悲しみのタイミング」と、復縁の可能性" },
    { slug: "unmei-sign", title: "運命の人に出会う前に現れる7つのサイン——今のつらさは、始まりの合図かもしれない" },
    { slug: "renai-tenki", title: "恋愛が動く5つのタイミング——止まっているように見える恋にも、転機は来る" },
    { slug: "kidoku-yoru", title: "既読がつかない夜に読んでほしい話" },
    { slug: "renraku-matsu", title: "連絡を待つ時間は、無駄じゃない" },
    { slug: "honki-koudou", title: "男性が本気で好きな女性にだけ見せる8つの行動——言葉にしない愛情の見つけ方" },
    { slug: "sukinanoni-renraku-shinai", title: "好きなのに連絡してこない男性は、何を考えているのか" },
    { slug: "kidokumushi-dansei", title: "既読無視する男性の心の中で、本当は何が起きているのか" },
  ],
  "toshishita-dansei-honki-sign": [
    { slug: "honki-koudou", title: "男性が本気で好きな女性にだけ見せる8つの行動──言葉にしない愛情の見つけ方" },
    { slug: "sukinanoni-renraku-shinai", title: "好きなのに連絡してこない男性は、何を考えているのか" },
    { slug: "aishou-couple", title: "相性がいいカップルの5つの共通点" },
    { slug: "renraku-matsu", title: "連絡を待つ時間は、無駄じゃない" },
    { slug: "enkyori-aenai-fuan", title: "遠距離で会えない不安に押しつぶされそうな夜に──会えない時間が関係を壊すとは限らない" },
  ],
  "dansei-tsumetaku-naru-riyuu": [
    { slug: "honki-koudou", title: "男性が本気で好きな女性にだけ見せる8つの行動──言葉にしない愛情の見つけ方" },
    { slug: "sukinanoni-renraku-shinai", title: "好きなのに連絡してこない男性は、何を考えているのか" },
    { slug: "renraku-matsu", title: "連絡を待つ時間は、無駄じゃない" },
    { slug: "toshishita-dansei-honki-sign", title: "年下の彼が見せる「本気」の5つのサイン──その愛情表現、見逃していませんか？" },
    { slug: "aishou-couple", title: "相性がいいカップルの5つの共通点" },
  ],
  "dekiai-sareru-josei": [
    { slug: "honki-koudou", title: "男性が本気で好きな女性にだけ見せる8つの行動──言葉にしない愛情の見つけ方" },
    { slug: "toshishita-dansei-honki-sign", title: "年下の彼が見せる「本気」の5つのサイン──その愛情表現、見逃していませんか？" },
    { slug: "dansei-tsumetaku-naru-riyuu", title: "男性が急に冷たくなる7つの理由──嫌われたわけじゃない。彼の心で起きていること" },
    { slug: "aishou-couple", title: "相性がいいカップルの5つの共通点" },
    { slug: "sukinanoni-renraku-shinai", title: "好きなのに連絡してこない男性は、何を考えているのか" },
  ],
  "suki-to-shuchaku-no-chigai": [
    { slug: "dekiai-sareru-josei", title: "彼に溺愛される女性が絶対にしない5つのこと──愛される秘訣は「頑張らない」ことでした" },
    { slug: "dansei-tsumetaku-naru-riyuu", title: "男性が急に冷たくなる7つの理由──嫌われたわけじゃない。彼の心で起きていること" },
    { slug: "sukinanoni-renraku-shinai", title: "好きなのに連絡してこない男性は、何を考えているのか" },
    { slug: "renraku-matsu", title: "連絡を待つ時間は、無駄じゃない" },
    { slug: "shitsuren-anata", title: "失恋したあなたへ──あなたの魅力は、恋愛の結果では決まらない" },
  ],
  "aishou-couple": [
    { slug: "dekiai-sareru-josei", title: "彼に溺愛される女性が絶対にしない5つのこと──愛される秘訣は「頑張らない」ことでした" },
    { slug: "myakuari-sign", title: "男性が本気で好きな女性にだけ見せる7つの脈ありサイン｜占い師が解説" },
    { slug: "suki-to-shuchaku-no-chigai", title: "「好き」と「執着」の違いに気づいたとき、恋は変わり始める──あなたの気持ちを整理する5つの問いかけ" },
    { slug: "dansei-tsumetaku-naru-riyuu", title: "男性が急に冷たくなる7つの理由──嫌われたわけじゃない。彼の心で起きていること" },
    { slug: "toshishita-dansei-honki-sign", title: "年下の彼が見せる「本気」の5つのサイン──その愛情表現、見逃していませんか？" },
  ],
  "myakuari-sign": [
    { slug: "toshishita-dansei-honki-sign", title: "年下の彼が見せる「本気」の5つのサイン──その愛情表現、見逃していませんか？" },
    { slug: "dansei-tsumetaku-naru-riyuu", title: "男性が急に冷たくなる7つの理由──嫌われたわけじゃない。彼の心で起きていること" },
    { slug: "dekiai-sareru-josei", title: "彼に溺愛される女性が絶対にしない5つのこと──愛される秘訣は「頑張らない」ことでした" },
    { slug: "suki-to-shuchaku-no-chigai", title: "「好き」と「執着」の違いに気づいたとき、恋は変わり始める──あなたの気持ちを整理する5つの問いかけ" },
    { slug: "honki-koudou", title: "男性が本気で好きな女性にだけ見せる8つの行動──言葉にしない愛情の見つけ方" },
  ],
  "sukisake-dansei": [
    { slug: "myakuari-sign", title: "男性が本気で好きな女性にだけ見せる7つの脈ありサイン｜占い師が解説" },
    { slug: "dansei-tsumetaku-naru-riyuu", title: "男性が急に冷たくなる7つの理由──嫌われたわけじゃない。彼の心で起きていること" },
    { slug: "suki-to-shuchaku-no-chigai", title: "「好き」と「執着」の違いに気づいたとき、恋は変わり始める──あなたの気持ちを整理する5つの問いかけ" },
    { slug: "aishou-couple", title: "相性がいいカップルの5つの共通点｜「似ている」より大切なこと" },
    { slug: "honki-koudou", title: "男性が本気で好きな女性にだけ見せる8つの行動──言葉にしない愛情の見つけ方" },
  ],
};

const ARTICLE_METADATA: Record<string, Metadata> = {
  "wakare-danjo-shinri": {
    title: "別れた後の気持ちの変化——男女ですれ違う「悲しみのタイミング」と、復縁の可能性 - ルミナ",
    description:
      "別れた後の男女の心理変化の違いと、復縁の可能性が生まれるタイミングを解説。あの人がまだ気になる夜に読んでほしい話。",
    openGraph: {
      title: "別れた後の気持ちの変化——男女ですれ違う「悲しみのタイミング」と、復縁の可能性",
      description:
        "別れた後の男女の心理変化の違いと、復縁の可能性が生まれるタイミングを解説。あの人がまだ気になる夜に読んでほしい話。",
      type: "article",
    },
  },
  "motokare-kimochi": {
    title: "元彼の気持ち——別れた後も気になるあの人は、今なにを想っているのか - ルミナ",
    description:
      "別れた後の元彼の気持ちと男性心理を解説。元カノを思い出す瞬間、連絡してこない理由、復縁の可能性まで。あの人がまだ気になる夜に読んでほしい話。",
    openGraph: {
      title: "元彼の気持ち——別れた後も気になるあの人は、今なにを想っているのか",
      description:
        "別れた後の元彼の気持ちと男性心理を解説。元カノを思い出す瞬間、連絡してこない理由、復縁の可能性まで。あの人がまだ気になる夜に読んでほしい話。",
      type: "article",
    },
  },
  "sukinanoni-renraku-shinai": {
    title: "好きなのに連絡してこない男性は、何を考えているのか｜男性心理をやさしく解説 - ルミナ",
    description:
      "好きなのに連絡しない男性心理を解説。連絡こない理由、脈なしとの見分け方、自分から連絡していいかの判断基準まで。不安な夜に、少しだけ心が軽くなる話。",
    openGraph: {
      title: "好きなのに連絡してこない男性は、何を考えているのか",
      description:
        "好きなのに連絡しない男性心理を解説。連絡こない理由、脈なしとの見分け方、自分から連絡していいかの判断基準まで。不安な夜に、少しだけ心が軽くなる話。",
      type: "article",
    },
  },
  "kidokumushi-dansei": {
    title: "既読無視する男性の心の中で、本当は何が起きているのか｜男性心理をやさしく解説 - ルミナ",
    description:
      "既読無視する男性心理を解説。既読スルーの理由、わざと返信しない場合の本音、脈なしとの違いまで。返信がこない夜に、少しだけ心が軽くなる話。",
    openGraph: {
      title: "既読無視する男性の心の中で、本当は何が起きているのか",
      description:
        "既読無視する男性心理を解説。既読スルーの理由、わざと返信しない場合の本音、脈なしとの違いまで。返信がこない夜に、少しだけ心が軽くなる話。",
      type: "article",
    },
  },
  "renraku-matsu": {
    title: "連絡を待つ時間は、無駄じゃない｜好きな人から連絡こない夜に - ルミナ",
    description:
      "好きな人から連絡こない日が続いてつらいあなたへ。連絡が減った理由、待つことの意味、自分から連絡すべきか迷ったときの考え方を、やさしい言葉でお伝えします。",
    openGraph: {
      title: "連絡を待つ時間は、無駄じゃない",
      description:
        "好きな人から連絡こない日が続いてつらいあなたへ。連絡が減った理由、待つことの意味、自分から連絡すべきか迷ったときの考え方を、やさしい言葉でお伝えします。",
      type: "article",
    },
  },
  "renai-tenki": {
    title: "恋愛が動く5つのタイミング｜止まっている恋にも転機は来る - ルミナ",
    description:
      "恋愛が動くタイミングを5つ紹介。手放しかけたとき、環境が変わるとき、自分のために動き始めたとき——止まっているように見える恋にも転機がある理由と、その見つけ方。",
    openGraph: {
      title: "恋愛が動く5つのタイミング——止まっているように見える恋にも、転機は来る",
      description:
        "恋愛が動くタイミングを5つ紹介。手放しかけたとき、環境が変わるとき、自分のために動き始めたとき——止まっているように見える恋にも転機がある理由と、その見つけ方。",
      type: "article",
    },
  },
  "honki-koudou": {
    title: "男性が本気で好きな女性にだけ見せる8つの行動｜言葉にしない愛情の見つけ方 - ルミナ",
    description:
      "男性が本気で好きな女性にだけ見せる行動を8つ紹介。小さな変化に気づく、用事がないのに連絡してくる、弱さを見せる——言葉にしない男性の愛情表現の見つけ方。",
    openGraph: {
      title: "男性が本気で好きな女性にだけ見せる8つの行動——言葉にしない愛情の見つけ方",
      description:
        "男性が本気で好きな女性にだけ見せる行動を8つ紹介。小さな変化に気づく、用事がないのに連絡してくる、弱さを見せる——言葉にしない男性の愛情表現の見つけ方。",
      type: "article",
    },
  },
  "unmei-sign": {
    title: "運命の人に出会う前に現れる7つのサイン｜今のつらさは始まりの合図かもしれない - ルミナ",
    description:
      "運命の人に出会う前に現れるサインを7つ紹介。つらい時期が続くのは、大切な出会いの前兆かもしれません。恋愛に疲れた夜に読んでほしい話。",
    openGraph: {
      title: "運命の人に出会う前に現れる7つのサイン｜今のつらさは始まりの合図かもしれない",
      description:
        "運命の人に出会う前に現れるサインを7つ紹介。つらい時期が続くのは、大切な出会いの前兆かもしれません。恋愛に疲れた夜に読んでほしい話。",
      type: "article",
    },
  },
  "enkyori-aenai-fuan": {
    title: "遠距離で会えない不安に押しつぶされそうな夜に──会えない時間が関係を壊すとは限らない - ルミナ",
    description:
      "遠距離恋愛の不安を抱えるあなたへ。会えない時間はつらい。でもその時間が二人の関係を壊すとは限らない理由と、今夜できることを白の魔女ルミナがお伝えします。",
    openGraph: {
      title: "遠距離で会えない不安に押しつぶされそうな夜に──会えない時間が関係を壊すとは限らない",
      description:
        "遠距離恋愛の不安を抱えるあなたへ。会えない時間はつらい。でもその時間が二人の関係を壊すとは限らない理由と、今夜できることを白の魔女ルミナがお伝えします。",
      type: "article",
    },
  },
  "shitsuren-anata": {
    title: "失恋したあなたへ──あなたの魅力は、恋愛の結果では決まらない - ルミナ",
    description:
      "失恋の痛みの中にいるあなたへ。恋がうまくいかなかった＝魅力がない、ではありません。あなたの魅力は恋愛の結果では決まらない。白の魔女ルミナがやさしくお伝えします。",
    openGraph: {
      title: "失恋したあなたへ──あなたの魅力は、恋愛の結果では決まらない",
      description:
        "失恋の痛みの中にいるあなたへ。恋がうまくいかなかった＝魅力がない、ではありません。あなたの魅力は恋愛の結果では決まらない。白の魔女ルミナがやさしくお伝えします。",
      type: "article",
    },
  },
  "motokare-renraku-zenchou": {
    title: "元彼から連絡が来る前に起きる7つの前兆｜あなたの直感は間違っていない - ルミナ",
    description:
      "元彼から連絡が来る前に現れる7つの前兆を紹介。夢に出る、匂いで思い出す、偶然の一致が続く——あなたの直感を信じてほしい理由を、白の魔女ルミナがやさしくお伝えします。",
    openGraph: {
      title: "元彼から連絡が来る前に起きる7つの前兆——あなたの直感は、きっと間違っていません",
      description:
        "元彼から連絡が来る前に現れる7つの前兆を紹介。夢に出る、匂いで思い出す、偶然の一致が続く——あなたの直感を信じてほしい理由を、白の魔女ルミナがやさしくお伝えします。",
      type: "article",
    },
  },
  "kidoku-yoru": {
    title: "既読がつかない夜に読んでほしい話｜既読無視は終わりじゃない - ルミナ",
    description:
      "既読無視や既読スルーが続いて不安な夜に。返信こない時間の意味と、脈なしだと決めつけてしまう前に知ってほしいことを、やさしい言葉でお伝えします。",
    openGraph: {
      title: "既読がつかない夜に読んでほしい話",
      description:
        "既読無視や既読スルーが続いて不安な夜に。返信こない時間の意味と、脈なしだと決めつけてしまう前に知ってほしいことを、やさしい言葉でお伝えします。",
      type: "article",
    },
  },
  "toshishita-dansei-honki-sign": {
    title: "年下男性の本気の5つのサイン｜脈ありの見分け方を占い師が解説 - ルミナ",
    description:
      "年下男性が本気で好きな年上女性にだけ見せる5つのサインを占い師ルミナが解説。LINEや態度に現れる脈ありの見分け方、年の差恋愛の不安を解消するヒントをお届けします。",
    openGraph: {
      title: "年下の彼が見せる「本気」の5つのサイン──その愛情表現、見逃していませんか？",
      description:
        "年下男性が本気で好きな年上女性にだけ見せる5つのサインを占い師ルミナが解説。LINEや態度に現れる脈ありの見分け方、年の差恋愛の不安を解消するヒントをお届けします。",
      type: "article",
    },
  },
  "dansei-tsumetaku-naru-riyuu": {
    title: "男性が急に冷たくなる7つの理由｜嫌われたわけじゃない彼の本音を占い師が解説 - ルミナ",
    description:
      "昨日まで優しかった彼が急にそっけない。嫌われた？それとも…？男性が急に冷たくなる7つの理由と、そのときにやってはいけないこと・やるべきことを白の魔女ルミナがお伝えします。",
    openGraph: {
      title: "男性が急に冷たくなる7つの理由──嫌われたわけじゃない。彼の心で起きていること",
      description:
        "昨日まで優しかった彼が急にそっけない。嫌われた？それとも…？男性が急に冷たくなる7つの理由と、そのときにやってはいけないこと・やるべきことを白の魔女ルミナがお伝えします。",
      type: "article",
    },
  },
  "aishou-couple": {
    title: "相性がいいカップルの5つの共通点｜似ているより大切なことを占い師が解説 - ルミナ",
    description:
      "相性がいいカップルの共通点は「趣味が同じ」ではありません。本当に大切なのは、違いを受け入れて同じ方向を向けること。占いの現場で見てきた実例とともに解説します。",
    openGraph: {
      title: "相性がいいカップルの5つの共通点｜「似ている」より大切なこと",
      description:
        "相性がいいカップルの共通点は「趣味が同じ」ではありません。本当に大切なのは、違いを受け入れて同じ方向を向けること。占いの現場で見てきた実例とともに解説します。",
      type: "article",
    },
  },
  "myakuari-sign": {
    title: "男性の脈ありサイン7つ｜好きな女性にだけ見せる行動を占い師が解説 - ルミナ",
    description:
      "彼のあの行動は脈あり？ 男性が本気で好きな女性にだけ見せる7つのサインを、占いの現場で見てきた実例とともに解説。あなたの恋が動き出すヒントがここにあります。",
    openGraph: {
      title: "男性が本気で好きな女性にだけ見せる7つの脈ありサイン｜占い師が解説",
      description:
        "彼のあの行動は脈あり？ 男性が本気で好きな女性にだけ見せる7つのサインを、占いの現場で見てきた実例とともに解説。あなたの恋が動き出すヒントがここにあります。",
      type: "article",
    },
  },
  "sukisake-dansei": {
    title: "好き避けする男性の5つの特徴｜嫌い避けとの見分け方を占い師が解説 - ルミナ",
    description:
      "彼にそっけない態度を取られて不安なあなたへ。それは嫌われたのではなく、好き避けかもしれません。好き避けする男性の5つの特徴と嫌い避けとの見分け方を、占いの現場から解説します。",
    openGraph: {
      title: "好き避けする男性の5つの特徴｜嫌い避けとの見分け方を占い師が解説",
      description:
        "彼にそっけない態度を取られて不安なあなたへ。それは嫌われたのではなく、好き避けかもしれません。好き避けする男性の5つの特徴と嫌い避けとの見分け方を、占いの現場から解説します。",
      type: "article",
    },
  },
  "suki-to-shuchaku-no-chigai": {
    title: "「好き」と「執着」の違いとは？自分の気持ちを整理する5つの問いかけ｜占い師が解説 - ルミナ",
    description:
      "好きなのか、執着なのか。その答えがわからなくて苦しい夜に。自分の気持ちの正体を知るための5つの問いかけと、今夜からできる感情の整理法を白の魔女ルミナがお伝えします。",
    openGraph: {
      title: "「好き」と「執着」の違いに気づいたとき、恋は変わり始める──あなたの気持ちを整理する5つの問いかけ",
      description:
        "好きなのか、執着なのか。その答えがわからなくて苦しい夜に。自分の気持ちの正体を知るための5つの問いかけと、今夜からできる感情の整理法を白の魔女ルミナがお伝えします。",
      type: "article",
    },
  },
  "dekiai-sareru-josei": {
    title: "彼に溺愛される女性が絶対にしない5つのこと｜愛される秘訣を占い師が解説 - ルミナ",
    description:
      "溺愛される女性はテクニックを使っていない。むしろ「しないこと」に秘密がありました。彼にずっと愛される女性の在り方を、白の魔女ルミナが占いの現場から見えた実例とともにお伝えします。",
    openGraph: {
      title: "彼に溺愛される女性が絶対にしない5つのこと──愛される秘訣は「頑張らない」ことでした",
      description:
        "溺愛される女性はテクニックを使っていない。むしろ「しないこと」に秘密がありました。彼にずっと愛される女性の在り方を、白の魔女ルミナが占いの現場から見えた実例とともにお伝えします。",
      type: "article",
    },
  },
};

const ARTICLE_JSONLD: Record<string, object> = {
  "wakare-danjo-shinri": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "別れた後の気持ちの変化——男女ですれ違う「悲しみのタイミング」と、復縁の可能性",
    description:
      "別れた後の男女の心理変化の違いと、復縁の可能性が生まれるタイミングを解説。あの人がまだ気になる夜に読んでほしい話。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "motokare-kimochi": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "元彼の気持ち——別れた後も気になるあの人は、今なにを想っているのか",
    description:
      "別れた後の元彼の気持ちと男性心理を解説。元カノを思い出す瞬間、連絡してこない理由、復縁の可能性まで。あの人がまだ気になる夜に読んでほしい話。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "sukinanoni-renraku-shinai": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "好きなのに連絡してこない男性は、何を考えているのか",
    description:
      "好きなのに連絡しない男性心理を解説。連絡こない理由、脈なしとの見分け方、自分から連絡していいかの判断基準まで。不安な夜に、少しだけ心が軽くなる話。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "kidokumushi-dansei": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "既読無視する男性の心の中で、本当は何が起きているのか",
    description:
      "既読無視する男性心理を解説。既読スルーの理由、わざと返信しない場合の本音、脈なしとの違いまで。返信がこない夜に、少しだけ心が軽くなる話。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "renraku-matsu": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "連絡を待つ時間は、無駄じゃない",
    description:
      "好きな人から連絡こない日が続いてつらいあなたへ。連絡が減った理由、待つことの意味、自分から連絡すべきか迷ったときの考え方を、やさしい言葉でお伝えします。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "renai-tenki": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "恋愛が動く5つのタイミング——止まっているように見える恋にも、転機は来る",
    description:
      "恋愛が動くタイミングを5つ紹介。手放しかけたとき、環境が変わるとき、自分のために動き始めたとき——止まっているように見える恋にも転機がある理由と、その見つけ方。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "honki-koudou": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "男性が本気で好きな女性にだけ見せる8つの行動——言葉にしない愛情の見つけ方",
    description:
      "男性が本気で好きな女性にだけ見せる行動を8つ紹介。小さな変化に気づく、用事がないのに連絡してくる、弱さを見せる——言葉にしない男性の愛情表現の見つけ方。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "unmei-sign": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "運命の人に出会う前に現れる7つのサイン｜今のつらさは始まりの合図かもしれない",
    description:
      "運命の人に出会う前に現れるサインを7つ紹介。つらい時期が続くのは、大切な出会いの前兆かもしれません。恋愛に疲れた夜に読んでほしい話。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "enkyori-aenai-fuan": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "遠距離で会えない不安に押しつぶされそうな夜に──会えない時間が関係を壊すとは限らない",
    description:
      "遠距離恋愛の不安を抱えるあなたへ。会えない時間はつらい。でもその時間が二人の関係を壊すとは限らない理由と、今夜できることを白の魔女ルミナがお伝えします。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "shitsuren-anata": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "失恋したあなたへ──あなたの魅力は、恋愛の結果では決まらない",
    description:
      "失恋の痛みの中にいるあなたへ。恋がうまくいかなかった＝魅力がない、ではありません。あなたの魅力は恋愛の結果では決まらない。白の魔女ルミナがやさしくお伝えします。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "motokare-renraku-zenchou": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "元彼から連絡が来る前に起きる7つの前兆——あなたの直感は、きっと間違っていません",
    description:
      "元彼から連絡が来る前に現れる7つの前兆を紹介。夢に出る、匂いで思い出す、偶然の一致が続く——あなたの直感を信じてほしい理由を、白の魔女ルミナがやさしくお伝えします。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "kidoku-yoru": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "既読がつかない夜に読んでほしい話",
    description:
      "既読無視や既読スルーが続いて不安な夜に。返信こない時間の意味と、脈なしだと決めつけてしまう前に知ってほしいことを、やさしい言葉でお伝えします。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "toshishita-dansei-honki-sign": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "年下の彼が見せる「本気」の5つのサイン──その愛情表現、見逃していませんか？",
    description:
      "年下男性が本気で好きな年上女性にだけ見せる5つのサインを占い師ルミナが解説。LINEや態度に現れる脈ありの見分け方、年の差恋愛の不安を解消するヒントをお届けします。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "dansei-tsumetaku-naru-riyuu": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "男性が急に冷たくなる7つの理由──嫌われたわけじゃない。彼の心で起きていること",
    description:
      "昨日まで優しかった彼が急にそっけない。嫌われた？それとも…？男性が急に冷たくなる7つの理由と、そのときにやってはいけないこと・やるべきことを白の魔女ルミナがお伝えします。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "aishou-couple": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "相性がいいカップルの5つの共通点｜「似ている」より大切なこと",
    description:
      "相性がいいカップルの共通点は「趣味が同じ」ではありません。本当に大切なのは、違いを受け入れて同じ方向を向けること。占いの現場で見てきた実例とともに解説します。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "myakuari-sign": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "男性が本気で好きな女性にだけ見せる7つの脈ありサイン｜占い師が解説",
    description:
      "彼のあの行動は脈あり？ 男性が本気で好きな女性にだけ見せる7つのサインを、占いの現場で見てきた実例とともに解説。あなたの恋が動き出すヒントがここにあります。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "sukisake-dansei": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "好き避けする男性の5つの特徴｜嫌われたと思ったら、実は好意だった",
    description:
      "彼にそっけない態度を取られて不安なあなたへ。それは嫌われたのではなく、好き避けかもしれません。好き避けする男性の5つの特徴と嫌い避けとの見分け方を、占いの現場から解説します。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "suki-to-shuchaku-no-chigai": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "「好き」と「執着」の違いに気づいたとき、恋は変わり始める──あなたの気持ちを整理する5つの問いかけ",
    description:
      "好きなのか、執着なのか。その答えがわからなくて苦しい夜に。自分の気持ちの正体を知るための5つの問いかけと、今夜からできる感情の整理法を白の魔女ルミナがお伝えします。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
  "dekiai-sareru-josei": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "彼に溺愛される女性が絶対にしない5つのこと──愛される秘訣は「頑張らない」ことでした",
    description:
      "溺愛される女性はテクニックを使っていない。むしろ「しないこと」に秘密がありました。彼にずっと愛される女性の在り方を、白の魔女ルミナが占いの現場から見えた実例とともにお伝えします。",
    author: { "@type": "Person", name: "ルミナ" },
    publisher: { "@type": "Organization", name: "ルミナ" },
  },
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type CalloutType = "fact" | "insight" | "next";
type RichBlock =
  | { type: "heading"; content: string }
  | { type: "subheading"; content: string }
  | { type: "quote"; content: string }
  | { type: "paragraph"; content: string };

const CATEGORY_DISPLAY: Record<string, string> = {
  仕事: "仕事",
  失恋: "恋愛",
  不安: "不安",
  願い: "願い",
  占い: "占い",
};

const CALLOUT_LABELS: Record<CalloutType, string> = {
  fact: "\u4e8b\u5b9f",
  insight: "\u89e3\u91c8",
  next: "\u6b21\u306e\u4e00\u624b",
};

function getCalloutType(paragraph: string): CalloutType | null {
  if (paragraph.includes("\u4e8b\u5b9f") || paragraph.includes("\u838a\u53e5\uff7d\uff6e")) return "fact";
  if (paragraph.includes("\u89e3\u91c8") || paragraph.includes("\u96d7\uff63\u9a65")) return "insight";
  if (paragraph.includes("\u6b21\u306e\u4e00\u624b") || paragraph.includes("\u8c3a\uff61\u7e3a\uff6e\u8340")) return "next";
  return null;
}

function estimateReadMinutes(paragraphs: string[]): number {
  const charCount = paragraphs.join("").replace(/\s+/g, "").length;
  return Math.max(1, Math.ceil(charCount / 420));
}

function normalizeText(input: string): string {
  return input.replace(/\s+/g, "").trim();
}

function normalizeComparableText(input: string): string {
  return normalizeText(input).replace(/^>+/, "");
}

function shouldShowConsultationButton(slug: string, paragraph: string): boolean {
  if (slug !== "shitsuren-anata") return false;

  const normalized = normalizeText(paragraph);
  return normalized.includes("心の準備ができたら、ルミナの占いで") && normalized.includes("あなたに訪れる次の縁");
}

function shouldShowAffirmationConsultationButton(slug: string, paragraph: string): boolean {
  if (
    slug !== "shigoto-shippai" &&
    slug !== "fuan-yoru" &&
    slug !== "when-wishes-dont-come-true" &&
    slug !== "negai-kanawanai" &&
    slug !== "uranai-ataru-chigai" &&
    slug !== "hikiyose-negai"
  ) {
    return false;
  }

  const normalized = normalizeText(paragraph);
  return (
    (normalized.includes("心が少し落ち着いたら、ルミナの占いで") && normalized.includes("これからの流れ")) ||
    (normalized.includes("心が少し落ち着いたとき、ルミナの占いで") &&
      normalized.includes("今のあなたへのメッセージ")) ||
    (normalized.includes("今のあなたの願いと、これからの流れをルミナの占いで読み解いてみませんか") &&
      normalized.includes("次の一歩に向かうあなたを、星と言葉でそっと照らします")) ||
    (normalized.includes("ルミナでは、あなたの「今この瞬間」に寄り添う鑑定をご提供しています") &&
      normalized.includes("オープンな心で、ぜひお越しください")) ||
    (normalized.includes("今のあなたのエネルギーの状態と、これからの引き寄せの流れをルミナの占いで読み解いてみませんか") &&
      normalized.includes("あなたの願いが現実に近づくための道筋を、星と言葉でそっと照らします"))
  );
}

function isTodayPhraseLabel(paragraph: string): boolean {
  const normalized = normalizeText(paragraph).replace(/^🌿/, "");
  return normalized === "今日のひとこと";
}

function renderInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-[#3a3229]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function toRichBlock(paragraph: string): RichBlock {
  if (paragraph.startsWith("## ")) {
    return { type: "heading", content: paragraph.slice(3).trim() };
  }
  if (paragraph.startsWith("### ")) {
    return { type: "subheading", content: paragraph.slice(4).trim() };
  }
  if (paragraph.startsWith("> ")) {
    return { type: "quote", content: paragraph.slice(2).trim() };
  }
  return { type: "paragraph", content: paragraph };
}

type ArticleSection = {
  heading: string;
  id: string;
  paragraphs: string[];
};

function toHeadingId(text: string, index: number): string {
  return `section-${index + 1}`;
}

function groupIntoSections(paragraphs: string[]): { intro: string[]; sections: ArticleSection[] } {
  const intro: string[] = [];
  const sections: ArticleSection[] = [];
  let current: ArticleSection | null = null;

  for (const p of paragraphs) {
    const block = toRichBlock(p);
    if (block.type === "heading") {
      if (current) sections.push(current);
      const id = toHeadingId(block.content, sections.length);
      current = { heading: block.content, id, paragraphs: [] };
    } else if (current) {
      current.paragraphs.push(p);
    } else {
      intro.push(p);
    }
  }
  if (current) sections.push(current);
  return { intro, sections };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getColumnArticle(slug);
  if (!article) return {};
  const override = ARTICLE_METADATA[slug];
  if (override) return override;
  return {
    title: `${article.title} - ルミナ`,
    description: article.lead,
  };
}

export default async function ColumnDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const maybeArticle = getColumnArticle(slug);
  if (!maybeArticle) {
    notFound();
  }
  const article = maybeArticle;

  const isMember = true;
  const content = getColumnDisplayContent(article, isMember);
  const rawParagraphs = [...content.preview, ...(content.showFull ? content.full : [])];
  const leadNormalized = normalizeText(article.lead);
  const paragraphs = rawParagraphs.reduce<string[]>((acc, paragraph) => {
    const normalized = normalizeText(paragraph);
    if (!normalized) return acc;
    if (normalized === leadNormalized) return acc;
    const prev = acc[acc.length - 1];
    if (prev && normalizeText(prev) === normalized) return acc;
    acc.push(paragraph);
    return acc;
  }, []);
  const baseBodyParagraphs = paragraphs;
  let affirmation = baseBodyParagraphs[baseBodyParagraphs.length - 1] ?? article.lead;
  let bodyParagraphs = baseBodyParagraphs;

  const todayLabelIndex = baseBodyParagraphs.findIndex(
    (paragraph) => isTodayPhraseLabel(paragraph) || paragraph.includes("今日のひとこと")
  );
  if (todayLabelIndex >= 0) {
    const next = baseBodyParagraphs[todayLabelIndex + 1];
    if (next && normalizeText(next)) {
      affirmation = next;
    }
    bodyParagraphs = baseBodyParagraphs.filter((_, index) => index !== todayLabelIndex && index !== todayLabelIndex + 1);
  }

  const affirmationNormalized = normalizeComparableText(affirmation);
  if (affirmationNormalized) {
    bodyParagraphs = bodyParagraphs.filter((paragraph, index) => {
      if (
        slug !== "fuan-yoru" &&
        slug !== "when-wishes-dont-come-true" &&
        slug !== "negai-kanawanai" &&
        slug !== "uranai-ataru-chigai" &&
        slug !== "hikiyose-negai"
      ) {
        return true;
      }
      const normalized = normalizeComparableText(paragraph);
      const isTrailingDuplicate = index === bodyParagraphs.length - 1 && normalized === affirmationNormalized;
      const isBrokenTodayLabel = slug === "hikiyose-negai" && normalized.includes("莉頑律縺ｮ縺ｲ縺ｨ縺薙→");
      return !(isTrailingDuplicate || isBrokenTodayLabel);
    });
  }

  const readMinutes = article.readMinutes ?? estimateReadMinutes(paragraphs.length > 0 ? paragraphs : rawParagraphs);
  const related = listColumnArticles(article.category)
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  const jsonLd = ARTICLE_JSONLD[slug];

  // Group body paragraphs into intro (before first h2) and sections (each h2 + its content)
  const { intro, sections } = groupIntoSections(bodyParagraphs);
  const tocHeadings = sections.map((s) => ({ id: s.id, text: s.heading }));

  // Helper to render a single paragraph block
  function renderBlock(paragraph: string, index: number, totalCount: number) {
    const calloutType = getCalloutType(paragraph);
    const block = toRichBlock(paragraph);

    if (calloutType) {
      return (
        <div
          key={`${article.slug}-callout-${index}`}
          className="my-6 rounded-xl border border-[#d8c8ab]/60 bg-white/70 p-5 shadow-[0_8px_20px_-16px_rgba(82,69,53,0.2)]"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a8a72]">
            {CALLOUT_LABELS[calloutType]}
          </p>
          <p className="mt-2.5 text-[1rem] leading-[2.1] text-[#3a342c]">{paragraph}</p>
        </div>
      );
    }

    if (block.type === "subheading") {
      return (
        <h3
          key={`${article.slug}-sub-${index}`}
          className="rounded-lg border-l-[3px] border-[#d4c4a8] bg-[#f5eddf]/80 px-4 py-2.5 text-[1rem] font-semibold leading-relaxed text-[#3a332a]"
        >
          {block.content}
        </h3>
      );
    }

    if (block.type === "quote") {
      const isClosingQuote = false;
      return (
        <div key={`${article.slug}-quote-${index}`}>
          <blockquote className="rounded-xl border-l-[3px] border-[#c9a96e]/70 bg-[#fdf8ee] px-5 py-4 text-[0.95rem] italic leading-[2.2] text-[#4a4239]">
            {block.content.split("\n").map((line, li) => (
              <p key={`${article.slug}-ql-${index}-${li}`}>{line}</p>
            ))}
          </blockquote>
          {isClosingQuote ? (
            <div className="mt-4">
              <LuminaLinkButton href="/consultation" tone="secondary" className="px-5">
                個人鑑定を依頼する
              </LuminaLinkButton>
            </div>
          ) : null}
        </div>
      );
    }

    // タロットカードのイラストを本文前にインライン挿入
    type InlineCard = { src: string; alt: string } | null;
    let inlineCard: InlineCard = null;
    if (slug === "dekiai-sareru-josei" && block.content.startsWith("タロットの「力」のカードには")) {
      inlineCard = { src: "/gazou/column/dekiai/666bc71f-1ad8-4731-9421-16057ab7d9f4.png", alt: "タロットカード「力」──優しく手を添えて猛獣を手なずける女性" };
    } else if (slug === "suki-to-shuchaku-no-chigai" && block.content.startsWith("タロットに「硬貨の5」というカード")) {
      inlineCard = { src: "/gazou/column/syucyaku/026e387b-3c50-44ce-acf9-042ae3831b81.png", alt: "タロットカード「硬貨の5」──すぐ後ろにある光に気づけない二人" };
    } else if (slug === "suki-to-shuchaku-no-chigai" && block.content.startsWith("タロットに「悪魔」というカード")) {
      inlineCard = { src: "/gazou/column/syucyaku/a16574bf-633e-47e9-8b98-fcc7853884c2.png", alt: "タロットカード「悪魔」──自分から鎖を握りしめている" };
    }

    return (
      <div key={`${article.slug}-p-${index}`}>
        {inlineCard ? (
          <div className="my-6 flex justify-center">
            <div className="w-[180px] overflow-hidden rounded-xl border border-[#d8c8ab]/50 shadow-[0_10px_24px_-16px_rgba(82,69,53,0.22)] sm:w-[220px]">
              <Image
                src={inlineCard.src}
                alt={inlineCard.alt}
                width={220}
                height={330}
                className="h-auto w-full"
              />
            </div>
          </div>
        ) : null}
        <p className="text-[1rem] leading-[2.2] text-[#3a342c]">{renderInlineMarkdown(block.content)}</p>
        {shouldShowConsultationButton(article.slug, block.content) ? (
          <div className="mt-3">
            <LuminaLinkButton href="/consultation" tone="secondary" className="px-5">
              個人鑑定を依頼する
            </LuminaLinkButton>
          </div>
        ) : null}
      </div>
    );
  }

  const categoryLabel = CATEGORY_DISPLAY[article.category] ?? article.category;

  return (
    <PageShell maxWidth="narrow" showBottomHomeButton={false}>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <div className="mx-auto max-w-[700px]">
        {/* Breadcrumb */}
        <nav className="mb-5 flex items-center gap-1.5 text-[12px] text-[#a09484]">
          <Link href="/" className="transition hover:text-[#6f6556]">トップ</Link>
          <span aria-hidden>/</span>
          <Link href="/columns" className="transition hover:text-[#6f6556]">羽根ペンの部屋</Link>
          <span aria-hidden>/</span>
          <span className="text-[#6f6556]">{article.title.length > 20 ? `${article.title.slice(0, 20)}...` : article.title}</span>
        </nav>

        {/* Article Header Card */}
        <header className="mb-6 overflow-hidden rounded-2xl border border-[#d8c8ab]/50 bg-white/85 shadow-[0_14px_32px_-20px_rgba(82,69,53,0.16)] backdrop-blur">
          {/* Eyecatch / Hero Image */}
          {article.heroImage ? (
            <div className="aspect-[16/9] overflow-hidden">
              <Image
                src={article.heroImage}
                alt={article.title}
                width={700}
                height={394}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex rounded-full border border-[#d8c8ab]/70 bg-[#fff8ed] px-3 py-0.5 text-[11px] font-semibold tracking-[0.08em] text-[#7f725f]">
                {categoryLabel}
              </span>
              <span className="text-[12px] text-[#b5a48e]">·</span>
              <span className="text-[12px] tracking-wide text-[#b5a48e]">
                約{readMinutes}分
              </span>
            </div>

            <h1 className="mt-4 text-[1.55rem] font-bold leading-[1.45] tracking-tight text-[#1e1a16] sm:text-[1.8rem]">
              {article.title}
            </h1>

            <div className="mt-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-[#d4c4a8]/50 to-transparent" />
              <span className="text-[10px] text-[#c9a96e]">✦</span>
              <div className="h-px flex-1 bg-gradient-to-l from-[#d4c4a8]/50 to-transparent" />
            </div>

            <p className="mt-5 text-[1rem] leading-[2] text-[#4a4139]">{article.lead}</p>
          </div>
        </header>

        {/* Introduction paragraphs (before first h2) */}
        {intro.length > 0 ? (
          <div className="mb-6 rounded-2xl border border-[#e1d5bf]/40 bg-white/80 p-6 shadow-[0_8px_20px_-16px_rgba(82,69,53,0.1)] backdrop-blur sm:p-8">
            <div className="space-y-[1.8em]">
              {intro.map((p, i) => renderBlock(p, i, intro.length))}
            </div>
          </div>
        ) : null}

        {/* Table of Contents */}
        {tocHeadings.length > 0 ? (
          <div className="mb-8">
            <TableOfContents headings={tocHeadings} />
          </div>
        ) : null}

        {/* Article Body Sections */}
        <article>
          {sections.map((section, sectionIndex) => {
            const sectionImage = article.sectionImages?.[sectionIndex];
            return (
              <div key={section.id} className="mb-6">
                {/* Section divider or image between sections */}
                {sectionImage ? (
                  <div className="mb-6 overflow-hidden rounded-2xl shadow-[0_10px_24px_-20px_rgba(82,69,53,0.18)]">
                    <Image
                      src={sectionImage.src}
                      alt={sectionImage.alt}
                      width={700}
                      height={394}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                ) : sectionIndex > 0 ? (
                  <div className="mb-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4c4a8]/45 to-transparent" />
                    <span className="text-[10px] text-[#c9a96e]/70">✦</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4c4a8]/45 to-transparent" />
                  </div>
                ) : null}

                {/* Section card with background */}
                <section className="rounded-2xl border border-[#e1d5bf]/40 bg-white/80 p-6 shadow-[0_8px_20px_-16px_rgba(82,69,53,0.1)] backdrop-blur sm:p-8">
                  {/* h2 heading with anchor */}
                  <h2
                    id={section.id}
                    className="-mx-6 mb-6 scroll-mt-20 border-l-[3px] border-[#c9a96e] bg-[linear-gradient(90deg,#f5eddf,#faf6ef_70%,transparent)] px-6 py-3 text-[1.2rem] font-semibold leading-[1.5] tracking-tight text-[#2f2924] sm:-mx-8 sm:px-8 sm:text-[1.35rem]"
                  >
                    {section.heading}
                  </h2>

                  {/* Section body */}
                  <div className="space-y-[1.8em]">
                    {section.paragraphs.map((p, pi) => renderBlock(p, pi, section.paragraphs.length))}
                  </div>
                </section>
              </div>
            );
          })}
        </article>

        {/* 今日のひとこと + CTA統合 */}
        <section className="mb-6 rounded-2xl border border-[#d8c8ab]/50 bg-[linear-gradient(160deg,rgba(253,247,234,0.9),rgba(255,252,245,0.85))] p-6 shadow-[0_12px_28px_-20px_rgba(82,69,53,0.18)] sm:p-8">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4c4a8]/40 to-transparent" />
            <p className="text-[11px] font-bold tracking-[0.22em] text-[#9a8a72]">
              今日のひとこと
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4c4a8]/40 to-transparent" />
          </div>
          <p className="mt-4 text-center text-[1rem] italic leading-[2] text-[#5a4f42]">{affirmation}</p>

          {/* CTA buttons integrated */}
          {(slug === "kidoku-yoru" || slug === "renraku-matsu" || slug === "unmei-sign" || slug === "renai-tenki" || slug === "shitsuren-anata" || slug === "enkyori-aenai-fuan") && (
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <LuminaLinkButton href="/uranai/kataomoi" tone="primary" className="px-5">
                あなたの恋の流れを見てみる（片思い占い）
              </LuminaLinkButton>
              <LuminaLinkButton href="/uranai/kare-no-kimochi" tone="secondary" className="px-5">
                あの人の本音を読み解く（あの人の気持ち占い）
              </LuminaLinkButton>
            </div>
          )}
          {(slug === "kidokumushi-dansei" || slug === "sukinanoni-renraku-shinai" || slug === "honki-koudou" || slug === "toshishita-dansei-honki-sign" || slug === "dansei-tsumetaku-naru-riyuu") && (
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <LuminaLinkButton href="/uranai/kare-no-kimochi" tone="primary" className="px-5">
                あの人の本音を読み解く（あの人の気持ち占い）
              </LuminaLinkButton>
              <LuminaLinkButton href="/uranai/kataomoi" tone="secondary" className="px-5">
                あなたの恋の流れを見てみる（片思い占い）
              </LuminaLinkButton>
            </div>
          )}
          {(slug === "suki-to-shuchaku-no-chigai" || slug === "myakuari-sign" || slug === "sukisake-dansei") && (
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <LuminaLinkButton href="/uranai/kare-no-kimochi" tone="primary" className="px-5">
                あの人の本音を読み解く（あの人の気持ち占い）
              </LuminaLinkButton>
              <LuminaLinkButton href="/compatibility" tone="secondary" className="px-5">
                ふたりの相性を見てみる（相性占い）
              </LuminaLinkButton>
            </div>
          )}
          {(slug === "dekiai-sareru-josei" || slug === "aishou-couple") && (
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <LuminaLinkButton href="/compatibility" tone="primary" className="px-5">
                ふたりの相性を見てみる（相性占い）
              </LuminaLinkButton>
              <LuminaLinkButton href="/uranai/kare-no-kimochi" tone="secondary" className="px-5">
                あの人の本音を読み解く（あの人の気持ち占い）
              </LuminaLinkButton>
            </div>
          )}
          {(slug === "motokare-kimochi" || slug === "wakare-danjo-shinri" || slug === "motokare-renraku-zenchou") && (
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <LuminaLinkButton href="/uranai/fukuen" tone="primary" className="px-5">
                復縁の可能性を見てみる（復縁占い）
              </LuminaLinkButton>
              <LuminaLinkButton href="/uranai/kare-no-kimochi" tone="secondary" className="px-5">
                あの人の本音を読み解く（あの人の気持ち占い）
              </LuminaLinkButton>
            </div>
          )}
        </section>

        {/* 個人鑑定への導線（全コラム共通） */}
        <section className="mb-6 rounded-2xl border border-[#d8cde7]/50 bg-[linear-gradient(160deg,rgba(250,246,255,0.88),rgba(244,236,252,0.82))] p-6 shadow-[0_12px_28px_-20px_rgba(95,79,128,0.18)] sm:p-8">
          <p className="text-center text-[0.92rem] leading-relaxed text-[#5f5472]">
            もっと深く、あなただけの鑑定を受けたいときは
          </p>
          <p className="mt-2 text-center text-[0.82rem] leading-relaxed text-[#8a7d96]">
            ルミナが一対一であなたの状況を読み解く個人鑑定もご用意しています。
          </p>
          <div className="mt-5 text-center">
            <LuminaLinkButton href="/consultation" tone="secondary" className="px-6">
              個人鑑定の詳細を見る
            </LuminaLinkButton>
          </div>
        </section>

        {/* Related columns */}
        {RELATED_COLUMNS[slug] ? (
          <section className="mb-6 rounded-2xl border border-[#e1d5bf]/50 bg-white/60 p-6 shadow-[0_12px_28px_-20px_rgba(82,69,53,0.14)] backdrop-blur sm:p-8">
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#c9a96e]">✦</span>
              <h2 className="text-[0.95rem] font-semibold tracking-wide text-[#4e453a]">関連コラム</h2>
            </div>
            <div className="mt-4 grid gap-2.5">
              {RELATED_COLUMNS[slug].map((item) => (
                <Link
                  key={item.slug}
                  href={`/columns/${item.slug}`}
                  className="group rounded-xl border border-[#e1d5bf]/40 bg-[#fdfaf4]/70 px-4 py-3.5 transition hover:border-[#d4c4a8]/60 hover:bg-[#fff8ed]/90"
                >
                  <p className="text-[0.85rem] font-medium leading-relaxed text-[#4e453a] transition group-hover:text-[#2e2a26]">{item.title}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* Next to read */}
        {related.length > 0 ? (
          <section className="mb-6 rounded-2xl border border-[#e1d5bf]/50 bg-white/60 p-6 shadow-[0_12px_28px_-20px_rgba(82,69,53,0.14)] backdrop-blur sm:p-8">
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#c9a96e]">✦</span>
              <h2 className="text-[0.95rem] font-semibold tracking-wide text-[#4e453a]">次に読む</h2>
            </div>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/columns/${item.slug}`}
                  className="group rounded-xl border border-[#e1d5bf]/40 bg-[#fdfaf4]/70 px-4 py-3.5 transition hover:border-[#d4c4a8]/60 hover:bg-[#fff8ed]/90"
                >
                  <p className="text-[11px] font-medium tracking-wide text-[#a09484]">{CATEGORY_DISPLAY[item.category] ?? item.category}</p>
                  <p className="mt-1 text-[0.85rem] font-medium leading-relaxed text-[#4e453a] transition group-hover:text-[#2e2a26]">{item.title}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* Bottom navigation */}
        <div className="flex items-center justify-center gap-4 pb-1">
          <LuminaLinkButton href="/columns" tone="secondary" className="px-6">
            羽根ペンの部屋に戻る
          </LuminaLinkButton>
          <LuminaLinkButton href="/" tone="secondary" className="px-6">
            トップへ戻る
          </LuminaLinkButton>
        </div>
      </div>
    </PageShell>
  );
}
