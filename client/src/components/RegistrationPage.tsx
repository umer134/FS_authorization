import{FC, useState } from 'react'
import './styles/regPage.css'
import { useAuthStore } from '../store'
import { IAuthStore } from '../types/IAuthStore'


const Registration:FC = () => {

    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [date, setDate] = useState<string>('')  

    const {toLogin, registration} = useAuthStore<IAuthStore>((state) => state)



    return ( 
        <div className="reg-page">
          <div className="container">
            <div className='head-party'>
                    <div className='log-reg'>
                        <p className='registren'>Registration</p>
                        <a onClick={() => toLogin()}><p className='login'>Login</p></a>
                    </div>
            </div>
            
            <div className="person-block">
                <div className='person-info'>
                    <div className='name-inp'>
                    <input type="text" placeholder='name' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='surname-inp'>
                    <input type="text" placeholder='surname' onChange={(e) => setSurname(e.target.value)} />
                    </div>
                    <div className='email-input'>
                    <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='password-inp'>
                    <input type="text" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className='age'>
                    <input type="date" name='birthday'  onChange={(e) => setDate(e.target.value)}/>
                    <button onClick={() => registration(name, surname, email, password, date)}>submit</button>
                </div>
            </div>
          </div>
        </div>
     );
}
 
export default Registration;