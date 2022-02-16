import styles from "../styles/Cart.module.css"
import Image from "next/image"
import {useSelector,useDispatch} from "react-redux"
import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import CashModal from "../Components/CashModal";
import {useRouter} from "next/router"
import { reset } from "../redux/cartSlice";
import axios from "axios";

// This values are the props in the UI



const Cart = ()=> {
    const dispatch = useDispatch()
    const cart = useSelector((state)=>state.cart)
    const amount = cart.total;
    const router = useRouter() 
const currency = "USD";
const style = {"layout":"vertical"};
    
    console.log(cart);
    const [open,setOpen] = useState(false)
    const [cash,setCash] = useState(false)

    const createOrders = async (data)=> {
        try {
            const res = await axios.post("http://localhost:3000/api/orders",data)
            console.log(res);
            if(res.status === 200) {
                router.push(`/orders/${res.data._id}`)
                dispatch(reset())
            }

        } catch (err) {
            console.log(err);
        }
    }
    // Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        const shipping = details.purchase_units[0].shipping;
                        createOrders ({
                            customer:shipping.name.full_name,
                            address:shipping.address.address_line_1,
                            total:cart.total,
                            method: 1,
                        })
                        console.log(details)
                        // Your code here after capture the order
                    });
                }}
            />
        </>
    );
}
    
    





   
    return (
        <div className={styles.container}>
        <div className={styles.left}>
            <table className={styles.cartTable}>
            <tbody>
            <tr className={styles.cartRow}>
                <th>Product</th>
                <th>Name</th>
                <th>Extras</th>
                <th>Price</th>
                <th>Quality</th>
                <th>Total</th>

            </tr>
            </tbody>
           
            <tbody>
           {cart.products.map((product)=> (
            <tr key={product._id}>
                <td>
                    <div className={styles.cartTableData}>
                        <Image src={product.img}
                        alt="" layout="fill" objectFit="cover" className={styles.cartImg} />
                    </div>
                </td>
                <td>
                    <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                    <span className={styles.extra}>
                    {product.extra.map((extr)=> (
                        <span key={extr._id}>{extr.text}</span>
                    ))}
                    </span>
                </td>
                <td>
                    <span className={styles.price}>{product.price}</span>
                </td>
                <td>
                    <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                    <span className={styles.total}>${product.price * product.quantity}</span>
                </td>
            </tr>
           ))}
           </tbody>
            



            </table>
        </div>
        <div className={styles.right}>
            <div className={styles.wrapper}>
                <h2>Cart Total</h2>
                <div className={styles.subtotal}>
                    <b className={styles.subtotalText}>SubTotal:</b>${cart.total}
                </div>
                <div className={styles.discount}>
                    <b className={styles.subtotalText}>Discount:</b>$10
                </div>
                <div className={styles.totalAmount}>
                    <b className={styles.subtotalText}>Total:</b>{cart.total - 10}
                </div>
                <button className={styles.btn} onClick={()=>setOpen(true)}>CHECK OUT!</button>
                {open &&
                <button className={styles.btn}style={{color:"white"}} onClick={()=>setCash(true)} >CASH ON DELIVERY</button>}
                <PayPalScriptProvider
                options={{
                    "client-id": "AY1vksUHDG6fZR0Vm9tZStUjXe1TTuH3WqtvS9yFDzGxeRslc2w6F-0VVl3NNKn5cMwFDSaNTVYEgWv2",
                    components: "buttons",
                    currency: "USD",
                    "disable-funding":"credit,card,p24"
                }}
            >
				<ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                />
			</PayPalScriptProvider>
            </div>
        </div>
           { cash && <CashModal /> }
        </div>
    )
}

export default Cart
