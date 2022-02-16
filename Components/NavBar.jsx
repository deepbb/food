import Image from "next/image"
import Link from "next/link";
import { useSelector } from "react-redux"
import styles from "../styles/Navbar.module.css"  
import PizzaList from "./PizzaList";

function NavBar() {
    const quantity = useSelector((state)=>state.cart.quantity)
    console.log(quantity);
    return (
        <div className={styles.container}>
        <div className={styles.item}>
            <div className={styles.call}>
            <Image src="/img/telephone.png" width="32" height="32"  alt=""/>

            </div>
            <div className={styles.texts}>
                <div className={styles.text}>Order Now!</div>
                <div className={styles.text}>09591405749</div>
            </div>
        </div>
        <div className={styles.item}>
            <ul className={styles.list}>
            <Link href="/" passHref>
                <li className={styles.listItems}>Homepage</li>
                </Link>
                <li className={styles.listItems}>Products</li>
                <Image src="/img/logopizza.png" width="120" height="70"  alt=""/>
                <li className={styles.listItems}>Menu</li>
                <li className={styles.listItems}>Blog</li>
                
            </ul>
        </div>
        <Link href="/cart" passHref >
        <div className={styles.cartItem}>
        <div className={styles.cart}>
        <Image src="/img/cartnew.jpg" width="32" height="32"  alt=""/>
        </div>
        <div className={styles.counter}>{quantity}</div>
        
        </div>
        </Link>
        </div>
    )
}

export default NavBar
