import { useContext } from "react";
import Table from "react-bootstrap/Table";
import "./top-challenger.scss";
import { FirebaseContext } from "./../../context/FirebaseContext";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";

function TopChallengers({ home = false }) {
  const { users } = useContext(FirebaseContext);
  let rank = 0;
  return (
    <div className="bg-body">
      <div
        className={
          !home ? "container page-height bg-body top-challenge" : "bg-body "
        }
      >
        {!home && (
          <h1 className="text-center text-white fs-6 mb-2">
            <span className="fw-bold h1 text-white"> TOP</span> <br />{" "}
            CHALLENGERS
          </h1>
        )}
        <div className=" rounded-2 w-100 mx-auto bg-light ">
          <div className="table-responsive  vh-50 scroll">
            <Table className="bg-body">
              {users ? (
                <>
                  {" "}
                  <thead className="text-center ">
                    <tr className=" ">
                      {!home && (
                        <th className="py-3">
                          <span className="bg-black p-2 rounded-4 text-white">
                            Rank{" "}
                          </span>
                        </th>
                      )}
                      <th className="py-3">
                        <span className="bg-black p-2 rounded-4 text-white">
                          Challenger
                        </span>
                      </th>
                      {!home && (
                        <th className="py-3">
                          <span className="bg-black p-2 rounded-4 text-white">
                            BADGES
                          </span>
                        </th>
                      )}
                      <th className="py-3">
                        <span className="bg-black p-2 rounded-4 text-white">
                          Completed
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!home
                      ? users
                          .sort(
                            (a, b) =>
                              b.finishedChallenges.length -
                              a.finishedChallenges.length
                          )
                          .map((usr) => {
                            return (
                              <tr
                                key={usr.uid}
                                className="text-center fw-bold p-2 text-white"
                              >
                                {<td className="align-middle">{++rank}</td>}
                                <td className="text-start align-middle w-25">
                                  <div className="d-flex flex-column flex-md-row align-items-md-center">
                                    <div className="me-md-2 img-wrapper w-25">
                                      <img
                                        src={usr.photoUrl}
                                        alt={usr.name}
                                        className="rounded-circle w-100"
                                      />
                                    </div>
                                    <div>{usr.name}</div>
                                  </div>
                                </td>
                                {
                                  <td className="text-dark align-middle">
                                    {usr.userBadge && (
                                      <img
                                        className="custom-badge"
                                        src={usr.userBadge}
                                        alt="rank"
                                      />
                                    )}
                                  </td>
                                }
                                <td className="text-warning align-middle">
                                  {usr.finishedChallenges.length}
                                </td>
                              </tr>
                            );
                          })
                      : users
                          .slice(0, 3)
                          .sort(
                            (a, b) =>
                              b.finishedChallenges.length -
                              a.finishedChallenges.length
                          )
                          .map((usr) => {
                            return (
                              <tr
                                key={usr.uid}
                                className="text-center fw-bold p-2"
                              >
                                <td className="text-start align-middle ">
                                  <Link
                                    to={`/${usr.username}`}
                                    className="text-decoration-none text-white"
                                  >
                                    <div className="d-flex   align-items-md-center">
                                      <div className="me-md-1 img-wrapper w-25">
                                        <img
                                          src={usr.photoUrl}
                                          alt={usr.name}
                                          className="rounded-circle w-100"
                                        />
                                      </div>

                                      <div className="fs-6">
                                        {usr.name}{" "}
                                        {usr.userBadge && (
                                          <img
                                            className="custom-badge"
                                            src={usr.userBadge}
                                            alt="rank"
                                          />
                                        )}{" "}
                                      </div>
                                    </div>
                                  </Link>
                                </td>

                                <td className="text-warning align-middle">
                                  {usr.finishedChallenges.length}
                                </td>
                              </tr>
                            );
                          })}
                  </tbody>{" "}
                </>
              ) : (
                <ContentLoader
                  width={1000}
                  height={550}
                  viewBox="0 0 1000 550"
                  backgroundColor="#eaeced"
                  foregroundColor="#ffffff"
                >
                  <rect x="51" y="45" rx="3" ry="3" width="906" height="17" />
                  <circle cx="879" cy="123" r="11" />
                  <circle cx="914" cy="123" r="11" />
                  <rect x="104" y="115" rx="3" ry="3" width="141" height="15" />
                  <rect x="305" y="114" rx="3" ry="3" width="299" height="15" />
                  <rect x="661" y="114" rx="3" ry="3" width="141" height="15" />
                  <rect x="55" y="155" rx="3" ry="3" width="897" height="2" />
                  <circle cx="880" cy="184" r="11" />
                  <circle cx="915" cy="184" r="11" />
                  <rect x="105" y="176" rx="3" ry="3" width="141" height="15" />
                  <rect x="306" y="175" rx="3" ry="3" width="299" height="15" />
                  <rect x="662" y="175" rx="3" ry="3" width="141" height="15" />
                  <rect x="56" y="216" rx="3" ry="3" width="897" height="2" />
                  <circle cx="881" cy="242" r="11" />
                  <circle cx="916" cy="242" r="11" />
                  <rect x="106" y="234" rx="3" ry="3" width="141" height="15" />
                  <rect x="307" y="233" rx="3" ry="3" width="299" height="15" />
                  <rect x="663" y="233" rx="3" ry="3" width="141" height="15" />
                  <rect x="57" y="274" rx="3" ry="3" width="897" height="2" />
                  <circle cx="882" cy="303" r="11" />
                  <circle cx="917" cy="303" r="11" />
                  <rect x="107" y="295" rx="3" ry="3" width="141" height="15" />
                  <rect x="308" y="294" rx="3" ry="3" width="299" height="15" />
                  <rect x="664" y="294" rx="3" ry="3" width="141" height="15" />
                  <rect x="58" y="335" rx="3" ry="3" width="897" height="2" />
                  <circle cx="881" cy="363" r="11" />
                  <circle cx="916" cy="363" r="11" />
                  <rect x="106" y="355" rx="3" ry="3" width="141" height="15" />
                  <rect x="307" y="354" rx="3" ry="3" width="299" height="15" />
                  <rect x="663" y="354" rx="3" ry="3" width="141" height="15" />
                  <rect x="57" y="395" rx="3" ry="3" width="897" height="2" />
                  <circle cx="882" cy="424" r="11" />
                  <circle cx="917" cy="424" r="11" />
                  <rect x="107" y="416" rx="3" ry="3" width="141" height="15" />
                  <rect x="308" y="415" rx="3" ry="3" width="299" height="15" />
                  <rect x="664" y="415" rx="3" ry="3" width="141" height="15" />
                  <rect x="55" y="453" rx="3" ry="3" width="897" height="2" />
                  <rect x="51" y="49" rx="3" ry="3" width="2" height="465" />
                  <rect x="955" y="49" rx="3" ry="3" width="2" height="465" />
                  <circle cx="882" cy="484" r="11" />
                  <circle cx="917" cy="484" r="11" />
                  <rect x="107" y="476" rx="3" ry="3" width="141" height="15" />
                  <rect x="308" y="475" rx="3" ry="3" width="299" height="15" />
                  <rect x="664" y="475" rx="3" ry="3" width="141" height="15" />
                  <rect x="55" y="513" rx="3" ry="3" width="897" height="2" />
                  <rect x="52" y="80" rx="3" ry="3" width="906" height="17" />
                  <rect x="53" y="57" rx="3" ry="3" width="68" height="33" />
                  <rect x="222" y="54" rx="3" ry="3" width="149" height="33" />
                  <rect x="544" y="55" rx="3" ry="3" width="137" height="33" />
                  <rect x="782" y="56" rx="3" ry="3" width="72" height="33" />
                  <rect x="933" y="54" rx="3" ry="3" width="24" height="33" />
                </ContentLoader>
              )}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopChallengers;
