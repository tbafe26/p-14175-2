// 백엔드 주소. .env.local 의 NEXT_PUBLIC_API_BASE_URL 로 바꿀 수 있고, 없으면 로컬 개발 서버를 쓴다.
// NEXT_PUBLIC_ 접두어가 붙은 값만 브라우저 코드에 포함된다(빌드 시점에 문자열로 치환됨).
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

// 조회를 제외한 응답(작성/수정/삭제)과 실패 응답의 공통 형태
export type RsData<T = null> = {
  resultCode: string;
  msg: string;
  data: T;
};

// 4xx/5xx 응답이나 네트워크 오류를 하나의 형태로 다루기 위한 에러
export class ApiError extends Error {
  constructor(
    readonly resultCode: string,
    readonly msg: string,
    readonly status: number,
  ) {
    super(`${resultCode} : ${msg}`);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  // 본문이 있는 요청은 JSON 으로 보낸다. 호출하는 쪽에서 직접 지정했다면 그 값을 존중한다.
  if (options.body != null && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }

  let res: Response;

  try {
    res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  } catch {
    // fetch 는 HTTP 오류(4xx, 5xx)에서는 실패하지 않고, 서버에 닿지 못했을 때만 실패한다.
    throw new ApiError("000-1", "서버에 연결할 수 없습니다.", 0);
  }

  // fetch 는 4xx, 5xx 도 성공으로 처리하므로 res.ok 로 직접 실패를 판단한다.
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as RsData | null;

    throw new ApiError(
      body?.resultCode ?? `${res.status}-0`,
      body?.msg ?? "요청을 처리하지 못했습니다.",
      res.status,
    );
  }

  return res.json() as Promise<T>;
}

// catch 블록에서 받은 값을 사용자에게 보여줄 문장으로 바꾼다.
export function toErrorMessage(error: unknown) {
  if (error instanceof ApiError) return error.message;

  return "알 수 없는 오류가 발생했습니다.";
}
