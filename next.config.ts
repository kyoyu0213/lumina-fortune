import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SUPABASE_URL → NEXT_PUBLIC_SUPABASE_URL へのフォールバック
  // Vercel に NEXT_PUBLIC_SUPABASE_URL がなくても SUPABASE_URL があれば
  // ビルド時にクライアントバンドルへインライン化される
  env: {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "",
  },
};

export default nextConfig;
