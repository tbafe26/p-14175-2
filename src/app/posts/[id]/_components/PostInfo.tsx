"use client";

import { buttonClass } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";
import type { usePost } from "@/hooks/usePost";
import { toErrorMessage } from "@/lib/backend/client";
import { formatDate } from "@/lib/format";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function PostInfo({
  postState,
}: {
  // 훅의 반환 타입을 그대로 받아, 훅이 바뀌어도 매개변수 타입을 따로 고칠 필요가 없게 한다.
  postState: ReturnType<typeof usePost>;
}) {
  const router = useRouter();
  const { post, error, deletePost: _deletePost } = postState;
  // 요청 중 버튼을 막아 두 번 눌러 요청이 중복되지 않게 한다.
  const [deleting, setDeleting] = useState(false);

  if (error != null) return <ErrorState message={error} />;

  if (post == null) return <PostInfoSkeleton />;

  const modified = post.modifyDate !== post.createDate;

  const deletePost = () => {
    if (!confirm(`${post.id}번 글을 정말로 삭제하시겠습니까?`)) return;

    setDeleting(true);

    _deletePost()
      .then((rsData) => {
        alert(rsData.msg);
        // 삭제된 글로 뒤로 가기 할 수 없도록 기록을 남기지 않고 이동한다.
        router.replace("/posts");
      })
      .catch((e) => {
        alert(toErrorMessage(e));
        setDeleting(false);
      });
  };

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

      <div className="mt-10 flex justify-end gap-2">
        <Link
          href={`/posts/${post.id}/edit`}
          className={buttonClass("grey", "md")}
        >
          수정
        </Link>
        <button
          type="button"
          className={buttonClass("danger", "md")}
          onClick={deletePost}
          disabled={deleting}
        >
          {deleting ? "삭제 중..." : "삭제"}
        </button>
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
