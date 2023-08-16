import { AuthContext } from '@/lib/Context'
import styles from './chat.module.scss'
import { useContext, useEffect, useRef } from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
function Chats({GetChats,Message}){
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US')
    const Ref = useRef()
    useEffect(()=>{
            if (Ref.current) {
                Ref.current.scrollIntoView({behavior:"smooth"})}
        },[Message])
    const login = useContext(AuthContext)
    function GetImg(items){
        if(items.senderId === login.uid ){
            return (login.photoURL)
        }
        else if(items.senderId === GetChats.userData.uid){
            return(GetChats.userData.photoURL)
        }
    }
    function getOwner(items){
        
        if(items.senderId === login.uid ){
            return ("owner")
        }
    }
    function getDate(date){
        return timeAgo.format(date*1000,'mini')
    }   
    return(
        <>
        {Message?.messages.map((items)=>(
        <div key={items.date.seconds} ref={Ref} className={`${styles.Container} ${styles[getOwner(items)]}`}>
            <div className={styles.info}>
            <img className={styles.image} referrerPolicy="no-referrer" src={GetImg(items)}></img>
                <span className={styles.time}>{getDate(items.date.seconds)}</span>
            </div>
            <div className={styles.messageContent}>
                <div className={styles.Text}>{items.Text}</div>
            </div>
        </div>
        ))}
        </>
    )
}
export default Chats