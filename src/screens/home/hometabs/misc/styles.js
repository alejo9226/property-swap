import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    marginBottom: 15,
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
    borderWidth: 1,
    borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  addPic: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
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