"use client";

import { PostForm } from "@/components/post/PostForm";
import { apiFetch, type RsData } from "@/lib/backend/client";
import type { PostDto, PostWriteReqBody } from "@/types/post";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const writePost = (body: PostWriteReqBody) =>
    apiFetch<RsData<PostDto>>("/api/v1/posts", {
      method: "POST",
      body: JSON.stringify(body),
    }).then((rsData) => {
      alert(rsData.msg);
      // 작성 완료 후 뒤로 가기로 다시 작성 폼에 돌아오지 않도록 replace 로 이동한다.
      router.replace(`/posts/${rsData.data.id}`);
    });

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12">
      <Link
        href="/posts"
        className="text-[15px] font-medium text-grey-600 hover:text-grey-900"
      >
        ← 글 목록
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight">글쓰기</h1>

      <div className="mt-8">
        <PostForm submitLabel="작성하기" onSubmit={writePost} />
      </div>
    </div>
  );
}
