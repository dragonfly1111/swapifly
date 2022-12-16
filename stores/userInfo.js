import { defineStore } from 'pinia'
import { userLogOut } from '~/api/loginAndRegister'
import { useResize } from '~/stores/resize';
import { Message } from "@arco-design/web-vue";

export const useUserInfo = defineStore('userInfo', {
  state: () => {
    return {
      avatar: '',
      email: '',
      id: -1,
      nickname: '',
      token: '',
      type: -1,
      openLogin: false,
      userBlock: false,
    }
  },
  actions: {
    initState(){
      const user = sessionStorage.getItem('USER-INFO') ? JSON.parse(sessionStorage.getItem('USER-INFO')) : null
      if(user){
        this.setUserInfo(user, false)
      }
    },
    setUserInfo(e, refreshSession = true) {
      this.avatar = e.avatar
      this.email = e.email
      this.id = e.id
      this.nickname = e.nickname
      this.token = e.token
      this.type = e.type
      this.openLogin = false
      this.userBlock = false
      if(refreshSession){
        sessionStorage.setItem('USER-INFO', JSON.stringify(e))
      }
    },
    refreshUserInfo(e) {
      console.log('refreshUserInfo')
      console.log(e)
      this.avatar = e.avatar
      this.email = e.email
      this.id = e.id
      this.nickname = e.nickname
      this.type = e.type
      this.openLogin = false
      this.userBlock = false
      sessionStorage.setItem('USER-INFO', JSON.stringify(e))
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
      // 如果有token 则调用logout接口
      if(this.token){
        userLogOut().then(() => {
          this.avatar = ''
          this.email = ''
          this.id = -1
          this.nickname = ''
          this.token = ''
          this.type = -1
          this.openLogin = false
          this.userBlock = false
          sessionStorage.removeItem('USER-INFO')
          if (callback) {
            callback()
          }
        })
      } else {
        this.avatar = ''
        this.email = ''
        this.id = -1
        this.nickname = ''
        this.token = ''
        this.type = -1
        this.openLogin = false
        this.userBlock = false
        sessionStorage.removeItem('USER-INFO')
        if (callback) {
          callback()
        }
      }
    },
    checkLogin(){
      const resize = useResize();
      const router = useRouter()
      if(!this.token){
          this.openDialog();
          this.openLogin = true;
         return false
      }
      return true

    }
  }
})
