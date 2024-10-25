import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction<string, 'feed/connect'>('feed/connect');
export const wsDisconnect = createAction('feed/disconnect');