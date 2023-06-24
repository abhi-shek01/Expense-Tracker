import React , {createContext, useReducer} from "react";
import AppReducer from './AppReducer'
import axios from 'axios'
const initialState = {
    transactions: [],
    error: null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
}
const API_TRANSACTION_URI = '/api/transaction'
const API_URL = '/api/users/'

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state,dispatch]= useReducer(AppReducer, initialState);
    let token

    async function getTransactions()
    {
        token= getToken();
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        try {
            const res = await axios.get(API_TRANSACTION_URI,config)
            dispatch({
                type: "GET_TRANSACTION",
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: "ERROR_TRANSACTION",
                payload: error.response.data.error
            })
        }
    }

    const deleteTransaction = async (id) => {
        token= getToken();
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        try {
            await axios.delete(`/api/transaction/${id}`,config)
            dispatch({
                type: "DELETE_TRANSACTION",
                payload: id
            })
        } catch (error) {
            dispatch({
                type: "ERROR_TRANSACTION",
                payload: error.response.data.error
            })
        }
    }

    const addTransaction =async (transaction) => {
        token = getToken();
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        try {
            const res = await axios.post(API_TRANSACTION_URI,transaction, config)
            dispatch({
                type: "ADD_TRANSACTION",
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: "ERROR_TRANSACTION",
                payload: error.response.data.error
            })
        }
    }

    async function registerUser(userData) {
        try {
            const response = await axios.post(API_URL, userData)
            localStorage.setItem('user', JSON.stringify(response.data))

            dispatch({
                type: "REGISTER_USER",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    const login = async (userData) => {
        try {
            const response = await axios.post(API_URL + 'login', userData)
            localStorage.setItem('user', JSON.stringify(response.data))

            dispatch({
                type: "LOGIN_USER",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    const logoutUser = () =>{
        localStorage.removeItem('user')
        dispatch({
            type:"LOGOUT_USER"
        })
    }

    function getToken()
    {
        let userToken
        if(localStorage.getItem('user'))
        userToken= JSON.parse(localStorage.getItem('user'))
        else
        return '';

        return userToken.token
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        deleteTransaction,
        getTransactions,
        error: state.error,
        addTransaction,
        user: state.user,
        registerUser,
        login,
        logoutUser
        }}>
        {children}
    </GlobalContext.Provider>)
}