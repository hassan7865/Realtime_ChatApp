import styles from './input.module.scss'
import {AiOutlineSend} from 'react-icons/ai'
import { useContext, useRef } from 'react';
import { AuthContext } from '@/lib/Context';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/Firebase';
function Input({GetChats,setText,Text}){
    const login = useContext(AuthContext)

    const Ref = useRef()
    const handleSend =async(e)=>{

        e.preventDefault()
        Ref.current.reset()
        if(GetChats.userData){
            const CombineId =
            login.uid > GetChats.userData.uid ? login.uid + GetChats.userData.uid : GetChats.userData.uid + login.uid
            const UserRef =doc(db,"chats",CombineId);
            await updateDoc(UserRef,{
              messages:arrayUnion({
                Text,
                senderId:login.uid,
                date:new Date()
              })
            })
        }
    }
    return(
        <div className={styles.Container}>
            <form ref={Ref}  onSubmit={handleSend}>
            <input required={true} onChange={(e)=>setText(e.target.value)} placeholder='Type Something' className={styles.Input}></input>
            <div className={styles.Icon}>
                <button className={styles.Button} type="submit"><AiOutlineSend/></button>
            </div>
            </form>
        </div>
    )
}
export default Input