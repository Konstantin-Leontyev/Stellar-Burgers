import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware } from "@reduxjs/toolkit";

import { TRootState } from "../store";

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

export function socketMiddleware<S, R>(wsActions: TWsActions<S, R>): Middleware<{}, TRootState> {
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
    return (next) => {
      return (action) => {
        const {dispatch} = store;

        if (connect.match(action)) {
          socket = new WebSocket(action.payload);
          onConnecting && dispatch(onConnecting());

          socket.onopen = () => {
            onOpen && dispatch(onOpen());
          }

          socket.onerror = () => {
            dispatch(onError("Socket connection error"));
          }

          socket.onclose = () => {
            onClose && dispatch(onClose());
          }

          socket.onmessage = (event) => {
            const { data } = event;

            try {
              const parsedData = JSON.parse(data);

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
          socket.close();
          socket = null;
        }

        next(action);
      };
    }
  }
}