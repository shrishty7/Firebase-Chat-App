import './App.css';
import React,{useState} from "react";
 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
 
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
//Initalize the firebase in our code...
 
firebase.initializeApp({
 
  //This is where I will be pasting it 
 
  //Connecting with the firebase ka database 
 
  //I need to add my configurations
  apiKey: "AIzaSyCjrCMZiV910HbSSH5x15khX_UaToqOUe8",
    authDomain: "react-chat-293de.firebaseapp.com",
    projectId: "react-chat-293de",
    storageBucket: "react-chat-293de.appspot.com",
    messagingSenderId: "639773489429",
    appId: "1:639773489429:web:ffda51621f0e33e0a7911c",
    measurementId: "G-L1S7WEGQ9Y",
    databaseURL: "https://react-chat-293de.firebaseio.com"
})
 
const auth = firebase.auth();
const firestore = firebase.firestore();
 
function App() {
  
  const[user] = useAuthState(auth);
  return (
    <div className = "App">
 
      <header>
        {/* <SignIn/> */}
        <h1>CHAT SERVER ⚛️🔥💬 </h1>
        {user ? <SignOut/> : <SignIn/>}
        {/* <SignOut /> */}
        
      </header>
      <section>
      {user ? <ChatRoom /> : <SignIn />} 

      </section>
    </div>
 
  );
 
}
 
function SignIn(){
 
    const signInWithGoogle = () =>{
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
 
    return (
    <>
    <button className = "sign-in" onClick = {signInWithGoogle}>Sign In with Google </button>
    </>
    )
}
 
function SignOut() {
 
    return auth.currentUser && (
      <button className = "sign-out" onClick = {() => auth.signOut()}>Sign Out</button>

    )
}
 
function ChatRoom(){
 
    //Display the messages
    const messagesRef = firestore.collection('messages1');
    const query = messagesRef.orderBy('createdAt');
    const [messages] = useCollectionData(query,{idField: 'id'});
 
    const [formValue, setFormValue] = useState('');
 
    const {uid,photoURL,Email} = auth.currentUser;
    // const name = 
 
    const sendMessage = async(e) => {
 
        e.preventDefault();
 
        await messagesRef.add({
 
          text : formValue,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          photoURL,
          
        })
        setFormValue('');
 
    }
    return (
 
      <>
        <main>
 
            {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg}/>)}
        
        </main>
 
        <form onSubmit = {sendMessage} >
 
          <input value = {formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" >
          </input>
          <button type = "submit" disabled = {!formValue} > Send Message</button>
        </form>
      </>
 
    )
 
}
 
function ChatMessage(props){
 
    const {text,uid,photoURL,Email} = props.message;
    console.log(Email);
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
 
    return (
 
      <>  
        <div className = {`message ${messageClass}`}>
        <img src = {photoURL} alt="" />
        <p>{text}</p>
        </div>
      </>
 
    )
 
}
 
export default App;
 

