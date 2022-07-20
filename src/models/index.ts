export type CommentUser = {
    image: { png: string; webp: string };
    username: string;
};

export type CommentReply = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replyingTo: string;
    replies?: CommentReply[];
    user: CommentUser;
};

export type Comment = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replies: CommentReply[];
    replyingTo?: string;
    user: CommentUser;
};
