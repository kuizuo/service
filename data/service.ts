export interface Service {
  key: string
  title: string
  desc: string
  logo: string
  helpText: string
  endTime?: Date
  relatedLink?: string
}

export const services: Service[] = [
  {
    key: 'moji',
    title: '某迹天气',
    desc: '免费领取一杯麦当劳夏日雪碧',
    logo: 'https://html5.moji.com/tpd/moji35plan2024/index/images/share.jpg',
    helpText: `输入手机验证码, 点击获取验证码, 输入验证码, 点击登录并领券即可领取自动到账。每日限一次。
    本程序暂不支持下单,请到麦当劳小程序下单。
    `,
    endTime: new Date('2024-09-03 00:00:00'),
    relatedLink: 'https://html5.moji.com/tpd/moji35plan2024/index.html?channelno=5846&appshare=0',
  },
  // {
  //   key: 'mobile_data',
  //   title: '移动流量',
  //   desc: '领取移动流量优惠券(流量日包)',
  //   logo: '/image/mobile.png',
  //   helpText: '输入手机验证码, 点击获取验证码, 输入验证码, 点击登录并领券即可领取到账。',
  // },
  // {
  //   key: 'cf',
  //   title: 'CF',
  //   desc: '点亮 CF 图标',
  //   logo: '/image/cf.png',
  //   helpText: '扫码登录即可点亮 CF 图标。',
  // },
]
