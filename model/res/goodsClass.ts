export interface IGoodsClass {
  id: number
  pid: number
  title: string
  title_en: string
  children: IGoodsClass[]
}

