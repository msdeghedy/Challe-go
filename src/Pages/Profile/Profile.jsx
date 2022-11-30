import React, { useContext, useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import ProfileAbout from "../../components/ProfileAbout/ProfileAbout";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfileTimeline from "../../components/ProfileTimeline/ProfileTimeline";
import { currentContext } from "../../context/CurrentUser";
import { FirebaseContext } from "../../context/FirebaseContext";
import "./Profile.scss";

const Profile = () => {
  const { currentUser } = useContext(currentContext);
  const { userCollection } = useContext(FirebaseContext);
  const [users] = useCollectionData(userCollection);
  const { usernameParams } = useParams();
  const query = usernameParams
    ? userCollection.where("username", "==", usernameParams)
    : userCollection.where("username", "==", currentUser[0].username);
  const [filterUser, filterUserLoading] = useCollectionData(query);
  const [self, setSelf] = useState(false);

  useEffect(() => {
    if (!usernameParams || usernameParams === currentUser[0].username) {
      setSelf(true);
    } else {
      setSelf(false);
    }
  }, [usernameParams, currentUser[0]]);
  return (
    <div className="profile text-white">
      <div className="profile-cover bg-body"></div>
      <div className="profile-content bg-body">
        {filterUserLoading ? (
          <div className="container">
            <ContentLoader
              speed={3}
              width={1440}
              height={500}
              viewBox="0 0 1440 500"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <circle cx="80" cy="111" r="54" />
              <rect x="182" y="86" rx="0" ry="0" width="148" height="21" />
              <rect x="185" y="112" rx="0" ry="0" width="87" height="13" />
              <rect x="39" y="203" rx="0" ry="0" width="70" height="12" />
              <rect x="40" y="221" rx="0" ry="0" width="72" height="11" />
              <rect x="29" y="266" rx="0" ry="0" width="129" height="125" />
              <rect x="184" y="167" rx="0" ry="0" width="296" height="19" />
              <rect x="197" y="238" rx="0" ry="0" width="129" height="85" />
              <rect x="339" y="238" rx="0" ry="0" width="129" height="85" />
            </ContentLoader>
          </div>
        ) : (
          <div className="container">
            <ProfileInfo user={filterUser[0]} self={self} />
            <div className="row">
              <div className="col-lg-3">
                <ProfileAbout user={filterUser[0]} self={self} users={users} />
              </div>
              <div className="col-lg-9">
                <ProfileTimeline user={filterUser[0]} self={self} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
