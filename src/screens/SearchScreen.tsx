import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { View } from 'react-native';
import Map from '~/components/MapView';

import SearchBar from '~/components/SearchBar';
import { RootStackParamList } from '~/navigation/AppNavigator';

type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

const SearchScreen = ({ route, navigation }: SearchScreenProps) => {
  const [query, setQuery] = useState<string>('');

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10, zIndex: 1 }}>
        <SearchBar setQuery={setQuery} navigation={navigation} />
      </View>
      <Map query={query} />
    </View>
  );
};

export default SearchScreen;
