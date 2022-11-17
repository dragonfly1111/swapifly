import {getRegion} from "~/api/comon";

export interface Locales {
  id: number
  img_url: string
  title: string
  title_en: string
}

export interface ILocales {
  [key: string]: Locales
}


export const availableArea: ILocales = {}


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
    const res = await getRegion()
    res.data.forEach((item: Locales) => {
      availableArea[item.title_en] = item
    })
    console.log(availableArea)

    areaSetting.value = getUseArea()
  }

  // lifecycle
  onBeforeMount(() => init())

  return {
    areaSetting,
    init,
  }
}
