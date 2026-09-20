import { TopComment, User } from "./post-mutation-data.interface";

export interface MyPostsResponse {
    success: boolean;
    message: string;
    data: MyPostsData;
    meta: MyPostsMeta;
}

export interface MyPostsData {
    posts: MyPost[];
}

export interface MyPost {
    _id: string;
    id: string;
    body: string;
    privacy: string;
    user: User;
    sharedPost: MyPost | null;
    likes: string[];
    createdAt: string;
    commentsCount: number;
    topComment: TopComment | null;
    sharesCount: number;
    likesCount: number;
    isShare: boolean;
    bookmarked: boolean;
}

export interface MyPostsMeta {
    pagination: Pagination;
}

export interface Pagination {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    total: number;
}