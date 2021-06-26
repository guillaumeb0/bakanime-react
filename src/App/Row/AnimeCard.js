import { useState } from 'react';

import axios from '../../utils/axios';
import styled from 'styled-components'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

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

const StyledPlayCircleFilledIcon = styled(PlayCircleFilledIcon)`
  font-size: 44px;
`

const PlayCTAWrapper = styled.div`
  align-self: center;
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(211, 211, 211, 0.25);
  border-radius: 50%;
`

const Text = styled.div`
  color: grey;
  padding-bottom: 10px;
  text-align: center;
  align-self: end;
  grid-row: 3;
`

const fetchTrailerUrl = async ({malId}) => (await axios.get(`https://api.jikan.moe/v3/anime/${malId}`))
  .data
  .trailerUrl

const AnimeCard = ({malId, title, type, imageUrl, startDate, playTrailer, ...restProps}) => {
  const [trailerUrl, setTrailerUrl] = useState(null)
  const [trailerUrlExists, setTrailerUrlExists] = useState(null)

  const playTrailerIfExist = async () => {
    let newTrailerUrl
    if (trailerUrlExists === null) {
      newTrailerUrl = await fetchTrailerUrl({malId})
      if (newTrailerUrl) {
        setTrailerUrlExists(true)
        setTrailerUrl(newTrailerUrl)
      } else {
        setTrailerUrlExists(false)
      }
    }

    if (trailerUrl || newTrailerUrl) {
      playTrailer({url: trailerUrl || newTrailerUrl})
    }
  }

  return (
    <>
      <StyledCard onClick={playTrailerIfExist} {...restProps}>
        <Img src={imageUrl} alt={`${title}_avatar`} />
        <Description>
          <Title>{title}</Title>
          {
            (trailerUrlExists === null || trailerUrlExists) &&
            <PlayCTAWrapper>
              <StyledPlayCircleFilledIcon />
            </PlayCTAWrapper>
          }
          {
            trailerUrlExists === false && <span>No trailer available</span>
          }
          <Text>
            <div>{type}</div>
            {startDate && <div>{startDate}</div>}
          </Text>
        </Description>
      </StyledCard>
    </>
  )
}

export default AnimeCard
