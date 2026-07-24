import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  className?: string
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'py-2 px-4 rounded-lg font-medium transition-colors'
  const variantStyles =
    variant === 'primary'
      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
      : 'bg-gray-600 hover:bg-gray-700 text-white'

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
