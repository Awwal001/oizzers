import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import { listCategories } from '../actions/categoryActions'

function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
  
    const categoryList = useSelector(state => state.categoryList)
    const {  categories } = categoryList

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listCategories());
      }, [dispatch]);

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar style={{ backgroundColor: '#040404'}} variant="dark" expand="sm" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand className='display-6 font-italic'>Oizzers</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <NavDropdown className='display-6 text-capitalize' title='Category' id='username'>
                                
                                {categories.map((cat) => (
                                    <LinkContainer key={cat.id}  to={`/category/${cat.id}`}>
                                        <NavDropdown.Item>{cat.name}</NavDropdown.Item>
                                    </LinkContainer>
                                ))}
                            </NavDropdown>

                            <LinkContainer to='/cart'>
                                <Nav.Link className='display-6 text-capitalize'><strong>Cart</strong><i className="fas fa-shopping-cart"></i></Nav.Link>
                            </LinkContainer>

                            {userInfo && userInfo.isAdmin && (
                                    <LinkContainer to='/admin/dashboard'>
                                        <Nav.Link className=' display-6 text-capitalize'>Admin <i className="fas fa-user-tag"></i></Nav.Link>
                                    </LinkContainer>
                            )}

                            {userInfo ? (
                                <NavDropdown className='display-6 text-lowercase' title={userInfo.email} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link className='display-6 text-lowercase'><i className="fas fa-user"></i>Login/register</Nav.Link>
                                    </LinkContainer>
                                )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
