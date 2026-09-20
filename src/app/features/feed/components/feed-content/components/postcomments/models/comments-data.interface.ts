

export interface CommentsDataResponse {
    success: boolean;
    message: string;
    data: CommentsData;
    meta: Meta;
}

export interface CommentsData {
    comments: Comment[];
}

export interface Comment {
    _id: string;
    content: string;
    commentCreator: CommentCreator;
    post: string;
    parentComment: string | null;
    likes: Like[];
    createdAt: string;
    repliesCount: number;
      image?: string | null;

}

export interface CommentCreator {
    _id: string;
    name: string;
    username: string;
    photo: string;
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
