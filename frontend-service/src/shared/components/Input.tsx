import React, { forwardRef } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  success?: boolean;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  prefix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, success, iconRight, iconLeft, prefix, ...props }, ref) => {
    const baseStyles =
      "block w-full rounded-xl themed-border shadow-sm focus:border-[var(--input-border-focus)] focus:ring-[var(--brand-500)] sm:text-sm themed-surface px-4 py-2.5 transition-colors themed-text";

    let stateStyles = "themed-border hover:border-[var(--brand-400)]";
    if (error) stateStyles = "border-[var(--danger)] text-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]";
    else if (success) stateStyles = "border-[var(--success)] focus:border-[var(--success)] focus:ring-[var(--success)]";

    const hasLeftIcon = !!iconLeft || !!prefix;
    const hasRightIcon = !!iconRight || !!error || success;

    return (
      <div className="relative">
        {(iconLeft || prefix) && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none themed-text-3">
            {iconLeft ?? <span className="text-sm">{prefix}</span>}
          </div>
        )}

        <input
          ref={ref}
          className={`${baseStyles} ${stateStyles} ${hasLeftIcon ? "pl-10" : ""} ${hasRightIcon ? "pr-10" : ""} ${className}`}
          {...props}
        />
        
        {hasRightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {error ? (
              <AlertCircle className="h-5 w-5 text-danger" />
            ) : success ? (
              <CheckCircle2 className="h-5 w-5 text-success" />
            ) : (
              <span className="themed-text-3 pointer-events-auto">{iconRight}</span>
            )}
          </div>
        )}
        {error && <p className="mt-1 text-sm text-[var(--danger)]">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
