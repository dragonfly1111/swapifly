import { defineStore } from 'pinia'

const MIN_SCALE = 0.7

// 大于1000 - PC  小于1000 MOBILE
export interface ITypeState {
  curWidth: number,
  screenType: string,
  contentPT: number,
  contentPTStr: string,
}

export const useResize = defineStore('resize', {
  state: (): ITypeState => ({
    curWidth: 0,
    screenType: 'PC',
    contentPT: 375,
    contentPTStr: '375px'
  }),
  actions: {
    setWidth(width: number){
      // console.log("===qqqqq===",width)
      this.curWidth = width
      if(width > 1000){
        this.changeType('PC')
      } else {
        this.changeType('MOBILE')
      }
    },
    changeType(type: string) {
      // console.log("====type====",type)
      this.screenType = type
    },
  },
})
