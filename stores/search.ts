import { defineStore } from 'pinia'

export const useSearchKey = defineStore('search', {
  state: () => ({
    searchKey: '',
  }),
  actions: {
    setKey(e: string){
      this.searchKey = e
    }
  },
})
