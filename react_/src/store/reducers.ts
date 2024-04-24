import { combineReducers } from '@reduxjs/toolkit';
import auth from './slices/auth.slice';
import entry from './slices/entry.slice';
import article from './slices/article.slice';
const reducer = combineReducers( {
  ...auth,
  ...entry,
  ...article
} );

export default reducer;
