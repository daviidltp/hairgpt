export interface AnalysisData {
    description: string;
    celebrities: any[]; // Using any[] for require() images, normally string[] for URLs
}

export const FACE_SHAPE_DATA: Record<string, AnalysisData> = {
    'Oval': {
        description: 'El rostro ovalado es el más versátil de todos. Sus proporciones equilibradas te permiten lucir casi cualquier estilo. Tienes la libertad de experimentar con cortes cortos, largos, voluminosos o rapados.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Round': {
        description: 'Un rostro redondo se beneficia de cortes que añadan estructura y alarguen visualmente la cara. El volumen en la parte superior y los lados cortos son tus mejores aliados para definir tus facciones.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Square': {
        description: 'Tu mandíbula marcada es tu rasgo más distintivo. Puedes optar por suavizarla con cortes con textura y capas, o potenciarla con estilos muy cortos y definidos. ¡Tienes una estructura ósea envidiable!',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Diamond': {
        description: 'El rostro diamante es único y sofisticado, con pómulos anchos y frente/barbilla más estrechas. Los cortes con flequillo o volumen lateral ayudan a equilibrar tus proporciones perfectamente.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Heart': {
        description: 'Con una frente más ancha que se estrecha hacia la barbilla, tu rostro corazón es ideal para cortes de longitud media o flequillos que suavicen la parte superior. Evita demasiado volumen en los lados superiores.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Oblong': {
        description: 'Tu rostro es más largo que ancho. El objetivo es añadir anchura visual. Los cortes con volumen en los lados, flequillos o estilos desordenados son perfectos para equilibrar la longitud.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Triangle': {
        description: 'Tu mandíbula es más ancha que tu frente. Busca cortes con volumen en la parte superior y sienes para armonizar la estructura. Los tupés y cortes con textura arriba te quedan genial.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Inverted Triangle': {
        description: 'Similar al corazón pero con líneas más angulares. El volumen y la textura son clave para suavizar la frente ancha y dar equilibrio a la barbilla puntiaguda.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Diamante': { // Adding Spanish key mapping just in case
        description: 'El rostro diamante es único y sofisticado, con pómulos anchos y frente/barbilla más estrechas. Los cortes con flequillo o volumen lateral ayudan a equilibrar tus proporciones perfectamente.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Ondulado': { // Adding Spanish key mapping just in case
        description: 'El cabello ondulado tiene un movimiento natural envidiable ("forma de S"). Es el equilibrio perfecto entre liso y rizado, permitiendo estilos versátiles con textura natural.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    }
};

export const HAIR_TYPE_DATA: Record<string, AnalysisData> = {
    'Straight': {
        description: 'El cabello liso es brillante y resistente. Al crecer recto desde la raíz, puede faltarle volumen. Los cortes a capas o productos texturizantes son ideales para darle vida y movimiento.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Wavy': {
        description: 'El cabello ondulado tiene un movimiento natural envidiable ("forma de S"). Es el equilibrio perfecto entre liso y rizado, permitiendo estilos versátiles con textura natural.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Curly': {
        description: 'El cabello rizado tiene personalidad propia con sus bucles definidos. Tiende a ser más seco, por lo que la hidratación es clave. ¡Lúcelo con orgullo y definición!',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Coily': {
        description: 'El cabello afro o muy rizado tiene una textura única y volumen natural. Es delicado y requiere mucha hidratación. Los estilos protectores y cortes estructurados funcionan de maravilla.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Fine': {
        description: 'El cabello fino es suave al tacto pero puede verse con poco volumen. Los productos ligeros y cortes que den sensación de densidad son tus mejores aliados.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Medium': {
        description: 'Tienes la textura más común y manejable. Tu cabello mantiene bien los peinados y tiene un equilibrio ideal de volumen y peso. ¡Tienes suerte!',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Thick': {
        description: '¡Tienes una melena abundante! El cabello grueso tiene mucho cuerpo pero puede pesar. Las capas y el entresacado estratégico ayudan a controlar el volumen y dar forma.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Ondulado': { // Spanish mapping
        description: 'El cabello ondulado tiene un movimiento natural envidiable ("forma de S"). Es el equilibrio perfecto entre liso y rizado, permitiendo estilos versátiles con textura natural.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Liso': { // Spanish mapping
        description: 'El cabello liso es brillante y resistente. Al crecer recto desde la raíz, puede faltarle volumen. Los cortes a capas o productos texturizantes son ideales para darle vida y movimiento.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Rizado': { // Spanish mapping
        description: 'El cabello rizado tiene personalidad propia con sus bucles definidos. Tiende a ser más seco, por lo que la hidratación es clave. ¡Lúcelo con orgullo y definición!',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    }
};

export const getFaceShapeData = (shape: string): AnalysisData => {
    const key = Object.keys(FACE_SHAPE_DATA).find(k =>
        shape.toLowerCase().includes(k.toLowerCase())
    );
    return key ? FACE_SHAPE_DATA[key] : {
        description: 'Learn more about your unique face shape and how to style it perfectly.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    };
};

export const getHairTypeData = (type: string): AnalysisData => {
    const key = Object.keys(HAIR_TYPE_DATA).find(k =>
        type.toLowerCase().includes(k.toLowerCase())
    );
    return key ? HAIR_TYPE_DATA[key] : {
        description: 'Discover the characteristics of your hair type and the best care routine.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    };
};
