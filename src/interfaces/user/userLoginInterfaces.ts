
export interface ILoginUser {
    phoneNumber?:string,
    countryCode?:string,
    email?:string
    type?:string 

}

export interface IVerifyOtp {

    content:string
    otp:string

}