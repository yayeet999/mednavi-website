'use client'
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative"
    
    const variants = {
      default: "bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 text-white shadow-[0_8px_16px_-3px_rgba(37,99,235,0.5)] border border-blue-400/20 backdrop-blur-sm hover:shadow-[0_12px_24px_-3px_rgba(37,99,235,0.6)] hover:scale-[1.02] active:scale-[0.98] active:shadow-[0_6px_12px_-3px_rgba(37,99,235,0.4)]",
      outline: "bg-white/90 backdrop-blur-md text-blue-600 shadow-[0_8px_16px_-3px_rgba(37,99,235,0.25)] border-2 border-blue-200/50 hover:bg-white hover:border-blue-300/80 hover:shadow-[0_12px_24px_-3px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-[0.98] active:shadow-[0_6px_12px_-3px_rgba(37,99,235,0.2)]",
      ghost: "text-blue-600 hover:bg-blue-50/50 hover:shadow-sm"
    }

    const sizes = {
      default: "h-11 px-6 py-2 text-sm",
      sm: "h-9 px-4 py-2 text-xs",
      lg: "h-12 px-8 py-3 text-base font-semibold"
    }

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
