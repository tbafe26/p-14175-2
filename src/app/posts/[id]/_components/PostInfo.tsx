"use client";

import { ErrorState } from "@/components/ui/error-state";
import type { usePost } from "@/hooks/usePost";
import { formatDate } from "@/lib/format";

export function PostInfo({
  postState,
}: {
  // 훅의 반환 타입을 그대로 받아, 훅이 바뀌어도 매개변수 타입을 따로 고칠 필요가 없게 한다.
  postState: ReturnType<typeof usePost>;
}) {
  const { post, error } = postState;

  if (error != null) return <ErrorState message={error} />;

  if (post == null) return <PostInfoSkeleton />;

  const modified = post.modifyDate !== post.createDate;

  return (
    <article>
      <span className="text-sm font-semibold text-primary">#{post.id}</span>
      <h1 className="mt-2 text-3xl leading-snug font-bold tracking-tight break-all">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-grey-500">
        {formatDate(post.createDate)}
        {modified && ` · 수정됨 ${formatDate(post.modifyDate)}`}
      </p>

      <div className="mt-8 text-[17px] leading-relaxed break-all whitespace-pre-line text-grey-800">
        {post.content}
      </div>
    </article>
  );
}

function PostInfoSkeleton() {
  return (
    <div className="animate-pulse" aria-busy>
      <div className="h-4 w-10 rounded bg-grey-100" />
      <div className="mt-3 h-9 w-2/3 rounded bg-grey-100" />
      <div className="mt-3 h-4 w-40 rounded bg-grey-100" />
      <div className="mt-8 h-24 rounded-2xl bg-grey-100" />
    </div>
  );
}
