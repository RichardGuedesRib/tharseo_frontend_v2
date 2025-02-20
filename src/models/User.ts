export interface UserRegister{
    name: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    levelUser: string,
    credentialId: number | null,
    walletId: number | null,
    balance: number,
    isActive: boolean

}