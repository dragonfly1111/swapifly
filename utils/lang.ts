import { useI18n } from 'vue-i18n'
import { useSysData } from '~/stores/sysData'
import { ILang } from '~/model/res/lang'
export interface ILocales {
  [key: string]: ILang
}

export const availableLocales: ILocales = {}

export function LanguageManager() {
  // composable
  const { locale } = useI18n()
  const localeUserSetting = useCookie('locale')
  if(!localeUserSetting.value){
    localeUserSetting.value = 'zh-HK'
  }
  // methods
  const getSystemLocale = (): string => {
    try {
      const foundLang = window
        ? window.navigator.language.substring(0, 2)
        : 'zh-HK'
      return availableLocales[foundLang] ? foundLang : 'zh-HK'
    } catch (error) {
      return 'zh-HK'
    }
  }
  const getUserLocale = (): string =>
    localeUserSetting.value || getSystemLocale()

  // state
  const localeSetting = useState<string>('locale.setting', () =>
    getUserLocale()
  )

  // watchers
  watch(localeSetting, (localeSetting) => {
    console.log('触发语言监听')
    localeUserSetting.value = localeSetting
    console.log(localeUserSetting.value)
    locale.value = localeSetting
    location.reload()
  })

  // init locale
  const init = () => {
    const sysData = useSysData()
    sysData.lang.forEach(item=>{
      availableLocales[item.name] = item
    })
    localeSetting.value = getUserLocale()
  }
  locale.value = localeSetting.value

  // lifecycle
  onBeforeMount(() => init())

  return {
    localeSetting,
    init,
  }
}
