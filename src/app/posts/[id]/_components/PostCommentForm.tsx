"use client";

import { buttonClass } from "@/components/ui/button";
import { toErrorMessage } from "@/lib/backend/client";
import { POST_COMMENT_CONTENT_RULE, validateText } from "@/lib/validation";
import { useState } from "react";

// 댓글 작성과 수정이 함께 쓰는 입력 폼.
// 입력 검사, 글자 수, 요청 중 상태, 오류 표시를 맡고 실제 API 호출은 onSubmit 에 맡긴다.
export function PostCommentForm({
  defaultValue = "",
  placeholder = "댓글을 남겨 보세요",
  submitLabel,
  onSubmit,
  onCancel,
  resetOnSuccess = false,
  autoFocus = false,
}: {
  defaultValue?: string;
  placeholder?: string;
  submitLabel: string;
  onSubmit: (content: string) => Promise<unknown>;
  // 있으면 취소 버튼을 보여 주고, Esc 키로도 취소할 수 있다.
  onCancel?: () => void;
  // 작성 폼처럼 성공 후 입력 칸을 비워야 하는 경우 true
  resetOnSuccess?: boolean;
  autoFocus?: boolean;
}) {
  const [length, setLength] = useState(defaultValue.length);
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

    onSubmit(contentTextarea.value)
      .then(() => {
        if (!resetOnSuccess) return;

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
          placeholder={placeholder}
          rows={3}
          maxLength={POST_COMMENT_CONTENT_RULE.max}
          defaultValue={defaultValue}
          aria-invalid={error != null}
          autoFocus={autoFocus}
          // 기존 내용이 있는 채로 포커스되면 커서를 맨 끝에 둬 바로 이어서 고칠 수 있게 한다.
          onFocus={(e) => {
            const end = e.currentTarget.value.length;
            e.currentTarget.setSelectionRange(end, end);
          }}
          onChange={(e) => setLength(e.currentTarget.value.length)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && onCancel) onCancel();
          }}
        />
        <div className="flex items-center justify-between gap-2 px-4 pb-3">
          <span className="text-sm text-grey-500">
            {length}/{POST_COMMENT_CONTENT_RULE.max}
          </span>
          <div className="flex gap-1.5">
            {onCancel && (
              <button
                type="button"
                className={buttonClass("grey", "sm")}
                onClick={onCancel}
                disabled={submitting}
              >
                취소
              </button>
            )}
            <button
              type="submit"
              className={buttonClass("primary", "sm")}
              disabled={submitting}
            >
              {submitting ? "저장 중..." : submitLabel}
            </button>
          </div>
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-danger">{error}</p>}
    </form>
  );
}
