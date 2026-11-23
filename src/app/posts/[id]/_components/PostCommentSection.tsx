"use client";

import type { usePostComments } from "@/hooks/usePostComments";
import { PostCommentList } from "./PostCommentList";

// 글 상세 하단의 댓글 영역. 댓글 개수 제목과 목록을 묶는다.
export function PostCommentSection({
  postCommentsState,
}: {
  postCommentsState: ReturnType<typeof usePostComments>;
}) {
  const { postComments } = postCommentsState;

  return (
    <section className="mt-12 border-t border-grey-100 pt-10">
      <h2 className="text-xl font-bold">
        댓글
        {postComments != null && (
          <span className="ml-1.5 text-primary">{postComments.length}</span>
        )}
      </h2>

      <div className="mt-5">
        <PostCommentList postCommentsState={postCommentsState} />
      </div>
    </section>
  );
}
