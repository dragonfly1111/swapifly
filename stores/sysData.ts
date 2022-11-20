import { defineStore } from 'pinia'
import { IRegion } from '~/model/region'
import { ILang } from '~/model/lang'
import { IGoodsClass } from '~/model/goodsClass'
import { IGoodsSort } from '~/model/goodsSort'
import { IGoodsOan } from '~/model/goodsOan'
export interface ISysDataState {
  region: IRegion[],
  lang: ILang[],
  goodsClass: IGoodsClass[],
  goodsSort: IGoodsSort[],
  goodsOan: IGoodsOan[]
}

export const useSysData = defineStore('sysData', {
  state: (): ISysDataState => <ISysDataState>({
    region: [],
    lang: [],
    goodsClass: [],
    goodsSort: [],
    goodsOan: []
  }),
  actions: {
    setSysData(e: ISysDataState){
      this.region = e.region
      this.lang = e.lang
      this.goodsClass = e.goodsClass
      this.goodsSort = e.goodsSort
      this.goodsOan = e.goodsOan
    }
  },
})
