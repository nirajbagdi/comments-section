import styles from './CommentHeader.module.css';

type Props = {
    username: string;
    createdAt: string;
    isCurrentUser: boolean;
};

const CommentHeader: React.FC<Props> = props => {
    const userImg = require(`assets/avatars/image-${props.username}.png`);

    return (
        <div className={styles.commentHeader}>
            <img src={userImg} alt={props.username} className={styles.userImg} />

            <div className={styles.usernameWrapper}>
                <p className={styles.username}>{props.username}</p>
                {props.isCurrentUser && <span className={styles.badge}>you</span>}
            </div>

            <p>{props.createdAt}</p>
        </div>
    );
};

export default CommentHeader;
