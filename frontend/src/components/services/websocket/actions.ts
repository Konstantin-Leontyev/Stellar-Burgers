import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction<string, 'common-websocket/connect'>('common-websocket/connect');
export const wsDisconnect = createAction('common-websocket/disconnect');

export type TExternalFeedActions = ReturnType<typeof wsConnect> | ReturnType<typeof wsDisconnect>