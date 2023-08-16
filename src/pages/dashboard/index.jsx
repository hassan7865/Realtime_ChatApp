import styles from "./dashboard.module.scss"
import Right from "@/Components/Right/Right"
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { doc , onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/Firebase";
import { AuthContext } from "@/lib/Context";
import { RxCross2 } from 'react-icons/rx'
import { useContext, useEffect, useState } from "react";
import Loader from "@/Components/Loader/Loader";
import Left from "@/Components/Left/Left";
import { AiOutlineSearch } from 'react-icons/ai'
import PersonIcon from '@mui/icons-material/Person';
import { Badge } from "@mui/material";
import { BiLogOutCircle } from 'react-icons/bi'
import UserSearch from "@/Components/UserSearch/UserSearch";
import FriendReq from "@/Components/FriendReq/FriendReq";
import { useRouter } from "next/router";
function Dashboard() {
  const [Open, setOpen] = useState(false)
  const [Req, setReq] = useState(false)
  const [Current, setCurrent] = useState()
  const [Drop, setDrop] = useState(false)
  const router = useRouter()
  const [UserChats, setUserChats] = useState()
  const [GetChats, setGetChats] = useState({ combineId: null, userData: null })
  const [Message, setMessage] = useState()
  const login = useContext(AuthContext)
  console.log(Current)
  useEffect(() => {
    if (!login) {
      router.replace("/")
    }
  }, [login])
  useEffect(() => {
    if (login !== "user" && login) {
      const unsub = onSnapshot(doc(db, "users", login?.uid), (doc) => {
        doc.exists() && setCurrent(doc.data())
      })
      return () => {
        unsub()
      }
    }
  }, [login])
  useEffect(() => {
    if (login !== "user" && login) {
      const unsub = onSnapshot(doc(db, "userChats", login?.uid), (doc) => {
        doc.exists() && setUserChats(Object.entries(doc.data()))
      })
      return () => {
        unsub()
      }
    }
  }, [login])
  useEffect(() => {
    if (GetChats.combineId) {
      const unsub = onSnapshot(doc(db, "chats", GetChats.combineId), (doc) => {
        doc.exists() && setMessage(doc.data())
      })
      return () => {
        unsub()
      }
    }
  }, [GetChats])
  return (
    <div className={styles.Main}>
      {!login || login === "user" ?
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "rgb(1, 1, 43)" }}>
          <Loader />
        </div> :
        <div className={styles.Container}>
          <div className={styles.Left}>
            <Left setGetChats={setGetChats} Current={Current} login={login} UserChats={UserChats} />
          </div>
          <div className={styles.Right}>
            <div className={styles.Navbar}>
              <div className={styles.App}>
                <img src="/Icon.png"></img>
                <p>Chat App</p>
              </div>
              <div className={styles.Icons}>
                <AiOutlineSearch onClick={() => setOpen(true)} />
                <Badge sx={{ position: "relative", display: "flex", alignItems: "center" }} badgeContent={Current?.Requests.length} color="primary">
                  <PersonIcon onClick={() => setReq(true)} color="white" />
                  {Req && <div > <FriendReq Current={Current} setReq={setReq} /></div>}
                </Badge>
                <BiLogOutCircle onClick={() => signOut(auth)} />
              </div>
              <div className={styles.Drop}>
                <div className={styles.MenuIcon}>
                  <Badge sx={{ position: "relative", display: "flex", alignItems: "center" }} badgeContent={Current?.Requests.length} color="primary">
                    <PersonIcon onClick={() => { setDrop(false); setReq(true) }} color="white" />
                    {Req && <div> <FriendReq Current={Current} setReq={setReq} /></div>}
                  </Badge>
                  {Drop ? <RxCross2 onClick={() => setDrop(false)} /> : <AiOutlineUnorderedList onClick={() => { setDrop(true); setReq(false) }} />}
                </div>
                {Drop && <div className={styles.Menu}>
                  <div style={{ display: "flex", gap: "5px", alignItems: "center" }} className={styles.Account}><img src={Current?.photoURL}></img>Account</div>
                  <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                    <AiOutlineSearch onClick={() => setOpen(true)} />
                    Search
                  </div>
                  <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                    <BiLogOutCircle onClick={() => signOut(auth)} />
                    Logout
                  </div>
                </div>}
              </div>
            </div>
            <div className={styles.Chats}>
              <Right UserChats={UserChats} Message={Message} GetChats={GetChats} />
            </div>
          </div>
        </div>}
      {Open && <div>
        <UserSearch UserChats={UserChats} Current={Current} setOpen={setOpen} />
      </div>}
    </div>
  );
}
export default Dashboard