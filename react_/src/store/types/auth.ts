export interface ICountryCoin {
    id: number
    country_code: string
    country_name: string
    phone_code: string
    country_coin: string
    coin_price: number
    top_price: number
    is_sendsms: number
    wallet_type: string
    coin_rate: number
    order: number
    status: number
    remark: any
    country_lang: string
}

export interface ICountryCoinType {
    country_coin: (ICountryCoin)[] | []
    lastGetTime: number
    current: ICountryCoin | Record<string, any> | null
}

export interface IInfo {
    uuid: string
    username: string
    name: string
    nickname: string
    headimg: string
    regip: string
    regtime: string
    lasttime: string
    lastip: string
    open_id: number
    parent_openid: number
    parent_path: string
    level: string
    vip: number
    email: any
    phone: string
    cash: string
    available_cash: string
    channel: any
    withdraw_status: number
    deposit_status: number
    verified_status: number
    login_url: any
    reg_url: any
    set_country_code: string
    set_lang: string
    is_agency: number
    is_set_paypassword: number
    is_bind_googleauthenticator: number
    is_google_authenticator: number
    is_sms_verify: number
    telegram_app: any
    whats_app: any
    account_type: number
    line_app: any
    zalo_app: any
    playgame_token: any
    up_time: string
    lastplatform: string
    lastdeviceid: string
    signindays: number
    all_taskactivity: any
    pre_logintime: any
    pre_loginip: any
    is_email_verify: number
    internationalcode: string
    freesell_amount: string
    user_type: number
    countryCode?: string
    phoneCode?: string
    mobile?: string
    pass?: string
}

export interface IHeadimg {
    value: string
    status: number
    add_time: string
    ext: string
    extime: string
}

export interface INickname {
    value: string
    status: number
    add_time: string
    ext: string
    extime: string
}

export interface IPaypassword {
    value: string
    status: number
    add_time: string
    ext: string
    extime: string
}

export interface IEmail {
    value: string
    status: number
    add_time: string
    ext: string
    extime: string
}

export interface IEditreview {
    headimg: IHeadimg
    nickname: INickname
    paypassword: IPaypassword
    email: IEmail
}

export interface ILoginType {
    token: string
    info: IInfo
    editreview: IEditreview
}

export interface IRegisterType {
    code: number
    msg: string
}

export interface IMobileCodeType {
    timeless: number
    nexttime: number
    code: number
}

