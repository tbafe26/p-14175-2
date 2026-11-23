// 마지막 글자에 받침이 있으면 앞의 조사, 없으면 뒤의 조사를 붙인다. 예: 제목을 / 메모를
function josa(word: string, withBatchim: string, withoutBatchim: string) {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  const hasBatchim = code >= 0 && code <= 11171 && code % 28 !== 0;

  return word + (hasBatchim ? withBatchim : withoutBatchim);
}

// 백엔드 요청 본문 검증(@NotBlank, @Size)과 같은 규칙을 화면에서도 먼저 검사한다.
export function validateText(
  label: string,
  value: string,
  { min, max }: { min: number; max: number },
): string | null {
  if (value.length === 0) return `${josa(label, "을", "를")} 입력해주세요.`;
  if (value.length < min)
    return `${josa(label, "을", "를")} ${min}자 이상 입력해주세요.`;
  if (value.length > max)
    return `${josa(label, "은", "는")} ${max}자 이하로 입력해주세요.`;

  return null;
}

export const POST_TITLE_RULE = { min: 2, max: 100 };
export const POST_CONTENT_RULE = { min: 2, max: 5000 };
export const POST_COMMENT_CONTENT_RULE = { min: 2, max: 100 };
