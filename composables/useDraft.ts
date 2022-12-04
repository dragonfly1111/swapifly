import { useState } from '#app'

//示例：（使用命名导出）
export const setUserDraft = (list: any) => {
  return useState('userDraft', () => list)
}