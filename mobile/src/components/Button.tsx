//NATIVE BASE
import { Text, Button as Botão, IButtonProps } from 'native-base'

interface ButtonProps extends IButtonProps {
  title: string
  type?: 'primary' | 'secondary'
}

export function Button({ type = 'primary', ...props }: ButtonProps) {
  return (
    <Botão
      h={14} 
      width='full'
      rounded="sm"
      fontSize="md"
      bgColor={type === 'secondary' ? 'red.500' : 'yellow.500'}
      _pressed={{ bgColor: 'black' }}
      _loading={{
        _spinner: { color: 'black' }
      }}
      {...props}
    >
      <Text textTransform="uppercase" color={type === 'secondary' ? 'white' : 'black'}>
        {props.title}
      </Text>
    </Botão>
  )
}
