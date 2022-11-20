import { getRegion, getLang, getGoodSort, getOan } from "~/api/comon";
import { getGoodsClassList } from "~/api/goods";
console.log('useAsyncData')

async function initSysData() {
  const regionRes = await getRegion()
  const langRes = await getLang()
  const goodsClassListRes = await getGoodsClassList()
  const goodsSortListRes = await getGoodSort()
  const goodsOanListRes = await getOan()
  return{
    region: regionRes.data,
    lang: langRes.data,
    goodsClass: goodsClassListRes.data,
    goodsSort: goodsSortListRes.data,
    goodsOan: goodsOanListRes.data
    // region: [],
    // lang: [],
    // goodsClass: [],
    // goodsSort: [],
    // goodsOan: []
  }
}

export default initSysData
