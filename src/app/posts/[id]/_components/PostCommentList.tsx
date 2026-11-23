"use client";

import { ErrorState } from "@/components/ui/error-state";
import type { usePostComments } from "@/hooks/usePostComments";
import { formatDate } from "@/lib/format";
import type { PostCommentDto } from "@/types/post";

type PostCommentsState = ReturnType<typeof usePostComments>;

export function PostCommentList({
  postCommentsState,
}: {
  postCommentsState: PostCommentsState;
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
        <PostCommentListItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}

function PostCommentListItem({ comment }: { comment: PostCommentDto }) {
  return (
    <li className="rounded-2xl bg-grey-50 px-5 py-4">
      <div className="flex items-center gap-2 text-sm text-grey-500">
        <span className="font-semibold text-grey-700">#{comment.id}</span>
        <span>{formatDate(comment.createDate)}</span>
      </div>
      <p className="mt-2 text-[15px] leading-relaxed break-all whitespace-pre-line text-grey-800">
        {comment.content}
      </p>
    </li>
  );
}
