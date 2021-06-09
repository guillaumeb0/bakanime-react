import styled from 'styled-components'

const StyledA = styled.a`
  text-decoration: none;

  .logo-left-part {
    color: rgb(85, 26, 139);
    font-family: 'Grandstander', cursive;
  }

  .logo-right-part {
    color: #2a603b;
    font-family: 'Grandstander', cursive;
  }
`

const Logo = () => (
  <StyledA href="/" className="logo">
    <span className="logo-left-part">BAK</span><span className="logo-right-part">ANIME</span>
  </StyledA>
)

export default Logo
