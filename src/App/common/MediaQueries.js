import { useMediaQuery } from 'react-responsive'

export const VerySmallScreen = ({children}) => {
  const isVerySmallScreen = useMediaQuery({maxWidth: 379})
  return isVerySmallScreen && children
}

export const SmallScreen = ({children}) => {
  const isSmallScreen = useMediaQuery({minWidth: 380, maxWidth: 627})
  return isSmallScreen && children
}

export const MediumScreen = ({children}) => {
  const isMediumScreen = useMediaQuery({minWidth: 628, maxWidth: 719})
  return isMediumScreen && children
}

export const LargeScreen = ({children}) => {
  const isLargeScreen = useMediaQuery({minWidth: 720, maxWidth: 887})
  return isLargeScreen && children
}

export const VeryLargeScreen = ({children}) => {
  const isVeryLargeScreen = useMediaQuery({minWidth: 888})
  return isVeryLargeScreen && children
}

const MediaQueryWrapper = ({children, handleMediaQueryChange}) => {
  const isVerySmallScreen = useMediaQuery({maxWidth: 379}, undefined, handleMediaQueryChange)
  const isSmallScreen     = useMediaQuery({minWidth: 380, maxWidth: 627}, undefined, handleMediaQueryChange)
  const isMediumScreen    = useMediaQuery({minWidth: 628, maxWidth: 719}, undefined, handleMediaQueryChange)
  const isLargeScreen     = useMediaQuery({minWidth: 720, maxWidth: 887}, undefined, handleMediaQueryChange)
  const isVeryLargeScreen = useMediaQuery({minWidth: 888}, undefined, handleMediaQueryChange)

  return (children({isVerySmallScreen, isSmallScreen, isMediumScreen, isLargeScreen, isVeryLargeScreen}))
}

export default MediaQueryWrapper
