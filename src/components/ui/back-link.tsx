import Link from "next/link";

// 페이지 맨 위의 "← 이전 화면" 링크
export function BackLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-[15px] font-medium text-grey-600 hover:text-grey-900"
    >
      ← {children}
    </Link>
  );
}
