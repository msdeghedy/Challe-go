import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import "./auth.scss";
import { FirebaseContext } from "../../context/FirebaseContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { currentContext } from "../../context/CurrentUser";
import Login from "./Login";
import { useState } from "react";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const { auth, firebase } = useContext(FirebaseContext);
  const { setUserInfo } = useContext(currentContext);
  const [openLogin, setOpenLogin] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .then(() =>
        updateProfile(auth.currentUser, {
          displayName: data.name,
          email: data.email,
        })
      );
    setUserInfo(data);
  };
  const handleLoginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(() => navigate("/home"))
      .catch((err) => err);
  };

  const style = {
    control: (base, state) => ({
      ...base,
      // This line disable the blue border
      border: state.isFocused
        ? "1px solid rgba(54,23,94, 0.5)"
        : "1px solid #cccccc",
      boxShadow: state.isFocused
        ? "0px 0px 0px 4px rgba(54,23,94, 0.2)"
        : "none",
      "&:hover": {
        border: state.isFocused
          ? "1px solid rgba(54,23,94, 0.5)"
          : "1px solid #cccccc",
        boxShadow: state.isFocused
          ? "0px 0px 0px 4px rgba(54,23,94, 0.2)"
          : "none",
      },
    }),
  };

  const options = [
    {
      value: 1,
      label: "Male",
    },
    {
      value: 2,
      label: "Female",
    },
  ];

  const multiOptions = [
    {
      value: 1,
      label: "Frontend Development",
    },
    {
      value: 2,
      label: "Backend Development",
    },
    {
      value: 3,
      label: "UI/UX",
    },
    {
      value: 4,
      label: "Artifcial Intellegence",
    },
  ];

  if (openLogin) {
    return <Login />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-3 text-white"
    >
      <Button
        onClick={handleLoginWithGoogle}
        variant="warning"
        type="submit"
        className="d-block mx-auto w-100 mb-3 "
      >
        <FaGoogle className="me-2" /> Sign up with Google
      </Button>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Your Name"
            className="border"
            {...register("name", {
              required: true,
              minLength: 2,
              maxLength: 20,
            })}
          />
          {errors?.name?.type === "required" && (
            <Form.Text className="text-danger">Name is required</Form.Text>
          )}
          {errors?.name?.type === "minLength" && (
            <Form.Text className="text-danger">
              Minimum length is 2 charachters
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="border"
            {...register("email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
          />
          {errors?.email?.type === "required" && (
            <Form.Text className="text-danger">Email is required</Form.Text>
          )}
          {errors?.email?.type === "pattern" && (
            <Form.Text className="text-danger">Wrong Mail Format</Form.Text>
          )}
        </Form.Group>

        <div className="d-flex align-items-stretch text-white">
          <Form.Group className="mb-3  me-2 w-50" controlId="formBasicPassword">
            <Form.Label>Gender </Form.Label>

            <Controller
              name="gender"
              control={control}
              className="bg-dark "
              render={({ field }) => (
                <Select className="text-black" {...field} options={options} />
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3 w-50" controlId="formBasicNumber">
            <Form.Label>Birthdate</Form.Label>
            <div>
              <input
                type="date"
                {...register("birthDate")}
                className="form-control border "
              ></input>
            </div>
          </Form.Group>
        </div>

        <div className="d-flex text-white">
          <Form.Group className="mb-3 w-50 me-2" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className="border"
              {...register("password", {
                required: true,
              })}
            />
            {errors?.password?.type === "required" && (
              <Form.Text className="text-danger">
                Password is required
              </Form.Text>
            )}
            {errors?.password?.type === "pattern" && (
              <Form.Text className="text-danger">
                password should be formatted like: At least 1 Uppercase /1
                Lowercase / 1 Number / 1 Symbol, symbol allowed -- !@#$%^&*_=+-
                / Min 8 chars and Max 12 chars
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group
            className="mb-3 w-50"
            controlId="formBasicConfirmPassword"
          >
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              name="confirmPass"
              className="border"
              placeholder="Confirm Password"
              {...register("confirmPass", {
                required: true,

                validate: (val) => val === watch("password"),
              })}
            />
            {errors?.confirmPass?.type === "required" && (
              <Form.Text className="text-danger">
                Confirming password is required
              </Form.Text>
            )}
            {errors?.confirmPass?.type === "validate" && (
              <Form.Text className="text-danger">
                Passwords don't match
              </Form.Text>
            )}
          </Form.Group>
        </div>
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label>Interests </Form.Label>

          <Controller
            name="Interests"
            control={control}
            render={({ field }) => (
              <Select
                className="text-black"
                {...field}
                options={multiOptions}
                isMulti
              />
            )}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-3">
          Sign up
        </Button>
        <div className="d-flex gap-5 justify-content-center">
          <p className="d-d-inline">Already a user?</p>
          <a
            className="btn btn-link text-decoration-none text-primary cursor-pointer p-0"
            onClick={() => setOpenLogin(true)}
          >
            Login
          </a>
        </div>
      </Form>
    </motion.div>
  );
};

export default Register;
