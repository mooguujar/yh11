import GetAsyncThunk from '../GetAsyncThunk';
import { ARTICLE } from '../sliceName';
import { IArticleListType } from '../types/article';
import {
  ArticleListParams,
  articleListApi
} from '@/apis/article';
export const articleListThunk = new GetAsyncThunk<IArticleListType[], ArticleListParams>( {
  storeName: ARTICLE,
  path: '/',
  async asyncFunc( prams ) {
    try {
      const response = await articleListApi( prams );

      return response;
    } catch ( error ) {
      console.log( error );
      throw error;
    }
  },
  successCallback( state, action ) {
    state.articleList = action.payload;
  },
  failCallback( state, action) {
    console.log( action );
    throw action;
  }
} );
