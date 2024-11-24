import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createContext, useContext } from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type SelectContext = {
  value: string | undefined
  onValueChange: (value: string) => void
}

export const selectContext = createContext<SelectContext | undefined>(undefined)