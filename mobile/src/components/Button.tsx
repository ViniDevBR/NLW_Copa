//NATIVE BASE
import { Text, Button, IButtonProps } from 'native-base'

interface ButtonProps extends IButtonProps {
  title: string
  type?: 'primary' | 'secondary'
}

export function Buttons({ type = 'primary', ...props }: ButtonProps) {
  return (
    <Button
      h={14} 
      width='xs'
      marginTop={50}
      marginBottom={5}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bgColor={type === 'secondary' ? 'red.500' : 'yellow.500'}
      _pressed={{ bgColor: 'black' }}
      _loading={{
        _spinner: { color: 'black' }
      }}
      {...props}
    >
      <Text color={type === 'secondary' ? 'white' : 'black'}>
        {props.title}
      </Text>
    </Button>
  )
}
