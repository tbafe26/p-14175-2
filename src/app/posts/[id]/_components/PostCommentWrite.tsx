"use client";

import { buttonClass } from "@/components/ui/button";
import type { usePostComments } from "@/hooks/usePostComments";
import { toErrorMessage } from "@/lib/backend/client";
import { POST_COMMENT_CONTENT_RULE, validateText } from "@/lib/validation";
import { useState } from "react";

export function PostCommentWrite({
  postCommentsState,
}: {
  postCommentsState: ReturnType<typeof usePostComments>;
}) {
  const { writeComment } = postCommentsState;
  const [length, setLength] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const contentTextarea = form.elements.namedItem(
      "content",
    ) as HTMLTextAreaElement;

    contentTextarea.value = contentTextarea.value.trim();
    setLength(contentTextarea.value.length);

    const contentError = validateText(
      "댓글 내용",
      contentTextarea.value,
      POST_COMMENT_CONTENT_RULE,
    );
    setError(contentError);

    if (contentError) return contentTextarea.focus();

    setSubmitting(true);

    writeComment(contentTextarea.value)
      .then((rsData) => {
        alert(rsData.msg);
        // 작성이 끝나면 입력 칸을 비워 이어서 쓸 수 있게 한다.
        form.reset();
        setLength(0);
      })
      .catch((e) => setError(toErrorMessage(e)))
      .finally(() => setSubmitting(false));
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="rounded-2xl border border-grey-200 bg-white transition-colors focus-within:border-primary has-[[aria-invalid=true]]:border-danger">
        <textarea
          className="block w-full resize-none rounded-2xl bg-transparent px-4 pt-3 text-[15px] leading-relaxed outline-none placeholder:text-grey-400"
          name="content"
          placeholder="댓글을 남겨 보세요"
          rows={3}
          maxLength={POST_COMMENT_CONTENT_RULE.max}
          aria-invalid={error != null}
          onChange={(e) => setLength(e.currentTarget.value.length)}
        />
        <div className="flex items-center justify-between px-4 pb-3">
          <span className="text-sm text-grey-500">
            {length}/{POST_COMMENT_CONTENT_RULE.max}
          </span>
          <button
            type="submit"
            className={buttonClass("primary", "sm")}
            disabled={submitting}
          >
            {submitting ? "등록 중..." : "등록"}
          </button>
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-danger">{error}</p>}
    </form>
  );
}
