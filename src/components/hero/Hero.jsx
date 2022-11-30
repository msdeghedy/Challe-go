import React, { useState } from "react";
import "./Hero.scss";
import { motion } from "framer-motion";
import Login from "../auth/Login";
import { useContext } from "react";
import { OpenAuthContext } from "../../context/OpenAuthContext";
import { useEffect } from "react";

const Hero = () => {
  const { authOpened, setAuthOpened } = useContext(OpenAuthContext);
  const openAuth = () => {
    setAuthOpened(true);
  };

  useEffect(() => {
    setAuthOpened(false);
  }, []);

  return (
    <div className="hero bg-body">
      <div className="container mx-auto row h-100 align-items-center g-0">
        <div
          className="col-12 px-sm-3 col-md-7 px-3 align-self-center bg-body py-5"
          style={{ zIndex: 100 }}
        >
          <h1>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-uppercase text-primary"
            >
              Challenge yourself
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-primary"
            >
              Reach your goal
            </motion.div>
          </h1>
          <motion.button
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="btn btn-primary btn-lg"
            onClick={openAuth}
          >
            Start Challenge
          </motion.button>
        </div>
        {authOpened ? (
          <motion.div
            className="col-12 col-md-5 align-self-center"
            initial={{ opacity: 0, x: -300, z: 0 }}
            animate={{ opacity: 1, x: 0, z: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 50 }}
          >
            <Login />
          </motion.div>
        ) : (
          <div className="col-12 col-md-5">
            <div className="hero-img"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
