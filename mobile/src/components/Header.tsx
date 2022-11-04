import { Center, Text } from 'native-base'


interface HeaderProps {
  title: string
  arrow?: boolean
}

export function Header({arrow=false, ...props}: HeaderProps) {
  return (
    <Center bgColor='gray.800'>
      <Text>
        {props.title}
      </Text>
    </Center>
  )
}
