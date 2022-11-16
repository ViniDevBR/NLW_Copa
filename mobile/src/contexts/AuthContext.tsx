//REACT
import { createContext, ReactNode, useState, useEffect } from 'react'
//EXPO
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
//BACK END
import { API } from '../services/api'


WebBrowser.maybeCompleteAuthSession()

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextDataProps {
  user: UserProps
  isUserLoading: boolean
  signIn: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextDataProps)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setUserIsLoading] = useState<boolean>(false)
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
    scopes: ['profile', 'email']
  })

  async function signIn() {
    try {
      setUserIsLoading(true)
      await promptAsync()

    } catch (error) {
      console.log(error)
      throw error
      
    } finally {
      setUserIsLoading(false)
    }
  }
  
  async function singInWithGoogle(access_token: string) {
    try {
      setUserIsLoading(true);
      
      const tokenResponse = await API.post('/users', { access_token });
      API.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;

      const userInfoResponse = await API.get('/me');
      setUser(userInfoResponse.data.user);

    } catch (error) {

      console.log(error);
      throw error;

    } finally {
      setUserIsLoading(false);
    }
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      singInWithGoogle(response.authentication.accessToken)
    }
  },[response])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
