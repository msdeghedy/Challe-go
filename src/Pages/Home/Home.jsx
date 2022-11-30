import React from "react";
import { useState } from "react";
import { Suspense } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import ContentLoader from "react-content-loader";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { currentContext } from "../../context/CurrentUser";
import { FirebaseContext } from "../../context/FirebaseContext";
import Toast from "../../UI/Toast/Toast";
import Post from "./../../components/AddPost/Post";
import RecommendedChallengers from "./../../components/RecommendedChallengers/RecommendedChallengers";
import RecommendedTopChallenges from "./../../components/RecommendedTopChallenges/RecommendedTopChallenges";
import TopChallengers from "./../TopChallengers/TopChallengers";
import { Link } from "react-router-dom";
const ChallengeCard = React.lazy(() =>
  import("../../components/ChallengeCard/ChallengeCard")
);

var Spinner = require("react-spinkit");

const Home = () => {
  const { challengeCollection } = useContext(FirebaseContext);
  const [challenges, isLoading] = useCollectionData(challengeCollection);
  const { currentUser, userLoading } = useContext(currentContext);
  const [currentUserPosts, setcurrentUserPosts] = useState(challenges);

  useEffect(() => {
    if (currentUser) {
      setcurrentUserPosts(challenges);
    }
  }, [challenges]);

  if (userLoading) {
    return (
      <div className="mt-5 bg-body home h-100">
        <div className="container vh-100 d-flex align-items-start justify-content-between">
          <Spinner name="pacman" color="blue" />
        </div>
      </div>
    );
  }
  return (
    <div className={` py-3  home  bg-body`}>
      <div className="container-fluid">
        <div className="row align-items-start justify-content-center">
          <div className="col-md-6 col-sm-12  mb-2  ">
            <Post />

            {currentUserPosts ? (
              <>
                {currentUserPosts
                  ?.sort((a, b) => b.startDate.toDate() - a.startDate.toDate())
                  .map((post, index) => {
                    return (
                      <Suspense
                        fallback={
                          <ContentLoader viewBox="0 0 476 124">
                            <rect x="48" y="8" width="88" height="6" rx="3" />
                            <rect x="48" y="26" width="52" height="6" rx="3" />
                            <rect x="0" y="56" width="410" height="6" rx="3" />
                            <rect x="0" y="72" width="380" height="6" rx="3" />
                            <rect x="0" y="88" width="178" height="6" rx="3" />
                            <circle cx="20" cy="20" r="20" />
                          </ContentLoader>
                        }
                        key={post.cid}
                      >
                        <ChallengeCard
                          post={post}
                          currentUser={currentUser[0]}
                        />
                      </Suspense>
                    );
                  })}
              </>
            ) : (
              <ContentLoader viewBox="0 0 476 124">
                <rect x="48" y="8" width="88" height="6" rx="3" />
                <rect x="48" y="26" width="52" height="6" rx="3" />
                <rect x="0" y="56" width="410" height="6" rx="3" />
                <rect x="0" y="72" width="380" height="6" rx="3" />
                <rect x="0" y="88" width="178" height="6" rx="3" />
                <circle cx="20" cy="20" r="20" />
              </ContentLoader>
            )}

            {currentUserPosts?.length === 0 ? (
              <h1 className="text-white text-center mt-5">No Posts Yet!</h1>
            ) : null}
          </div>
          <div className="d-none d-md-block col-3  col-md-4 col-lg-3 ">
            <RecommendedChallengers />
            <div className="mb-5">
              <RecommendedTopChallenges
                challenges={challenges}
                isLoading={isLoading}
              />
            </div>
            <div className="rounded-2 overflow-hidden bg-body px-2 border border-primary text-center">
              <h5 className="text-center mb-1 text-white  p-3 mx-3">
                Top Challengers
              </h5>
              <TopChallengers home={true} className="w-100  " />
              <Link
                to="/top-challengers"
                className="text-decoration-none text-primary "
              >
                <p className=" btn btn-primary  text-center mt-3">
                  Explore all top challengers
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default Home;
