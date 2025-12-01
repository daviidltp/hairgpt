export interface BaldnessFeatureData {
    title: string;
    description: string;
    levelDescription: string; // "Baja", "Media", "Alta" based on score
}

export const getBaldnessFeatureData = (feature: 'density' | 'texture' | 'porosity' | 'volume', score: number): BaldnessFeatureData => {
    const getLevel = (s: number) => {
        if (s <= 3) return "Baja";
        if (s <= 7) return "Media";
        return "Alta";
    };

    const level = getLevel(score);

    switch (feature) {
        case 'density':
            return {
                title: 'Densidad Capilar',
                description: 'La densidad capilar se refiere al número de folículos pilosos que tienes por centímetro cuadrado de cuero cabelludo. Una densidad alta significa más cobertura y volumen natural, mientras que una densidad baja puede hacer que el cuero cabelludo sea más visible.',
                levelDescription: `Tu densidad es ${level}.`
            };
        case 'texture':
            return {
                title: 'Textura del Cabello',
                description: 'La textura describe el grosor o diámetro de cada hebra de cabello individual. El cabello grueso es más fuerte y mantiene mejor el peinado, mientras que el cabello fino es más delicado y puede ser más difícil de manejar.',
                levelDescription: `Tu textura es ${level}.`
            };
        case 'porosity':
            return {
                title: 'Porosidad',
                description: 'La porosidad es la capacidad de tu cabello para absorber y retener la humedad. La porosidad baja significa que las cutículas están cerradas y cuesta que entre el agua. La alta significa que absorbe rápido pero también pierde hidratación rápido.',
                levelDescription: `Tu porosidad es ${level}.`
            };
        case 'volume':
            return {
                title: 'Volumen',
                description: 'El volumen se refiere al cuerpo y la elevación que tiene tu cabello desde la raíz. Un buen volumen da una apariencia de cabello más lleno y saludable.',
                levelDescription: `Tu volumen es ${level}.`
            };
    }
};
