interface Iwallets {
  total_num: number
  available_num: number
  remaining_num: number
  trans_num: number
  trans: {
    sell: number
    buy: number
  }
}
interface SellOrder {
  sell_order_id: string
  buy_order_id: string
  mtype: number
  sell_num: number
  addtime: string
  status: number
}
interface BuyOrder {
  buy_order_id: string
  sell_order_id: string
  mtype: number
  buy_num: string
  addtime: string
  status: number
}
export interface IBuySellCoin {
  wallets: Record<string, Iwallets>
  sell_orders: SellOrder[]
  buy_orders: BuyOrder[]
}

interface BuyOrderInfo {
  order_id: string
  sell_num: string
  remaining_num: string
  is_split: number
  uuid: string
  headimg: string
  nickname: string
  collection_cardid: string
  collection_realname: string
  collection_bankname: string
  collection_bankcode: string
  collection_cardimg: string
}
export interface IBuyOrder {
  order_id: string
  status: number
  mtype: number
  buy_num: string
  addtime: string
  headimg: string
  nickname: string
  time_second: number
  sell_info: BuyOrderInfo
}
export interface IBuyOrderData {
  count: number
  list: IBuyOrder[]
}

interface SellOrderInfo {
  id: number
  uuid: string
  order_id: string
  mtype: number
  sell_mtype: number
  coin_protocol: string
  buy_num: string
  coin_fee: string
  status: number
  addtime: string
  complete_time: string | null
  seller_check_buy_status_time: string | null
  buyer_update_trans_time: string | null
  headimg: string | null
  nickname: string | null
  time_second: string | null
}
export interface ISellOrder {
  order_id: string
  status: number
  mtype: number
  gift_mtype?: number
  sell_num: string
  remaining_num: string
  is_split: number
  addtime: string
  headimg: string
  nickname: string
  time_second: string | null
  buy_orders: SellOrderInfo[]
}
export interface ISellOrderData {
  count: number
  list: ISellOrder[]
}
