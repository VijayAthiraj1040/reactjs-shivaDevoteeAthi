import{GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail} from 'firebase/auth'

import {initializeApp} from 'firebase/app'

import {getFirestore, query, collection, where, addDoc, getDocs} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBwaZBy3colISK8kR_UHZLlkInvBgSMcHo",
    authDomain: "my-kitchen-187e1.firebaseapp.com",
    databaseURL: "https://my-kitchen-187e1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "my-kitchen-187e1",
    storageBucket: "my-kitchen-187e1.appspot.com",
    messagingSenderId: "629559492714",
    appId: "1:629559492714:web:3245902ff0886593170a13",
    measurementId: "G-S552NLPB8T"
  };

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const auth= getAuth(app)

  const googleProvider= new GoogleAuthProvider();
  const signInWithGoogle= async()=>{
    try{
        const res = await signInWithPopup(auth, googleProvider)
        const user = res.user;
        const q = query(collection(db,'user'), where('uid', '==', user.uid ))
        const docs = await getDocs(q);
        if (docs.docs.length ===0){
            await addDoc(collection(db,'users'),{
                uid: user.id,
                name: user.displayName,
                authProvider: 'google',
                email: user.email
            })
        }
        console.log(res);
    }
    catch (err){
        console.log('error with signInWithGoogle');
    }
  }


  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  // const sendPasswordReset = async (email) => {
  //   try {
  //     await sendPasswordResetEmail(auth, email);
  //     alert("Password reset link sent!");
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message);
  //   }
  // };

  
  export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail
  }