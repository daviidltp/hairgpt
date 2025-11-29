import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '@/core/ui';

export function ExploreScreen() {
    const categories = [
        { icon: 'flash', label: 'Induction Techniques', count: 12, color: '#F59E0B' },
        { icon: 'bed', label: 'Sleep Optimization', count: 8, color: '#3B82F6' },
        { icon: 'eye', label: 'Reality Checks', count: 15, color: '#10B981' },
        { icon: 'sparkles', label: 'Advanced Methods', count: 6, color: '#8b5cf6' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header */}
                <View className="px-6 pt-6 pb-8">
                    <Text className="text-4xl font-bold text-white mb-2">
                        Explore
                    </Text>
                    <Text className="text-lg text-gray-400">
                        Discover techniques & sessions
                    </Text>
                </View>

                {/* Categories */}
                <View className="px-6 mb-6">
                    <Text className="text-white font-bold text-lg mb-4">Categories</Text>
                    <View className="gap-4">
                        {categories.map((category, index) => (
                            <GlassCard key={index} className="p-5">
                                <View className="flex-row items-center gap-4">
                                    <View
                                        className="w-14 h-14 rounded-2xl items-center justify-center"
                                        style={{ backgroundColor: `${category.color}20` }}
                                    >
                                        <Ionicons name={category.icon as any} size={28} color={category.color} />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-white font-bold text-base mb-1">
                                            {category.label}
                                        </Text>
                                        <Text className="text-gray-400 text-sm">
                                            {category.count} sessions available
                                        </Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                                </View>
                            </GlassCard>
                        ))}
                    </View>
                </View>

                {/* Featured */}
                <View className="px-6 mb-6">
                    <Text className="text-white font-bold text-lg mb-4">Featured This Week</Text>
                    <GlassCard className="bg-primary/10">
                        <View className="flex-row items-center gap-3 mb-4">
                            <View className="w-12 h-12 bg-white/10 rounded-full items-center justify-center">
                                <Ionicons name="star" size={24} color="#FCD34D" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-white font-bold text-lg">
                                    Master WILD Technique
                                </Text>
                                <Text className="text-gray-300 text-sm">
                                    Advanced • 30 min
                                </Text>
                            </View>
                        </View>
                        <Text className="text-gray-300 text-sm">
                            Learn the Wake-Initiated Lucid Dream method with guided audio and binaural beats.
                        </Text>
                    </GlassCard>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
