export interface UploadProfilePhoto {
}


export interface UploadProfilePhotoResponse {
    success: boolean
    message: string
    data: UploadProfilePhoto
}

export interface UploadProfilePhoto {
    photo: string
    postId: string
}
