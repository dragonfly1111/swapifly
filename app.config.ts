const DOMAIN = 'https://swapiflyapi.honglanshuzi.com'

export default defineAppConfig({
  name: 'Swapifly - 24小時無休二手買賣平台。集結全球買家、賣家，輕鬆轉讓二手物品， 不論你喺香港定已經移民海外，上Swapifly 一定幫到你。早鳥優惠，注冊賣家帳戶，$0開網店! ',
  author: {
    name: '',
    link: '',
  },
  domain: DOMAIN, // 域名
  gdKey: '33572afc82950a2748b645ded7062b76',
  // facebookKey: '489813939845259',
  facebookKey: '1243032056388539',
  googleKey: '937590701446-11ocgsktalnalr813c14mjm1ih6o18sm.apps.googleusercontent.com',
  googleMapKey: 'AIzaSyDS3riYkx_d0VQGPfkH81jxHuOCfXTq5dA',
  // insKey: '490995173091962',
  insKey: '1298038900984971',
  insRedirect: DOMAIN + '/swapifly/insAuth', // ins登录回调地址
  baseImgPrefix: 'https://swapifly.oss-cn-hongkong.aliyuncs.com/', // 全局oss图片前缀
  uploadUrl: DOMAIN + '/index.php/index/oss/Upload', // 全局文件上传前缀
  forbidLink: DOMAIN + '/swapifly/helpCenter/detail?id=31', // 封禁文章
  serviceLink: DOMAIN + '/swapifly/helpCenter/detail?id=2', // 服务条款
  privateLink: DOMAIN + '/swapifly/helpCenter/detail?id=32', // 隐私政策
  serviceEmail: 'swapifly.ga@gmail.com' // 服务邮箱
})
