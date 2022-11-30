import React, { useContext } from "react";
import "./auth.scss";
import { useForm } from "react-hook-form";
import { FirebaseContext } from "../../context/FirebaseContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Register from "./Register";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { auth, firebase } = useContext(FirebaseContext);
  const [openRegister, setOpenRegister] = useState(false);

  const handleLoginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(() => navigate("/home"))
      .catch((err) => err);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        return error;
      });
  };

  if (openRegister) {
    return <Register />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="login auth text-white"
    >
      <div className="wrapper px-3">
        <div className="text-center login-methods d-flex gap-4 justify-content-center mb-3">
          <button
            className="btn btn-warning w-100"
            onClick={handleLoginWithGoogle}
          >
            <FaGoogle className="me-2" /> Login with Google
          </button>
        </div>
        <div className="login-form mb-4 px-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="form-label">Email</label>
            <input
              className="form-control mb-3 border"
              type="text"
              {...register("email", {
                required: true,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              })}
            />
            {errors.email && (
              <p className="text-danger">Please enter a valid email</p>
            )}

            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control mb-2 border"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-danger">This field is required</span>
            )}

            <input
              className="btn btn-primary text-white w-100 mt-3"
              type="submit"
              value="Login"
            />
          </form>
        </div>
        <div className="options ">
          <div className="d-flex gap-5 justify-content-center">
            <p className="d-d-inline">Don't have an account?</p>
            <a
              className="btn btn-link text-decoration-none text-primary cursor-pointer p-0"
              onClick={() => setOpenRegister(true)}
            >
              SignUp
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
