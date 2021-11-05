import React, {createContext,useReducer} from 'react'

export const AppContext = createContext()

const init = {
    user: null,
    rooms: ["javascript","react","coding-help"],
    currentRoom: null,
    connected: null,
    socket: null
}

const reducer = (state, action)=>{
    switch(action.type){
        case "UPDATE_USER":{
            return {
                ...state,
                user: action.payload
            }
        }
        case "SET_ROOM":{
            return {
                ...state,
                currentRoom: action.payload,
            }
        }
        case "SET_SOCKET_CONNECTION":{
            return {
                ...state,
                socket: action.payload,
                connected: true
            }
        }
        default: return state
    }
}

const AppContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, init);


    return (
        <AppContext.Provider value={[state, dispatch]}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
