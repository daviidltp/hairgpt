import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ title, variant = 'primary', className, ...props }: ButtonProps) {
    const baseStyle = "p-4 rounded-xl items-center justify-center active:opacity-80";
    const variants = {
        primary: "bg-primary shadow-lg shadow-primary/30",
        secondary: "bg-secondary shadow-lg shadow-secondary/30",
        outline: "border border-primary bg-transparent",
    };
    const textVariants = {
        primary: "text-white font-bold text-lg",
        secondary: "text-white font-bold text-lg",
        outline: "text-primary font-bold text-lg",
    };

    return (
        <TouchableOpacity className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
            <Text className={textVariants[variant]}>{title}</Text>
        </TouchableOpacity>
    );
}
