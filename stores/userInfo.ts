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
    type: -1,
    openLogin: false,
    userBlock: false
  }),
  actions: {
    setUserInfo(e: any){
      console.log('setUserInfo')
      console.log(e)
      this.avatar = e.avatar
      this.email = e.email
      this.id = e.id
      this.nickname = e.nickname
      this.token = e.token
      this.type = e.type
    },
    refreshUserInfo(e: any){
      console.log('refreshUserInfo')
      console.log(e)
      this.avatar = e.avatar
      this.email = e.email
      this.id = e.id
      this.nickname = e.nickname
      this.type = e.type
    },
    openDialog(){
      this.openLogin = true
    },
    closeDialog(){
      this.openLogin = false
    },
    openBlockDialog(){
      this.userBlock = true
    },
    closeBlockDialog(){
      this.userBlock = false
    },
    logout(callback){
      userLogOut().then(()=>{
        this.avatar = ''
        this.email = ''
        this.id = -1
        this.nickname = ''
        this.token = ''
        this.type = -1
        this.openLogin = false
        this.userBlock = false
        if(callback){
          callback()
        }
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
