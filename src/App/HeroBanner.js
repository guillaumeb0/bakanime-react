import { useState } from "react"

import styled from 'styled-components'
import ReactPlayer from 'react-player'
import ReactModal from 'react-modal'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';


import kimetsuImg from '../img/kimetsu_hd.jpg'

const Section = styled.section`
  position: relative;
  background-image: linear-gradient(to right, ${props => props.theme.background}, transparent 33%),
  linear-gradient(to bottom right, transparent, transparent, ${props => props.theme.background} 95%);
`

const Img = styled.img`
  position: relative;
  display: block;
  width: 100%;
  z-index: -1;
`

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  margin-top: -5vw;
`

const H1 = styled.h1`
  font-size: 3.5vw;
  color: white;
  padding: 0 2.6vw;
`

const StyledPlayArrowIcon = styled(PlayArrowIcon)`
  margin-right: 0.2em;
  font-size: 1em;
`

const TrailerCTA = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: white;
  margin-left: 2.6vw;
  border-radius: 0.15em;
  padding: 0.3em 1.1em 0.3em 1em;
  cursor: pointer;
  font-size: 1.4vw;
  font-weight: bolder;

  &:hover {
    filter: opacity(0.8);
  }
`
const Span = styled.span`
  font-size: .9em;
`

const HeroBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Section>
      <Img src={kimetsuImg} alt="Demon slayer image" />
      <Content>
        <H1>
          Kimetsu no Yaiba
        </H1>

        <TrailerCTA>
          <StyledPlayArrowIcon />
          <Span onClick={() => setIsModalOpen(true)}>Play trailer</Span>
        </TrailerCTA>
      </Content>
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
            transform: 'translate(-50%, -50%)',
            zIndex: 9999
          }
        }}>
        <ReactPlayer url="https://www.youtube.com/embed/PrZ0O8Qp18s" controls playing />
      </ReactModal>
    </Section>
  )
}

export default HeroBanner
