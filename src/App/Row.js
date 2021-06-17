import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import CardLoader from './Slider/CardLoader';
import AnimeCard from './Slider/AnimeCard';
import MangaCard from './Slider/MangaCard';
import { getRangeForDisplay, getRangeForPreload } from '../utils/range';

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
  transition: transform .5s ease-out;

  ${props => props.translateX && `transform: translateX(${props.translateX});`} // ${props => !props.neverScrolled && props.withInfiniteScroll && 'transform: translateX(-100%);'}
          // &:before {
          //   content: '';
          //   width: 2.7vw;
                  //   background-color: ${props => props.theme.background};
          //   height: 100%;
          //   position: absolute;
          //   z-index: 1;
          //   transform: translateX(92vw);
          // }
          //
          // &:after {
          //   content: '';
          //   width: 2.8vw;
                  //   background-color: ${props => props.theme.background};
          //   height: 100%;
          //   position: absolute;
          //   right: 0;
          //   transform: translateX(97.5vw);
          // }
          //width: 95%;
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

const getRange = ({start, length, limit}) => {
  const rangeForDisplay = getRangeForDisplay({start, length, limit})
  const rangeForDisplayEnd = rangeForDisplay[rangeForDisplay.length - 1]
  const rangeForPreload = getRangeForPreload({start: rangeForDisplayEnd + 1, length, limit})
  return rangeForDisplay.concat(rangeForPreload)
}

const getRange2 = ({start, length, limit}) => {
  const currDisplayedRange = getRangeForDisplay({start, length, limit})
  const currDisplayedRangeEnd = currDisplayedRange[currDisplayedRange.length - 1]

  let nextDisplayedRange
  if (currDisplayedRangeEnd === limit) {
    nextDisplayedRange = getRangeForDisplay({start: 0, length, limit})
  } else {
    nextDisplayedRange = getRangeForDisplay({start: currDisplayedRangeEnd + 1, length, limit})
  }
  const nextDisplayedRangeEnd = nextDisplayedRange[nextDisplayedRange.length - 1]

  let nextPreloadedRange
  if (nextDisplayedRangeEnd === limit) {
    nextPreloadedRange = getRangeForPreload({start: 0, length, limit})
  } else {
    nextPreloadedRange = getRangeForPreload({start: nextDisplayedRangeEnd + 1, length, limit})
  }
  return nextDisplayedRange.concat(nextPreloadedRange)
}

const Row = ({title, items, displayedCardCount, playTrailer, className}) => {
  // const [neverScrolled, setNeverScrolled] = useState(true)
  // const [currentFirstDisplayedCard, setCurrentFirstDisplayedCard] = useState(0)
  // const [currPage, setCurrPage] = useState(0)
  // const [isScrolling, setIsScrolling] = useState(false)
  // const [listTranslateX, setListTranslateX] = useState(null)
  const [currIndex, setCurrIndex] = useState(null)
  const [_items, _setItems] = useState(null)
  // const [nextRange, setNextRange] = useState(null)

  const sliderContentRef = useRef(null)

  useEffect(() => {
    if (!items) return

    setCurrIndex(0)
    _setItems(getRange({start: 0, length: displayedCardCount, limit: items.length - 1}).map(i => items[i]))
  }, [items])

  let cards
  if (_items) {
    cards = _items.map(item => toAnimeCard({item: item, playTrailer}))
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
            <NavigationIcon as={NavigateBeforeIcon} onClick={() => console.log('back')} />
            <NavigationIcon as={NavigateNextIcon} onClick={() => {


              const nextRange = getRange2({start: currIndex, length: displayedCardCount, limit: items.length - 1})
              setCurrIndex(nextRange[0])
              _setItems(nextRange.map(i => items[i]))

              // const currRange = getRange({start: currIndex, length: displayedCardCount, limit: items.length - 1})
              // const currRangeEnd = currRange[currRange.length - 1]
              //
              // let nextRange
              // if (currRangeEnd === items.length - 1) {
              //   nextRange = getRange({start: 0, length: displayedCardCount, limit: items.length - 1})
              // } else {
              //   nextRange = getRange({
              //     start: currRangeEnd + 1,
              //     length: displayedCardCount,
              //     limit: items.length - 1
              //   })
              // }
              //
              // const nextRangeEnd = nextRange[nextRange.length - 1]
              //
              // let nextNextRange
              // if (nextRangeEnd === items.length - 1) {
              //   nextNextRange = getRange({start: 0, length: displayedCardCount, limit: items.length - 1})
              // } else {
              //   nextNextRange = getRange({
              //     start: nextRangeEnd + 1,
              //     length: displayedCardCount,
              //     limit: items.length - 1
              //   })
              // }
              //
              // setCurrIndex(nextRange[0])
              // console.log('nextRange', nextRange)
              // console.log('nextNextRange', nextNextRange)

              // const nextRange = getRange({
              //   start: currRange.end + 1,
              //   length: displayedCardCount,
              //   limit: items.length - 1
              // })
              // let nextNextRange
              // if (nextRange.start === items.length - displayedCardCount && nextRange.end === items.length - 1) {
              //   nextNextRange = getRange({start: 0, length: displayedCardCount, limit: items.length - 1})
              // } else {
              //   nextNextRange = getRange({
              //     start: nextRange.end + 1,
              //     length: displayedCardCount,
              //     limit: items.length - 1
              //   })
              // }

            }} />
          </div>
        }
      </Header>
      <Slider>
        <SliderContent ref={sliderContentRef}>
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
