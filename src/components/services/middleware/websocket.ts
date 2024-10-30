import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware } from "@reduxjs/toolkit";

import { DELAY, WSS_URL } from "../../utils/constants";
import { TRootState } from "../store";
import { refreshToken } from "../../utils/api";
import { wsConnect } from "../feed/actions";

type TWsActions<S, R> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onConnecting?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
  onOpen: ActionCreatorWithoutPayload;
  sendMessage?: ActionCreatorWithPayload<S>;
};

export function socketMiddleware<S, R>(wsActions: TWsActions<S, R>, tokenRefresh: boolean = false): Middleware<{}, TRootState> {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      disconnect,
      onConnecting,
      onClose,
      onError,
      onMessage,
      onOpen,
      sendMessage
    } = wsActions;

    let url = '';
    let isConnect: boolean = false;
    let reconnectInterval: number = 0;

    return (next) => {
      return (action) => {
        const {dispatch} = store;

        if (connect.match(action)) {
          socket = new WebSocket(action.payload);
          url = action.payload;
          onConnecting && dispatch(onConnecting());

          socket.onopen = () => {
            isConnect = true;
            onOpen && dispatch(onOpen());
          }

          socket.onerror = () => {
            dispatch(onError("Socket connection error"));
          }

          socket.onclose = () => {
            onClose && dispatch(onClose());

            if (isConnect) {
              reconnectInterval = window.setInterval(() => {
                dispatch(wsConnect(url));
              }, DELAY)
            }
          }

          socket.onmessage = (event) => {
            const { data } = event;

            try {
              const parsedData = JSON.parse(data);

              if (tokenRefresh && parsedData.message === 'Invalid or missing token') {
                refreshToken()
                  .then((refreshedData) => {
                    const wssUrl = new URL(url);
                    wssUrl.searchParams.set(
                      'token',
                      refreshedData.accessToken.replace('Bearer', '')
                    );
                    dispatch(connect(wssUrl.toString()));
                  })
                  .catch((error) => {
                    dispatch(onError((error as Error).message));
                  })

                dispatch(disconnect())
              }

              dispatch(onMessage(parsedData));
            } catch (error) {
              dispatch(onError((error as Error).message));
            }
          }
        }

        if (socket && sendMessage?.match(action)) {
          try {
            const data = JSON.stringify(action.payload);

            socket.send(data);
          } catch (error) {
              dispatch(onError((error as Error).message));
          }
        }

        if (socket && disconnect.match(action)) {
          clearInterval(reconnectInterval)
          isConnect = false;
          socket.close();
          socket = null;
        }

        next(action);
      };
    }
  }
}