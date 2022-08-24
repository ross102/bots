import type { NextPage } from "next";

import Head from "next/Head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.wrapper}>
        <form className="p-3 mt-3">
          <h3>Are you a robot ?</h3>

          <p>Let's find out</p>
          {/* <div className="form-field d-flex align-items-center">
                <span className="far fa-user"></span>
                <input type="text" name="userName" id="userName" placeholder="Username" />
            </div>
            <div className="form-field d-flex align-items-center">
                <span className="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="Password" />
            </div> */}
          <div className="d-flex align-items-center">
            <button className={styles.btn}>Login with metamask</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
