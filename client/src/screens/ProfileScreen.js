import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from "../layout/MetaData";
import "./Assets/css/Profile.css";
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen({ history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success || userInfo.id !== user.id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
        console.log(user)
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user.id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }

    }
    return (
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title={`${user.name}'s Profile`} />
              <div className="profileContainer">
                <div>
                <h2 className="Heading">My Profile</h2>
                  
                  {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                </Button>

                </Form>
                </div>
                <div>
                  <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <h4>Joined On</h4>
                    <p>{String(user.date_joined).substr(0, 10)}</p>
                  </div>
    
                  <div>
                    <Link to="/myorders">My Orders</Link>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      );
}

export default ProfileScreen