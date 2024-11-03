import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import { TOrderList } from "../../utils/types";
import { WebsocketStatus } from "../../utils/constants";

type TFeedStore = {
  feed: TOrderList,
  status: WebsocketStatus,
  connectionError: string | null
};

const initialState: TFeedStore = {
  feed: {} as TOrderList,
  status: WebsocketStatus.OFFLINE,
  connectionError: null
};

export const websocketSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.status = WebsocketStatus.CONNECTING;
    },
    wsOpen: (state) => {
      state.status = WebsocketStatus.ONLINE;
    },
    wsClose: (state) => {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsMessage: (state, action: PayloadAction<TOrderList>) => {
      state.feed = action.payload;
    },
  },
  selectors: {
    getStatus: state => state.status,
    getFeed: state => state.feed,
  }
});

export const { getStatus, getFeed } = websocketSlice.selectors;

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } = websocketSlice.actions;

type TActionsCreator = typeof websocketSlice.actions;

export type TInternalFeedActions = ReturnType<TActionsCreator[keyof TActionsCreator]>;