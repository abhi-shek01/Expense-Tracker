// eslint-disable-next-line
export default (state,action) => {
    switch(action.type)
    {
        case 'GET_TRANSACTION': return {
                ...state,
                transactions: action.payload
        }
        case 'ERROR_TRANSACTION': return {
                ...state,
                error: action.payload
        }
        case "DELETE_TRANSACTION": return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
        }
        case 'ADD_TRANSACTION': return {
                ...state,
                transactions: [ ...state.transactions,action.payload]
        }
        case 'REGISTER_USER': return {
                ...state,
                user: action.payload
        }
        case 'LOGIN_USER': return {
                ...state,
                user: action.payload
        }
        case 'LOGOUT_USER': return {
                ...state,
                user: null
        }
        default: return state;
    }
}