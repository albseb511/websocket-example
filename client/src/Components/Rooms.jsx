import React, {useContext, useState, useEffect, useRef} from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import io from "socket.io-client"

const Rooms = () => {
    const [room, setRoom] = useState(null);
    const [state, dispatch] = useContext(AppContext);
    const history = useHistory();

    const handleSetRoom = () => {
        dispatch({
            type: "SET_ROOM",
            payload: room
        })
        history.push(`/room/${room}`)
    }
    // happens on mount
    useEffect(() => {
        if(state.connected){
            return
        }
        const socket = io("ws://localhost:5000");
        dispatch({
            type: "SET_SOCKET_CONNECTION",
            payload: socket
        })
    }, [])

    if(!state.user){
        return <Redirect to="/"/>
    }

    return (
        <div>
            <h3>Welcome {state.user}</h3>
            <h3>Available Rooms:</h3>
            <p>Select a room to move enter the chat</p>
            <select default={null} placeholder="Select" onChange={e=>setRoom(e.target.value)}>
                {state.rooms.map(item=>
                <option key={item} value={item}>{item}</option>
                )}
            </select>
            <br/>
            {room &&<div>Selected room: {room}</div>}
            <button onClick={handleSetRoom} disabled={!room}>
                Continue
            </button>
        </div>
    )
}

export default Rooms
