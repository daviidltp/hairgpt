import { TextInput, TextInputProps, View, Text } from 'react-native';

interface InputProps extends TextInputProps {
    label?: string;
}

export function Input({ label, className, ...props }: InputProps) {
    return (
        <View className="space-y-2">
            {label && <Text className="text-gray-400 text-sm font-medium ml-1">{label}</Text>}
            <TextInput
                className={`bg-surface/50 border border-glass-border rounded-xl p-4 text-white placeholder:text-gray-600 ${className}`}
                placeholderTextColor="#525252"
                {...props}
            />
        </View>
    );
}
