import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import AddProduct from "../../Components/AddProduct";
import styles from "../../styles/Admin.module.css"
import { NEXT_URL } from "../../url";

const Index = ({orders}) => {
    const [show ,setShow] = useState(false)
    const router = useRouter()
    console.log(orders);

   const handleClick = ()=> {
        router.push("/admin/Login")
   }

const handleDelete = ()=> {
    setShow(false)
}


  return ( 
      <div className={styles.container}>
      <div className={styles.btnContainer}>
      {show && 
        <AddProduct />
      }
      <button onClick={handleDelete}>click</button>
      <button className={styles.btn} style={{backgroundColor:"green"}} onClick={()=>setShow(true)}>Add Products</button>
      <button className={styles.btn} onClick={handleClick}>Sign out</button>
      </div>
    <div className={styles.left}>
    <table className={styles.cartTable}>
    
    <tbody>
    <tr className={styles.cartRow}>
        <th>Product</th>
        <th>ORDER ID</th>
        <th>CUSTOMER</th>
        <th>ADDRESS</th>
        <th>TOTAL</th>
        

    </tr>
    
    </tbody>
    <tbody>
    <tr className={styles.tableRow}>
    <td>
            {/* <Link href="/" passHref>
            <Image src="/img/pizza.png" alt="" height="250" width="250" />
            </Link> */}
            
        </td>
        <td>
        {orders.map((order)=> (
            <>
            <Link key={order._id} href={`/admin/${order._id}`} passHref>
            <button key={order._id} className={styles.orderids}>{order._id}</button>
            </Link>
            </>
        ))}
            
        </td>
        <td>
        {orders.map((order)=> (
            <span key={order._id} className={styles.ordername}>{order.customer}</span>
        ))
        
        }
        </td>
        <td>
        {orders.map((order)=> (
            <span key={order._id} className={styles.orderaddress}>{order.address}</span>
        ))}
            
        </td>
        <td>
        {orders.map((order)=> (
            <>
            <button key={order._id} className={styles.ordertotal}>${order.total}</button>
            </>
        ))}
            
        </td>
       
    </tr>
    </tbody>
    
    
    



    </table>
    </div>
  {/* <div className={styles.container}>
     {orders.map((order)=> (
         <>
         <Link href={`/admin/${order._id}`} passHref>
         <li key={order._id}>{order.customer}</li>
         </Link>
         </>
     ))}
  </div> */}
      </div>
  )
};

export async function getServerSideProps() {
    const res = await axios.get( NEXT_URL + "/api/orders")
    console.log(res.data);
    return {
        props: {
            orders:res.data
        },
    }
}

export default Index;


// {orders.map((order)=> (
//     <p key={order._id}>{order.status === 0 ? <span>preparing</span> : <span>prepared</span>}</p>
// ))}