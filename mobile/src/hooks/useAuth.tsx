//REACT
import { useContext }from 'react'

//CUSTOM HOOK
import { AuthContext, AuthContextDataProps } from '../contexts/AuthContext'

export function useAuth(): AuthContextDataProps {
  const context = useContext(AuthContext)
  
  return context
}