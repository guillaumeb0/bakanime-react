import styled from 'styled-components'

import CardLoader from './CardLoader';
import AnimeCard from './AnimeCard';
import MangaCard from './MangaCard';

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

const Slider = styled.div`
  width: 100%;
  padding: 0 2.5%;
`

const SliderContent = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`

const toCard = ({item, playTrailer, width}) => (item.type === 'Manga' ? toMangaCard({item, width}) : toAnimeCard({item, playTrailer, width}))

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

const NonDesktopRow = ({title, items, displayedCardCount, playTrailer}) => {
  let cards
  if (items) {
    cards = items.map(item => toCard({item, playTrailer, width: `calc(100% / ${displayedCardCount})`}))
  } else {
    cards = getContentLoader({length: displayedCardCount})
  }

  return (
    <>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Slider>
        <SliderContent>
          {cards}
        </SliderContent>
      </Slider>
    </>
  )
}

export default NonDesktopRow
