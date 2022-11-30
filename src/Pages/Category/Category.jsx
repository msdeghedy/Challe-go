import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./category.scss";
import ChallengeCard from "../../components/ChallengeCard/ChallengeCard";
import { FirebaseContext } from "./../../context/FirebaseContext";
import { useContext, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { motion } from "framer-motion";
import { useEffect } from "react";
function Category() {
  const { challengeCollection } = useContext(FirebaseContext);
  const [challenges] = useCollectionData(challengeCollection);

  const [title, setTitle] = useState("Choose a category to display");
  const [renderArr, setRenderArr] = useState([]);

  const handleClick = (e) => {
    if (e.target.name === "all") {
      setRenderArr(challenges);
      return;
    }
    const filteredCat = challenges.filter(
      (challenge) => challenge.category.value === e.target.name
    );
    setRenderArr(filteredCat);
  };

  return (
    <div className="section-padding categroy bg-body text-white categories ">
      <div className="container">
        <div
          className="wv-100 p-4 rounded-4 mb-2 bg-body border  border-primary"
          style={
            title === "Frontend"
              ? { backgroundColor: "#3a3a3a" }
              : title === "Backend"
              ? { backgroundColor: "#414040" }
              : title === "UI/UX"
              ? { backgroundColor: "#494848 " }
              : { backgroundColor: "#2f2f2f" }
          }
        >
          <h1 className="text-center  bg mb-5 text-white">{title}</h1>
          <div className="row categroy mb-5 ">
            <div
              aria-label="button-group Basic example "
              className="d-flex flex-column w-25 col-2"
            >
              <div className=" bg-primary rounded-2 text-center  mb-3">
                <button
                  className="rounded-1  btn w-100 py-3 "
                  name="all"
                  // variant="secondary me-2 bg-color border-0"
                  onClick={(e) => {
                    handleClick(e);
                    setTitle("All");
                  }}
                >
                  All
                </button>
              </div>
              <div className=" bg-primary rounded-2 text-center  mb-3">
                <Button
                  name="frontend"
                  className="rounded-1  btn w-100 py-3 "
                  onClick={(e) => {
                    handleClick(e);
                    setTitle("Frontend");
                  }}
                >
                  Frontend
                </Button>
              </div>
              <div className=" bg-primary rounded-2 text-center  mb-3">
                <Button
                  name="backend"
                  className="rounded-1  btn w-100 py-3 "
                  onClick={(e) => {
                    handleClick(e);
                    setTitle("Backend");
                  }}
                >
                  Backend
                </Button>
              </div>
              <div className="bg-primary rounded-2 text-center  mb-3">
                <Button
                  name="ui/ux"
                  className="rounded-1  btn w-100 py-3 "
                  onClick={(e) => {
                    handleClick(e);
                    setTitle("UI/UX");
                  }}
                >
                  UI/UX
                </Button>
              </div>
            </div>
            <div className="col-9">
              {renderArr.length > 0 ? (
                renderArr.map((ch, i) => {
                  return (
                    <motion.div>
                      <div>
                        <ChallengeCard
                          post={ch}
                          key={ch.cid}
                          className="h-100"
                        />
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <p className="text-center fs-3 text-primary">
                  Select category to display
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
