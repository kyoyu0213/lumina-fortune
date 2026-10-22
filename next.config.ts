import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SUPABASE_URL → NEXT_PUBLIC_SUPABASE_URL へのフォールバック
  // Vercel に NEXT_PUBLIC_SUPABASE_URL がなくても SUPABASE_URL があれば
  // ビルド時にクライアントバンドルへインライン化される
  env: {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "",
  },
  // Vercel Image Cache Writes 削減
  // - 表示幅は最大1200px（2x でも1920pxで足りる）ため 2048/3840 を除外。
  //   元画像の大半は1920px以下で、2048/3840 は 1920 と同一内容の重複キャッシュになっていた
  // - ローカル画像のキャッシュキーは内容ハッシュなので、TTLを延ばしても差し替えは即反映される
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 2678400, // 31日
  },
};

export default nextConfig;
