import styled from 'styled-components'

import SearchIcon from '@material-ui/icons/Search';

const Wrapper = styled.div`
  width: 100%;
`

const Bar = styled.div`
  display: flex;
  width: 70%;
  max-width: 254px;
  margin-left: auto;
  margin-right: auto;
  background-color: #202020;
  border-radius: 12px;

  &:focus-within {
    border: 1px solid #2a603b;
  }
`

const Input = styled.input`
  margin: 5px;
  width: 100%;
  color: white;
  font-size: 10px;
  outline: none;
  border: none;
  background-color: #202020;
`

const StyledSearchIcon = styled(SearchIcon)`
  font-size: 15px;
  color: rgb(117, 117, 117);
  align-self: center;
  margin-right: 0.375em;
`

const SearchBar = ({value, setValue}) => (
  <Wrapper>
    <Bar>
      <Input type="text" placeholder="Filter animes..." value={value} onChange={setValue}/>
      <StyledSearchIcon />
    </Bar>
  </Wrapper>
)

export default SearchBar
