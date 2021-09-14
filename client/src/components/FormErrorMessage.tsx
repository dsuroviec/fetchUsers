interface ErrorProps {
    message: string;
    className?: string;
}

export const FormErrorMessage = ({ message, className }: ErrorProps) => {
    return <div className={`text-red-500 text-xs ${className}`}>{message}</div>;
};
