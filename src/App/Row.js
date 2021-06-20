import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import CardLoader from './Row/CardLoader';
import AnimeCard from './Row/AnimeCard';
import MangaCard from './Row/MangaCard';
import { getInitialRanges, getNextRanges, getPreviousRanges } from '../utils/range';

const Section = styled.section`
  padding-bottom: 1%;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.7vw;
  color: white;
  padding: 0 2.5%
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

const Slider = styled.div`
  width: 100%;
  padding: 0 2.5%;
`

const SliderContent = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  overflow-x: visible;

  ${props => props.isScrolling && 'transition: transform .5s ease-out;'}
  ${props => props.translateX && `transform: translateX(${props.translateX});`}
`


const toAnimeCard = ({item, playTrailer, keySuffix}) => {
  return <AnimeCard
    data-id={item.id}
    // key={keySuffix ? item.id + '-' + keySuffix : item.id}
    key={Math.random()}
    malId={item.malId}
    title={item.title}
    type={item.type}
    imageUrl={item.imageUrl}
    startDate={item.startDate}
    playTrailer={playTrailer} />
}

const toMangaCard = ({item, keySuffix}) => (
  <MangaCard
    data-id={item.id}
    // key={keySuffix ? item.id + '-' + keySuffix : item.id}
    key={Math.random()}
    title={item.title}
    imageUrl={item.imageUrl}
    startDate={item.startDate} />
)

const getContentLoader = () => Array.from({length: 6}, (_, i) => <CardLoader key={i} />)

const Row = ({title, items, displayedCardCount, playTrailer, className}) => {
  const [neverScrolled, setNeverScrolled] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)
  const [sliderContentTranslateX, setSliderContentTranslateX] = useState('0px')
  const [currIndex, setCurrIndex] = useState(null)
  const [preloadedBeforeRange, setPreloadedBeforeRange] = useState(null)
  const [displayedRange, setDisplayedRange] = useState(null)
  const [preloadedAfterRange, setPreloadedAfterRange] = useState(null)

  const sliderContentRef = useRef(null)

  useEffect(() => {
    if (!items) return

    setCurrIndex(0)
    const {displayedRange, preloadedAfterRange} = getInitialRanges({
      start: 0,
      length: displayedCardCount,
      limit: items.length - 1
    })
    setDisplayedRange(displayedRange)
    setPreloadedAfterRange(preloadedAfterRange)
  }, [items, displayedCardCount])

  const navigateForward = () => {
    neverScrolled && setNeverScrolled(false)
    if (isScrolling) return
    setIsScrolling(true)

    const cardWidth = sliderContentRef.current.offsetWidth / displayedCardCount
    const cardOffset = cardWidth * (((preloadedBeforeRange && preloadedBeforeRange.length) || 0) + preloadedAfterRange.length)

    setSliderContentTranslateX(`-${cardOffset}px`)

    setTimeout(() => {
      const {futurePreloadedBeforeRange, futureDisplayedRange, futurePreloadedAfterRange} = getNextRanges({
        start: currIndex,
        length: displayedCardCount,
        limit: items.length - 1
      })
      setCurrIndex(futureDisplayedRange[0])
      setPreloadedBeforeRange(futurePreloadedBeforeRange)
      setDisplayedRange(futureDisplayedRange)
      setPreloadedAfterRange(futurePreloadedAfterRange)
      setIsScrolling(false)

      const cardOffset = cardWidth * futurePreloadedBeforeRange.length
      setSliderContentTranslateX(`-${cardOffset}px`)
    }, 600)
  }

  const navigateBackward = () => {
    if (isScrolling) return
    setIsScrolling(true)

    setSliderContentTranslateX(`0`)

    setTimeout(() => {
      const {previousRange, currentRange, nextRange} = getPreviousRanges({
        start: currIndex,
        length: displayedCardCount,
        limit: items.length - 1
      })
      setCurrIndex(currentRange[0])
      setPreloadedBeforeRange(previousRange)
      setDisplayedRange(currentRange)
      setPreloadedAfterRange(nextRange)

      const cardWidth = sliderContentRef.current.offsetWidth / displayedCardCount
      const cardOffset = cardWidth * previousRange.length
      setSliderContentTranslateX(`-${cardOffset}px`)

      setIsScrolling(false)
    }, 600)
  }

  let cards
  if (displayedRange) {
    let range
    if (preloadedBeforeRange) {
      range = preloadedBeforeRange.concat(displayedRange)
    } else {
      range = displayedRange
    }

    if (preloadedAfterRange) {
      range = range.concat(preloadedAfterRange)
    }

    cards = range.map(i => items[i]).map(item => toAnimeCard({item: item, playTrailer}))
  } else {
    cards = getContentLoader()
  }

  return (
    <Section className={className}>
      <Header>
        <Title>{title}</Title>
        {
          items && items.length > 6 &&
          <div>
            {!neverScrolled && <NavigationIcon as={NavigateBeforeIcon} onClick={navigateBackward} />}
            <NavigationIcon as={NavigateNextIcon} onClick={navigateForward} />
          </div>
        }
      </Header>
      <Slider>
        <SliderContent ref={sliderContentRef} isScrolling={isScrolling} translateX={sliderContentTranslateX}>
          {cards}
        </SliderContent>
      </Slider>
    </Section>
  )
}

export default Row
// 1 normal with buttons
// 2 normal with no buttons (not enough cards)
// 3 mobile with no buttons and normal scroll => load all cards into the dom right away
