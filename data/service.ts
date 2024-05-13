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
    key: 'mcdonald',
    title: '麦当劳',
    desc: '领取麦当劳优惠券',
    logo: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2017/01/04/201701041632042243/201701041632042243_600_400.jpg?&rand=0827',
    helpText: '输入手机验证码, 点击获取验证码, 输入验证码, 点击登录并领券即可领取到账。',
    endTime: new Date('2024-05-22 12:00:00'),
    relatedLink: 'https://www.mcdonalds.com.cn/',
  },
]
