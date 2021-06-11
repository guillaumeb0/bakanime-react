import ReactDOM from 'react-dom';
import styled from 'styled-components';

import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import {useState} from "react";

const StyledMenuIcon = styled(MenuIcon)`
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
`

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
`

const MenuLink = styled.div`
  margin: 5px 0;
  color: white;
`

const Menu = styled.div`
  width: 50%;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;

  background-color: #202020;

  text-align: center;
`

const CloseIconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 48px;
  margin-right: 2.6vw;
  color: white;
`

const MobileMenu = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const openMenu = () => {
    setIsMenuOpened(true)
  }

  const closeMenu = () => {
    setIsMenuOpened(false)
  }

  return (
    <>
      <StyledMenuIcon onClick={openMenu}/>

      {isMenuOpened && ReactDOM.createPortal(
        <Menu>
          <CloseIconWrapper>
            <StyledCloseIcon onClick={closeMenu}/>
          </CloseIconWrapper>
          <hr/>
          <div><MenuLink href="/">Home</MenuLink></div>
          <div><MenuLink href="/about">About</MenuLink></div>
        </Menu>
        , document.querySelector('#mobile-menu'))}
    </>
  )
}

export default MobileMenu
