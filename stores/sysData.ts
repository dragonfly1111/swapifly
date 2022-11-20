import { defineStore } from 'pinia'
import { IRegion } from '~/model/region'
import { ILang } from '~/model/lang'
import { IGoodsClass } from '~/model/goodsClass'
import { IGoodsSort } from '~/model/goodsSort'
import { IGoodsOan } from '~/model/goodsOan'
import { Idict } from '~/model/staticDicts'
export interface ISysDataState {
  region: IRegion[],
  lang: ILang[],
  goodsClass: IGoodsClass[],
  goodsSort: IGoodsSort[],
  goodsOan: IGoodsOan[],
  gender: Idict[]
}

export const useSysData = defineStore('sysData', {
  state: (): ISysDataState => <ISysDataState>({
    region: [],
    lang: [],
    goodsClass: [],
    goodsSort: [],
    goodsOan: [],
    gender: []
  }),
  actions: {
    setSysDataServerSide(e: ISysDataState){
      this.region = e.region
      this.lang = e.lang
      this.goodsClass = e.goodsClass
      this.goodsSort = e.goodsSort
      this.goodsOan = e.goodsOan
    },
    setSysDataClientSide(e: ISysDataState){
      this.gender = e.gender
    }
    },
})
