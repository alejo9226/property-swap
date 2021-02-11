import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: COLORS.background
  },
  textarea: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 68,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    padding: 10
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
  textLabel: {
    marginHorizontal: 30,
  },
  scrollView: {
   /*  width: '100%', */
   backgroundColor: 'white', 
   height: '50%',
   flexDirection: 'row',
   
   paddingVertical: 5,
  },
  views: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: 'grey',
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  addPic: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  button: {
    backgroundColor: COLORS.primary,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 70,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
})