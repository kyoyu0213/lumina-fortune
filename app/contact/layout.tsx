import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | 白の館 LUMINA",
  description:
    "白の館 LUMINA へのお問い合わせフォーム。ご質問・ご感想・不具合のご連絡などをお寄せいただけます。",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "お問い合わせ | 白の館 LUMINA",
    description: "白の館 LUMINA へのお問い合わせフォーム。",
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
