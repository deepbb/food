import Image from "next/image"
import styles from "../styles/Feature.module.css"

function Feature() {

    return (
        <div className={styles.container}>
            
            <div className={styles.wrapper} >
                        <div className={styles.leftContainer}>
                           <div className={styles.imgcontainer} >
                           <Image src="/img/pizzabike.png" alt="" layout="fill" objectFit="contain"/>
                        </div>
                        </div>
                        
                        <div className={styles.rightContainer}>
                        <div className={styles.rightImg} >
                        <Image src="/img/featured2.png" alt="" layout="fill" objectFit="contain"/>
                        </div>
                        <div className={styles.rightImg} >
                        <Image src="/img/featured3.png" alt="" layout="fill" objectFit="contain"/>
                        </div>
                        </div>

            </div>
            <div className={styles.textContainer}>
            <h1 className={styles.text}>Hungry ? You&apos;re at the right place</h1>
            <button className={styles.btn}>Find the Best Pizza here!</button>

            </div>
                      
        </div>
    )
}

export default Feature
