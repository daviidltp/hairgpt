import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, View } from 'react-native';
import Svg, { Defs, Mask, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const FRAME_HEIGHT = height * 0.5; // 60% of screen height
const FRAME_WIDTH = width * 0.9; // Slightly narrower than screen
const BORDER_RADIUS = 20;

export function CameraOverlay() {
    return (
        <View className="absolute inset-0 pointer-events-none">
            <Svg height="100%" width="100%" style={{ position: 'absolute' }}>
                <Defs>
                    <Mask id="mask" x="0" y="0" width="100%" height="100%">
                        <Rect x="0" y="0" width="100%" height="100%" fill="white" />
                        <Rect
                            x={(width - FRAME_WIDTH) / 2}
                            y={(height - FRAME_HEIGHT) / 2 - 50}
                            width={FRAME_WIDTH}
                            height={FRAME_HEIGHT}
                            rx={BORDER_RADIUS}
                            fill="black"
                        />
                    </Mask>
                </Defs>
                <Rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="rgba(0,0,0,0.6)"
                    mask="url(#mask)"
                />
            </Svg>

            {/* Square Border */}
            <View
                style={{
                    position: 'absolute',
                    top: (height - FRAME_HEIGHT) / 2 - 50,
                    left: (width - FRAME_WIDTH) / 2,
                    width: FRAME_WIDTH,
                    height: FRAME_HEIGHT,
                    borderRadius: BORDER_RADIUS,
                    borderWidth: 2,
                    borderColor: 'rgba(255,255,255,0.3)',
                }}
            />

            {/* Top Gradient for text readability */}
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 150 }}
            />
        </View>
    );
}

