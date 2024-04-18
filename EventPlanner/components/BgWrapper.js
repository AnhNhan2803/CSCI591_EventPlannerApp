import { ImageBackground } from 'react-native'

export default BgWrapper = ({ children }) => {
  return (
    <ImageBackground
      source={require('../assets/low-poly-bg.png')}
      style={{ flex: 1 }}
    >
      {children}
    </ImageBackground>
  )
}

