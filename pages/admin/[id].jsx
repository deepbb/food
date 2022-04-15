import axios from 'axios';
import styles from "../../styles/AdminOrders.module.css"
import {useRouter} from "next/router"
import {NEXT_URL} from "../../url"

function AdminOrders({order}) {
  const status = ["preparing", "on the way" , "delivered"]




  const router = useRouter()
  console.log(order);

  const handleDelete = async ()=> {
    const res = await axios.delete( `${NEXT_URL}/api/orders/${order._id}`)
    console.log(res);
    if(res.status === 200) {
      router.push(`/admin`)
    }

  }

   const handleStatus = async ()=> {
    try {
        const res = await axios.put(`${NEXT_URL}/api/orders/${order._id}`, {
          status: 1,
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
   }

  return (
  <div>
      <div className={styles.container}>
        <span onClick={handleDelete}>{order.customer}</span>
        <table className={styles.cartTable}>
            <tbody>
            <tr className={styles.cartRow}>
                <th>OrderID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
                <th>status</th>

            </tr>
            </tbody>
            <tbody>
            <tr className={styles.tableRow}>
                <td>
                    <span className={styles.orderid}>orderid</span>
                </td>
                <td>
                    <span className={styles.name}>name</span>
                </td>
                <td>
                    <span className={styles.address}>address</span>
                </td>
                <td>
                    <span className={styles.total}>$amount</span>
                </td>
                <td>
                    <span className={styles.total} onClick={handleStatus}>{status[order.status]}change</span>
                </td>
            </tr>
            </tbody>
            
            
            



            </table>
      </div>
  </div>
  )
}

export async function getServerSideProps({params}) {
  const res =  await axios.get(`${NEXT_URL}/api/orders/${params.id}`)
  console.log(res);
  return {
    props:{
      order:res.data
    },
  }
}



export default AdminOrders;
