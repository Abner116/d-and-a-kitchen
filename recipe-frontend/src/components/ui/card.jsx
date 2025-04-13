import React from 'react';

const Card = React.forwardRef(({ className, ...props }, ref) => {
    const baseClasses = "rounded-lg border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900";
    const combinedClasses = `${baseClasses} ${className || ''}`;

    return (
        <div ref={ref} className={combinedClasses} {...props} />
    );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => {
    const baseClasses = "flex flex-col space-y-1.5 p-6";
    const combinedClasses = `${baseClasses} ${className || ''}`;

    return (
        <div ref={ref} className={combinedClasses} {...props} />
    );
});
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => {
    const baseClasses = "text-2xl font-semibold leading-none tracking-tight";
    const combinedClasses = `${baseClasses} ${className || ''}`;

    return (
        <h3 ref={ref} className={combinedClasses} {...props} />
    );
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => {
    const baseClasses = "text-sm text-gray-500 dark:text-gray-400";
    const combinedClasses = `${baseClasses} ${className || ''}`;

    return (
        <p ref={ref} className={combinedClasses} {...props} />
    );
});
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => {
    const baseClasses = "p-6 pt-0";
    const combinedClasses = `${baseClasses} ${className || ''}`;

    return (
        <div ref={ref} className={combinedClasses} {...props} />
    );
});
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => {
    const baseClasses = "flex items-center p-6 pt-0";
    const combinedClasses = `${baseClasses} ${className || ''}`;

    return (
        <div ref={ref} className={combinedClasses} {...props} />
    );
});
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };