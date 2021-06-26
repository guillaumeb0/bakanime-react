import { useEffect, useState } from 'react'

import styled, { createGlobalStyle } from 'styled-components'
import axios from './utils/axios'
import { ThemeProvider } from 'styled-components'
import ReactModal from 'react-modal'
import ReactPlayer from 'react-player'

import theme from './App/theme'
import Header from './App/Header'
import HeroBanner from "./App/HeroBanner"
import Row from './App/Row';

const currentDayName = (() => new Date().toLocaleDateString('en-GB', {weekday: 'long'}))()

const fetchData = async (url, responseKey) => {
  try {
    const res = await axios.get(url)
    return res.data[responseKey].map((e, i) => ({id: i, ...e}))
  } catch (error) {
    return null
  }
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.background};
    ${props => props.isNoScroll && 'overflow-y: hidden;'}
  }
  
  #root {
    overflow-x: hidden;
  }
`

const FirstRow = styled(Row)`
  position: relative;
  margin-top: -7vw;
`

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [trailerUrl, setTrailerUrl] = useState(null)
  const [searchBarValue, setSearchBarValue] = useState('')

  const [todayAnimeReleasesItems, setTodayReleasesItems] = useState(null)
  const [airingAnimeItems, setAiringItems] = useState(null)
  const [topUpcomingAnimeItems, setTopUpcomingItems] = useState(null)
  const [topMangaItems, setTopMangaItems] = useState(null)

  const playTrailer = ({url}) => {
    setTrailerUrl(url)
    setIsModalOpen(true)
  }

  useEffect(() => {
    const fetchBuckets = async () => {
      setTodayReleasesItems(
        await fetchData(`https://api.jikan.moe/v3/schedule/${currentDayName}`, currentDayName.toLowerCase())
      )
      setAiringItems(await fetchData('https://api.jikan.moe/v3/top/anime/1/airing', 'top'))
      setTopUpcomingItems(await fetchData('https://api.jikan.moe/v3/top/anime/1/upcoming', 'top'))
      setTopMangaItems(await fetchData('https://api.jikan.moe/v3/top/manga', 'top'))
    }
    fetchBuckets()
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('no-scroll')
    }
  })

  const filterFn = items => {
    return searchBarValue
      ? items.filter(item => item.title.toLowerCase().startsWith(searchBarValue.toLowerCase())) : items
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle isNoScroll={isModalOpen} />
      <Header searchBarValue={searchBarValue} setSearchBarValue={(e) => setSearchBarValue(e.target.value)} />
      <HeroBanner playTrailer={playTrailer} />
      <FirstRow
        title="Today releases"
        items={todayAnimeReleasesItems && filterFn(todayAnimeReleasesItems)}
        playTrailer={playTrailer} />
      <Row
        title="Airing animes"
        items={airingAnimeItems && filterFn(airingAnimeItems)}
        playTrailer={playTrailer} />
      <Row
        title="Top upcoming"
        items={topUpcomingAnimeItems && filterFn(topUpcomingAnimeItems)}
        playTrailer={playTrailer} />
      <Row
        title="Top Manga"
        items={topMangaItems && filterFn(topMangaItems)}
        playTrailer={playTrailer} />
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
            backgroundColor: theme.background,
            transform: 'translate(-50%, -50%)'
          },
          overlay: {zIndex: 999}
        }}>
        <ReactPlayer url={trailerUrl} controls playing />
      </ReactModal>
    </ThemeProvider>
  )
}

export default App;
