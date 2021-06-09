import styled from 'styled-components'

import MediaQueryWrapper from './common/MediaQueries';

import Logo from './Header/Logo';
import Item from './Header/Item';
import SearchBar from './Header/SearchBar';
import MobileMenu from './Header/MobileMenu';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 2.6vw;

  position: sticky;
  top: 0;
  z-index: 555;
  background-color: black;
`

const HeaderItems = styled.div`
  white-space: nowrap;
  margin-left: 1.75rem;
  font-size: 12px;
`

const Header = () => {
  return <MediaQueryWrapper>
    {({isVerySmallScreen}) =>
      <StyledHeader>
        <Logo />
        {
          !isVerySmallScreen &&
          <HeaderItems>
            <Item href="/">Home</Item>
            <Item href="/about">About</Item>
          </HeaderItems>
        }

        <SearchBar />

        <MobileMenu />
      </StyledHeader>}
  </MediaQueryWrapper>
}

export default Header
