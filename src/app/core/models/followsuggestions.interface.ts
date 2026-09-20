
export interface SuggestionsResponse {
    success: boolean;
    message: string;
    data: SuggestionsData;
    meta: SuggestionsMeta;
}

export interface SuggestionsData {
    suggestions: Suggestion[];
}

export interface Suggestion {
    _id: string;
    name: string;
    username: string;
    photo: string;
    mutualFollowersCount: number;
    followersCount: number;
}

export interface SuggestionsMeta {
    pagination: Pagination;
}

export interface Pagination {
    currentPage: number;
    limit: number;
    total: number;
    numberOfPages: number;
    nextPage: number;
}