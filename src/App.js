import { app, database } from "./firebaseConfig";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  currentUser,
} from "firebase/auth";

import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useEffect, useRef, useState } from "react";

const auth = getAuth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <h1>💬</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <button className="sign-in" onClick={signInWithGoogle}>
      Sign in with google
    </button>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const dummy = useRef();

  const messageRef = collection(database, "messages");
  const q = query(messageRef, orderBy("createdAt"), limit(25));
  const [messages, loading, error] = useCollectionData(q, {
    idField: "id",
  });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;

    await addDoc(messageRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
    });

    setFormValue("");

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}

        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">📨</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid } = props.message;
  const user = auth.currentUser.uid;

  const [userX] = useAuthState(auth);

  const messageClass = uid === user ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <span>{userX ? userX.displayName : "no username"}</span>
      <p>{text}</p>
    </div>
  );
}

export default App;
