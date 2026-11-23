// 버튼 모양 클래스. <button> 과 <Link> 가 같은 모양을 쓸 수 있도록 문자열로 제공한다.
const base =
  "inline-flex items-center justify-center gap-1 rounded-xl font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-strong",
  weak: "bg-primary-weak text-primary hover:bg-[#d4e8ff]",
  grey: "bg-grey-100 text-grey-700 hover:bg-grey-200",
  danger: "bg-danger-weak text-danger hover:bg-[#ffe0e0]",
  ghost: "text-grey-600 hover:bg-grey-100",
} as const;

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-[15px]",
  lg: "h-12 px-5 text-base",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = "",
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}
