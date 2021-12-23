import { GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'
import { color as fontColor, ColorType } from '../../styles'

interface ButtonProps {
  color?: ColorType
  onPress: (event: GestureResponderEvent) => void
}

const Button: React.FC<ButtonProps> = ({ children, color, onPress }) => (
  <StyledButton {...{ color, onPress }}>
    <ButtonText>
      {children}
    </ButtonText>
  </StyledButton>
)

const StyledButton = styled.TouchableOpacity<Partial<ButtonProps>>`
  width: 100px;
  height: 50px;
  background: ${({ color }) => fontColor[color || 'cyan']};
  padding: 0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonText = styled.Text`
  color: ${fontColor.white};
`

export default Button
