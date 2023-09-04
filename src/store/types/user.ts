import { IAllMTypeList, IUserScore, IWalletAddress } from './coin'

export interface userState {
  userWallet: IWalletAddress[]
  mtypeList: IAllMTypeList[]
  userScore: IUserScore
}
