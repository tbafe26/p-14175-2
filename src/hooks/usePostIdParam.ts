"use client";

import { useParams } from "next/navigation";

// /posts/[id] 아래 페이지에서 path 파라미터 id 를 숫자 글 번호로 돌려준다.
// path 파라미터는 항상 문자열로 오므로, 숫자 변환을 페이지마다 반복하지 않도록 한 곳에 둔다.
// useParams() 를 쓰므로 [id]/loading.tsx 의 Suspense 경계 안에서만 호출해야 한다.
export function usePostIdParam() {
  const { id } = useParams<{ id: string }>();

  return Number(id);
}
