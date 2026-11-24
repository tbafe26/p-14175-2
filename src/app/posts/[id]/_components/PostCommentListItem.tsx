"use client";

import { buttonClass } from "@/components/ui/button";
import type { usePostComments } from "@/hooks/usePostComments";
import { toErrorMessage } from "@/lib/backend/client";
import { formatDate } from "@/lib/format";
import type { PostCommentDto } from "@/types/post";
import { useState } from "react";

// 댓글 한 개. 항목 단위 상호작용(삭제, 이후 수정)과 그 상태를 이 컴포넌트 안에 가둔다.
export function PostCommentListItem({
  comment,
  postCommentsState,
}: {
  comment: PostCommentDto;
  postCommentsState: ReturnType<typeof usePostComments>;
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
