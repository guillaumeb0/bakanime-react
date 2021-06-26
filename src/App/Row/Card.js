import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: ${props => props.width};
  flex-shrink: 0;
  cursor: pointer;
  transition: transform .3s ease-out;

  &:hover, &:active {
    z-index: 2;
    transform: scale(1.1);
    transition-delay: .5s;
  }
`

const AspectRatioContainer = styled.div`
  padding-bottom: 142%;
`

const Card = ({children, width, ...restProps}) => (
  <Container width={width} {...restProps}>
    <AspectRatioContainer>
      {children}
    </AspectRatioContainer>
  </Container>
)

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  width: PropTypes.string.isRequired
}

export default Card
