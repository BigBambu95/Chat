import { actions } from "../constants";

export const register = (data) => {
    return {
        type: actions.REGISTER_REQUEST,
        payload: data
    }
}

export const registerSuccess = (user) => {
    return {
        type: actions.REGISTER_SUCCESS,
        payload: user
    }
}

export const registerError = (err) => {
    return {
        type: actions.REGISTER_FAILURE,
        payload: err
    }
}

export const profileRequest = (data) => {
    return {
        type: actions.PROFILE_REQUEST,
        payload: data
    }
}


export const profileSuccess = (data) => {
    return {
        type: actions.PROFILE_SUCCESS,
        payload: data
    }
}

export const loginRequest = (data) => {
    return {
        type: actions.LOGIN_REQUEST,
        payload: data
    }
}


export const loginSuccess = (data) => {
    return {
        type: actions.LOGIN_SUCCESS,
        payload: data
    }
}

export const loginError = (err) => {
    return {
        type: actions.LOGIN_FAILURE,
        payload: err
    }
}

export const logout = () => actions.LOGOUT;



export const fetchMessages = () => {
    return {
        type: actions.FETCHED_MESSAGES
    }
};

export const requestMessages = () => {
    return {
        type: actions.REQUESTED_MESSAGES
    }
};

export const requestMessagesSuccess = (messages) => {
    return {
        payload: messages,
        type: actions.REQUESTED_MESSAGES_SUCCESS,
    }
};

export const requestMessagesError = (err) => {
    return {
        payload: err,
        type: actions.REQUESTED_MESSAGES_FAILURE
    }
};

export const sendMessage = msg => {
    return {
        payload: msg,
        type: actions.SEND_MESSAGE
    }
};


export const getMessage = (msg) => {
    return {
        payload: msg,
        type: actions.GET_MESSAGE
    }
};

export const getUserList = (users) => {
    return {
        payload: users,
        type: actions.GET_USERLIST
    }
}

export const addUser = (user) => {
    return {
        payload: user,
        type: actions.ADD_USER
    }
};

export const removeUser = (user) => {
    return {
        payload: user,
        type: actions.REMOVE_USER
    }
}

export const addNotification = (notification) => {
  return {
      payload: notification,
      type: actions.ADD_NOTIFICATION
  }
};

const addNotificationSuccess = (notification) => {
  return {
      payload: notification,
      type: actions.ADD_NOTIFICATION_SUCCESS
  }
};

export const startConversationRequest = (username) => {
    return {
        payload: username,
        type: actions.START_CONVERSATION_REQUEST
    }
}


export const startConversationResponse = (response) => {
    return {
        payload: response,
        type: actions.START_CONVERSATION_RESPONSE
    }
}

export const setConversationStatus = (status) => {
    return {
        payload: status,
        type: actions.SET_CONVERSTAION_STATUS
    }
}
