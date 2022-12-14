export interface IGoodsClass {
  id: number
  pid: number
  title: string
  advice: string
  children: IGoodsClass[]
}

