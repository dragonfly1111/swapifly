import { useI18n } from 'vue-i18n'
import { useSysData } from '~/stores/sysData'
import {availableArea} from "~/utils/area";
import { ILang } from '~/model/lang'
export interface ILocales {
  [key: string]: ILang
}

export const availableLocales: ILocales = {}

export function LanguageManager() {
  // composable
  const { locale } = useI18n()
  const localeUserSetting = useCookie('locale')

  // methods
  const getSystemLocale = (): string => {
    try {
      const foundLang = window
        ? window.navigator.language.substring(0, 2)
        : 'en'
      return availableLocales[foundLang] ? foundLang : 'en'
    } catch (error) {
      return 'en'
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
    localeUserSetting.value = localeSetting
    console.log('触发语言监听')
    console.log(localeSetting)
    locale.value = localeSetting
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
