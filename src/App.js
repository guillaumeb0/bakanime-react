import { useEffect, useState } from 'react';

import applyCaseMiddleware from 'axios-case-converter';
import axios from './utils/axios'
import { ThemeProvider } from 'styled-components'

import theme from './App/theme';
import Header from './App/Header';
import HeroBanner from "./App/HeroBanner";
import Slider from './App/Slider';

const currentDayName = (() => new Date().toLocaleDateString('en-GB', {weekday: 'long'}))()

const fetchData = async (url, responseKey) => {
  try {
    const res = await axios.get(url)
    return res.data[responseKey].map((e, i) => ({id: i, ...e}))
  } catch (error) {
    return null
  }
}

const calculateCurrentCardCount = () => {
  if (window.innerWidth < 294) {
    return 3
  } else if (window.innerWidth >= 294 && window.innerWidth < 628) {
    return 4
  } else if (window.innerWidth >= 628 && window.innerWidth < 888) {
    return 5
  } else {
    return 6
  }
}


const App = () => {
  const [todayReleasesItems, setTodayReleasesItems] = useState(null)
  const [airingItems, setAiringItems] = useState(null)
  const [topUpcomingItems, setTopUpcomingItems] = useState(null)
  const [topMangaItems, setTopMangaItems] = useState(null)

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

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <HeroBanner />
      <Slider title="Today releases" items={todayReleasesItems} />
      <Slider title="Airing animes" items={airingItems} />
      <Slider title="Top upcoming" items={topUpcomingItems} />
      <Slider title="Top Manga" items={topMangaItems} />
    </ThemeProvider>
  )
}

export default App;
