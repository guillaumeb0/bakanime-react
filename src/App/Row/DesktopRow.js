import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import CardLoader from './CardLoader';
import AnimeCard from './AnimeCard';
import MangaCard from './MangaCard';
import { getInitialRanges, getNextRanges, getPreviousRanges } from '../../utils/range';

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
  overflow-y: visible;

  ${props => props.isScrolling && 'transition: transform .5s ease-out;'}
  ${props => props.translateX && `transform: translateX(${props.translateX});`}
`

const toCard = ({item, playTrailer, width}) => {
  return item.type === 'Manga' ? toMangaCard({item, width}) : toAnimeCard({
    item,
    playTrailer,
    width
  })
}

const toAnimeCard = ({item, playTrailer, width}) => {
  return <AnimeCard
    data-id={item.id}
    // Can't use id as key since the we can have an item preloaded before and after, but Math.random should be ok
    //  as we never do partial updates of items.
    key={Math.random()}
    malId={item.malId}
    title={item.title}
    type={item.type}
    imageUrl={item.imageUrl}
    startDate={item.startDate}
    playTrailer={playTrailer}
    width={width} />
}

const toMangaCard = ({item, width}) => (
  <MangaCard
    data-id={item.id}
    // Can't use id as key since the we can have an item preloaded before and after, but Math.random should be ok
    //  as we never do partial updates of items.
    key={Math.random()}
    title={item.title}
    imageUrl={item.imageUrl}
    startDate={item.startDate}
    width={width} />
)

const getContentLoader = ({length}) => Array.from({length: length}, (_, i) => <CardLoader key={i} />)

const DesktopRow = ({title, items, displayedCardCount, playTrailer}) => {
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
      items
    })

    setDisplayedRange(displayedRange)
    setPreloadedAfterRange(preloadedAfterRange)
  }, [items, displayedCardCount])

  const navigateForward = () => {
    neverScrolled && setNeverScrolled(false)
    if (isScrolling) return
    setIsScrolling(true)

    const cardOffset = `calc(-1 * calc(100% / ${displayedCardCount}) * ${(((preloadedBeforeRange && preloadedBeforeRange.length) || 0) + preloadedAfterRange.length)})`

    setSliderContentTranslateX(`${cardOffset}`)

    const updateSliderItems = (e) => {
      // Don't run this code if `transitionend` event comes from a child.
      if (e.target !== sliderContentRef.current) return

      const {futurePreloadedBeforeRange, futureDisplayedRange, futurePreloadedAfterRange} = getNextRanges({
        start: currIndex,
        length: displayedCardCount,
        limit: items.length - 1
      })
      setCurrIndex(futureDisplayedRange[0])
      setPreloadedBeforeRange(futurePreloadedBeforeRange)
      setDisplayedRange(futureDisplayedRange)
      setPreloadedAfterRange(futurePreloadedAfterRange)

      const cardOffset = `calc(-1 * calc(100% / ${displayedCardCount}) * ${futurePreloadedBeforeRange.length})`

      setSliderContentTranslateX(`${cardOffset}`)

      sliderContentRef.current.ontransitionend = null

      setIsScrolling(false)
    }

    sliderContentRef.current.ontransitionend = updateSliderItems
  }

  const navigateBackward = () => {
    if (isScrolling) return
    setIsScrolling(true)

    setSliderContentTranslateX(`0`)

    const updateSliderItems = (e) => {
      // Don't run this code if `transitionend` event comes from a child.
      if (e.target !== sliderContentRef.current) return

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
    }

    sliderContentRef.current.ontransitionend = updateSliderItems
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

    cards = range.map(i => items[i]).map(item => toCard({item, playTrailer, width: `calc(100% / ${displayedCardCount})`}))
  } else {
    cards = getContentLoader({length: displayedCardCount})
  }

  return (
    <>
      <Header>
        <Title>{title}</Title>
        {
          items && items.length > displayedCardCount &&
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
    </>
  )
}

export default DesktopRow
