import styled from 'styled-components/native'
import Button from './Button'

interface SelectorProps {
  onClick: (val: string) => void
}

const Selector: React.FC<SelectorProps> = ({ onClick }) => (
  <StyledSelector>
    <Button 
      onPress={() => onClick('Pomodoro')}
      color='purple'
    >
      Pomodoro
    </Button>
    <Button 
      onPress={() => onClick('Short Break')}
      color='purple'
    >
      Short Break
    </Button>
    <Button 
      onPress={() => onClick('Long Break')}
      color='purple'
    >
      Long Break
    </Button>
  </StyledSelector>
)

const StyledSelector = styled.View`
  width: 90%;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

export default Selector
