import axios from 'axios';
import styles from "../../styles/Login.module.css"
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { NEXT_URL } from '../../url';

function Login() {
    const [username,setUsername] = useState("admin")
    const [password,setPassword] = useState("12345")
    const router = useRouter()

    const handleClick = async ()=> {
        try {
        const res = await axios.post( NEXT_URL + "/api/login/", {username,password})
        console.log(res);
        router.push("/admin")
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <div className={styles.container}> 
    <h3 className={styles.title}>Admin Login</h3>
    <div className={styles.wrapper}>
    <label className={styles.text}>Admin User Name</label>
        <input className={styles.input} type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
    <label className={styles.text}>Admin Password</label>

        <input className={styles.input} type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className={styles.btn} onClick={handleClick}>Log In</button>
    </div>
    </div>
  ) 
}

export default Login;
