import React,{useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'
import {numberWithCommas} from '../utils/format'
export const Transaction = ({transaction}) => {
  const {deleteTransaction} = useContext(GlobalContext);
  return (
    <li className={transaction.amount < 0 ? "minus" : "plus"} >
            {transaction.text} 
            <span>{numberWithCommas(transaction.amount)}</span>
            <button className="delete-btn" onClick={() => deleteTransaction(transaction._id)}>
              x
            </button>
    </li>
  )
}