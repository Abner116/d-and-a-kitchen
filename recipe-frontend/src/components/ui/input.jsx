import React from 'react';

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
    const baseClasses = "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900";
    const combinedClasses = `${baseClasses} ${className || ''}`;

    return (
        <input type={type} className={combinedClasses} ref={ref} {...props} />
    );
});

Input.displayName = "Input";

export { Input };