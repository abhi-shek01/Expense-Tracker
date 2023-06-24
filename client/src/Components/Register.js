import React , {useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'


export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
      })
    
      const { name, email, password, password2 } = formData
      const {user, registerUser } = useContext(GlobalContext)
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
        e.preventDefault();
    
        if (password !== password2) {
          console.error('Passwords do not match')
        } else {
          const userData = {
            name,
            email,
            password,
          }
          registerUser(userData);
        }
      }
      
      return (
        <>
          <section className='heading'>
            <h1>
              Register
            </h1>
            <p>Please create an account</p>
          </section>
    
          <section className='form'>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  value={name}
                  placeholder='Enter your name'
                  onChange={onChange}
                />
              </div>
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
                <input
                  type='password'
                  className='form-control'
                  id='password2'
                  name='password2'
                  value={password2}
                  placeholder='Confirm password'
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
        </>
      )
}
