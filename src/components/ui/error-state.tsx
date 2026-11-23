// API 호출이 실패했을 때 보여주는 안내 상자
export function ErrorState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-2xl bg-danger-weak px-6 py-10 text-center"
    >
      <p className="font-semibold text-danger">문제가 생겼어요</p>
      <p className="mt-1 text-[15px] text-grey-700">{message}</p>
    </div>
  );
}
