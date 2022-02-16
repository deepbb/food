import axios from "axios"
import Image from "next/image"
import styles from "../../styles/Order.module.css"
import {useSelector,useDispatch} from "react-redux"


function Order({pizzaorders}) {
    console.log(pizzaorders);
    const dispatch = useDispatch()
    const cart = useSelector((state)=>state.cart)
    console.log(cart);
    return (
        <div className={styles.container}>
            <div className={styles.left}>
            <table className={styles.cartTable}>
            <tbody>
            <tr className={styles.cartRow}>
                <th>OrderID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>

            </tr>
            </tbody>
            <tbody>
            <tr className={styles.tableRow}>
                <td>
                    <span className={styles.orderid}>{pizzaorders._id}</span>
                </td>
                <td>
                    <span className={styles.name}>{pizzaorders.customer}</span>
                </td>
                <td>
                    <span className={styles.address}>{pizzaorders.address}</span>
                </td>
                <td>
                    <span className={styles.total}>${pizzaorders.total}</span>
                </td>
            </tr>
            </tbody>
            
            
            



            </table>
            </div>
            <div className={styles.right}>
            <div className={styles.wrapper}>
                <h2>Cart Total</h2>
                <div className={styles.subtotal}>
                    <b className={styles.subtotalText}>SubTotal:</b>${pizzaorders.total}
                </div>
                <div className={styles.discount}>
                    <b className={styles.subtotalText}>Discount:</b>$0
                </div>
                <div className={styles.totalAmount}>
                    <b className={styles.subtotalText}>Total:</b>${pizzaorders.total}
                </div>
                <button disabled  className={styles.btn}>PAID</button>
            </div>

            </div>
        </div>
    )
}

export async function getServerSideProps ({params}) {
    const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`)
    console.log(res);
    return {
        props: {
            pizzaorders:res.data
        },
    }
}

export default Order
