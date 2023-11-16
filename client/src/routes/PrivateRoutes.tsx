import { FC, ReactNode } from "react"
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from "react-router-dom"


type PrivateRoutesProps = {
  children: ReactNode
}

const PrivateRoutes: FC<PrivateRoutesProps> = ({ children }) => {

  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log("User:", user)
  console.log("isAuthenticated:", isAuthenticated)

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    isAuthenticated ? children : <Navigate to="/" replace={true} />
  )
}

export default PrivateRoutes