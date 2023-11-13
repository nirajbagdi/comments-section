import { useRef } from 'react';
import { v4 as uuid } from 'uuid';

import { useAppContext } from 'store/context';
import { Input, Button } from 'components/UI';

import styles from './AddCommentForm.module.scss';

const AddCommentForm = () => {
	const textInputRef = useRef<HTMLTextAreaElement>(null);
	const appContext = useAppContext();

	const userImg = require(`assets/avatars/${appContext.currentUser.image.png}`);

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const textValue = textInputRef.current!.value;
		if (!textValue.trim().length) return;

		appContext.addComment({
			id: uuid(),
			content: textValue,
			createdAt: new Date().toISOString(),
			user: appContext.currentUser,
			score: 0,
		});

		textInputRef.current!.value = '';
	};

	return (
		<form className={styles.form} onSubmit={handleFormSubmit}>
			<img src={userImg} alt={appContext.currentUser.username} />
			<Input ref={textInputRef} input={{ placeholder: 'Add a comment...' }} />
			<Button variant="contained-primary" label="Send" />
		</form>
	);
};

export default AddCommentForm;
