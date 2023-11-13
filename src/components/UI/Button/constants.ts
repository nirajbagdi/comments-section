export enum ButtonColors {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	DANGER = 'danger',
}

export enum ButtonTypes {
	OUTLINE = 'outline',
	CONTAINED = 'contained',
}

const COLORS = {
	[ButtonColors.PRIMARY]: 'hsl(238, 40%, 52%)',
	[ButtonColors.SECONDARY]: 'hsl(211, 10%, 45%)',
	[ButtonColors.DANGER]: 'hsl(358, 79%, 66%)',
};

interface IButtonStyles {
	color: string;
	backgroundColor: string;
}

interface IButtonVariants {
	[ButtonColors.PRIMARY]: {
		[ButtonTypes.OUTLINE]: IButtonStyles;
		[ButtonTypes.CONTAINED]: IButtonStyles;
	};
	[ButtonColors.SECONDARY]: {
		[ButtonTypes.OUTLINE]: IButtonStyles;
		[ButtonTypes.CONTAINED]: IButtonStyles;
	};
	[ButtonColors.DANGER]: {
		[ButtonTypes.OUTLINE]: IButtonStyles;
		[ButtonTypes.CONTAINED]: IButtonStyles;
	};
}

export const variantsObj: IButtonVariants = {
	[ButtonColors.PRIMARY]: {
		[ButtonTypes.OUTLINE]: {
			color: COLORS.primary,
			backgroundColor: 'transparent',
		},
		[ButtonTypes.CONTAINED]: {
			backgroundColor: COLORS.primary,
			color: '#fff',
		},
	},
	[ButtonColors.SECONDARY]: {
		[ButtonTypes.OUTLINE]: {
			color: COLORS.secondary,
			backgroundColor: 'transparent',
		},
		[ButtonTypes.CONTAINED]: {
			backgroundColor: COLORS.secondary,
			color: '#fff',
		},
	},
	[ButtonColors.DANGER]: {
		[ButtonTypes.OUTLINE]: {
			color: COLORS.danger,
			backgroundColor: 'transparent',
		},
		[ButtonTypes.CONTAINED]: {
			backgroundColor: COLORS.danger,
			color: '#fff',
		},
	},
};
