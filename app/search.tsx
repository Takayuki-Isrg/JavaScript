import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native';
import { searchSpotifyTracks } from '../src/api/spotify';

export default function SearchScreen() {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const onSearch = async () => {
    const query = q.trim();
    if (!query) {
      setError('検索ワードを入力してください');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const results = await searchSpotifyTracks(query);

      if (!Array.isArray(results)) {
        throw new Error('検索結果の形式が不正です');
      }

      router.push({ pathname: '/results', params: { data: JSON.stringify(results) } });
    } catch (e: any) {
      setError(e?.message || '検索に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <TextInput
        placeholder="キーワードを入力"
        value={q}
        onChangeText={setQ}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!loading}
        style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12 }}
      />
      <Button title={loading ? '検索中...' : 'Spotifyで検索'} onPress={onSearch} disabled={loading} />
      {loading && <ActivityIndicator />}
      {!!error && <Text style={{ color: '#DC2626' }}>{error}</Text>}
    </View>
  );
}
