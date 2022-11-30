import React, { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import "./Post.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FirebaseContext } from "../../context/FirebaseContext";
import { useContext } from "react";
import { currentContext } from "../../context/CurrentUser";
import { SiCoursera, SiUdemy, SiYoutube } from "react-icons/si";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uuid from "react-uuid";
import { motion } from "framer-motion";

const Post = () => {
  const [endDate, setEndDate] = useState(new Date());
  const [openForm, setOpenForm] = useState(false);
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      category: "",
    },
  });
  const { challengeCollection } = useContext(FirebaseContext);
  const { currentUser } = useContext(currentContext);

  const onSubmit = (data) => {
    const uniqueID = uuid();
    challengeCollection.doc(uniqueID).set({
      creatorID: currentUser[0].uid,
      title: data.title,
      desc: data.description,
      category: data.category,
      participants: [currentUser[0].uid],
      postLikes: [],
      postComments: [],
      startDate: new Date(),
      endDate: endDate,
      site: data.site.value,
      cid: uniqueID,
    });
    toast.success("Your Post Is Live Now! Hurry To Finish It", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    reset();
  };
  const options = [
    { value: "frontend", label: "Frontend Development" },
    { value: "backend", label: "Backend Developemnt" },
    { value: "ui/ux", label: "UI/UX" },
  ];

  const sites = [
    { value: "Youtube", label: <SiYoutube /> },
    { value: "Coursera", label: <SiCoursera /> },
    { value: "Udemy", label: <SiUdemy /> },
  ];

  const openChallengeForm = () => {
    setOpenForm((prev) => !prev);
  };
  return (
    <>
      <div>
        <button onClick={openChallengeForm} className="btn btn-primary mb-3  ">
          Start New Challenge
        </button>
        {openForm && (
          <motion.div
            className="row post mx-1 text-black"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className=" py-3  card py-4 px-3 bg-c-grey post-form bg-body border-primary">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formInput">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="title"
                    className="mb-3 border rounded-2"
                  >
                    <Form.Control
                      type="text"
                      {...register("title")}
                      placeholder="Add Title Here"
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <FloatingLabel
                    controlId="floatingTextarea2"
                    label="Add your breif here ..."
                    className="border rounded-2"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "60px" }}
                      {...register("description", { required: true })}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <div className="row ">
                    <div className="col-lg-6 col-12 mb-3 mb-lg-0 text-black">
                      <Controller
                        name="category"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            closeMenuOnSelect={true}
                            options={options}
                            placeholder="Select your challenge category"
                          />
                        )}
                      />
                    </div>
                    <div className="col-lg-2 col-6  text-black">
                      <Controller
                        name="site"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            closeMenuOnSelect={true}
                            options={sites}
                            placeholder="Site"
                          />
                        )}
                      />
                    </div>
                    <div className="col-lg-4 col-6 mt-1 overflow-hidden">
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                      />
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="mb-2 border-bottom border-primary"></Form.Group>
                <Form.Group>
                  <p className="text-center text-white">
                    Complete your challenge to earn points 👌🥳
                  </p>
                </Form.Group>
                <Form.Group className="text-end">
                  <button className="btn btn-primary ">
                    Post Your Challenge!
                  </button>
                </Form.Group>
              </Form>
            </div>
          </motion.div>
        )}

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
        />
      </div>
    </>
  );
};

export default Post;
