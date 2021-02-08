import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: COLORS.background
  },
  textLabel: {
    marginHorizontal: 30,
  },
  profilePic: {
    flex: 1,
    height: 280,
    width: 210,
    alignSelf: "center",
    marginTop: 30
  },
  addPicButton: {
    backgroundColor: 'grey',
    borderRadius: 50,
    width: 25,
    height: 25,
  },
  addPicButtonIcon: {
    position: "absolute",
    width: 25,
    height: 25,
    top: 0,
    left: 0
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