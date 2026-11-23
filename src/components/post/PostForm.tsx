"use client";

import { buttonClass } from "@/components/ui/button";
import { toErrorMessage } from "@/lib/backend/client";
import {
  POST_CONTENT_RULE,
  POST_TITLE_RULE,
  validateText,
} from "@/lib/validation";
import type { PostWriteReqBody } from "@/types/post";
import { useState } from "react";

type FieldErrors = Partial<Record<keyof PostWriteReqBody, string>>;

const inputClass =
  "w-full rounded-xl border border-grey-200 bg-white px-4 py-3 text-[16px] outline-none transition-colors placeholder:text-grey-400 focus:border-primary aria-invalid:border-danger";

// 글 작성/수정이 함께 쓰는 폼. 입력 검사와 요청 중 상태를 맡고, 실제 API 호출은 onSubmit 에 맡긴다.
export function PostForm({
  initialValue,
  submitLabel,
  onSubmit,
}: {
  initialValue?: PostWriteReqBody;
  submitLabel: string;
  onSubmit: (body: PostWriteReqBody) => Promise<unknown>;
}) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const contentTextarea = form.elements.namedItem(
      "content",
    ) as HTMLTextAreaElement;

    // 앞뒤 공백만 있는 입력은 빈 값으로 본다.
    titleInput.value = titleInput.value.trim();
    contentTextarea.value = contentTextarea.value.trim();

    const nextErrors: FieldErrors = {};
    const titleError = validateText("제목", titleInput.value, POST_TITLE_RULE);
    const contentError = validateText(
      "내용",
      contentTextarea.value,
      POST_CONTENT_RULE,
    );
    if (titleError) nextErrors.title = titleError;
    if (contentError) nextErrors.content = contentError;

    setErrors(nextErrors);
    setSubmitError(null);

    // 첫 번째로 잘못된 칸에 커서를 둔다.
    if (titleError) return titleInput.focus();
    if (contentError) return contentTextarea.focus();

    setSubmitting(true);

    onSubmit({ title: titleInput.value, content: contentTextarea.value })
      // 성공하면 보통 다른 페이지로 이동하므로 submitting 을 풀지 않는다.
      .catch((error) => {
        setSubmitError(toErrorMessage(error));
        setSubmitting(false);
      });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      <label className="flex flex-col gap-2">
        <span className="text-[15px] font-semibold text-grey-700">제목</span>
        <input
          className={inputClass}
          type="text"
          name="title"
          placeholder="제목을 입력해주세요"
          maxLength={POST_TITLE_RULE.max}
          defaultValue={initialValue?.title}
          aria-invalid={errors.title != null}
          autoFocus
        />
        {errors.title && (
          <span className="text-sm text-danger">{errors.title}</span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[15px] font-semibold text-grey-700">내용</span>
        <textarea
          className={`${inputClass} min-h-72 resize-y leading-relaxed`}
          name="content"
          placeholder="내용을 입력해주세요"
          maxLength={POST_CONTENT_RULE.max}
          defaultValue={initialValue?.content}
          aria-invalid={errors.content != null}
        />
        {errors.content && (
          <span className="text-sm text-danger">{errors.content}</span>
        )}
      </label>

      {submitError && (
        <p
          role="alert"
          className="rounded-xl bg-danger-weak px-4 py-3 text-sm text-danger"
        >
          {submitError}
        </p>
      )}

      <button
        type="submit"
        className={buttonClass("primary", "lg", "w-full")}
        disabled={submitting}
      >
        {submitting ? "저장 중..." : submitLabel}
      </button>
    </form>
  );
}
