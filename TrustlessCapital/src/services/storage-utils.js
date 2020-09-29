import AsyncStorage from '@react-native-community/async-storage';

const exchangeRates = rates => {
  if (rates) {
    await AsyncStorage.setItem('exchangeRates', JSON.stringify(rates));
  }

  rates = await AsyncStorage.getItem('exchangeRates');
  if (rates) rates = JSON.parse(rates);
  return rates;
};

export default (StorageUtils = {
  exchangeRates,
});