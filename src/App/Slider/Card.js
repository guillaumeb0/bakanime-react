import ReactModal from 'react-modal'
import ReactPlayer from 'react-player'
import styled from 'styled-components'

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { useState } from 'react';
import axios from '../../utils/axios';

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

const Img = styled.img`
  position: absolute;
  width: 99%;
  height: 100%;
  border-radius: 2%;
`

const Description = styled.div`
  display: none;
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

  ${Container}:hover &, ${Container}:active & {
    display: grid;
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

const Card = ({id, malId, title, type, imageUrl, startDate}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [trailerUrl, setTrailerUrl] = useState(null)
  const [trailerUrlExists, setTrailerUrlExists] = useState(null)

  const fetchTrailerUrl = async ({malId}) => (await axios.get(`https://api.jikan.moe/v3/anime/${malId}`)).data.trailerUrl

  const loadTrailerIfExist = async () => {
    if (type === 'Manga') return false

    let trailerUrl
    if (trailerUrlExists === null) {
      trailerUrl = await fetchTrailerUrl({malId})
      if (trailerUrl) {
        setTrailerUrlExists(true)
        setTrailerUrl(trailerUrl)
      } else {
        setTrailerUrlExists(false)
      }
    }

    if (trailerUrlExists === true || trailerUrl) {
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <Container data-id={id} data-mal-id={malId} onClick={loadTrailerIfExist}>
        <AspectRatioContainer>
          <Img src={imageUrl} alt={`${title}_avatar`} />
          <Description>
            <Title>{title}</Title>
            {
              type !== 'Manga' && (trailerUrlExists === null || trailerUrlExists) &&
              <PlayCTAWrapper>
                <StyledPlayCircleFilledIcon />
              </PlayCTAWrapper>
            }
            {
              type !== 'Manga' && trailerUrlExists === false && <span>No trailer available</span>
            }
            <Text>
              <div>{type}</div>
              {startDate && <div>{startDate}</div>}
            </Text>
          </Description>
        </AspectRatioContainer>
      </Container>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            width: 'fit-content',
            height: 'fit-content',
            padding: 0,
            border: 0,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }
        }}>
        <ReactPlayer url={trailerUrl} controls playing />
      </ReactModal>
    </>
  )
}

export default Card
