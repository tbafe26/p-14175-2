"use client";

import { ErrorState } from "@/components/ui/error-state";
import type { usePostComments } from "@/hooks/usePostComments";
import { PostCommentListItem } from "./PostCommentListItem";

export function PostCommentList({
  postCommentsState,
}: {
  postCommentsState: ReturnType<typeof usePostComments>;
}) {
  const { postComments, error } = postCommentsState;

  if (error != null) return <ErrorState message={error} />;

  if (postComments == null) {
    return (
      <div className="flex animate-pulse flex-col gap-3" aria-busy>
        <div className="h-16 rounded-2xl bg-grey-100" />
        <div className="h-16 rounded-2xl bg-grey-100" />
      </div>
    );
  }

  if (postComments.length === 0) {
    return (
      <p className="rounded-2xl bg-grey-50 px-5 py-8 text-center text-[15px] text-grey-600">
        아직 댓글이 없어요.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {postComments.map((comment) => (
        <PostCommentListItem
          key={comment.id}
          comment={comment}
          postCommentsState={postCommentsState}
        />
      ))}
    </ul>
  );
}
