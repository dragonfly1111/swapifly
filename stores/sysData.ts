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
  authenticationStatus: Idict[],
  searchLog: any[],
  collectionList: any[],
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
    authenticationStatus:[],
    searchLog:[],
    collectionList:[],
  }),
  actions: {
    setSysDataServerSide(e: any){
      this.region = e.region
      this.lang = e.lang
      this.goodsClass = e.goodsClass
      this.goodsSort = e.goodsSort
      this.goodsOan = e.goodsOan
    },
    setSysDataClientSide(e: any){
      this.gender = e.gender
      this.evaluationSort = e.evaluationSort
      this.evaluationSource = e.evaluationSource
      this.msgType = e.msgType
      this.dialogueOperationType = e.dialogueOperationType
      this.authenticationStatus = e.authenticationStatus
    },
    setSearchHis(e: any){
      console.log('setSearchHis')
      console.log(e)
      this.searchLog = e.searchLog
      this.collectionList = e.collectionList
    }
  },
})
