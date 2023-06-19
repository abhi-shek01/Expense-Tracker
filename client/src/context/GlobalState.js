import React , {createContext, useReducer} from "react";
import AppReducer from './AppReducer'
import axios from 'axios'
const initialState = {
    transactions: [],
    error: null
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state,dispatch]= useReducer(AppReducer, initialState);

    async function getTransactions()
    {
        try {
            const res = await axios.get('/api/transaction')
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
        try {
            await axios.delete(`/api/transaction/${id}`)
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
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/transaction',transaction, config)
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

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        deleteTransaction,
        getTransactions,
        error: state.error,
        addTransaction
        }}>
        {children}
    </GlobalContext.Provider>)
}