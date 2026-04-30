import React, { forwardRef } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  success?: boolean;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, success, iconRight, iconLeft, ...props }, ref) => {
    const baseStyles =
      "block w-full rounded-xl border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm bg-white px-4 py-2.5 transition-colors";
    
    let stateStyles = "border-gray-200 hover:border-gray-300";
    if (error) stateStyles = "border-danger text-danger focus:border-danger focus:ring-danger";
    else if (success) stateStyles = "border-success focus:border-success focus:ring-success";

    const hasLeftIcon = !!iconLeft;
    const hasRightIcon = !!iconRight || !!error || success;

    return (
      <div className="relative">
        {hasLeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {iconLeft}
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
              <span className="text-gray-400">{iconRight}</span>
            )}
          </div>
        )}
        {error && <p className="mt-1 text-sm text-danger">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
