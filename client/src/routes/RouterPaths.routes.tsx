import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../Page/Home'
import LoginPage from '../Page/LoginPage'
import PrivateRoutes from './PrivateRoutes'

const RouterPaths = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={
          <PrivateRoutes><Home /></PrivateRoutes>
        } />
      </Routes>
    </>
  )
}

export default RouterPaths