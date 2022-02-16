import styles from "../styles/PizzaCart.module.css"
import Image from "next/image"
import Link from "next/link"


function PizzaCart({pizza}) {
    return (
        <div className={styles.container}>
        <Link href={`/product/${pizza._id}`} passHref >
        <Image className={styles.img} src={pizza.img} alt="" width="500" height="500" />
        </Link>
        <h1 className={styles.title}>{pizza.title}</h1> 
        <span className={styles.price}>{pizza.price[0]}</span>
        <p className={styles.para}>{pizza.desc}</p>
            
        </div>
    )
}

export default PizzaCart
