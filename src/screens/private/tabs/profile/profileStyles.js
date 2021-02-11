import { StyleSheet } from 'react-native'
import { COLORS } from '../../../../constants/theme'

export default StyleSheet.create({
  containerOuter: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 15,
    paddingTop: 10,
    backgroundColor: COLORS.background,
    
  },
  containerInner: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 15,
    paddingTop: 20,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    borderRadius: 50,
  },
  profilePic: {
    height: 280,
    width: 280,
    borderRadius: 40,
    alignSelf: "center",
    marginTop: 30,
  },
  addPicView: {
    backgroundColor: 'white',
    opacity: 0.8,
    borderRadius: 50,
    padding: 10,
    width: 30,
    height: 30,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '85%',
    left: '55%'
  },
  addPicButton: {
    
    
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
  },
  addPicButtonIcon: {
    width: 18,
    height: 18,
  },
  addPropertyicButtonIcon: {
    width: 16,
    height: 16,
  },
  textLabel: {
    marginHorizontal: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  },
  propertyInput: {
    width: '70%',
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 60,
    paddingLeft: 16
  },
})