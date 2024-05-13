import got from 'got'
import { md5 } from '@kuizuo/utils'

export class Mcdonald {
  constructor(
    private mobile: string,
  ) { }

  sendSmsCode() {
    const url = 'https://xxx.com'

    const data = { mobile: this.mobile, timestamp: Date.now() } as { mobile: string, timestamp: number, sign: string }
    data.sign = this.getSign(data)

    return got.post(url, { json: data })
  }

  getSign(obj: Record<string, string | number>) {
    return md5('obj')
  }

  login(code: string) {
    return true
  }

  getCoupon() {
    return true
  }
}
