import styles from "./Left.module.scss"
function Left({ login, UserChats ,Current,setGetChats}) {
    const handleClick=(user)=>{
        setGetChats({combineId:user[0],userData:user[1].userInfo})
    }
    return (
        <div className={styles.Container}>
            <div className={styles.Wrapper}>
                <div className={styles.User}>
                    <img className={styles.Profile} referrerPolicy="origin" src={login && login.photoURL}></img>
                    <img className={styles.Logo} src="/Icon.png"></img>
                    <p>{login && login.displayName}</p>
                </div>
            </div>
            {UserChats && UserChats.map((items) => (
                <div onClick={()=>handleClick(items)} key={items[1].userInfo.uid} className={styles.UserChats}>
                    <img src={items[1].userInfo.photoURL}></img>
                    <p>{items[1].userInfo.diplayName}</p>
                </div>
            ))}
        </div>
    )
}
export default Left