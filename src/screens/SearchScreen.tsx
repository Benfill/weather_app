import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { RootStackParamList } from '~/navigation/AppNavigator';

type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;
const SearchScreen = ({ route }: SearchScreenProps) => {
  const { city } = route.params;
  return <View></View>;
};

export default SearchScreen;
