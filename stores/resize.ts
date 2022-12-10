import { defineStore } from 'pinia'

const MIN_SCALE = 0.7

// 大于1295 - PC  1000 ～ 1295 SCALE 小于1000 MOBILE
export interface ITypeState {
  curWidth: number,
  screenType: string,
  scale: number,
  contentPT: number,
  contentPTStr: string,

}

export const useResize = defineStore('resize', {
  state: (): ITypeState => ({
    curWidth: 0,
    screenType: 'PC',
    scale: 1,
    contentPT: 375,
    contentPTStr: '375px'
  }),
  actions: {
    setWidth(width: number){
      console.log("===qqqqq===",width)
      this.curWidth = width
      if(width > 1295){
        this.changeType('PC')
        this.setScale(1)
      } else if(width < 1000) {
        this.changeType('MOBILE')
        this.setScale(1)
      } else {
        this.changeType('SCALE')
        this.calcScale(width)
      }
    },
    changeType(type: string) {
      console.log("====type====",type)
      this.screenType = type
    },
    setScale(num: number){
      this.scale = num
    },
    // 根据当前屏幕宽度计算缩放比例
    calcScale(width: number){
      // 1000 => 0.7
      // width => x
      // 1295 => 1
      const scale = width / 1295
      this.setScale(scale)
      this.contentPT = 106 / scale
      this.contentPTStr = this.contentPT + 'px'
    },
  },
})
