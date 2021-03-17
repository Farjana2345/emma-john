import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';



function Login() {
  const[newUser,setNewUser]=useState(false);
const[user, setUser]=useState({
  isSignedIn:false,
  name:'',
  email:'',
  password:'',
  photo:''
});

initializeLoginFramework();
const[loggedInUser,setLoggedInUser]=useContext(UserContext)
const history=useHistory();
const location = useLocation();
let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn=()=>{
    handleGoogleSignIn()
    .then(res=>{
      handleResponse(res, true);
    })
  }

  const signOut=()=>{
    handleSignOut()
    .then(res=>{
     handleResponse(res,false);
     
    })
  }

   const fbSignIn = () =>{
     handleFbSignIn()
     .then(res=>{
       handleResponse(res, true)
     })
   }

   const handleResponse = (res, redirect)=>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
    
   }

  const handleBlur=(event)=>{
      // console.log(event.target.value);
      let isFormValid = true;
      if(event.target.name === 'email'){
        isFormValid=/^\S+@\S+\.\S+$/.test(event.target.value);
          
      }
      if(event.target.name === 'password'){
          const isPasswordValid=event.target.value.length>6;
          const passwordNumber = /\d{1}/.test(event.target.value);
          isFormValid = isPasswordValid && passwordNumber;
      }
      if(isFormValid){
        const newUserInfo = {...user};
        newUserInfo[event.target.name]=event.target.value;
        setUser(newUserInfo);
      }
  }
  const handleSubmit=(event)=>{
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.password, user.name)
      .then(res=>{
       handleResponse(res, true);
      })
    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res=>{
       handleResponse(res,true);
      })
    }
    event.preventDefault();
  }
 
  return (
    <div style={{textAlign:'center'}}>
      {
       user.isSignedIn ? <button onClick={signOut}>Sign out</button> 
       :<button onClick={googleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={fbSignIn}>Facebook Log in</button>
      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Email {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }
      <h1>Our own Authentication</h1>

      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="" id=""/>
      <label htmlFor="newUser">New user sign up</label>

      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" placeholder="Your name" id="" onBlur={handleBlur}/>}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required/>
        <br/>
        <input type="password" name="password" id="" onBlur={handleBlur} placeholder="Your password" required/>
        <br/>
        <input type="submit" value={newUser ? 'sign Up' : 'sign in'}/>
        <p style={{color:'red'}}>{user.error}</p>
        {user.success && <p style={{color:'green'}}>User {newUser? 'Created':'Logged in'} successfully</p>}
      </form>
    </div>
  );
}

export default Login;
