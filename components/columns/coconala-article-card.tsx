import Image from "next/image";

type CoconalaArticleCardProps = {
  href: string;
  title: string;
  description: string;
  image: string;
};

/**
 * ココナラ記事へのリンクカード（OGP風の埋め込み）。
 * 本文中の特定の組み合わせの下に差し込んで、該当の深掘り鑑定書へ誘導する。
 */
export function CoconalaArticleCard({ href, title, description, image }: CoconalaArticleCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="my-5 flex items-stretch overflow-hidden rounded-xl border border-[#e1d5bf]/70 bg-white/85 shadow-[0_8px_20px_-16px_rgba(82,69,53,0.22)] transition hover:border-[#d4c4a8]/80 hover:bg-[#fff8ed]/90 hover:shadow-[0_12px_28px_-16px_rgba(82,69,53,0.32)]"
    >
      <div className="flex min-w-0 flex-1 flex-col justify-center p-4">
        <p className="line-clamp-2 text-[0.9rem] font-bold leading-snug text-[#4e453a]">{title}</p>
        <p className="mt-1.5 line-clamp-2 text-[0.76rem] leading-relaxed text-[#9a8d7d]">{description}</p>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="inline-block h-3.5 w-3.5 rounded-[3px] bg-[#f25c05]" aria-hidden />
          <span className="text-[0.72rem] tracking-wide text-[#b3a795]">coconala.com</span>
        </div>
      </div>
      <div className="relative w-[112px] shrink-0 sm:w-[160px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="160px"
          className="object-cover"
        />
      </div>
    </a>
  );
}
