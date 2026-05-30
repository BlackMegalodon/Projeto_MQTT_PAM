import AsyncStorage from "@react-native-async-storage/async-storage";

export const StorageService = {
    
storeData: async (value) => {
  try {
    await AsyncStorage.setItem('my-key', value);
  } catch (e) {
    console.error("Erro ao salvar o valor:", error);
  }
},

getData: async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('my-key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Erro ao buscar os valores:", error);
  }
},
}