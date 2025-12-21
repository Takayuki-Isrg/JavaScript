// src/api/spotify.js
export async function searchSpotifyTracks(query) {
  console.log('fetch start:', query);

  const res = await fetch(
    `http://192.168.1.119:4000/api/spotify/search?q=${encodeURIComponent(query)}`,
    {
      method: 'GET',
    }
  );

  console.log('fetch response:', res.status);

  if (!res.ok) {
    throw new Error(`Spotify search failed: ${res.status}`);
  }

  const json = await res.json();
  return json.tracks.items;
}


// Spotify Web API（フロント側）
// フロントに CLIENT_SECRET を置かないため、server/index.js のプロキシ経由で検索する。

// const DEFAULT_BASE_URL = 'http://localhost:4000';

// function getApiBaseUrl() {
//   return process.env.EXPO_PUBLIC_API_BASE_URL || DEFAULT_BASE_URL;
// }

// export async function searchSpotifyTracks(query) {
//   const baseUrl = getApiBaseUrl();
//   const params = new URLSearchParams({ q: query }).toString();
//   const url = `${baseUrl}/api/spotify/search?${params}`;

//   try {
//     const res = await fetch(url);

//     if (!res.ok) {
//       const errorData = await res.json().catch(async () => ({ error: await res.text() }));
//       console.error('❌ Spotify proxy error:', errorData);
      
//       if (res.status === 0 || res.status === 500) {
//         throw new Error(
//           `バックエンドサーバーに接続できません。\n` +
//           `1. 別ターミナルで "cd server && npm start" を実行してください\n` +
//           `2. server/.env に SPOTIFY_CLIENT_ID と SPOTIFY_CLIENT_SECRET が設定されているか確認してください`
//         );
//       }
      
//       throw new Error(errorData.error || `HTTP ${res.status}: ${res.statusText}`);
//     }

//     const items = await res.json();
//     if (!Array.isArray(items)) {
//       throw new Error('予期しないレスポンス形式です');
//     }
    
//     return items;
//   } catch (e) {
//     if (e.message.includes('Failed to fetch') || e.message.includes('NetworkError')) {
//       throw new Error(
//         `バックエンドサーバー（${baseUrl}）に接続できません。\n` +
//         `別ターミナルで "cd server && npm start" を実行してください。`
//       );
//     }
//     throw e;
//   }
// }


