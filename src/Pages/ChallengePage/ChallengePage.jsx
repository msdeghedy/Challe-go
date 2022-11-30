import React from "react";
import RecommendedChallengers from "../../components/RecommendedChallengers/RecommendedChallengers";
import RecommendedTopChallenges from "../../components/RecommendedTopChallenges/RecommendedTopChallenges";
import ChallengeTimeline from "./ChallengeTimeline";
import "./ChallengePage.scss";

const ChallengePage = () => {
  return (
    <div className="challenge-page bg-body">
      <div className="container">
        <div className="row justify-content-center py-5">
          <div className="col-lg-8 col-12">
            <ChallengeTimeline />
          </div>
          <div className="d-none d-lg-block col-3">
            <RecommendedChallengers />
            <RecommendedTopChallenges />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengePage;
