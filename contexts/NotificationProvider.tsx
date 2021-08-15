import React, { FC, useReducer } from "react";

export type NotificationType = {
  title: string;
  message: string;
  icon?: React.ReactElement;
};

type State = {
  notification: NotificationType[];
};

type Action = {
  type?: "@@NOTIFICATION/PUSH" | "@@NOTIFICATION/POP";
  notification?: NotificationType;
};

type Dispatch = (action: Action) => void;

const NotificationStateContext = React.createContext<State>({
  notification: [],
});
const NotificationDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

export const notificationReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "@@NOTIFICATION/PUSH":
      if (action.notification) {
        return {
          notification: [...state.notification, action.notification],
        };
      }
      return state;
    case "@@NOTIFICATION/POP":
      return { notification: [...state.notification.slice(1)] };
    default:
      return { notification: state.notification };
  }
};

const NotificationProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    notification: [],
  });
  return (
    <NotificationStateContext.Provider value={state}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationStateContext.Provider>
  );
};

function useNotificationState() {
  const context = React.useContext(NotificationStateContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationState must be used within a NotificationProvider"
    );
  }
  return context;
}

function useNotificationDispatch() {
  const context = React.useContext(NotificationDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationDispatch must be used within a NotificationProvider"
    );
  }
  return context;
}

function useNotification() {
  return [useNotificationState(), useNotificationDispatch()];
}

export default NotificationProvider;

export { useNotification, useNotificationDispatch, useNotificationState };
