"use client";

import { PostForm } from "@/components/post/PostForm";
import { BackLink } from "@/components/ui/back-link";
import { ErrorState } from "@/components/ui/error-state";
import { PageContainer } from "@/components/ui/page-container";
import { usePost } from "@/hooks/usePost";
import type { PostWriteReqBody } from "@/types/post";
import { useParams, useRouter } from "next/navigation";

// useParams() 를 쓰지만 상위 [id]/loading.tsx 의 Suspense 경계 안에 있으므로 따로 loading.tsx 가 필요 없다.
export default function Page() {
  const router = useRouter();
  const { id: idStr } = useParams<{ id: string }>();
  const id = Number(idStr);

  const { post, error, modifyPost: _modifyPost } = usePost(id);

  const modifyPost = (body: PostWriteReqBody) =>
    _modifyPost(body).then((rsData) => {
      alert(rsData.msg);
      router.replace(`/posts/${id}`);
    });

  return (
    <PageContainer>
      <BackLink href={`/posts/${id}`}>글로 돌아가기</BackLink>

      <h1 className="mt-6 text-3xl font-bold tracking-tight">{id}번 글 수정</h1>

      <div className="mt-8">
        {error != null && <ErrorState message={error} />}

        {error == null && post == null && (
          <div className="h-96 animate-pulse rounded-2xl bg-grey-100" />
        )}

        {/* 불러온 글이 있을 때만 폼을 그려야 defaultValue 에 기존 값이 들어간다. */}
        {post != null && (
          <PostForm
            initialValue={post}
            submitLabel="수정하기"
            onSubmit={modifyPost}
          />
        )}
      </div>
    </PageContainer>
  );
}
