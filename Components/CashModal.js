import styles from  "../styles/CashModal.module.css"
import {useState} from "react"
import axios from "axios"
import { useRouter } from "next/router"
import {useSelector,useDispatch} from "react-redux"
import { reset } from "../redux/cartSlice"

function CashModal() {
  const router = useRouter()
  const dispatch = useDispatch()
    const cart = useSelector((state)=>state.cart)
  const [customer,setCustomer] = useState("")
  const[address,setAddress] = useState("")
  const total = cart.total
  const status = 0
  const method = 1

  const data = {customer,address,status,method,total}

const handleClick = async()=> {
  const res = await axios.post("http://localhost:3000/api/orders",data)
  console.log(res);
  if(res.status === 200) {
    router.push(`/orders/${res.data._id}`)
    dispatch(reset())
  }
}
const handleRoute = ()=> {
  router.push(`/cart`)
}



  return <div className={styles.containerModal}>
      <h2 className={styles.title}>You have to pay ${cart.total} amount on delivery</h2>
      <div className={styles.modalElements}>
      <input className={styles.input} type="text" placeholder="Enter your Name" value={customer}
      onChange={(e)=>setCustomer(e.target.value)}
       />
       <input className={styles.input} type="text" placeholder="Enter Your Address" value={address}
      onChange={(e)=>setAddress(e.target.value)}
       />
       </div>
       <div className={styles.cartOrder}>
       <div className={styles.orderName}>
       {cart.products.map((product)=> (
        <li className={styles.items} key={product._id}>{product.title}</li>
       ))}
       </div>
       </div>
       
       <button className={styles.btn} onClick={handleClick}>Click to Proceed</button>

  </div>;
}

export default CashModal;
