import { createSelector, createSlice } from '@reduxjs/toolkit';
import { ARTICLE } from '../sliceName';
import { type RootState } from '..';
import { articleListThunk } from '../actions/article.thunk';
import { IArticleListType } from '@/store/types/article';

interface ArticleListState {
  articleList: (IArticleListType)[]
  homeNoticeShowStatus: boolean
  homeNoticeShowList: Array<boolean | string>
}
const initialState: ArticleListState = {
  articleList: [],
  // 首页公告弹窗是否需要显示
  homeNoticeShowStatus: true,
  homeNoticeShowList: []
};

const articleSlice = createSlice({
  name: ARTICLE,
  initialState,
  reducers: {
    updateHomeNoticeShowStatus(state, action ) {
      state.homeNoticeShowStatus = action.payload;
    },
    updateHomeNoticeList(state, action) {
      state.homeNoticeShowList = action.payload;
    }
  },
  extraReducers( builder ) {
    articleListThunk.extraReducers( builder );
  }
});

const { actions } = articleSlice;

// 获取token
export const tokenSelector = createSelector((state: RootState) => state[ARTICLE], ({ articleList }) => articleList);

export const {
  updateHomeNoticeShowStatus,
  updateHomeNoticeList
} = actions;
export default ( {
  [ARTICLE]: articleSlice.reducer

});
