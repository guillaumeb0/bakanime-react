import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: calc(100% / 6);
  flex-shrink: 0;
  cursor: pointer;
  transition: all .5s ease-out, transform .3s ease-out;

  &:hover, &:active {
    z-index: 2;
    transform: scale(1.1);
  }
`

const AspectRatioContainer = styled.div`
  padding-bottom: 142%;
`

const Card = ({children, className, onClick, ...restProps}) => (
  <Container className={className} onClick={onClick} {...restProps}>
    <AspectRatioContainer aspectRatio={50 / 71}>
      {children}
    </AspectRatioContainer>
  </Container>
)

export default Card
