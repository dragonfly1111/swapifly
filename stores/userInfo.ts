import { defineStore } from 'pinia'
import { IUserInfo } from '~/model/res/userInfo'
import { userLogOut } from '~/api/loginAndRegister'

export const useUserInfo = defineStore('userInfo', {
  state: (): IUserInfo => ({
    avatar: '',
    email: '',
    id: -1,
    nickname: '',
    token: '',
    type: -1
  }),
  actions: {
    setUserInfo(e: IUserInfo){
      this.avatar = e.avatar
      this.email = e.email
      this.id = e.id
      this.nickname = e.nickname
      this.token = e.token
      this.type = e.type
    },
    logout(){
      userLogOut().then(()=>{
        this.avatar = ''
        this.email = ''
        this.id = -1
        this.nickname = ''
        this.token = ''
        this.type = -1
      })
    }
  },
  persist: {
    enabled: !!process.client,
    strategies: [
      {
        key: "USER-INFO",
        storage: process.client ? sessionStorage : null,
      },
    ],
  }
})
