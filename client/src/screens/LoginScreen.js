import React, { Fragment, useRef, useState, useEffect } from "react";
import "./Assets/css/LoginSignUp.css";
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from '../actions/userActions'


function LoginScreen({ location, history }) {
    const dispatch = useDispatch();
    
    
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    // const userRegister = useSelector(state => state.userRegister)
    // const { error, loading, userInfo } = userRegister

    const registerSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }

    }

    const switchTabs = (e, tab) => {
        if (tab === "login") {
          switcherTab.current.classList.add("shiftToNeutral");
          switcherTab.current.classList.remove("shiftToRight");
    
          registerTab.current.classList.remove("shiftToNeutralForm");
          loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
          switcherTab.current.classList.add("shiftToRight");
          switcherTab.current.classList.remove("shiftToNeutral");
    
          registerTab.current.classList.add("shiftToNeutralForm");
          loginTab.current.classList.add("shiftToLeft");
        }
    };

    return (
        <Fragment>
          {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                      <Fragment>
                        <div className="LoginSignUpContainer">
                          <div className="LoginSignUpBox">
                            <div>
                              <div className="login_signUp_toggle">
                                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                              </div>
                              <button ref={switcherTab}></button>
                            </div>
                            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                              <div className="loginEmail">
                                <MailOutlineIcon />
                                <input
                                  type="email"
                                  placeholder="Email"
                                  required
                                  value={loginEmail}
                                  onChange={(e) => setLoginEmail(e.target.value)}
                                />
                              </div>
                              <div className="loginPassword">
                                <LockOpenIcon />
                                <input
                                  type="password"
                                  placeholder="Password"
                                  required
                                  value={loginPassword}
                                  onChange={(e) => setLoginPassword(e.target.value)}
                                />
                              </div>
                              <Link to="/password/forgot">Forget Password ?</Link>
                              <input type="submit" value="Login" className="loginBtn" />
                            </form>
                            <form
                              className="signUpForm"
                              ref={registerTab}
                              encType="multipart/form-data"
                              onSubmit={registerSubmit}
                            >
                              <div className="signUpName">
                                <FaceIcon />
                                <input
                                  type="text"
                                  placeholder="Name"
                                  required
                                  name="name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                              <div className="signUpEmail">
                                <MailOutlineIcon />
                                <input
                                  type="email"
                                  placeholder="Email"
                                  required
                                  name="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                              <div className="signUpPassword">
                                <LockOpenIcon />
                                <input
                                  type="password"
                                  placeholder="Password"
                                  required
                                  name="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </div>
              
                              <div className="signUpPassword">
                                <LockOpenIcon />
                                <input
                                  type="password"
                                  placeholder="Confirm password"
                                  required
                                  name="confirmPassword"
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                              </div>

                              <input type="submit" value="Register" className="signUpBtn" />
                            </form>
                          </div>
                        </div>
                      </Fragment>
                      )
          }
        </Fragment>
    );
}

export default LoginScreen
