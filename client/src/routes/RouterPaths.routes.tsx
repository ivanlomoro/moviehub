import {Route, Routes, Navigate} from 'react-router-dom'
import Home from '../Page/Home'

const RouterPaths = () => {
  return (
    <>
    <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
    </Routes>

</>
  )
}

export default RouterPaths