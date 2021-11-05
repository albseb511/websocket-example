import React, {useState, useContext} from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const UserForm = () => {
  const [username, setUsername] = useState("")
  const [state,dispatch] = useContext(AppContext);
  const history = useHistory();
  if(state.user){
      return <Redirect to="/rooms"/>
  }
  return (
    <div className="App App-header">
      <div>Join in</div>
      <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="enter your username"/>
      <button onClick={()=>{
          dispatch({
              type: "UPDATE_USER",
              payload: username,
          })
          history.push("/rooms")
      }}>SUBMIT</button>
    </div>
  );
}

export default UserForm
