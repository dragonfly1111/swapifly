import { defineStore } from 'pinia'
import { IRegion } from '~/model/region'
import { ILang } from '~/model/lang'
import { IGoodsClass } from '~/model/region'
export interface ISysDataState {
  region: IRegion[],
  lang: ILang[],
  goodsClass: IGoodsClass[]
}

export const useSysData = defineStore('sysData', {
  state: (): ISysDataState => <ISysDataState>({
    region: [],
    lang: [],
    goodsClass: [],
  }),
  actions: {
    setSysData(e: ISysDataState){
      console.log('setSysData')
      this.region = e.region
      this.lang = e.lang
      this.goodsClass = e.goodsClass
    }
  },
})
