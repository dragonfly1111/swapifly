import { getRegion, getLang, getGoodSort, getOan, getPdw } from "~/api/comon";
import { getGoodsClassList } from "~/api/goods";

async function initSysData() {
  console.log('--当前语言--')
  const regionRes = await getRegion()
  const langRes = await getLang()
  const goodsClassListRes = await getGoodsClassList()
  const goodsSortListRes = await getGoodSort()
  const goodsOanListRes = await getOan()
  const goodsPdwListRes = await getPdw()
  return{
    region: regionRes.data,
    lang: langRes.data,
    goodsClass: goodsClassListRes.data,
    goodsSort: goodsSortListRes.data,
    goodsOan: goodsOanListRes.data,
    goodsPdwList:goodsPdwListRes.data
    // region: [],
    // lang: [],
    // goodsClass: [],
    // goodsSort: [],
    // goodsOan: []
  }
}

export default initSysData
