import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  botao: {
    width: 530,
    height: 50,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 25,
    marginBottom: 50
  },
  btnArea: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTexto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "grey",
  },
});
export default styles;
