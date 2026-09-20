
export interface ChangPasswordDataResponse {
    success: boolean
    message: string
    data: ChangPasswordData
}

export interface ChangPasswordData {
    token: string
    tokenType: string
    expiresIn: string
}
