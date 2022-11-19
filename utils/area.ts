import { IRegion } from '~/model/region'
import { useSysData } from '~/stores/sysData'
// console.log(sysData)

export interface ILocales {
  [key: string]: IRegion
}


export let availableArea: ILocales = {}


export function AreaManager() {
  // composable
  const areaUserSetting = useCookie('area')

  // methods
  const getSystemArea = (): string => {
    try {
      // const foundLang = window
      //   ? window.navigator.language.substring(0, 2)
      //   : 'en'
      return 'Hong Kong'
    } catch (error) {
      return 'Hong Kong'
    }
  }
  const getUseArea = (): string =>
    areaUserSetting.value || getSystemArea()

  // state
  const areaSetting = useState<string>('area.setting', () =>
    getUseArea()
  )

  // watchers
  watch(areaSetting, (areaSetting) => {
    console.log('触发监听 area')
    console.log(areaSetting)
    areaUserSetting.value = areaSetting
  })

  // init locale
  const init = async () => {
    console.log('availableArea')
    const sysData = useSysData()
    // console.log(sysData)
    sysData.region.forEach(item=>{
      availableArea[item.title] = item
    })
    console.log(availableArea)
    areaSetting.value = getUseArea()
  }

  // lifecycle
  onMounted(() => init())

  return {
    areaSetting,
    init,
  }
}
