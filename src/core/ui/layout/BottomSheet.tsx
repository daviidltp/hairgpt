import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import * as Haptics from 'expo-haptics';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

interface BottomSheetProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    snapPoints?: string[];
}

export function BottomSheet({ visible, onClose, children, snapPoints = ['50%', '90%'] }: BottomSheetProps) {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const points = useMemo(() => snapPoints, []);

    useEffect(() => {
        if (visible) {
            bottomSheetModalRef.current?.present();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } else {
            bottomSheetModalRef.current?.dismiss();
        }
    }, [visible]);

    const handleDismiss = useCallback(() => {
        if (visible) {
            onClose();
        }
    }, [visible, onClose]);

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.6}
                pressBehavior="close"
            />
        ),
        []
    );

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={points}
            onDismiss={handleDismiss}
            enablePanDownToClose
            enableDynamicSizing={false}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: '#1a1a1a' }}
            handleIndicatorStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width: 48, height: 6 }}
        >
            <BottomSheetScrollView
                style={{ paddingHorizontal: 24 }}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
}

