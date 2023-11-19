import { FC, ReactNode } from "react"
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from "react-router-dom"
import './PrivateRoutes.styles.css'

type PrivateRoutesProps = {
  children: ReactNode
}

const PrivateRoutes: FC<PrivateRoutesProps> = ({ children }) => {

  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="center-container">
        <div className="hourglassBackground">
          <div className="hourglassContainer">
            <div className="hourglassCurves"></div>
            <div className="hourglassCapTop"></div>
            <div className="hourglassGlassTop"></div>
            <div className="hourglassSand"></div>
            <div className="hourglassSandStream"></div>
            <div className="hourglassCapBottom"></div>
            <div className="hourglassGlass"></div>
          </div>
        </div>
      </div>
    )
  }
  return (
    isAuthenticated ? children : <Navigate to="/login" />
  )
}

export default PrivateRoutes