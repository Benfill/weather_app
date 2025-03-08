import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { RootStackParamList } from '~/navigation/AppNavigator';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;
const SearchScreen = () => {
  return <View></View>;
};

export default SearchScreen;
