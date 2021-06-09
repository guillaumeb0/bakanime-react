import styled from 'styled-components'

const Span = styled.span`
  display: inline-block;
  margin: 0 0.625rem;
`

const StyledA = styled.a`
  color: white;
`

const Item = ({href, children}) => (
  <Span><StyledA href={href}>{children}</StyledA></Span>
)

export default Item
