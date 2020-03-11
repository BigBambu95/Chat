
import { actions } from "../constants";


const chatReducer = (state, action) => {

    if(state === undefined) {
        return {
            users: [],
            conversation: {
                id: '',
                username: '',
                messages: []
            },
            user: {},
            notification: {},
            loading: false,
            error: null
        }
    }
    
    switch (action.type) {
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

        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    username: action.payload,
                    isAuth: true
                },
                loading: false, 
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
        
        case actions.PROFILE_SUCCESS:
            return {
                ...state,
                user: {
                    username: action.payload,
                    isAuth: true
                },
                loading: false,
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

        case actions.ADD_USER:
            return {
                ...state,
                users: state.users.concat(action.payload)
            }


        case actions.START_CONVERSATION_REQUEST:
            return {
                ...state,
                conversation: {
                    id: action.payload.id,
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

        default: return state
    }

};

export default chatReducer;