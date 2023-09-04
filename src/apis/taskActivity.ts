import { request } from '@/utils/http'
import {
  IAllTaskData,
  IAwardData,
  IGameRecordData,
  IPlayTurntableData,
  IRewardRecordListData,
  ISignInData,
  IUserActionData,
  IUserDoTask
} from '@/store/types/taskActivity'
import { ICoin, ICoinsetConfig } from '@/store/types/coin'

export interface IUserDoTaskParams {
  idd: string
  levelid?: string
}
export const signInListApi = () => {
  return request.post<ISignInData>('/api/Taskactivity/signinlist')
}
export const userDoTaskApi = (params: IUserDoTaskParams) => {
  return request.post<IUserDoTask>('/api/Taskactivity/userDoTask', params)
}
export const turntableAwardsApi = () => {
  return request.post<IAwardData>('/api/Turntable/Awards')
}
export const gameRecordApi = () => {
  return request.post<IGameRecordData>('/api/Turntable/Gamerecord')
}
export interface IPlayTurntableParams {
  config_id: number
}
export const playTurntableApi = (params: IPlayTurntableParams) => {
  return request.post<IPlayTurntableData>('/api/Turntable/Play', params)
}
export interface IRewardRecordListParams {
  page?: number
  size?: number
  taskid?: string
  order?: string
}
export const rewardRecordListApi = (params: IRewardRecordListParams) => {
  return request.post<IRewardRecordListData>('/api/Taskactivity/rewardrecordlist', params)
}
export const userActionListApi = () => {
  return request.post<IUserActionData>('/api/Taskactivity/useractionlist')
}
export const allTaskBandsListApi = () => {
  return request.post<IAllTaskData[]>('/api/Taskactivity/alltaskbandslist')
}
