export interface IJwtPayload {
    userId: string
    role: string
    fullName: string
    profileImage: string | null
    email: string
    phone: string
}