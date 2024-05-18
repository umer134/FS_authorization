import { useEffect,FC } from 'react'
import './App.css'
import LoginPage from "./components/LoginPage"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCalendar, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useAuthStore } from './store'
import Registration from './components/RegistrationPage'
import { IAuthStore } from './types/IAuthStore'

const App: FC = () => {

  const {checkAuth, isAuth, isLoading, user, logout, isLogin, isRegistration } = useAuthStore<IAuthStore>((state) => state); 

  useEffect(() => {

    if(localStorage.getItem('token')){
         checkAuth()
    }
    console.log('render')
}, [])

  if(isLoading){
    return (
      <div>loading...</div>
    )
  }
  if(!isAuth && isRegistration){
     return (
       <Registration />
     )
   }

  if(!isAuth && isLogin){
    return (
      <LoginPage />
    )
  }

  
  return (
    <div className="App">
      <div className='main-page'>
                <div className="content">
                    <header>

                         <div className='logo'>
                              <h2>(LOGO)</h2>
                         </div>
                         <div className='exit'>
                              <h1 onClick={() => logout()}>
                                   <FontAwesomeIcon icon={faArrowRightFromBracket} />
                              </h1>
                         </div>
                    </header>

                    <main>    
                         <div className='info-block'>
                              <div className="person-info">
                                   <div className="name-block">
                                        <FontAwesomeIcon icon={faUser} color='white' border fontSize={20}/><p>{user?.name} {user?.surname}</p>
                                   </div>
                                   <div className="date-block">
                                        <FontAwesomeIcon icon={faCalendar} color='white' border fontSize={20} /><p>{user?.date}</p>
                                   </div>
                                   
                              </div>
                         </div>
                    </main>
                    <footer>
                         
                    </footer>
                </div>
          </div>
    </div>
  )
}

export default App
