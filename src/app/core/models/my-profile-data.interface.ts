
export interface ProfileResponse {
    success: boolean;
    message: string;
    data: ProfileData;
}

export interface ProfileData {
    user: ProfileUser;
}

export interface ProfileUser {
    _id: string;
    id: string;
    name: string;
    username: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    photo: string;
    cover: string;
    bookmarks: unknown[];
    followers: unknown[];
    following: unknown[];
    createdAt: string;
    followersCount: number;
    followingCount: number;
    bookmarksCount: number;
}