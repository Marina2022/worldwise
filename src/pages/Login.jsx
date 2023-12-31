import styles from "./Login.module.css";
import {useEffect, useState} from "react";
import PageNav from "../components/PageNav.jsx";
import Button from "../components/Button.jsx";
import {useAuth} from "../contexts/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("111");

  const {login, authenticated} = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  const navigate = useNavigate()

  useEffect(()=>{
    if (authenticated === true) navigate('/app/', {replace: true})
  }, [authenticated])


  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary'>Login</Button>
        </div>
      </form>
    </main>
  );
}
