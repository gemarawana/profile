import { C } from '@/lib/constants'

export function LogoMark({ size = 28, bg = C.crimson }: { size?: number; bg?: string }) {
  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, background: bg }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 14 14" fill="none">
        <path d="M7 1L13 12H1L7 1Z" fill="#fff" />
      </svg>
    </div>
  )
}
