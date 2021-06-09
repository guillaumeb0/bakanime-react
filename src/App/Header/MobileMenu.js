import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu';

const StyledMenuIcon = styled(MenuIcon)`
  color: white;
  font-size: 1.25rem;
`

//
// .menu-item {
//     margin: 5px 0;
//     color: white;
//   }

const MobileMenu = () => (
  <>
    {/*<span className="material-icons open-menu-cta">menu</span>*/}
    <StyledMenuIcon />
    <div className="menu">
      <div className="close-menu-cta">
        <span className="material-icons navigation-icon">close</span>
      </div>
      <hr />
      <div className="menu-item"><a href="">Home</a></div>
      <div className="menu-item">About</div>
    </div>
  </>
)

export default MobileMenu
