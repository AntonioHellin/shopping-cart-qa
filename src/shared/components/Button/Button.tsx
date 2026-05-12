import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button className={variant === 'primary' ? 'btn-primary' : 'btn-secondary'} {...props}>
      {children}
    </button>
  )
}
