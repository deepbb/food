import styles from "../styles/AddProduct.module.css"
import {useState} from "react"
import axios from "axios"

function AddProduct() {
    const [title,setTitle] = useState()
    const[price ,setPrice] = useState([])
    const[desc,setDesc] = useState()
    const[file,setfile] = useState(null)
    const[extras,setExtras] = useState([])

    const newProduct = {
        title,price,desc,
    }

    const handleClick = async (e)=> {
        e.preventDefault()
        if(file) {
            const data = new FormData()
            const filename =file.name;
            console.log(filename);
            data.append("name",filename)
            data.append("file", file);
            newProduct.img = filename
        
        try{
            const res = await axios.post("http://localhost:3000/api/products",newProduct) 
            console.log(res.data);
        } catch (err){
            console.log(err);
        }
    }
    }

  return (
    <div className={styles.prodcontainer}>
        <div className={styles.wrapper}>
            <label>Enter the Product</label>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <label>Enter the price</label>
            <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} />
            <label>Enter the description</label>
            <input type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} />
            <input type="file" id="fileInput"
                              onChange={(e)=>setfile(e.target.files[0])}
                                />
            <label>Enter the extras</label>
            <input type="text" value={extras} onChange={(e)=>setExtras(e.target.value)} />
            <input type="number" value={extras} onChange={(e)=>setExtras(e.target.value)} />


            <button onClick={handleClick}>click</button>
        </div>
    </div>
  ) 
}

export default AddProduct;
