import {createContext,useReducer,useEffect} from 'react'

export const AuthContext=createContext()

export const authReducer=(state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return {user:action.payload}
        case "LOGOUT":
            return {user:null}
        default:
            return state
    }
}

export const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(authReducer,{
        user:null
    })
    useEffect(()=>{
        const userString = localStorage.getItem('user')
        if(userString) {
            const user = JSON.parse(userString)
            if(user) {
                dispatch({type:"LOGIN",payload:user})
            }
        }
    },[])
    console.log('AuthContext state',state)

    return(
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}