import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Container} from 'react-bootstrap'

const Header = () => {



  return (
    <header>
      <Navbar bg='info' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>BEGOOD Events</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
