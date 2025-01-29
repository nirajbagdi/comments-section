import { IUser } from 'models';
import { CommentTime } from 'components/Comments';
import styles from './CommentHeader.module.scss';

interface Props {
    user: IUser;
    createdAt: string;
    isCurrentUser: boolean;
    hasEdited: boolean;
}

const CommentHeader: React.FC<Props> = ({
    user,
    createdAt,
    isCurrentUser,
    hasEdited,
}) => {
    const userImg = require(`assets/avatars/${user.image.png}`);

    return (
        <header className={styles.header}>
            <img src={userImg} alt={user.username} />

            <div className={styles.usernameWrapper}>
                <p className={styles.username}>{user.username}</p>
                {isCurrentUser && <span className={styles.badge}>you</span>}
            </div>

            <span className={styles.timeWrapper}>
                <CommentTime date={createdAt} /> {hasEdited && '*'}
            </span>
        </header>
    );
};

export default CommentHeader;
