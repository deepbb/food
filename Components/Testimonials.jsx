import Image from "next/image"
import styles from "../styles/Testimonials.module.css"

function Testimonials() {
    return (
        <>
        <h1 className={styles.text}>Be the fastest in delivering your <span className={styles.food}>food</span></h1>
        <div className={styles.container}>
        <div className={styles.imgContainer}>
        <Image src="/img/pizzalogonew.png" alt="" layout="fill" objectFit="contain"/>
        </div>
        <div className={styles.imgContainer1}>
        <Image className={styles.testImg} src="/img/pizzalogonew2.png" alt="" layout="fill" objectFit="contain"/>
        </div>
        <div className={styles.imgContainer2}>
        <Image className={styles.testImg} src="/img/pizzalogonew3.png" alt="" layout="fill" objectFit="contain"/>
        </div>
        </div>
        </>
    )
}

export default Testimonials
