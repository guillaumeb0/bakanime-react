import styled from 'styled-components'

import Card from './Card';

const StyledCard = styled(Card)``

const Img = styled.img`
  position: absolute;
  width: 99%;
  height: 100%;
  border-radius: 2%;
`

const Description = styled.div`
  opacity: 0;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 99%;
  height: 100%;

  color: white;

  background-color: rgba(25, 25, 25, 0.8);
  backdrop-filter: blur(2px);
  border-radius: 2%;

  ${StyledCard}:hover &, ${StyledCard}:active & {
    opacity: 1;
    transition: opacity .3s .5s;
  }
`

const Title = styled.h3`
  text-align: center;
`

const Text = styled.div`
  color: grey;
  padding-bottom: 10px;
  text-align: center;
  align-self: end;
  grid-row: 3;
`

const MangaCard = ({title, imageUrl, startDate, ...restProps}) => (
  <>
    <StyledCard {...restProps}>
      <Img src={imageUrl} alt={`${title}_avatar`} />
      <Description>
        <Title>{title}</Title>
        <Text>
          <div>Manga</div>
          {startDate && <div>{startDate}</div>}
        </Text>
      </Description>
    </StyledCard>
  </>
)

export default MangaCard
