import React , { useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { Balance } from './Balance'
import { IncomeExpenses } from './IncomeExpenses'
import { TransactionList } from './TransactionList'
import { AddTransaction } from './AddTransaction'
import { GlobalProvider, GlobalContext } from '../context/GlobalState'

export const Dashboard = () => {
    const navigate = useNavigate();
    const {user,logoutUser} = useContext(GlobalContext);
    useEffect(() => {
      if (!user) {
        navigate('/login')
      }
    }, [user, navigate])

  return (
    <GlobalProvider>
      <h4>Welcome {user && user.name}</h4>
      <button id="logout" onClick={logoutUser} className='btn'>Logout</button>  
         <div className='container'>
             <Balance />
             <IncomeExpenses />
             <TransactionList />
             <AddTransaction />
         </div>
     </GlobalProvider>
  )
}
