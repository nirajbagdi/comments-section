import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import relativePlugin from 'dayjs/plugin/relativeTime';

dayjs.extend(relativePlugin);

const formatTime = (date: string) => dayjs(date).fromNow();

interface Props {
    date: string;
}

const CommentTime: React.FC<Props> = ({ date }) => {
    const [timeAgo, setTimeAgo] = useState(() => formatTime(date));

    useEffect(() => {
        const updateTime = () => setTimeAgo(formatTime(date));

        updateTime();
        const intervalID = setInterval(updateTime, 60000);
        return () => clearInterval(intervalID);
    }, [date]);

    return <p>{timeAgo}</p>;
};

export default CommentTime;
