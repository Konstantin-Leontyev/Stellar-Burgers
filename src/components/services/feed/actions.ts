import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction<string, 'common-feed/connect'>('common-feed/connect');
export const wsDisconnect = createAction('common-feed/disconnect');

export type TExternalFeedActions = ReturnType<typeof wsConnect> | ReturnType<typeof wsDisconnect>