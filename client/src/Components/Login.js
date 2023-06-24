import React , {useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'

export const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      })
    
      const {  email, password } = formData
      const {user, login} = useContext(GlobalContext);
      const navigate = useNavigate()
      useEffect(() => {
        if (user) {
          navigate('/')
        }
      }, [user, navigate])

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()
    
        const userData = {
          email,
          password,
        }
        
        login(userData)
      }
    
      const addNewUser = () => {
        navigate('/register')
      }
      return (
        <>
            <h1>
             Login
            </h1>
          
          <section className='form'>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={email}
                  placeholder='Enter your email'
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  value={password}
                  placeholder='Enter password'
                  onChange={onChange}
                />
              </div>
    
              <div className='form-group'>
                <button type='submit' className='btn btn-block'>
                  Submit
                </button>
              </div>
            </form>
          </section>
          <div>
            <span onClick={addNewUser} style={{color: 'blueviolet' , cursor:'pointer'}}> 
            <u>Not a user? Create an account now.</u>
            </span>
          </div>
        </>
      )
}