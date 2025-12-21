import { useLocalSearchParams } from 'expo-router';
import { FlatList, Text, View } from 'react-native';

type Artist = {
  name: string;
};

type Album = {
  name: string;
};

type Track = {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
};

export default function ResultsScreen() {
  const { data } = useLocalSearchParams();
  const results: Track[] = (() => {
    if (!data) return [];
    try {
      const parsed = JSON.parse(String(data));
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Failed to parse results', e);
      return [];
    }
  })();

  return (
    <FlatList
      data={results}
      keyExtractor={(item: any) => item.id}
      contentContainerStyle={{ padding: 16, flexGrow: 1 }}
      ListEmptyComponent={
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#6B7280' }}>検索結果がありません</Text>
        </View>
      }
      renderItem={({ item }: any) => (
        <View style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>{item.name}</Text>
          <Text style={{ color: '#4B5563', marginTop: 4 }}>
            {(item.artists || []).map((a: Artist) => a.name).join(', ') || 'Unknown Artist'} /{' '}
            {item.album?.name || 'Unknown Album'}
          </Text>
        </View>
      )}
    />
  );
}
