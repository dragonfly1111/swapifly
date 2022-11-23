export interface IRegisterForm {
  email: string
  code: any
  password: string
  key: string
}

export interface IEmailForm {
  email: string
}

export interface ILoginForm {
  email: string
  pwd: string
}

export interface IBindEmailForm {
  email: string
  code: string
}

export interface IResetPwdForm {
  email: string
  code: string
  password: string
  checkpassword: string
}

