import { auth, db, Githubprovider, Googleprovider } from "@/lib/Firebase"
import styles from "./login.module.scss"
import {  signInWithPopup} from 'firebase/auth'
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { AuthContext } from "@/lib/Context"
import Loader from "../Loader/Loader"
function Login() {
    const login = useContext(AuthContext)
    const router = useRouter()
    useEffect(()=>{
      if(login){
      router.replace('/dashboard');
      }
    },[login])
    const SigninGoogle = async() => {
        try{
        const res = await signInWithPopup(auth, Googleprovider)
        const docRef = doc(db, "users",res.user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            await setDoc(doc(db,"users",res.user.uid),{
                uid:res.user.uid,
                diplayName:res.user.displayName,
                email:res.user.email,
                photoURL:res.user.photoURL,
                Requests:[]
            })
            await setDoc(doc(db,"userChats",res.user.uid),{})
        }
        }catch(err){
            alert("Login Process Interepted")
            router.reload()
        }
    }
   
    return (
        <div className={styles.Container}>
            {login || login==="user" ? <Loader/>: 
            <>
            <div className={styles.Icon}>
                <img src="/Icon.png"></img>
                ChatApp
            </div>
            <button onClick={SigninGoogle} className={`${styles.Button} ${styles["Google"]}`}>
                <img className={styles.image} src="/google.svg"></img>
                <p>Login With Google</p>
            </button></>}
        </div>
    )
}
export default Login