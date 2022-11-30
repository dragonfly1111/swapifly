import { defineStore } from 'pinia'
import { IRegion } from '~/model/res/region'
import { ILang } from '~/model/res/lang'
import { IGoodsClass } from '~/model/res/goodsClass'
import { IGoodsSort } from '~/model/res/goodsSort'
import { IGoodsOan } from '~/model/res/goodsOan'
import { Idict } from '~/model/res/staticDicts'
export interface ISysDataState {
  region: IRegion[],
  lang: ILang[],
  goodsClass: IGoodsClass[],
  goodsSort: IGoodsSort[],
  goodsOan: IGoodsOan[],
  gender: Idict[],
  evaluationSort: Idict[],
  evaluationSource: Idict[],
  msgType: Idict[],
  dialogueOperationType: Idict[],
}

export const useSysData = defineStore('sysData', {
  state: (): ISysDataState => <ISysDataState>({
    region: [],
    lang: [],
    goodsClass: [],
    goodsSort: [],
    goodsOan: [],
    gender: [],
    evaluationSort:[],
    evaluationSource:[],
    msgType:[],
    dialogueOperationType:[],
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
      this.evaluationSort = e.evaluationSort
      this.evaluationSource = e.evaluationSource
      this.msgType = e.msgType
      this.dialogueOperationType = e.dialogueOperationType
    }
  },
})
