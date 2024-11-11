type IconProps = React.HTMLAttributes<SVGElement>

declare module "@radix-ui/react-select" {
  interface SelectProps {
    value?: string
    defaultValue?: string
    onValueChange?(value: string): void
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?(open: boolean): void
    dir?: "ltr" | "rtl"
    name?: string
    autoComplete?: string
    disabled?: boolean
    required?: boolean
  }
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}
