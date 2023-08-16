import styles from './right.module.scss'
import Input from '../Input/Input'
import Chats from '../Chat/Chats'
import Lottie from 'react-lottie-player'
import lottieJson from './Chatanim.json'
import { useState } from 'react'
function Right({ GetChats, Message }) {
    const [Text, setText] = useState("")

    return (
        <div className={styles.Main}>
            <div className={styles.Container}>
                <div className={styles.Header}>
                    {GetChats.combineId && <img className={styles.profile} src={GetChats?.userData?.photoURL}></img>}
                    <p className={styles.name}>{GetChats?.userData?.diplayName}</p>
                </div>
                {GetChats.combineId ? <>
                    <div className={styles.Bottom}>
                        <Chats GetChats={GetChats} Message={Message} />
                    </div>
                    <div>
                        <Input Text={Text} setText={setText} GetChats={GetChats} />
                    </div>
                </> : <div className={styles.Message}>
                    <Lottie
                        loop
                        animationData={lottieJson}
                        play
                        className={styles.Lottie}
                    />
                    <div>No Chat Selected Please select any to start conversation</div>
                </div>}
            </div>
        </div>
    )
}
export default Right