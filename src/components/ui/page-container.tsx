// 본문 페이지(목록, 상세, 작성, 수정)가 함께 쓰는 가운데 정렬 틀
export function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-3xl px-5 py-12">{children}</div>;
}
