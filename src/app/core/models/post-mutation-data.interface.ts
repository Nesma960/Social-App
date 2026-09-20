
export interface PostMutationDataResponse {
    success: boolean;
    message: string;
    data: PostMutationData;
}

export interface PostMutationData {
    post: Post;
}

export interface Post {
    _id: string;
    id: string;
    body: string;
    privacy: string;
    user: User;
    sharedPost: Post | null;
    likes: string[];
    createdAt: string;
    image: string;
    commentsCount: number;
    topComment: TopComment | null;
    sharesCount: number;
    likesCount: number;
    isShare: boolean;
    bookmarked: boolean;
}

export interface User {
    _id: string;
    name: string;
    username: string;
    photo: string;
}

export interface TopComment {
    _id: string;
    content: string;
    image: string;
    commentCreator: User;
    post: string;
    parentComment: string | null;
    likes: string[];
    createdAt: string;
}
