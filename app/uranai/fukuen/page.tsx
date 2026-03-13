import type { Metadata } from "next";
import FukuenClient from "./fukuen-client";

export const metadata: Metadata = {
  title: "復縁占い｜元彼の気持ちと復縁の可能性をタロットで占う",
  description:
    "復縁占いなら白の魔女ルミナ。光の導きタロットで元彼の気持ちや復縁の可能性、二人の縁の流れをやさしく読み解きます。",
  alternates: {
    canonical: "/uranai/fukuen",
  },
  openGraph: {
    title: "復縁占い｜元彼の気持ちと復縁の可能性をタロットで占う",
    description:
      "復縁占いなら白の魔女ルミナ。光の導きタロットで元彼の気持ちや復縁の可能性、二人の縁の流れをやさしく読み解きます。",
    url: "/uranai/fukuen",
    type: "website",
  },
};

export default function FukuenPage() {
  return <FukuenClient />;
}
