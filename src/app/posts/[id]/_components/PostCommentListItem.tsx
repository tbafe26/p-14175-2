"use client";

import { buttonClass } from "@/components/ui/button";
import type { usePostComments } from "@/hooks/usePostComments";
import { toErrorMessage } from "@/lib/backend/client";
import { formatDate } from "@/lib/format";
import type { PostCommentDto } from "@/types/post";
import { useState } from "react";
import { PostCommentForm } from "./PostCommentForm";

// 댓글 한 개. 항목 단위 상호작용(수정, 삭제)과 그 상태를 이 컴포넌트 안에 가둔다.
export function PostCommentListItem({
  comment,
  postCommentsState,
}: {
  comment: PostCommentDto;
  postCommentsState: ReturnType<typeof usePostComments>;
}) {
  const { deleteComment: _deleteComment } = postCommentsState;
  const [deleting, setDeleting] = useState(false);
  // true 이면 댓글 내용 대신 수정 폼을 보여 준다. 항목마다 따로 가지는 상태다.
  const [modifyMode, setModifyMode] = useState(false);

  const toggleModifyMode = () => setModifyMode(!modifyMode);

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

  // 수정 API 연결은 다음 단계에서 한다. 지금은 검사를 통과해도 아무 요청도 보내지 않는다.
  const modifyComment = () => Promise.resolve();

  return (
    <li className="flex items-start gap-3 rounded-2xl bg-grey-50 px-5 py-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-sm text-grey-500">
          <span className="font-semibold text-grey-700">#{comment.id}</span>
          <span>{formatDate(comment.createDate)}</span>
        </div>

        {!modifyMode && (
          <p className="mt-2 text-[15px] leading-relaxed break-all whitespace-pre-line text-grey-800">
            {comment.content}
          </p>
        )}

        {modifyMode && (
          <div className="mt-3">
            <PostCommentForm
              defaultValue={comment.content}
              placeholder="수정할 내용을 입력해주세요"
              submitLabel="저장"
              onSubmit={modifyComment}
              onCancel={toggleModifyMode}
              autoFocus
            />
          </div>
        )}
      </div>

      {/* 수정 중에는 폼의 취소/저장 버튼만 남겨 어떤 버튼을 눌러야 할지 헷갈리지 않게 한다. */}
      {!modifyMode && (
        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            className={buttonClass("ghost", "sm")}
            onClick={toggleModifyMode}
            disabled={deleting}
            aria-label={`${comment.id}번 댓글 수정`}
          >
            수정
          </button>
          <button
            type="button"
            className={buttonClass("ghost", "sm")}
            onClick={deleteComment}
            disabled={deleting}
            aria-label={`${comment.id}번 댓글 삭제`}
          >
            {deleting ? "삭제 중..." : "삭제"}
          </button>
        </div>
      )}
    </li>
  );
}
