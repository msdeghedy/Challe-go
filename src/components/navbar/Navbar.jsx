import React, { useContext, useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/Logo2.png";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { BiCategoryAlt, BiLogOut } from "react-icons/bi";
import { currentContext } from "../../context/CurrentUser";
import "./Navbar.scss";
import { FirebaseContext } from "../../context/FirebaseContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { IoMdNotificationsOutline } from "react-icons/io";
import Notification from "../notification/Notification";
import { OpenAuthContext } from "../../context/OpenAuthContext";
import { DarkLightContext } from "../../context/DarkLightContext";

const Header = () => {
  const { authOpened, setAuthOpened } = useContext(OpenAuthContext);
  const { userData, currentUser, userLoading } = useContext(currentContext);
  const { changeMode, setChangeMode } = useContext(DarkLightContext);

  const { auth, users } = useContext(FirebaseContext);
  const [requestedUsers, setRequestedUsers] = useState([]);
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [opened, Setopened] = useState(false);
  const [mobNav, setMobNav] = useState(false);

  const handleChange = () => {
    setChangeMode((prev) => !prev);
  };
  const openAuth = () => {
    navigate("/");
    setAuthOpened(true);
  };
  useEffect(() => {
    if (userData) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [userData]);
  const handleSignOut = () => {
    auth.signOut();
    navigate("/");
  };
  const handleMobileNav = () => {
    setMobNav((prev) => !prev);
  };
  useEffect(() => {
    if (currentUser?.length !== 0 && userData) {
      const recived = users?.filter((user) => {
        return currentUser[0].receivedRequests.includes(user.uid);
      });
      setRequestedUsers(recived);
      Setopened(false);
    }
  }, [currentUser]);

  return (
    <section className={`nav  ${changeMode ? "bg-white" : "bg-body"}`}>
      <div className="container ">
        <header className="d-flex align-items-center justify-content-between w-100 h-100  ">
          <div className="brand">
            <Link to={`${logged ? "/home" : "/"}`}>
              <img src={logo} alt="" />
            </Link>
          </div>

          <nav>
            <div className="nav-mobile ">
              <div
                id="nav-toggle"
                onClick={handleMobileNav}
                className={mobNav ? "active" : undefined}
              >
                <span></span>
              </div>
            </div>

            {logged && !userLoading ? (
              <ul
                className={`nav-list list-unstyled  d-flex  d-flex gap-4 align-items-center justify-content-center  ${
                  mobNav && "show"
                }`}
              >
                <li>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      onChange={handleChange}
                      value={changeMode}
                      fill="red"
                    />
                  </Form>
                </li>
                <li className="link ">
                  <NavLink to="/home" className={changeMode && "text-muted"}>
                    <FaHome className="me-2" />
                    Home
                  </NavLink>
                </li>
                <li className="link">
                  <NavLink
                    to="/categories"
                    className={changeMode && "text-muted"}
                  >
                    <BiCategoryAlt className="me-2" />
                    Categories
                  </NavLink>
                </li>
                <li className="link">
                  <NavLink
                    to="/messages"
                    className={changeMode && "text-muted"}
                  >
                    <BsFillChatLeftTextFill className="me-2" />
                    Messages
                  </NavLink>
                </li>

                <li className="notification position-relative">
                  <span className="fs-6  position-absolute bill-wrapper">
                    {requestedUsers && currentUser && requestedUsers.length ? (
                      <div className="bill"></div>
                    ) : (
                      ""
                    )}
                  </span>
                  <Dropdown>
                    <Dropdown.Toggle variant="tranparent" id="notification">
                      <IoMdNotificationsOutline className="position-relative fs-5" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      align="end"
                      className={`dropdown-notification   border border-primary ${
                        changeMode ? "bg-white" : "bg-body"
                      }`}
                    >
                      {requestedUsers.length > 0 ? (
                        <>
                          {requestedUsers?.map((user) => {
                            return (
                              <Dropdown.Item
                                className={`noti-item ${
                                  changeMode && "text-muted"
                                }`}
                                key={user.uid}
                              >
                                <Notification
                                  name={user.name}
                                  photoURL={user.photoUrl}
                                  uid={user.uid}
                                />
                              </Dropdown.Item>
                            );
                          })}
                        </>
                      ) : (
                        <h6
                          className={`text-center ${
                            changeMode && "text-muted"
                          }`}
                        >
                          No Notifications
                        </h6>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="transparent"
                      id="dropdown-basic"
                      className="border-0"
                    >
                      <img
                        className="rounded-circle"
                        src={currentUser[0]?.photoUrl}
                        alt="user"
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className={`border border-primary ${
                        changeMode ? "bg-white" : "bg-body"
                      }`}
                    >
                      <Dropdown.Item
                        as={Link}
                        to="/profile"
                        className={`d-flex align-items-center justify-content-around ${
                          changeMode && "text-muted"
                        }`}
                      >
                        <span>
                          Profile <FaUserAlt />
                        </span>
                      </Dropdown.Item>

                      <Dropdown.Item
                        onClick={handleSignOut}
                        className={`d-flex align-items-center justify-content-around ${
                          changeMode && "text-muted"
                        }`}
                      >
                        <span>
                          Logout <BiLogOut />
                        </span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            ) : (
              <ul
                className={`nav-list list-unstyled  d-flex  d-flex gap-4 align-items-center justify-content-center ${
                  mobNav && "show"
                }`}
              >
                <li>
                  {" "}
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      onChange={handleChange}
                      value={changeMode}
                    />
                  </Form>
                </li>
                <li className="link">
                  <NavLink className={changeMode && "text-muted"} to="/about">
                    Why Challe.go
                  </NavLink>
                </li>
                <li>
                  <Button onClick={openAuth} variant="outline-primary">
                    Get Started
                  </Button>
                </li>
              </ul>
            )}
          </nav>
        </header>
      </div>
    </section>
  );
};

export default Header;
