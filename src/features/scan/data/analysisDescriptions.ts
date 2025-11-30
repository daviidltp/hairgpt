export interface AnalysisData {
    description: string;
    celebrities: any[]; // Using any[] for require() images, normally string[] for URLs
}

export const FACE_SHAPE_DATA: Record<string, AnalysisData> = {
    'Oval': {
        description: 'An oval face shape is considered the most versatile. It has balanced proportions, with a forehead that is slightly wider than the chin and high cheekbones. Most hairstyles suit this shape.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Round': {
        description: 'A round face has soft angles with somewhat equal width and length. The goal is often to elongate the face. Styles with height on top and shorter sides work well.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Square': {
        description: 'A square face features a strong jawline and a forehead of similar width. It has a sharp, angular look. Softening the angles or accentuating the strong jawline are common strategies.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Diamond': {
        description: 'Diamond faces are narrow at the forehead and jawline but have wide cheekbones. Styles that add width to the forehead and chin while keeping the cheekbones sleek are ideal.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Heart': {
        description: 'A heart-shaped face has a wider forehead and a narrower chin. Styles that add volume near the chin or soften the forehead width work best.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Oblong': {
        description: 'An oblong face is longer than it is wide. Styles that add width to the sides or fringes that shorten the forehead length are flattering.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Triangle': {
        description: 'A triangle face has a narrower forehead and a wider jawline. Styles that add volume to the forehead and temples help balance the strong jawline.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Inverted Triangle': {
        description: 'Similar to heart shape but with more angular lines. Volume at the chin and texture can help balance the wider forehead.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
};

export const HAIR_TYPE_DATA: Record<string, AnalysisData> = {
    'Straight': {
        description: 'Straight hair is often shiny and resilient but can lack volume. It grows straight from the root without any curl pattern.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Wavy': {
        description: 'Wavy hair has a natural "S" shape. It falls between straight and curly, offering a balance of texture and manageability.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Curly': {
        description: 'Curly hair has defined loops or spirals. It tends to be drier and prone to frizz, requiring moisture and definition.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Coily': {
        description: 'Coily or kinky hair has tight curls or zig-zag patterns. It is often fragile and requires significant moisture and protective styling.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Fine': {
        description: 'Fine hair strands are thin and can lack volume. Lightweight products are best to avoid weighing it down.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Medium': {
        description: 'Medium hair texture is the most common and holds styles well. It is neither too fine nor too thick.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
    'Thick': {
        description: 'Thick hair has a large diameter per strand and can be heavy. It often requires thinning or layering to manage volume.',
        celebrities: [
            require('../../../../assets/images/haircuts/front_image.png'),
            require('../../../../assets/images/haircuts/profile_pic.png')
        ]
    },
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
