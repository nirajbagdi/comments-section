import { forwardRef } from 'react';
import styles from './Input.module.scss';

interface Props {
	input?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

const Input = forwardRef<HTMLTextAreaElement, Props>((props, ref) => (
	<textarea ref={ref} className={styles.textarea} rows={3} {...props.input} />
));

export default Input;
