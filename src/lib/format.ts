// 백엔드가 보내는 ISO 날짜 문자열(예: 2026-11-17T10:20:49.656115)을 "2026. 11. 17. 10:20" 형태로 바꾼다.
const formatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function formatDate(iso: string) {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) return iso;

  return formatter.format(date);
}
