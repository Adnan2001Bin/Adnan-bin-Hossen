import Image from "next/image"

import { cn } from "@/lib/utils"

export function ThemedImage({
  light,
  dark,
  alt,
  className,
  priority = false,
  sizes,
}: {
  light: string
  dark: string
  alt: string
  className?: string
  priority?: boolean
  sizes: string
}) {
  return (
    <>
      <Image
        src={light}
        alt={alt}
        width={1100}
        height={1100}
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        className={cn("object-contain dark:hidden", className)}
      />
      <Image
        src={dark}
        alt=""
        width={1100}
        height={1100}
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        className={cn("hidden object-contain dark:block", className)}
      />
    </>
  )
}
