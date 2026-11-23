"use client";

import { usePost } from "@/hooks/usePost";
import { usePostComments } from "@/hooks/usePostComments";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PostCommentSection } from "./_components/PostCommentSection";
import { PostInfo } from "./_components/PostInfo";

export default function Page() {
  // path 파라미터는 항상 문자열로 들어오므로 숫자로 바꿔 쓴다.
  const { id: idStr } = useParams<{ id: string }>();
  const id = Number(idStr);

  // 상위 컴포넌트에서 훅을 실행하고, 결과 객체를 그대로 하위 컴포넌트에 넘긴다.
  const postState = usePost(id);
  const postCommentsState = usePostComments(id);

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

      {/* 글을 불러온 뒤에만 댓글 영역을 보여 준다(없는 글이면 댓글도 의미가 없다). */}
      {postState.post != null && (
        <PostCommentSection postCommentsState={postCommentsState} />
      )}
    </div>
  );
}
