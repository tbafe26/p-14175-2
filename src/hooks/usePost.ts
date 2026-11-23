"use client";

import {
  apiFetch,
  toErrorMessage,
  type RsData,
} from "@/lib/backend/client";
import type { PostDto } from "@/types/post";
import { useEffect, useState } from "react";

// 글 하나를 불러오고 다루는 훅. 화면(JSX)과 데이터 로직을 나눠 페이지 컴포넌트를 가볍게 유지한다.
export function usePost(id: number) {
  // null 이면 아직 불러오는 중
  const [post, setPost] = useState<PostDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<PostDto>(`/api/v1/posts/${id}`)
      .then(setPost)
      .catch((e) => setError(toErrorMessage(e)));
  }, [id]);

  // 훅이 받은 id 를 기억하고 있으므로(클로저) 호출하는 쪽은 id 를 다시 넘길 필요가 없다.
  const deletePost = () =>
    apiFetch<RsData>(`/api/v1/posts/${id}`, { method: "DELETE" });

  return { id, post, error, deletePost };
}
