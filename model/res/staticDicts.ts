// 性别
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
// 评价排序
export function generateEvaluationSort(t:any){
  return [{
    key: t('evaluate.sortEvaluation.newest'),
    value: 1
  },{
    key: t('evaluate.sortEvaluation.oldest'),
    value: 2
  },{
    key: t('evaluate.sortEvaluation.highestScore'),
    value: 3
  },{
    key: t('evaluate.sortEvaluation.lowestScore'),
    value: 4
  }]
}
// 评价来源
export function generateEvaluationSource(t:any){
  return [{
    key: t('evaluate.sourceEvaluation.formBuyer'),
    value: 1
  },{
    key: t('evaluate.sourceEvaluation.formSeller'),
    value: 2
  }]
}
// 信息类型
export function generateMsgType(t:any){
  return [{
    key: t('dialogue.inbox'),
    value: 0
  },{
    key: t('dialogue.onSale'),
    value: 1
  },{
    key: t('dialogue.underPurchase'),
    value: 2
  },{
    key: t('dialogue.sealed'),
    value: 3
  }]
}
// 对话页面操作类型
export function generateDialogueOperationType(t:any){
  return [{
    key: t('dialogue.sealConversation'),
    value: 1
  },{
    key: t('dialogue.block'),
    value: 2
  },{
    key: t('dialogue.unBlock'),
    value: 3
  },{
    key: t('dialogue.deleteConversation'),
    value: 4
  },{
    key: t('dialogue.report'),
    value: 5
  }]
}
// 认证状态
export function generateAuthenticationStatus(t:any){
  return [{
    key: t('authentication.waitAudit'),
    value: 0
  },{
    key: t('authentication.pass'),
    value: 1
  },{
    key: t('authentication.notpass'),
    value: 2
  }]
}

export interface Idict {
  key: string,
  value: number,
}
