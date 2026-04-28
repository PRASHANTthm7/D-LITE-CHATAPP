import * as React from "react"
import { cn } from "@/shared/utils/cn"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, status, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
      xl: "w-16 h-16"
    };

    return (
      <div className={cn("relative inline-flex", sizeClasses[size], className)} ref={ref} {...props}>
        <div className="w-full h-full rounded-full bg-surface-3 border border-border-subtle overflow-hidden flex items-center justify-center">
          {src ? (
            <img src={src} alt={alt || ""} className="w-full h-full object-cover" />
          ) : (
            <span className="text-text-secondary font-medium uppercase text-xs">{fallback || "?"}</span>
          )}
        </div>
        {status && (
          <div className={cn(
            "absolute bottom-0 right-0 border-2 border-surface-1 rounded-full",
            size === 'sm' ? 'w-2.5 h-2.5' : size === 'xl' ? 'w-4 h-4' : 'w-3 h-3',
            status === 'online' ? 'bg-success' : status === 'busy' ? 'bg-danger' : status === 'away' ? 'bg-warning' : 'bg-text-tertiary'
          )} />
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar }
