import { StyleSheet } from "react-native";

/* export const colores = {
    primario: "green",
    secundario: "orange",
} */

export const stylesAppTheme = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginBottom: 50,
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f0f6fc",
  },
  logincontainer: {
    paddingTop: 10,
    /*  backgroundColor: "red", */
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#3870ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    height: 50,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  touchableLink: {
    alignItems: "center",
    justifyContent: "center",
    /* backgroundColor: "red",  */
    marginTop: 20,
    marginHorizontal: 40,
    height: "auto",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
    /* paddingTop: 20, */
  },

  imagecontainer: {
    paddingTop: 20,
  },

  image: {
    alignSelf: "center", // This will center the image horizontally
    width: 200,
    height: 200,
  },
  imagelabel: {
    fontStyle: "bold",
    alignSelf: "center",
    fontSize: 50,
    marginBottom: 20,
  },
  screensName: {
    fontStyle: "bold",
    alignSelf: "center",
    fontSize: 25,
    marginBottom: 20,
  },

  titleContainer: {
    paddingVertical: 10,
  },

  title: {
    marginHorizontal: 10,
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
  titleScreen: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },

  scrollViewStyle: {
    paddingHorizontal: 10,
    width: "auto",
    paddingTop: 30,
  },

  mainContainer: {
    width: "auto",
    height: "auto",
    borderRadius: 10,
    padding: 10,
    marginBottom: 35,
  },
  viewContainer: {
    borderRadius: 10,
    width: "100%",
    marginVertical: 5,
    padding: 20,
  },

  textInput: {
    height: 50,
    marginHorizontal: 10,
    marginVertical: 5,
    fontSize: 20,
    paddingHorizontal: 20,
    fontStyle: "italic",
    borderRadius: 10,
  },

  /* button: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 25,
    marginHorizontal: 30,
  }, */

  textButton: {
    fontSize: 18,
    letterSpacing: 3,
    textTransform: "uppercase",
    fontWeight: "bold",
  },

  buttonLink: {
    alignItems: "center",
    height: 35,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  textLink: {
    fontSize: 17,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
