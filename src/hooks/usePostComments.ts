"use client";

import {
  apiFetch,
  toErrorMessage,
  type RsData,
} from "@/lib/backend/client";
import type { PostCommentDto, PostCommentWriteReqBody } from "@/types/post";
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

  // 삭제 요청이 성공하면 화면의 목록에서도 바로 지운다(새로고침 없이 반영).
  const deleteComment = (commentId: number) =>
    apiFetch<RsData>(`/api/v1/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
    }).then((rsData) => {
      // 함수형 업데이트: 요청이 끝난 시점의 최신 목록을 기준으로 지운다.
      setPostComments(
        (prev) => prev?.filter((comment) => comment.id !== commentId) ?? prev,
      );

      return rsData;
    });

  // 작성 요청이 성공하면 응답으로 받은 새 댓글을 목록 끝에 붙인다.
  const writeComment = (content: string) =>
    apiFetch<RsData<PostCommentDto>>(`/api/v1/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content } satisfies PostCommentWriteReqBody),
    }).then((rsData) => {
      setPostComments((prev) => (prev == null ? prev : [...prev, rsData.data]));

      return rsData;
    });

  return { postId, postComments, error, deleteComment, writeComment };
}
