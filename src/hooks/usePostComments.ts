"use client";

import { apiFetch, toErrorMessage } from "@/lib/backend/client";
import type { PostCommentDto } from "@/types/post";
import { useEffect, useState } from "react";

// 한 글에 달린 댓글 목록을 불러오고 다루는 훅
export function usePostComments(postId: number) {
  // null 이면 아직 불러오는 중. [] 로 시작하면 "로딩중"과 "댓글 없음"을 구분할 수 없다.
  const [postComments, setPostComments] = useState<PostCommentDto[] | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<PostCommentDto[]>(`/api/v1/posts/${postId}/comments`)
      .then(setPostComments)
      .catch((e) => setError(toErrorMessage(e)));
  }, [postId]);

  return { postId, postComments, error };
}
