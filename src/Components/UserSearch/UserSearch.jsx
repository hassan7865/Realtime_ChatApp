import { arrayUnion, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import styles from './usersearch.module.scss'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiOutlineArrowLeft } from "react-icons/hi"
import { db } from '@/lib/Firebase'
import { useEffect, useState } from 'react'
import { FaLocationArrow, FaUserCheck, FaUserPlus } from 'react-icons/fa'
import { BsSendCheck } from 'react-icons/bs'
function UserSearch({ setOpen, Current, UserChats }) {
  const [result, setresult] = useState([])
  const [search, setsearch] = useState("")
  const [data, setdata] = useState(false)
  const [mes, setmes] = useState(false)
  const handleClick = async (e) => {
    e.preventDefault()
    const q = query(collection(db, "users"), where("email", "==", search));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
      setmes(true)
    }
    else {
      querySnapshot.forEach((doc) => {
        setresult(doc.data())
        setmes(false)
      });
    }
  }
  useEffect(() => {
    if (result.length !== 0) {
      const unsub = onSnapshot(doc(db, "users", result.uid), (doc) => {
        doc.exists() && setdata(doc.data())
      })
      return () => {
        unsub()
      }
    }
  }, [result])
  function ReqIcon(id){
    if (id !== Current.uid) {
      const Chats = UserChats.filter((items) => items[1].userInfo.uid === id)
      if (Chats?.length !== 0 && !data?.Requests?.includes(Current?.uid)) {
        return(<FaUserCheck />)
      }
      if (data?.Requests?.includes(Current?.uid) && Chats?.length === 0) {
        return (<BsSendCheck style={{ color: "#3fbb27" }} />)
      }
      else if (!data?.Requests?.includes(Current?.uid) && Chats?.length === 0 && !Current.Requests.includes(id)) {
        return (<FaUserPlus onClick={() => AddReq(id)} />)
      }
      else if (Current.Requests.includes(id) && Chats?.length === 0 && !data?.Requests?.includes(Current?.uid)) {
        return (<FaLocationArrow  />)
      }
    }
    else {
      return null
    }
  }
  const AddReq = async (id) => {
    const UserRef = doc(db, "users", id);
    await updateDoc(UserRef, {
      Requests: arrayUnion(Current.uid)
    })
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <div className={styles.Cross} onClick={() => setOpen(false)}><HiOutlineArrowLeft /></div>
        <form onSubmit={handleClick}>
          <div className={styles.Search}>
            <input onChange={(e) => setsearch(e.target.value)} placeholder='Search for Users'></input>
            <div className={styles.Icon}>
              <button type="submit" ><AiOutlineSearch /></button>
            </div>
          </div>
        </form>
        {result.length !== 0 && !mes ?
          <div className={styles.Find}>
            <img src={result.photoURL}></img>
            <p>{result.diplayName}</p>
            <div className={styles.ReqIcon}>{ReqIcon(result.uid)}</div>
          </div> :
          mes &&
          <div style={{ marginTop: "20px", color: "white", fontSize: "20px" }}>No Result</div>
        }
      </div>
    </div>
  )
}
export default UserSearch