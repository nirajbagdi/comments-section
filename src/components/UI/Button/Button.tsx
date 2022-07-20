import { ButtonColors, ButtonTypes, variantsObj } from './constants';
import styles from './Button.module.css';

type ButtonType = ButtonTypes.OUTLINE | ButtonTypes.CONTAINED;
type ButtonColor = ButtonColors.PRIMARY | ButtonColors.SECONDARY | ButtonColors.DANGER;
type ButtonVariant = `${ButtonType}-${ButtonColor}`;

type Props = {
    label: string;
    variant: ButtonVariant;
    iconElement?: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
};

const Button: React.FC<Props> = props => {
    const [btnType, btnColor] = props.variant.split('-');

    const btnClasses = `${styles.btn} ${styles[btnType]} ${props.className || ''}`;

    const btnVariant = variantsObj[btnColor as ButtonColor][btnType as ButtonType];

    const btnStyleObj = {
        color: btnVariant.color,
        backgroundColor: btnVariant.backgroundColor
    };

    return (
        <button className={btnClasses} style={btnStyleObj} onClick={props.onClick}>
            {props.iconElement || null}
            <span>{props.label}</span>
        </button>
    );
};

export default Button;
