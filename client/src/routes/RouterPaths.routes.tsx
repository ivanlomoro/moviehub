import { Route, Routes} from 'react-router-dom'
import Home from '../Page/Home'
import LoginPage from '../Page/LoginPage'

const RouterPaths = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default RouterPaths