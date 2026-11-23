// cacheComponents 가 켜져 있으면 useParams() 처럼 요청 시점에만 알 수 있는 값을 읽는 부분이
// <Suspense> 안에 있어야 한다. 같은 폴더의 loading.tsx 는 [id] 아래 페이지 전체를
// <Suspense fallback={<Loading />}> 으로 감싸 준다(하위 edit 페이지 포함).
export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-3xl animate-pulse px-5 py-12">
      <div className="h-4 w-16 rounded bg-grey-100" />
      <div className="mt-6 h-9 w-2/3 rounded bg-grey-100" />
      <div className="mt-3 h-4 w-40 rounded bg-grey-100" />
      <div className="mt-10 h-32 rounded-2xl bg-grey-100" />
    </div>
  );
}
