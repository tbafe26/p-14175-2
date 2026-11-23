import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "게시판",
    template: "%s | 게시판",
  },
  description: "스프링부트 REST API 와 연동한 Next.js 게시판",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="antialiased">
      <body className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 border-b border-grey-100 bg-white/90 backdrop-blur">
          <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5">
            <Link href="/" className="text-lg font-bold tracking-tight">
              게시판
            </Link>
            <nav className="flex items-center gap-1 text-[15px] font-medium text-grey-700">
              <Link
                href="/posts"
                className="rounded-lg px-3 py-2 hover:bg-grey-100"
              >
                글 목록
              </Link>
            </nav>
          </div>
        </header>

        {/* 페이지마다 배치가 다르므로 레이아웃은 세로 흐름과 남는 공간 채우기만 맡는다. */}
        <main className="flex flex-1 flex-col">{children}</main>

        <footer className="border-t border-grey-100 bg-grey-50">
          <div className="mx-auto w-full max-w-5xl px-5 py-8 text-sm text-grey-500">
            Next.js · TypeScript · Tailwind CSS 로 만든 게시판 프론트엔드
          </div>
        </footer>
      </body>
    </html>
  );
}
