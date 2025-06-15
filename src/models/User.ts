export interface UserRegister{
    name: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    levelUser: string,
    walletId: number | null,
    balance: number,
    isActive: boolean

}