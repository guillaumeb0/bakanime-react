import { useMediaQuery } from 'react-responsive'

const MediaQueryWrapper = ({children}) => {
  const isVerySmallScreen = useMediaQuery({maxWidth: 379})
  const isSmallScreen = useMediaQuery({minWidth: 380, maxWidth: 627})
  const isMediumScreen = useMediaQuery({minWidth: 628, maxWidth: 719})
  const isLargeScreen = useMediaQuery({minWidth: 720, maxWidth: 887})
  const isVeryLargeScreen = useMediaQuery({minWidth: 888})

  return (children({isVerySmallScreen, isSmallScreen, isMediumScreen, isLargeScreen, isVeryLargeScreen}))
}

export default MediaQueryWrapper
