import styles from "../styles/Footer.module.css"
import Image from "next/image"

function Footer() {
    const date = new Date()
  const year =  date.getFullYear()
    console.log(year);
    return (
        <>
        <div>
        <div className={styles.container}>
         
            <div className={styles.item}>
                <div className={styles.card}>
                    <h1 className={styles.motto}>The best pizza&apos;s from sona pizzas</h1>
                    <div className={styles.footpic}>
                    <Image className={styles.pizzapic} src="/img/phnew.png" alt="" layout="fill" objectFit="contain" />
                      </div>
                </div>
                <div className={styles.card}>
                
                    <h2 className={styles.title}>FIND OUT BEST PIZZAZ</h2>
                    <p className={styles.text}>
                        1645,MG Road Bangalore
                        <br /> 9591405749
                    </p>
                    <p className={styles.text}>
                        1645,MG Road Shimla
                        <br /> 9591405749
                    </p>
                    <p className={styles.text}>
                        1645,MG Road Jaipur
                        <br /> 9591405749
                    </p>
                </div>
                <div className={styles.card}>
                <h1 className={styles.title}>WORKING HOURS</h1>
                <p className={styles.text}>08:00 to 22:00</p>
                </div>
            </div>
          
        </div>
        </div>
        <div className={styles.footContainer}>
           <span>Handicraft with &#10084; somewhere in <span className={styles.footText}>Bangalore</span></span>
           <span className={styles.year}>{year} | Pradeep</span>
        </div>
        
        </>
    )
}

export default Footer
