import { buttonClass } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    title: "글 목록과 상세",
    description: "백엔드의 글 다건/단건 조회 API 를 불러와 목록과 본문을 보여줍니다.",
  },
  {
    title: "글 작성 · 수정 · 삭제",
    description: "폼 입력값을 검사한 뒤 API 를 호출하고, 결과 메시지를 바로 알려줍니다.",
  },
  {
    title: "댓글",
    description: "글 상세에서 댓글을 보고, 쓰고, 지울 수 있습니다. 새로고침 없이 반영됩니다.",
  },
];

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-5 pt-20 pb-16 sm:pt-28">
        <span className="rounded-full bg-primary-weak px-3 py-1 text-sm font-semibold text-primary">
          Next.js × Spring Boot
        </span>
        <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
          생각을 기록하고,
          <br />
          함께 이야기하는 게시판
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-grey-600">
          REST API 로 글과 댓글을 주고받는 간단한 게시판입니다. 지금 올라온 글을
          둘러보거나 새 글을 남겨 보세요.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/posts" className={buttonClass("primary", "lg")}>
            글 목록 보기
          </Link>
          <Link href="/posts/write" className={buttonClass("grey", "lg")}>
            글쓰기
          </Link>
        </div>
      </section>

      <section className="bg-grey-50">
        <ul className="mx-auto grid w-full max-w-5xl gap-4 px-5 py-16 sm:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.title} className="rounded-2xl bg-white p-6">
              <h2 className="text-lg font-bold">{feature.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-grey-600">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
