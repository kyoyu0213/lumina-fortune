// オーラカラー診断のテーマ背景（オーバーレイ）。
// サイト共通の背景画像（/main_back.png）を覆い隠さないよう、不透明な下地は敷かず、
// 淡いゴールド＆虹色のveilだけを薄く重ねて「明るく神秘的」な雰囲気を作る。
export function AuraBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(246,193,209,0.18),transparent_42%),radial-gradient(circle_at_85%_12%,rgba(214,196,236,0.18),transparent_44%),radial-gradient(circle_at_50%_100%,rgba(188,210,240,0.16),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,248,0.22),rgba(247,241,230,0.12))]" />
    </div>
  );
}
