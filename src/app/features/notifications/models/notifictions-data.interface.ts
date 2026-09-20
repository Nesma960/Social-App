

export interface NotificationsResponse {
    success: boolean;
    message: string;
    data: NotificationsData;
    meta: NotificationsMeta;
}

export interface NotificationsData {
    notifications: Notification[];
}

export interface Notification {
    _id: string;
    type: string;
    isRead: boolean;
    createdAt: string;

    user: NotificationUser;

    post?: NotificationPost;

    comment?: string;
    message?: string;

    id: string;
}

export interface NotificationUser {
    _id: string;
    name: string;
    username: string;
    photo: string;

    id: string;
}

export interface NotificationPost {
    _id: string;
    body: string;
    image: string;
    id: string;
}

export interface NotificationsMeta {
    feedMode: string;
    pagination: Pagination;
}

export interface Pagination {
    currentPage: number;
    limit: number;
    total: number;
    numberOfPages: number;
}