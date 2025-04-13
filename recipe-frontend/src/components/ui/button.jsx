import React from 'react';

const Button = React.forwardRef(
    ({ className, variant = "default", size = "default", children, ...props }, ref) => {
        let variantClasses = {
            default: "bg-orange-500 text-white hover:bg-orange-600",
            destructive: "bg-red-600 text-white hover:bg-red-700",
            outline: "border border-orange-300 bg-white hover:bg-orange-50 text-orange-600",
            secondary: "bg-orange-100 text-orange-800 hover:bg-orange-200",
            ghost: "hover:bg-orange-100 text-orange-600",
            link: "text-orange-500 underline-offset-4 hover:underline",
        }[variant];

        let sizeClasses = {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3 text-sm",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
        }[size];

        const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

        const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className || ''}`;

        return (
            <button
                className={combinedClasses}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };