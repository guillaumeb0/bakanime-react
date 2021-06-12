import styled from 'styled-components'

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import Card from './Slider/Card';

const Section = styled.section`
  padding: 0 2.6% 1%;
  background-color: ${props => props.theme.background};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.7vw;
  color: white;
`

const Title = styled.h2`
  font-size: 1em;
`

const NavigationIcon = styled.span`
  border: 1px solid white;
  border-radius: 50%;
  margin: 0 0.1em;
  cursor: pointer;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

  && {
    font-size: 1em;
  }

  &:hover, &:active {
    color: black;
    background-color: white;
  }
`

const List = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  overflow-x: visible;

  &:before {
    content: '';
    width: 2.7vw;
    background-color: ${props => props.theme.background};
    height: 100%;
    position: absolute;
    z-index: 1;
    transform: translateX(92vw);
  }

  &:after {
    content: '';
    width: 2.8vw;
    background-color: ${props => props.theme.background};
    height: 100%;
    position: absolute;
    right: 0;
    transform: translateX(97.5vw);
  }
`
//
// &.today-releases {
//     margin-top: -7vw;
//   }
// }


const Slider = ({title, items}) => {
  return (
    <Section>
      <Header>
        <Title>{title}</Title>
        <div>
          <NavigationIcon as={NavigateBeforeIcon} />
          <NavigationIcon as={NavigateNextIcon} />
        </div>
      </Header>
      <List>
        {items && items.map(item => (
          <Card
            key={item.id}
            id={item.id}
            malId={item.malId}
            title={item.title}
            type={item.type}
            imageUrl={item.imageUrl}
            startDate={item.startDate} />
        ))}
      </List>
      {/*<div className="list negative-translate-x-100">*/}
      {/*</div>*/}
    </Section>
  )
}

export default Slider
