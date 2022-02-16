import styles from "../styles/PizzaList.module.css"
import Image from "next/image"
import PizzaCart from "./PizzaCart"



function PizzaList({product}) {
    console.log(product);
    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Get together over a pizza</h1>
        <p className={styles.para}>Don’t waste your time contemplating about life. Contemplate on where you’re going to get your next pizza.</p>
        <div className={styles.wrapper}>
        {product.map((pizza )=> (
            <PizzaCart key={pizza._id} pizza={pizza} />
        ))}
           
            

        </div>
            
        </div>
    )
}



export default PizzaList


