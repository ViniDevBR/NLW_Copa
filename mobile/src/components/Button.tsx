import { Text, Button as Botão, IButtonProps } from 'native-base'

interface ButtonProps extends IButtonProps {
  title: string
  type?: 'primary' | 'secondary'
}

export function Button({ type = 'primary', ...props }: ButtonProps) {
  return (
    <Botão
      h={14}
      w='FULL'
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
    </Botão>
  )
}
