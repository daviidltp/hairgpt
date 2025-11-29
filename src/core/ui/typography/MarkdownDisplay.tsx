import { Colors } from '@/core/theme/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

interface MarkdownDisplayProps {
    children: string;
}

export function MarkdownDisplay({ children }: MarkdownDisplayProps) {
    return (
        <View className="w-full">
            <Markdown style={markdownStyles}>
                {children}
            </Markdown>
        </View>
    );
}

const markdownStyles = StyleSheet.create({
    body: {
        color: Colors.textPrimary,
        fontSize: 16,
        lineHeight: 24,
    },
    heading1: {
        color: Colors.primary,
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 12,
    },
    heading2: {
        color: Colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    heading3: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    paragraph: {
        marginBottom: 16,
    },
    list_item: {
        marginBottom: 8,
    },
    strong: {
        fontWeight: 'bold',
        color: Colors.primary,
    },
    link: {
        color: Colors.blue,
    },
});
