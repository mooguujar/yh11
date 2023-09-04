export interface ISignInRecord {
  date: string
  datetxt: string
  hisflag: number
  hisokflag: number
  money: number
}
export interface ISignInData {
  task_idd: string
  todayisok: number
  out_txt: string
  out_num: {
    day: number
    money: number
  }
  list: ISignInRecord[]
}
export interface TaskActivityState {
  signInData: ISignInData | Record<string, any>
  turntableAwards: IAwardData
  userActionList: IUserActionData
  awardRecord: IGameRecordData
}
export interface IUserDoTask {
  taskmoney?: number
  mtype?: number
  coin_name?: string
  money?: string
}
export interface ITurntableAward {
  [key: string]: any
  id: number
  turntable_idd: string
  sort: number
  updatetime: string | null
  turntable_desc: string
  turntable_name: string
  turntable_type: number
  activity_img: string
  turntable_num: string
  extjson: string | null
}

export interface ITurntableOption {
  id: number
  title: string
  frequency: string
  consume: string
  discount: string
}

export interface IAwardData {
  awards: ITurntableAward[]
  options: ITurntableOption[]
}

export interface IGameRecord {
  order_id: string
  uuid: string
  game_type: number
  record_num: number
  turntable_idd: string
  turntable_type: number
  record_key: string
  record_desc: string
  addtime: string
  mtype: number
  water_rate: number
  status: number
  turntable_button: string
}
export interface IGameRecordData {
  count: number
  list: IGameRecord[]
}
export interface IAward {
  turntable_idd: string
  activity_img: string
  turntable_name: string
  turntable_desc: string | null
  mtype: number
  turntable_num: string
}

export interface IMtype {
  '0': number
  '1': number
  '20': number
}

export interface IPlayTurntableData {
  awards: IAward[]
  mtype: IMtype
}

export interface IRewardRecordList {
  id: number
  order_id: string
  uuid: string
  username: string
  award_type: number
  award_num: string
  award_time: string
  friends_uuid: string
  friends_username: string
  award_key: string
  award_desc: string
  addtime: string
  extkey: string | null
  extjson: string | null
  mtype: number
  coin_name: string
  water_rate: string
  complete_time: string
  status: number
  award_reason: string | null
  award_ip: string
  taskactivity_id: string
  trade_type: number
  remoney_type: number
}

export interface IRewardRecordListData {
  data: IRewardRecordList[]
  count: number
}

export interface IAction {
  [key: string]: any
  id: string
  target: string
  reward: string
  task_img: string
  flag: number
  cando: number
}

export interface IDayAction {
  id: number
  activity_idd: string
  activity_name: string
  activity_type: number
  updatetime: string
  sort: number
  activity_desc: string | null
  activity_img: string | null
  target: number
  reward: number
  extjson: string | null
  tofinish_action: string
  money_type_mode: string
  doneNum: number
  flag: number
  danwei: string
}

export interface IUserActionData {
  total: number
  task_idd: string
  actions: IAction[]
  dayactions: IDayAction[]
}

export interface ITaskInfo {
  id: string
  target: string
  reward: string
  task_img: string
  hasdong?: number
}

export interface IAllTaskData {
  task_idd: string
  task_name: string
  task_desc: string
  task_type: number
  info: ITaskInfo
  active: number
  nowmoney: number
}
