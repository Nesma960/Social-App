export interface CommentRepliesResponse {
    success: boolean;
    message: string;
    data: CommentRepliesData;
    meta: Meta;
}

export interface CommentRepliesData {
    replies: CommentReply[];
}

export interface CommentReply {
    _id: string;
    content: string;
    commentCreator: CommentCreator;
    post: string;
    parentComment: string;
    likes: Like[];
    createdAt: string;
    likesCount: number;
    isReply: boolean;
    id: string;
    image?: string | null;

}

export interface CommentCreator {
    _id: string;
    name: string;
    username: string;
    photo: string;
    followersCount: number;
    followingCount: number;
    bookmarksCount: number;
    id: string;
}

export interface Like {
    _id: string;
    user: string;
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    currentPage: number;
    limit: number;
    total: number;
    numberOfPages: number;
}