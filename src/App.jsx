import { Route,Routes } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Home from './Home'
import PagenotFound from './PagenotFound'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/404' element={<PagenotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
