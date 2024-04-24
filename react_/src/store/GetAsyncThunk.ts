import { createAsyncThunk, type PayloadAction, type ActionReducerMapBuilder, type SerializedError } from '@reduxjs/toolkit';
import type { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { RootState } from '.';
interface IAsyncThunk<T, P> {
  storeName: string
  path: string
  asyncFunc: ( params: P, thunkAPI: BaseThunkAPI<RootState, any, any> ) => Promise<T>
  successCallback: ( state: any, action: PayloadAction<T> ) => void
  failCallback: ( state: any, action: PayloadAction<any, any, any, SerializedError> ) => void
}

export default class GetAsyncThunk<T, P> {
  storeName: string;
  asyncFunc: ( params: P, thunkAPI: BaseThunkAPI<RootState, any, any> ) => Promise<T>;
  asyncThunk: any;
  successCallback: ( state: any, action: PayloadAction<T> ) => void;
  failCallback: ( state: any, action: PayloadAction<any, any, any, SerializedError> ) => void;

  constructor( { storeName, asyncFunc, successCallback, failCallback, path }: IAsyncThunk<T, P> ) {
    this.storeName = `${storeName}/${path}`;
    this.asyncFunc = asyncFunc;
    this.successCallback = successCallback;
    this.failCallback = failCallback;
    this.asyncThunk = this.createAsyncThunk();
  }

  createAsyncThunk() {
    return createAsyncThunk< T, P, BaseThunkAPI<RootState, any, any> >( this.storeName, ( params, thunkAPI ) => this.asyncFunc( params, thunkAPI as BaseThunkAPI<RootState, any, any> ));
  }

  extraReducers( builder: ActionReducerMapBuilder<any> ) {
    builder.addCase( this.asyncThunk.fulfilled, this.successCallback );
    builder.addCase( this.asyncThunk.rejected, this.failCallback );
  }
}
