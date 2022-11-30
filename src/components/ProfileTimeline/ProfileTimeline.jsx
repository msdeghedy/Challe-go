import { useContext } from "react";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FirebaseContext } from "../../context/FirebaseContext";
import ChallengeCard from "../ChallengeCard/ChallengeCard";
import "./ProfileTimeline.scss";

const ProfileTimeline = ({ user, self }) => {
  const { challengeCollection } = useContext(FirebaseContext);
  const [userChallenges, challengesLoading] = useCollectionData(
    challengeCollection.where("creatorID", "==", user.uid)
  );
  const [allChallenges, allChallengesLoading] =
    useCollectionData(challengeCollection);

  if (challengesLoading) {
    return (
      <ContentLoader viewBox="0 0 500 475" height={475} width={500}>
        <circle cx="70.2" cy="73.2" r="41.3" />
        <rect x="129.9" y="29.5" width="125.5" height="17" />
        <rect x="129.9" y="64.7" width="296" height="17" />
        <rect x="129.9" y="97.8" width="253.5" height="17" />
        <rect x="129.9" y="132.3" width="212.5" height="17" />
      </ContentLoader>
    );
  }

  return (
    <div className="profile-timeline text-white">
      <Tabs
        defaultActiveKey="home"
        id="fill-tab-example"
        className="mb-3 border-0 position-static"
        fill
      >
        <Tab
          eventKey="home"
          title={
            self ? "My Challenges" : `${user.name.split(" ")[0]}'s Challenges`
          }
          className="text-white"
        >
          <div className="user-challenges row  ">
            {challengesLoading ? (
              <ContentLoader viewBox="0 0 500 475" height={475} width={500}>
                <circle cx="70.2" cy="73.2" r="41.3" />
                <rect x="129.9" y="29.5" width="125.5" height="17" />
                <rect x="129.9" y="64.7" width="296" height="17" />
                <rect x="129.9" y="97.8" width="253.5" height="17" />
                <rect x="129.9" y="132.3" width="212.5" height="17" />
              </ContentLoader>
            ) : (
              <>
                {userChallenges.length > 0 ? (
                  userChallenges.map((challenge, index) => {
                    return (
                      <div className="col-sm-12 col-md-6 mb-3 ">
                        <ChallengeCard post={challenge} key={index} />
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center fw-bold">
                    No Challenges created yet.
                  </div>
                )}
              </>
            )}
          </div>
        </Tab>
        <Tab eventKey="profile" title="Participated Challenges">
          <div className="user-challenges">
            {allChallengesLoading ? (
              <ContentLoader viewBox="0 0 500 475" height={475} width={500}>
                <circle cx="70.2" cy="73.2" r="41.3" />
                <rect x="129.9" y="29.5" width="125.5" height="17" />
                <rect x="129.9" y="64.7" width="296" height="17" />
                <rect x="129.9" y="97.8" width="253.5" height="17" />
                <rect x="129.9" y="132.3" width="212.5" height="17" />
              </ContentLoader>
            ) : (
              <>
                <div className="row">
                  {allChallenges.filter(
                    (challenge) =>
                      challenge.participants.includes(user.uid) &&
                      challenge.creatorID !== user.uid
                  ).length > 0 ? (
                    allChallenges
                      .filter(
                        (challenge) =>
                          challenge.participants.includes(user.uid) &&
                          challenge.creatorID !== user.uid
                      )
                      .map((challenge, index) => {
                        return (
                          <div className="col-6">
                            <ChallengeCard post={challenge} key={index} />
                          </div>
                        );
                      })
                  ) : (
                    <div className="text-center fw-bold">
                      {self
                        ? "You didn't participated in any challenge yet."
                        : `${
                            user.name.split(" ")[0]
                          } hasn't participated in any challenge yet.`}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProfileTimeline;
