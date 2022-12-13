import { defineStore } from 'pinia'
import { userLogOut } from '~/api/loginAndRegister'


export const useUserInfo = defineStore('userInfo', {
  state () {
    return {
      avatar: '',
      email: '',
      id: -1,
      nickname: '',
      token: '',
      type: -1,
      openLogin: false,
      userBlock: false
    }
  },
  actions: {
    setUserInfo(e) {
      console.log('setUserInfo')
      console.log(e)
      console.log(process.client)
      this.avatar = e.avatar
      this.email = e.email
      this.id = e.id
      this.nickname = e.nickname
      this.token = e.token
      this.type = e.type
    },
    refreshUserInfo() {
      console.log('refreshUserInfo')
      console.log(e)
      this.avatar = e.avatar
      this.email = e.email
      this.id = e.id
      this.nickname = e.nickname
      this.type = e.type
    },
    openDialog() {
      this.openLogin = true
    },
    closeDialog() {
      this.openLogin = false
    },
    openBlockDialog() {
      this.userBlock = true
    },
    closeBlockDialog() {
      this.userBlock = false
    },
    logout(callback) {
      userLogOut().then(() => {
        this.avatar = ''
        this.email = ''
        this.id = -1
        this.nickname = ''
        this.token = ''
        this.type = -1
        this.openLogin = false
        this.userBlock = false
        if (callback) {
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
