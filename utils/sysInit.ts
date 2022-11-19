import { getRegion, getLang } from "~/api/comon";
import { getGoodsClassList } from "~/api/goods";
console.log('useAsyncData')

async function initSysData() {
  const regionRes = await getRegion()
  const langRes = await getLang()
  const goodsClassListRes = await getGoodsClassList()
  return{
    region: regionRes.data,
    lang: langRes.data,
    goodsClass: goodsClassListRes.data
  }
}

export default initSysData
