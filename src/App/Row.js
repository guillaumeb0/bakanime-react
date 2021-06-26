import { isDesktop } from 'react-device-detect'

import DesktopRow from './Row/DesktopRow'
import NonDesktopRow from './Row/NonDesktopRow'
import {
  LargeScreen,
  MediumScreen,
  SmallScreen,
  VeryLargeScreen,
  VerySmallScreen
} from './common/MediaQueries'
import styled from 'styled-components'

const Section = styled.section`
  padding-bottom: 1%;
`

const Row = ({className, ...restProps}) => (
  <Section className={className}>
    <VerySmallScreen>
      {isDesktop
        ? <DesktopRow displayedCardCount={5} {...restProps} />
        : <NonDesktopRow displayedCardCount={5} {...restProps} />}
    </VerySmallScreen>
    <SmallScreen>
      {isDesktop
        ? <DesktopRow displayedCardCount={5} {...restProps} />
        : <NonDesktopRow displayedCardCount={5} {...restProps} />}
    </SmallScreen>
    <MediumScreen>
      {isDesktop
        ? <DesktopRow displayedCardCount={5} {...restProps} />
        : <NonDesktopRow displayedCardCount={5} {...restProps} />}
    </MediumScreen>
    <LargeScreen>
      {isDesktop
        ? <DesktopRow displayedCardCount={5} {...restProps} />
        : <NonDesktopRow displayedCardCount={5} {...restProps} />}
    </LargeScreen>
    <VeryLargeScreen>
      {isDesktop
        ? <DesktopRow displayedCardCount={6} {...restProps} />
        : <NonDesktopRow displayedCardCount={6} {...restProps} />}
    </VeryLargeScreen>
  </Section>
)

export default Row
