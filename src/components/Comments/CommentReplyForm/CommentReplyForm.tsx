import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Input, Button } from 'components/UI';
import { IUser } from 'models';
import styles from './CommentReplyForm.module.scss';

interface Props {
	currentUser: IUser;
	onFormSubmit: (value: string) => void;
}

const CommentReplyForm: React.FC<Props> = ({ currentUser, onFormSubmit }) => {
	const textInputRef = useRef<HTMLTextAreaElement>(null);

	const userImg = require(`assets/avatars/image-${currentUser.username}.png`);

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const textValue = textInputRef.current!.value;
		if (!textValue.trim().length) return;

		onFormSubmit(textValue);
	};

	return (
		<motion.form
			className={styles.replyForm}
			onSubmit={handleFormSubmit}
			initial={{ y: -50, opacity: 0.6, scale: 0.6 }}
			animate={{ y: 0, opacity: 1, scale: 1 }}
			transition={{ duration: 0.3 }}
		>
			<img src={userImg} alt={currentUser.username} />
			<Input ref={textInputRef} input={{ placeholder: 'Add a reply...' }} />
			<Button variant="contained-primary" label="Reply" />
		</motion.form>
	);
};

export default CommentReplyForm;
