"use client";

import { buttonClass } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";
import { PageContainer } from "@/components/ui/page-container";
import { apiFetch, toErrorMessage } from "@/lib/backend/client";
import { formatDate } from "@/lib/format";
import type { PostDto } from "@/types/post";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  // null 이면 아직 불러오는 중, [] 이면 글이 없음. 초기값을 [] 로 두면 둘을 구분할 수 없다.
  const [posts, setPosts] = useState<PostDto[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<PostDto[]>("/api/v1/posts")
      .then(setPosts)
      .catch((e) => setError(toErrorMessage(e)));
  }, []);

  return (
    <PageContainer>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">글 목록</h1>
          <p className="mt-2 text-grey-600">
            {posts == null ? "글을 불러오고 있어요." : `${posts.length}개의 글`}
          </p>
        </div>
        <Link href="/posts/write" className={buttonClass("primary", "md")}>
          글쓰기
        </Link>
      </div>

      <div className="mt-8">
        <PostList posts={posts} error={error} />
      </div>
    </PageContainer>
  );
}

function PostList({
  posts,
  error,
}: {
  posts: PostDto[] | null;
  error: string | null;
}) {
  if (error != null) return <ErrorState message={error} />;

  if (posts == null) return <PostListSkeleton />;

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl bg-grey-50 px-6 py-16 text-center text-grey-600">
        아직 작성된 글이 없어요. 첫 글을 남겨 보세요.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-grey-100 border-y border-grey-100">
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={`/posts/${post.id}`}
            className="group -mx-3 flex flex-col gap-1 rounded-xl px-3 py-5 transition-colors hover:bg-grey-50"
          >
            <span className="text-sm text-grey-500">#{post.id}</span>
            <span className="text-lg font-semibold group-hover:text-primary">
              {post.title}
            </span>
            <span className="line-clamp-1 text-[15px] text-grey-600">
              {post.content}
            </span>
            <span className="text-sm text-grey-500">
              {formatDate(post.createDate)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function PostListSkeleton() {
  return (
    <ul className="divide-y divide-grey-100 border-y border-grey-100" aria-busy>
      {[0, 1, 2].map((i) => (
        <li key={i} className="flex animate-pulse flex-col gap-2 py-5">
          <span className="h-4 w-10 rounded bg-grey-100" />
          <span className="h-5 w-2/3 rounded bg-grey-100" />
          <span className="h-4 w-1/3 rounded bg-grey-100" />
        </li>
      ))}
    </ul>
  );
}
