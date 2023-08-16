import styles from "./friendlist.module.scss"
function FriendList(){
    return(
        <div className={styles.Container}>
            <div className={styles.Input}>
                <input placeholder="Find a User"></input>
            </div>
            <div>
                <div className={styles.Chats}>
                    <img src="https://www.datocms-assets.com/70938/1683306538-1682964958-henry-cavill-1.jpg?auto=format%2Ccompress&cs=srgb" className={styles.Profile}></img>
                    <div className={styles.Info}>
                        <p className={styles.name}>Jane</p>
                        <p className={styles.recent}>Ok Call Me</p>
                    </div>
                </div>
                <div className={styles.Chats}>
                    <img src="https://www.datocms-assets.com/70938/1683306538-1682964958-henry-cavill-1.jpg?auto=format%2Ccompress&cs=srgb" className={styles.Profile}></img>
                    <div className={styles.Info}>
                        <p className={styles.name}>Jane</p>
                        <p className={styles.recent}>Ok Call Me</p>
                    </div>
                </div>
                <div className={styles.Chats}>
                    <img src="https://www.datocms-assets.com/70938/1683306538-1682964958-henry-cavill-1.jpg?auto=format%2Ccompress&cs=srgb" className={styles.Profile}></img>
                    <div className={styles.Info}>
                        <p className={styles.name}>Jane</p>
                        <p className={styles.recent}>Ok Call Me</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default FriendList