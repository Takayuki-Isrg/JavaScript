// src/screens/SearchScreen.js
import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { searchSpotifyTracks } from '../api/spotify';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    console.log('🔍 search clicked:', query);
    setLoading(true);
    try {
      const items = await searchSpotifyTracks(query);
      console.log('✅ result count:', items.length);
      setResults(items);
    } catch (e) {
      console.error('❌ search error', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Spotify Search Test</Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="search..."
        style={{ borderWidth: 1, padding: 8, marginVertical: 8 }}
      />

      <TouchableOpacity onPress={handleSearch}>
        <Text>Search</Text>
      </TouchableOpacity>

      {loading && <Text>Loading...</Text>}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
    </View>
  );
}

// // src/screens/SearchScreen.js
// import React, { useMemo, useState } from 'react';
// import { ActivityIndicator, FlatList, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { searchSpotifyTracks } from '../api/spotify';
// import { tracks } from '../tracks';

// export default function SearchScreen({ navigation }) {
//   const [query, setQuery] = useState('');
//   const [remoteResults, setRemoteResults] = useState([]);
//   const [isSearchingRemote, setIsSearchingRemote] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const filteredTracks = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     if (!q) return tracks;
//     return tracks.filter((t) => {
//       return (
//         t.title.toLowerCase().includes(q) ||
//         t.album.toLowerCase().includes(q) ||
//         t.artist.toLowerCase().includes(q)
//       );
//     });
//   }, [query]);

//   const handleSpotifySearch = async () => {
//     const q = query.trim();
//     if (!q) return;

//     console.log('① search start');
    
//     try {
//       setIsSearchingRemote(true);
//       setErrorMessage('');
//       console.log('② before fetch');
//       const items = await searchSpotifyTracks(q);
//       console.log('③ after fetch');
//       setRemoteResults(items);
//     } catch (e) {
//       console.error(e);
//       setErrorMessage('Spotify検索に失敗しました。しばらくしてから再度お試しください。');
//     } finally {
//       console.log('④ finally');
//       setIsSearchingRemote(false);
//     }
//   };

//   const handleSelect = (track) => {
//     navigation.navigate('Player', { trackId: track.id });
//   };

//   const openYouTube = (title, artist) => {
//     const q = encodeURIComponent(`${title} ${artist}`);
//     const url = `https://www.youtube.com/results?search_query=${q}`;
//     Linking.openURL(url);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>楽曲検索</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="曲名 / アルバム / アーティストで検索"
//         placeholderTextColor="#9CA3AF"
//         value={query}
//         onChangeText={setQuery}
//         onSubmitEditing={handleSpotifySearch}
//       />

//       <TouchableOpacity style={styles.spotifyButton} onPress={handleSpotifySearch}>
//         <Text style={styles.spotifyButtonText}>
//           Spotifyで検索（ベータ）
//         </Text>
//       </TouchableOpacity>

//       {isSearchingRemote && (
//         <View style={styles.remoteStatus}>
//           <ActivityIndicator size="small" color="#60A5FA" />
//           <Text style={styles.remoteStatusText}>Spotifyから取得中...</Text>
//         </View>
//       )}

//       {!!errorMessage && (
//         <Text style={styles.errorText}>{errorMessage}</Text>
//       )}

//       <FlatList
//         data={filteredTracks}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContent}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.item}
//             onPress={() => handleSelect(item)}
//           >
//             <Text style={styles.itemTitle}>{item.title}</Text>
//             <Text style={styles.itemMeta}>
//               {item.artist} ・ {item.album} ({item.year})
//             </Text>
//             <TouchableOpacity
//               style={styles.youtubeLink}
//               onPress={() => openYouTube(item.title, item.artist)}
//             >
//               <Text style={styles.youtubeLinkText}>YouTubeで検索</Text>
//             </TouchableOpacity>
//           </TouchableOpacity>
//         )}
//         ListEmptyComponent={
//           <Text style={styles.empty}>該当する曲がありません</Text>
//         }
//       />

//       {remoteResults.length > 0 && (
//         <View style={styles.remoteSection}>
//           <Text style={styles.remoteTitle}>Spotifyの検索結果</Text>
//           <FlatList
//             data={remoteResults}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={styles.item}
//                 onPress={() =>
//                   navigation.navigate('Player', {
//                     trackId: item.id,
//                     spotifyTrack: item,
//                     previewUrl: item.preview_url,
//                   })
//                 }
//               >
//                 <Text style={styles.itemTitle}>{item.name}</Text>
//                 <Text style={styles.itemMeta}>
//                   {item.artists.map((a) => a.name).join(', ')} ・ {item.album.name}
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.youtubeLink}
//                   onPress={() =>
//                     openYouTube(
//                       item.name,
//                       item.artists.map((a) => a.name).join(', '),
//                     )
//                   }
//                 >
//                   <Text style={styles.youtubeLinkText}>YouTubeで検索</Text>
//                 </TouchableOpacity>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#050810',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     marginBottom: 12,
//   },
//   input: {
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#374151',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     color: '#E5E7EB',
//     marginBottom: 12,
//   },
//   spotifyButton: {
//     alignSelf: 'flex-start',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 999,
//     backgroundColor: '#1DB954',
//     marginBottom: 8,
//   },
//   spotifyButtonText: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#F9FAFB',
//   },
//   remoteStatus: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   remoteStatusText: {
//     fontSize: 12,
//     color: '#9CA3AF',
//     marginLeft: 8,
//   },
//   errorText: {
//     fontSize: 12,
//     color: '#F97373',
//     marginBottom: 8,
//   },
//   listContent: {
//     paddingBottom: 16,
//   },
//   item: {
//     backgroundColor: '#111827',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 8,
//   },
//   itemTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#F9FAFB',
//   },
//   itemMeta: {
//     fontSize: 13,
//     color: '#9CA3AF',
//     marginTop: 2,
//   },
//   youtubeLink: {
//     marginTop: 4,
//   },
//   youtubeLinkText: {
//     fontSize: 12,
//     color: '#60A5FA',
//   },
//   empty: {
//     marginTop: 24,
//     textAlign: 'center',
//     color: '#9CA3AF',
//   },
//   remoteSection: {
//     marginTop: 16,
//     paddingBottom: 16,
//   },
//   remoteTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     marginBottom: 8,
//   },
// });


