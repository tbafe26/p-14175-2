"use client";

import { buttonClass } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";
import type { usePostComments } from "@/hooks/usePostComments";
import { toErrorMessage } from "@/lib/backend/client";
import { formatDate } from "@/lib/format";
import type { PostCommentDto } from "@/types/post";
import { useState } from "react";

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
        <PostCommentListItem
          key={comment.id}
          comment={comment}
          postCommentsState={postCommentsState}
        />
      ))}
    </ul>
  );
}

function PostCommentListItem({
  comment,
  postCommentsState,
}: {
  comment: PostCommentDto;
  postCommentsState: PostCommentsState;
}) {
  const { deleteComment: _deleteComment } = postCommentsState;
  const [deleting, setDeleting] = useState(false);

  const deleteComment = () => {
    if (!confirm(`${comment.id}번 댓글을 정말로 삭제하시겠습니까?`)) return;

    setDeleting(true);

    _deleteComment(comment.id)
      // 성공하면 이 항목이 목록에서 사라지므로 deleting 을 되돌릴 필요가 없다.
      .then((rsData) => alert(rsData.msg))
      .catch((e) => {
        alert(toErrorMessage(e));
        setDeleting(false);
      });
  };

  return (
    <li className="flex items-start gap-3 rounded-2xl bg-grey-50 px-5 py-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-sm text-grey-500">
          <span className="font-semibold text-grey-700">#{comment.id}</span>
          <span>{formatDate(comment.createDate)}</span>
        </div>
        <p className="mt-2 text-[15px] leading-relaxed break-all whitespace-pre-line text-grey-800">
          {comment.content}
        </p>
      </div>

      <button
        type="button"
        className={buttonClass("ghost", "sm", "shrink-0")}
        onClick={deleteComment}
        disabled={deleting}
        aria-label={`${comment.id}번 댓글 삭제`}
      >
        {deleting ? "삭제 중..." : "삭제"}
      </button>
    </li>
  );
}
