export type CommentUser = {
    image: { png: string; webp: string };
    username: string;
};

export class CommentReply {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replyingTo: string;
    replies?: CommentReply[];
    user: CommentUser;

    constructor(currentUser: string, replyingTo: string, replyContent: string) {
        this.id = Date.now();
        this.content = replyContent;
        this.createdAt = 'Just now';
        this.score = 0;
        this.replyingTo = replyingTo;
        this.replies = [];
        this.user = {
            username: currentUser,
            image: {
                png: `assets/avatars/image-${currentUser}.png`,
                webp: `assets/avatars/image-${currentUser}.webp`
            }
        };
    }
}

export class Comment {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replies: CommentReply[];
    replyingTo?: string;
    user: CommentUser;

    constructor(currentUser: string, commentContent: string) {
        this.id = Date.now();
        this.content = commentContent;
        this.createdAt = 'Just now';
        this.score = 0;
        this.replies = [];
        this.user = {
            username: currentUser,
            image: {
                png: `assets/avatars/image-${currentUser}.png`,
                webp: `assets/avatars/image-${currentUser}.webp`
            }
        };
    }
}
