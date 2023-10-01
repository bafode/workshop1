import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container} from 'react-bootstrap'
import { Card } from 'react-bootstrap'

const Header = () => {



  return (
    <header>
      <Navbar bg='info' variant='dark' expand='lg' collapseOnSelect>
        <Container>
        <LinkContainer to='/'>
                <Nav.Link>
                <Card.Img src="/images/image.png" style={{height:"30px"}} variant='top' />
                </Nav.Link>
         </LinkContainer>
          <LinkContainer to='/'>
            <Navbar.Brand>Events Management System</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
