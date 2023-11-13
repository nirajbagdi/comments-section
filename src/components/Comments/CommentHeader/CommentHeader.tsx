import { IUser } from 'models';
import { CommentTime } from 'components/Comments';
import styles from './CommentHeader.module.scss';

interface Props {
	user: IUser;
	createdAt: string;
	isCurrentUser: boolean;
}

const CommentHeader: React.FC<Props> = ({ user, createdAt, isCurrentUser }) => {
	const userImg = require(`assets/avatars/${user.image.png}`);

	return (
		<header className={styles.header}>
			<img src={userImg} alt={user.username} />

			<div className={styles.usernameWrapper}>
				<p className={styles.username}>{user.username}</p>
				{isCurrentUser && <span className={styles.badge}>you</span>}
			</div>

			<CommentTime date={createdAt} />
		</header>
	);
};

export default CommentHeader;
