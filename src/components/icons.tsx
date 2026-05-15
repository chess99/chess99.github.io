import type { SVGProps } from 'react'

export function IconGitHub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.75 5.62.75 12c0 5.1 3.3 9.42 7.88 10.95.58.11.79-.26.79-.57v-2.1c-3.2.71-3.88-1.58-3.88-1.58-.52-1.36-1.28-1.72-1.28-1.72-1.05-.74.08-.73.08-.73 1.16.08 1.77 1.22 1.77 1.22 1.03 1.8 2.71 1.28 3.37.98.1-.77.4-1.28.72-1.58-2.55-.3-5.23-1.3-5.23-5.8 0-1.28.44-2.33 1.16-3.15-.12-.3-.5-1.52.11-3.16 0 0 .95-.31 3.12 1.2.91-.26 1.88-.39 2.84-.39.96 0 1.93.13 2.84.39 2.16-1.51 3.11-1.2 3.11-1.2.62 1.64.24 2.86.12 3.16.72.82 1.16 1.87 1.16 3.15 0 4.5-2.69 5.5-5.25 5.8.41.36.77 1.07.77 2.16v3.2c0 .32.21.69.8.57A11.3 11.3 0 0 0 23.25 12C23.25 5.62 18.27.5 12 .5Z" />
    </svg>
  )
}

export function IconMail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.2-8 5.33L4 8.2V6l8 5.33L20 6v2.2Z" />
    </svg>
  )
}

export function IconExternal(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h7v2H7v10h10v-5h2v7H5V5Z" />
    </svg>
  )
}

export function IconClose(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.59 7.1 5.7A1 1 0 0 0 5.7 7.1L10.59 12 5.7 16.9a1 1 0 1 0 1.4 1.4L12 13.41l4.9 4.89a1 1 0 0 0 1.4-1.4L13.41 12l4.89-4.9a1 1 0 0 0 0-1.4Z" />
    </svg>
  )
}

export function IconJike({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path fill="white" d="M8.5 9.5h7v1.5h-7zM8.5 13h7v1.5h-7z" />
    </svg>
  )
}

export function IconXiaohongshu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path fill="white" d="M8 8h8v2H8zM8 12h8v2H8zM8 16h5v2H8z" />
    </svg>
  )
}

export function IconWechat({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.57 2.78 4.73L4 17l2.5-1.25c.96.27 1.96.25 2.96.25H9.5C9.18 15.37 9 14.7 9 14c0-3.31 3.13-6 7-6h.5C15.91 5.3 12.93 4 9.5 4zm-1.75 3.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm3.5 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
      <path d="M16 9c-3.31 0-6 2.24-6 5s2.69 5 6 5c.73 0 1.43-.12 2.08-.33L20 20l-.67-2.27C20.6 16.73 22 15.43 22 14c0-2.76-2.69-5-6-5zm-1.5 3.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm3 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
    </svg>
  )
}
