import styles from "../../styles/Product.module.css"
import Image from "next/image"
import { useState } from "react"
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

function Product({pizzaCart}) {
    console.log(pizzaCart);
    const [price,setPrice] = useState(pizzaCart.price[0])
    const [size,setSize] = useState(0)
    const [extra,setExtra] = useState([])
    const [quantity,setQuantity]  = useState(1)
    const dispatch = useDispatch()


    const changePrice = (number) => {
        setPrice(price + number)
    }

    const handleSize = (sizeIndex)=> {
            const difference = pizzaCart.price[sizeIndex] - pizzaCart.price[size]
            setSize(sizeIndex)
            changePrice(difference)
    }
    const handlechange = (e,pizzas)=> {
        const checked = e.target.checked

        if(checked) {
            changePrice(pizzas.price)
            setExtra((prev)=>[...prev,pizzas])

        } else {
            changePrice(- pizzas.price)
            setExtra(extra.filter((extra)=>extra._id !== pizzas._id))
        }
    }

    console.log(extra);
    console.log(quantity);
    console.log(price);

    const handleClick = (e)=> {
        e.preventDefault()
        dispatch(addProduct({...pizzaCart,extra,price,quantity}))
    }
    return (
        <div className={styles.container}>
        <div className={styles.leftContainer}>
        <div className={styles.imgContainer}>
        <Image src={pizzaCart.img}  alt="" layout="fill"/>
        </div>
            
        </div>
        <div className={styles.rightContainer}>
            <h1 className={styles.title}>{pizzaCart.title}</h1>
            <span className={styles.price}>${price}</span>
            <p className={styles.desc}>{pizzaCart.desc}</p>
            <h3 className={styles.choose}>Choose the size</h3>
            <div className={styles.sizes}>
                <div className={styles.size} onClick={()=>handleSize(0)}>
                    <Image src="/img/size.png" alt="" objectFit="contain" layout="fill" />
                    <p className={styles.number}>small</p>
                </div>
                <div className={styles.size} onClick={()=>handleSize(1)}>
                    <Image src="/img/size.png" alt="" objectFit="contain" layout="fill" />
                    <p className={styles.number}>medium</p>
                </div>
                <div className={styles.size} onClick={()=>handleSize(2)}>
                    <Image src="/img/size.png" alt="" objectFit="contain" layout="fill" />
                    <p className={styles.number}>large</p>
                </div>
            </div>
            <h3 className={styles.chose}>choose additional ingredients</h3>
            <div className={styles.ingList}>
          
            
            {pizzaCart.extras.map((pizzas)=>(
                <div className={styles.ingredients} key={pizzas.id}>
               <input type="checkbox"
                id={pizzas.text}
                name={pizzas.text}
                className={styles.checkbox}
                onChange={(e)=>handlechange(e,pizzas)}

                 />
                 <label  htmlFor="double">{pizzas.text}</label>
                 </div>
           ))} 
                
            
           
            </div>
            <div className={styles.addItem}>
                <input type="number"
                 defaultValue={1}
                  className={styles.addInput}
                    value={quantity}
                  onChange={(e)=>setQuantity(e.target.value)}
                   />
                <button className={styles.addBtn} onClick={handleClick}>Add To Cart</button>
            </div>

        </div>

            
        </div>
    )
}

export async function  getServerSideProps ({params}) {
    //const id = params.id
    const res = await axios.get(NEXT_URL + `api/products/${params.id}`)
    console.log(res.data);
    return {
      props: {
        pizzaCart:res.data
      },
    }
  }

export default Product 
