export interface ICoinAPIConfig {
  deposit_type: {
    n: string
    coin_rechargeaddress: []
    money_rechargecard: []
    third_payment: []
  }
  withdraw_type: {
    n: string
    withdraw_protocol: []
  }
  other_type: {
    n: string
    button_type: []
  }
}
export interface ICoinsetConfig {
  id: number
  mtype: number
  coin_name: string
  coin_unit: string
  wallet_type: string
  status: number
  coin_callname: string
  is_withdraw: number
  is_deposit: number
  min_withdraw: string
  max_withdraw: string
  auto_withdraw: string
  fee_withdraw: string
  coin_apiconfig: ICoinAPIConfig
  order: number
  remark: string
  symbol: string
  swapto_fee: string
  min_swapto: string
  coin_countrycode: string
  is_walletshow: number
  is_swapto: number
  coin_price: string
  top_price: string
  coin_rate: string
}
export interface ICoin {
  mtype: number
  coin_name: string
  coin_unit: string
  coincash: string
  available_coincash: string
  status: number
  wallet_type: string
  service_fee: string
  coinset_config?: ICoinsetConfig
}
export interface IWalletAddress {
  id: number
  uuid: string
  username: string
  coin_addresstype: number
  mtype: number
  coin_name: string
  coin_protocol: string
  coin_address: string
  coin_apicode: string
  coin_api_merchant: string
  remark: string
  status: number
  coin_api_id: number
}
