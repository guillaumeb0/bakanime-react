import styled from 'styled-components'
import ContentLoader from "react-content-loader"



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

const StyledContentLoader = styled(ContentLoader)`
  position: absolute;
  width: 99%;
  height: 100%;
  border-radius: 2%;
`


const Card = (props) => {

  return (
    <>
      <Container>
        <AspectRatioContainer>
          <StyledContentLoader
            speed={2}
            backgroundColor="#303030"
            foregroundColor="#ecebeb"
            {...props}
          >
            <rect x="0" y="0" rx="2" ry="2" width="100%" height="100%" />
          </StyledContentLoader>

        </AspectRatioContainer>
      </Container>
    </>
  )
}

export default Card
