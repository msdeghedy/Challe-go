import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ContentLoader from "react-content-loader";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FirebaseContext } from "../../context/FirebaseContext";
import ChallengeCard from "../ChallengeCard/ChallengeCard";

const RecommendedTopChallenges = ({}) => {
  const { challengeCollection } = useContext(FirebaseContext);
  const [challenges, isLoading] = useCollectionData(challengeCollection);

  const [topChallenge, setTopChallenge] = useState([]);
  useEffect(() => {
    setTopChallenge(challenges);
  }, [challenges]);
  return (
    <div className=" card  py-3 pb-2 text-white border border-primary bg-body  px-2">
      <h5 className="text-center mb-1 text-white  pb-2 mx-3">Top Challenge</h5>
      {isLoading ? (
        <>
          <ContentLoader viewBox="0 0 500 475" height={475} width={500}>
            <circle cx="70.2" cy="73.2" r="41.3" />
            <rect x="129.9" y="29.5" width="125.5" height="17" />
            <rect x="129.9" y="64.7" width="296" height="17" />
            <rect x="129.9" y="97.8" width="253.5" height="17" />
            <rect x="129.9" y="132.3" width="212.5" height="17" />
          </ContentLoader>
        </>
      ) : (
        <>
          {challenges

            .sort((a, b) => b.postLikes.length - a.postLikes.length)
            .slice(0, 1)
            .map((chall) => (
              <div key={chall.cid}>
                <ChallengeCard post={chall} />
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default RecommendedTopChallenges;
