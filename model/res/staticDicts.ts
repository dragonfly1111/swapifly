
export function generateGender(t:any){
  return [{
    key: t('gender.man'),
    value: 1
  },{
    key: t('gender.women'),
    value: 2
  },{
    key: t('gender.nonBinary'),
    value: 3
  },{
    key: t('gender.secrecy'),
    value: 4
  },{
    key: t('gender.other'),
    value: 0
  }]
}

export interface Idict {
  key: string,
  value: number,
}
