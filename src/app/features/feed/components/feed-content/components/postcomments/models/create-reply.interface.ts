import { CommentCreator, Like } from "./comment-replies.interface";

export interface CreateReplyResponse {
    success: boolean;
    message: string;
    data: {
        reply: Reply;
    };
}

export interface Reply {
    _id: string;
    image?: string;
    commentCreator: CommentCreator;
    post: string;
    parentComment: string;
    likes: Like[];
    createdAt: string;
    likesCount: number;
    isReply: boolean;
    id: string;
}