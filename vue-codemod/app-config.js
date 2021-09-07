/**
 * 营销管理后台微前端子应用配置
 */
const APP_CONFIG = [// 转介绍管理平台
  {
    name: 'marketing-manage-platform',
    // entry: 'http://localhost:8081',
    activeRule: ({ hash }) => new RegExp('^#\/(referral|referralActivity)(\/.*)?$').test(hash),
    props: {},
    routes: require.context('../router/routes/referral', false, /\.js$/),
    microSwitch: true
  }
]
  
if (process.env.NODE_ENV === 'testing') {
  const regExp = /^\/zm-operation-manage\/dev-(\d{1,5})\/?$/
  const match = window.location.pathname.match(regExp)
  const devPort = match && match[1]

  if (devPort) {
    APP_CONFIG.splice(0, APP_CONFIG.length, {
      name: 'dev',
      entry: `http://localhost:${ devPort }`,
      activeRule: ({ pathname }) => regExp.test(pathname),
      microSwitch: true
    })
  }
}
  
export default APP_CONFIG
  