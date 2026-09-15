import type { ButtonHTMLAttributes, ReactNode } from 'react'
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  label?: string
  variant?: 'primary' | 'secondary'
}
export function Button({ children, label, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button className={variant === 'primary' ? 'btn-primary' : 'btn-secondary'} {...props}>
      {label ?? children}
    </button>
  )
}
