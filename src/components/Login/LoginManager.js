import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework=()=>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn=()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res=>{
      const{displayName,photoURL,email}=res.user;
      const signedInUser={
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL,
        success:true
      }
     return signedInUser;
    })
    .catch(error=>{
      console.log(error);
      console.log(error.message);
    })
  }

 export const handleFbSignIn=()=>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
  
    .then(res=>{
      const{displayName,photoURL,email}=res.user;
      const signedInUser={
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL,
        success:true
      }
      return signedInUser;
      
    })
    
    .catch((error) => {
     
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode,errorMessage,email,credential)
    });
  
  
    }

    export const handleSignOut =()=>{
        return firebase.auth().signOut()
        .then(res=>{
          const signdOutUser={
            isSignedIn:false,
            name:'',
            email:'',
            photo:'',
            error:'',
            success:false
          }
          return signdOutUser;
        }).catch(error=>{

        });
      }

     export const createUserWithEmailAndPassword=(name, email, password)=>{ 
         return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res=>{
          const newUserInfo= res.user;
          newUserInfo.error="";
          newUserInfo.success=true;
          updateUserName(name);
          return newUserInfo;
      })
      .catch((error) => {
        const newUserInfo={};
       newUserInfo.error=error.message;
       newUserInfo.success=false;
       return newUserInfo;
      });
    }

    export const signInWithEmailAndPassword =(email, password)=>{
       return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res=>{
        const newUserInfo= res.user;
        newUserInfo.error="";
        newUserInfo.success=true;
        return newUserInfo;
      
    })
    .catch((error) => {
      const newUserInfo={};
     newUserInfo.error=error.message;
     newUserInfo.success=false;
     return newUserInfo;
    });
    }

    const updateUserName= name =>{
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: name
          
        }).then(function() {
        }).catch(function(error) {
        });
      }
