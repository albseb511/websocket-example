import React, {useContext, useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const Room = () => {
    const [state, dispatch] = useContext(AppContext);
    const [notification, setNotification] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const sendMessage = () => {
        state.socket.emit("send message",{
            message: message,
        })

        setMessage("")
    }

    useEffect(()=>{
        if(state.connected){
            state.socket.emit("join_room",{
                username: state.user,
                room: state.currentRoom
            })
            state.socket.on("room event",data=>{
                if( data.message === "A new user has joined!" ){
                    setNotification(`${data.message}, Welcome ${data.user.name}!`)
                    setTimeout(()=>{
                        setNotification(null)
                    },5000)
                }
            })
            state.socket.on("receive message",data=>{
                console.log(data,'received message',messages)
                setMessages( prev=>[ ...prev, data ] )
            }) 
        }
        return ()=>{
            state?.socket?.emit("leave room")
        }
    },[state.socket])
    if(!state.connected){
        return <Redirect to={"/rooms"}/>
    }
    // if(loading){
    //     return <div> loading... </div>
    // }
    return (
        <div>
            <h3>Welcome {state.user}</h3>
            <div>
                { notification && <div>{notification}</div> }
            </div>
            { state.currentRoom }
            <div>
                {messages.map(item=><div key={item.message}> {item.message} </div>)}
            </div>
            <br/>
            <div>
                <input type="text" value={message} onChange={e=>setMessage(e.target.value)} placeholder="type a message"/>
                <button type="submit" onClick={sendMessage} >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default Room
