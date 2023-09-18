import {createContext, useContext, useReducer} from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "111",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

  const initialState = {
    user: null,
    authenticated: false
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'login':
        return {...state, authenticated: true, user: action.payload}
      case 'logout':
        return {...state, authenticated: false, user: null}
      default:
        throw new Error('Unknown action')
    }
  }

  const [{user, authenticated}, dispatch] = useReducer(reducer, initialState)

  const login = (email, password)=>{

    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({type: 'login', payload: FAKE_USER})
  }

  const logout = ()=>{
    dispatch({type: 'logout'})
  }


  return <AuthContext.Provider value={{login, logout, user, authenticated}}>
    {children}
  </AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) throw new Error ('AuthContext used out outside AuthProvider')
  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export {AuthProvider, useAuth}
