import { useRef } from 'react';
import { Input, Button } from 'components/UI';
import styles from './CommentEditForm.module.scss';

interface Props {
	defaultValue: string;
	onFormSubmit: (value: string) => void;
}

const CommentEditForm: React.FC<Props> = ({ defaultValue, onFormSubmit }) => {
	const textInputRef = useRef<HTMLTextAreaElement>(null);

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const textValue = textInputRef.current!.value;
		if (!textValue.trim().length) return;

		onFormSubmit(textValue);
	};

	return (
		<form className={styles.editForm} onSubmit={handleFormSubmit}>
			<Input ref={textInputRef} input={{ defaultValue }} />
			<Button variant="contained-primary" label="Update" />
		</form>
	);
};

export default CommentEditForm;
