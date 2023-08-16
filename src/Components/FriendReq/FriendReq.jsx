import { useEffect, useState } from 'react'
import styles from './friendreq.module.scss'
import { RxCrossCircled } from 'react-icons/rx'
import { arrayRemove, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '@/lib/Firebase'
function FriendReq({ setReq, Current }) {
    const [Requests,SetRequests] = useState([])
    useEffect(() => {
        const GetUser = async () => {
            if (Current && Current.Requests) {
                const arr = []
                for (const item of Current.Requests) {
                    const q = query(collection(db, "users"), where("uid", "==", item));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        arr.push(doc.data());
                    });
                }
                SetRequests(arr)
            }
        }
        GetUser()
    }, [Current])
    console.log(Requests)
    const ConfirmReq = async (user) => {
        const CombineId =
            Current.uid > user.uid ? Current.uid + user.uid : user.uid + Current.uid
        await setDoc(doc(db, "chats", CombineId), {
            messages: []
        })
        await updateDoc(doc(db, "userChats", Current.uid), {
            [CombineId + ".userInfo"]: {
                uid: user.uid,
                diplayName: user.diplayName,
                photoURL: user.photoURL
            },
            [CombineId + ".date"]: serverTimestamp()
        });
        await updateDoc(doc(db, "userChats", user.uid), {
            [CombineId + ".userInfo"]: {
                uid: Current.uid,
                diplayName: Current.diplayName,
                photoURL: Current.photoURL
            },
            [CombineId + ".date"]: serverTimestamp()
        });
        await updateDoc(doc(db, "users", Current.uid), {
            Requests: arrayRemove(user.uid)
        });
    }
    const DeleteReq = async (id) => {
        const UserRef = doc(db, "users", Current.uid);
        await updateDoc(UserRef, {
            Requests: arrayRemove(id)
        });
    }

    return (
        <div className={styles.Container}>
            <div className={styles.Cross}><RxCrossCircled onClick={() => setReq(false)} /></div>
            {Requests.length!==0 ? Requests.map((items) => (
                <div key={items.uid} className={styles.Wrapper}>
                    <div className={styles.ReqInfo}>
                        <img src={items.photoURL}></img>
                        <p>{`${items.diplayName} has Sent You Friend Request`}</p>
                    </div>
                    <div className={styles.Button}>
                        <button onClick={()=>ConfirmReq(items)}>Confirm</button>
                        <button onClick={()=>DeleteReq(items.uid)}>Delete</button>
                    </div>
                </div>
                
            )) : <div className={styles.Subs}>No Requests</div>}
        </div>
    )
}
export default FriendReq