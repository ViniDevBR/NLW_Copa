//REACT
import { createContext, ReactNode, useState, useEffect } from 'react'

//EXPO
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

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
    clientId: "491518839977-2oigv2lnqp6rka766lns5j7fnsoq010f.apps.googleusercontent.com",
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
  
  async function SignInWithGoogle(access_token: string) {
   console.log('TOKEN =>', access_token) 
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      SignInWithGoogle(response.authentication.accessToken)
    }
  },[response])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
        // : {
        //   name: 'Vinicius',
        //   avatarUrl: 'https://github.com/vinidevbr.png'
        // }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
