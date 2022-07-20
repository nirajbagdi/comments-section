export enum ButtonColors {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    DANGER = 'danger'
}

export enum ButtonTypes {
    OUTLINE = 'outline',
    CONTAINED = 'contained'
}

const COLORS = {
    [ButtonColors.PRIMARY]: 'hsl(238, 40%, 52%)',
    [ButtonColors.SECONDARY]: 'hsl(211, 10%, 45%)',
    [ButtonColors.DANGER]: 'hsl(358, 79%, 66%)'
};

type ButtonStyles = {
    color: string;
    backgroundColor: string;
};

type ButtonVariantsObj = {
    [ButtonColors.PRIMARY]: {
        [ButtonTypes.OUTLINE]: ButtonStyles;
        [ButtonTypes.CONTAINED]: ButtonStyles;
    };
    [ButtonColors.SECONDARY]: {
        [ButtonTypes.OUTLINE]: ButtonStyles;
        [ButtonTypes.CONTAINED]: ButtonStyles;
    };
    [ButtonColors.DANGER]: {
        [ButtonTypes.OUTLINE]: ButtonStyles;
        [ButtonTypes.CONTAINED]: ButtonStyles;
    };
};

export const variantsObj: ButtonVariantsObj = {
    [ButtonColors.PRIMARY]: {
        [ButtonTypes.OUTLINE]: {
            color: COLORS.primary,
            backgroundColor: 'transparent'
        },
        [ButtonTypes.CONTAINED]: {
            backgroundColor: COLORS.primary,
            color: '#fff'
        }
    },
    [ButtonColors.SECONDARY]: {
        [ButtonTypes.OUTLINE]: {
            color: COLORS.secondary,
            backgroundColor: 'transparent'
        },
        [ButtonTypes.CONTAINED]: {
            backgroundColor: COLORS.secondary,
            color: '#fff'
        }
    },
    [ButtonColors.DANGER]: {
        [ButtonTypes.OUTLINE]: {
            color: COLORS.danger,
            backgroundColor: 'transparent'
        },
        [ButtonTypes.CONTAINED]: {
            backgroundColor: COLORS.danger,
            color: '#fff'
        }
    }
};