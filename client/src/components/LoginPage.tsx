import {FC, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faKey, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import '../components/styles/loginPage.css'
import { useAuthStore } from '../store';
import { IAuthStore } from '../types/IAuthStore';


const LoginPage:FC = () => {

    const [email, setEmail] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const {login, toRegistration} = useAuthStore<IAuthStore>((state) => state)

    return ( 
        <div className="login-page">
           <div className="content">
            <div className='reg-log'>
            <h2 className='sign-in'>Sign in</h2>
            <a onClick={() => toRegistration()} ><h2 className='sing-up'>Sign up</h2></a>
            </div>
                <div className="log-form">
                    <div className='email-inp'>
                        <FontAwesomeIcon icon={faAt} color='white' fontSize={24}/>
                        <input type="text" placeholder='email'onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='pass-inp'>
                        <FontAwesomeIcon icon={faKey} color='white' fontSize={24} />
                        <input type="password" placeholder='password' onChange={(e) => setPass(e.target.value)}/>
                    </div>
                    <div className='btn-block'>
                        <FontAwesomeIcon icon={faRightToBracket} color='white' fontSize={24}/>
                        <button onClick={() => login(email, pass)}>login</button>
                    </div>
                </div>


           </div>
        </div>
     );
}
 
export default LoginPage;