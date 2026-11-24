"use client";

import type { usePostComments } from "@/hooks/usePostComments";
import { PostCommentForm } from "./PostCommentForm";

export function PostCommentWrite({
  postCommentsState,
}: {
  postCommentsState: ReturnType<typeof usePostComments>;
}) {
  const { writeComment: _writeComment } = postCommentsState;

  const writeComment = (content: string) =>
    _writeComment(content).then((rsData) => alert(rsData.msg));

  return (
    <PostCommentForm
      submitLabel="등록"
      onSubmit={writeComment}
      // 작성이 끝나면 입력 칸을 비워 이어서 쓸 수 있게 한다.
      resetOnSuccess
    />
  );
}
