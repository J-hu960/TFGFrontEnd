import React from 'react'
import { Text } from 'react-native'
import { Button } from 'react-native-elements'

const Home = ({navigation}) => {
  return (
    <Button onPress={()=>navigation.navigate('Auth')} title={'Back to login'}></Button >
  )
}

export default Home