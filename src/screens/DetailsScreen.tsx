import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import WeatherCard from '~/components/WeatherCard';

import { RootStackParamList } from '~/navigation/AppNavigator';
type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen = ({ route }: DetailsScreenProps) => {
  const { city } = route.params;

  return (
    <View>
      <WeatherCard city={city}></WeatherCard>
    </View>
  );
};

export default DetailsScreen;
