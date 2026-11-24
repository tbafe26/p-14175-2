// 백엔드 응답 DTO 와 같은 모양. 날짜는 JSON 에서 ISO 문자열로 온다.
export type PostDto = {
  id: number;
  createDate: string;
  modifyDate: string;
  title: string;
  content: string;
};

export type PostCommentDto = {
  id: number;
  createDate: string;
  modifyDate: string;
  content: string;
};

// 작성/수정 요청 본문
export type PostWriteReqBody = Pick<PostDto, "title" | "content">;
export type PostCommentWriteReqBody = Pick<PostCommentDto, "content">;
export type PostCommentModifyReqBody = Pick<PostCommentDto, "content">;
