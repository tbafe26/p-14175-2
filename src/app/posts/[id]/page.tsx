"use client";

import { usePost } from "@/hooks/usePost";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PostInfo } from "./_components/PostInfo";

export default function Page() {
  // path 파라미터는 항상 문자열로 들어오므로 숫자로 바꿔 쓴다.
  const { id: idStr } = useParams<{ id: string }>();
  const id = Number(idStr);

  const postState = usePost(id);

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12">
      <Link
        href="/posts"
        className="text-[15px] font-medium text-grey-600 hover:text-grey-900"
      >
        ← 글 목록
      </Link>

      <div className="mt-6">
        <PostInfo postState={postState} />
      </div>
    </div>
  );
}
