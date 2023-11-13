export interface IUser {
	image: {
		png: string;
		webp: string;
	};
	username: string;
}

export interface IComment {
	id: string;
	content: string;
	createdAt: string;
	score: number;
	user: IUser;
	replyingTo?: string;
	replies?: IComment[];
}
