import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type SearchBarProps = {
  setQuery: Dispatch<SetStateAction<string>>;
};

const SearchBar = (props: SearchBarProps) => {
  const [search, setSearch] = useState<string>('');
  const [showList, setShowList] = useState<boolean>(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    props.setQuery(search);
  }, [search]);

  return (
    <View className="flex  gap-6 rounded-2xl border-b border-slate-200 px-10 pb-4 pt-20">
      {/* Input with Arrow Icon */}
      <View className="mx-2 flex flex-row items-center rounded-xl border border-slate-300 px-4 py-2 shadow-slate-300">
        <Ionicons name="arrow-back" size={17} color="black" /> {/* Arrow Icon */}
        <TextInput
          className="ml-2 flex-1 font-light placeholder-gray-500 placeholder:text-slate-600 focus:outline-none"
          placeholder="Search here"
          onChangeText={setSearch}
          value={search}
          onFocus={() => setShowList(true)}
          onBlur={() => setShowList(false)}
        />
      </View>

      {showList && (
        <View className="flex gap-6 ">
          <Text className="text-[12.98px] font-semibold text-slate-600">Recent search</Text>
          <View className="flex-1">
            <View className="flex cursor-pointer flex-row items-center justify-between hover:bg-slate-200">
              <View className="flex flex-row items-center justify-center gap-6">
                <Ionicons size={17} name="time-outline" />
                <Text className="font-semibold text-slate-600">Rabat</Text>
              </View>
              <Text className="text-[10px] font-bold text-slate-600">34°/23°</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchBar;
