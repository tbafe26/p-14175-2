"use client";

import { apiFetch, toErrorMessage } from "@/lib/backend/client";
import type { PostDto } from "@/types/post";
import { useEffect, useState } from "react";

// 글 하나를 불러오는 훅. 화면(JSX)과 데이터 로직을 나눠 페이지 컴포넌트를 가볍게 유지한다.
export function usePost(id: number) {
  // null 이면 아직 불러오는 중
  const [post, setPost] = useState<PostDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<PostDto>(`/api/v1/posts/${id}`)
      .then(setPost)
      .catch((e) => setError(toErrorMessage(e)));
  }, [id]);

  return { id, post, error };
}
