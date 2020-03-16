
import { actions } from "../constants";


const chatReducer = (state, action) => {

    if(state === undefined) {
        return {
            users: [],
            conversation: {
                id: '',
                username: '',
                messages: [],
                status: ''
            },
            user: {},
            notification: {},
            loading: false,
            error: null
        }
    }
    
    switch (action.type) {
        case actions.REGISTER_REQUEST:
            return {
                ...state,
                user: {},
                loading: true,
                error: null
            }

        case actions.REGISTER_SUCCESS:
            return {
                ...state,
                user: {
                    username: action.payload,
                    isAuth: true
                },
                loading: false, 
                error: null
            }

        case actions.REGISTER_FAILURE:
            return {
                ...state,
                user: {},
                loading: false,
                error: action.payload
            }

        case actions.LOGIN_REQUEST:
            return {
                ...state,
                user: {},
                loading: true,
                error: null
            }

        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    username: action.payload,
                    isAuth: true
                },
                error: null
            }

        case actions.LOGIN_FAILURE:
            return {
                ...state,
                user: {},
                loading: false,
                error: action.payload
            }
        
        case actions.LOGOUT:
            return {
                ...state,
                conversation: {},
                users: [],
                notification: {},
                user: {},
                loading: false,
                error: null
            }

        case actions.PROFILE_REQUEST:
            return {
                ...state,
                user: {},
                loading: true,
                error: null
            }
        
        case actions.PROFILE_SUCCESS:
            return {
                ...state,
                user: {
                    username: action.payload,
                    isAuth: true
                },
                error: null
            }

        case actions.GET_MESSAGE:
            const { messages } = state.conversation; 
            return {
                ...state,
                notification: {},
                conversation: {
                    ...state.conversation,
                    messages: messages.concat(action.payload)
                }
            };

        case actions.ADD_NOTIFICATION:
            return {
                ...state,
                notification: action.payload
            };

        case actions.REMOVE_NOTIFICATION:
            return {
                ...state,
                notification: {}
            };

        case actions.GET_USERLIST:
            const newUsers = action.payload.filter(item => item.username !== state.user.username);

            return {
                ...state,
                users: newUsers,
                loading: false
            }

        case actions.ADD_USER:
            return {
                ...state,
                users: state.users.concat(action.payload)
            }

        case actions.REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(item => item.username !== action.payload)
            }


        case actions.START_CONVERSATION_REQUEST:
            return {
                ...state,
                conversation: {
                    id: action.payload.chatId,
                    username: action.payload.username,
                    messages: []
                },
                notification: {}
            }
        
        case actions.START_CONVERSATION_RESPONSE:

            if(!action.payload.success) return state;
            
            return {
                ...state,
                conversation: {
                    ...state.conversation,
                    id: action.payload.id,
                    username: action.payload.username,
                },
                notification: {}
            }

        case actions.SET_CONVERSTAION_STATUS:         
            return {
                ...state,
                conversation: {
                    ...state.conversation,
                    status: action.payload
                },
                notification: {}
            }

        case actions.LEAVE_CONVERSATION:
            return {
                ...state,
                conversation: {
                    id: '',
                    username: '',
                    status: '',
                    messages: []
                },
                notification: {}
            }

        default: return state
    }

};

export default chatReducer;