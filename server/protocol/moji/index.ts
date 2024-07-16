import type { Got } from 'got'
import got from 'got'
import { CookieJar } from 'tough-cookie'
import type { IResult } from './type'

const CITY = 5528
const CHANNEL = 2001

export class Moji {
  public instance!: Got
  private cookieJar: CookieJar

  // biz
  private snsid = ''

  constructor(
    private account: {
      mobile: string
    },
  ) {
    this.cookieJar = new CookieJar()

    this.instance = got.extend({
      responseType: 'json',
      cookieJar: this.cookieJar,
    })
  }

  async sendSmsCode() {
    const url = 'https://co.moji.com/api/cola2024/getCode'
    const query = {
      mobile: this.account.mobile,
      app: '0',
      channel: CHANNEL,
      platform: '0',
      snsid: '',
      cityid: CITY,
    }

    const { code, msg } = await this.instance.get(url, { searchParams: query }).json<IResult>()

    if (code !== 0)
      throw new Error(msg)

    return true
  }

  async login(smsCode: string) {
    const url = 'https://co.moji.com/api/phone/getlogin'
    const query = {
      from: '35',
      mobile: this.account.mobile,
      smscode: smsCode,
      app: '0',
      channel: CHANNEL,
      platform: '0',
      snsid: '',
      cityid: CITY,
    }

    interface Data {
      snsid: string
      success: string
      result: {
        code: number
        msg: string
        isPersonalInformationComplete: number
        sns_id: number
        session_id: string
        first_login: number
        is_vip: number
        is_expire: number
      }
      snsId: number
    }

    const { code, msg, data } = await this.instance.get(url, { searchParams: query }).json<IResult<Data>>()

    if (code !== 0)
      throw new Error(data?.result.msg || msg)

    this.snsid = data.snsid

    return true
  }

  async getCoupon() {
    const url = 'https://co.moji.com/api/cola2024/userCoupon'

    const query = {
      app: '0',
      channel: CHANNEL,
      mobile: this.account.mobile,
      platform: '0',
      snsid: this.snsid,
      cityid: CITY,
    }

    interface Data {
      snsid: string
      coupon: string
    }

    const { code, msg, data } = await this.instance.get(url, { searchParams: query }).json<IResult<Data>>()

    if (code !== 0)
      throw new Error(msg)

    // 如果有优惠券直接返回, 没有直接抽奖
    if (data.coupon) {
      return {
        coupon: data.coupon,
      }
    }

    return await this.raffle()
  }

  async raffle() {
    const url = 'https://co.moji.com/api/cola2024/raffle'
    const query = {
      snsid: this.snsid,
      mobile: this.account.mobile,
      smscode: '',
      app: '0',
      channel: CHANNEL,
      platform: '0',
      cityid: CITY,
    }

    interface Data {
      time2: string
      time: number
      snsid: string
      coupon: string
    }

    const { code, msg, data } = await this.instance.get(url, { searchParams: query }).json<IResult<Data>>()

    if (code !== 0 || !data)
      throw new Error(msg)

    return {
      time: data.time,
      coupon: data.coupon,
    }
  }
}
