import { Center, Text } from 'native-base'


interface HeaderProps {
  title: string
  arrow?: boolean
}

export function Header({arrow=false, ...props}: HeaderProps) {
  return (
    <Center 
      
      width='full'
      paddingY={35}
      bgColor='gray.800'
      {...props}
    >
      <Text color='white' fontSize={16}>
        {props.title}
      </Text>
    </Center>
  )
}
