# AI Tree Sounds

Porcupine Tree の楽曲を題材にした **AIリスニング・コンパニオン**（React Native / Expo）です。  
ローカル楽曲リスト＋AIコメント表示に加え、**Spotify検索（ベータ）** と **YouTube検索リンク**を提供します。

## ソースの構成（何がどこにあるか）

- `App.js`
  - React Navigation（Stack）を定義
  - 全体を `HistoryProvider` でラップ（再生履歴を共有）
- `app/index.tsx`
  - Web初期ロード時のローディング表示（Hello Worldを置換）
- `src/tracks.js`
  - ローカル楽曲リスト（`id/title/artist/album/year`）と曲ごとの `comments`
- `src/historyContext.js`
  - 再生（閲覧）履歴の共有（`history` / `addHistory(track)`）
  - Spotifyトラックとローカルトラックの差異を吸収して履歴を記録
- `src/screens/HomeScreen.js`
  - ホーム画面（ライト/ダーク切替、最近再生した曲）
- `src/screens/SearchScreen.js`
  - ローカル検索 + Spotify検索（ベータ） + YouTube検索リンク
- `src/screens/PlayerScreen.js`
  - 曲詳細 + AIコメントカード表示
  - `expo-av` でプレビュー再生（30秒）
  - 曲切替時にプレビュー音源を停止＆解放
- `src/api/spotify.js`
  - **フロント側のSpotify検索関数**
  - `server/index.js` のプロキシAPIを呼び出す（フロントにCLIENT_SECRETを置かない）
- `server/index.js`
  - Spotifyプロキシ（Client Credentials Flow）
  - `.env` に `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` を保持

## 画面の挙動（概要）

- **Home**
  - テーマ切替（ライト/ダーク）
  - 最近再生した曲（最大10件、画面表示は上位5件）
- **Search**
  - ローカルトラックを検索して `Player` に遷移
  - Spotifyで検索（ベータ）→ Spotifyの結果から `preview_url` を `Player` に渡す
  - どの曲からも「YouTubeで検索」で検索結果ページを開く
- **Player**
  - タイトル／アーティスト／アルバム表示
  - AIコメントカード表示（theme/lyrics/guitar/drum/rhythm）
  - `preview_url` があればプレビュー再生
  - 画面表示した曲は自動で履歴に追加

## Spotifyプロキシについて（重要）

フロントに `CLIENT_SECRET` は置きません。  
`src/api/spotify.js` は `server/index.js` の `/api/spotify/search` を呼び出します。

### セットアップ手順（必須）

1. **Spotify Developer でアプリを作成**
   - https://developer.spotify.com/dashboard にアクセス
   - 「Create app」→ Name: `AI Tree Sounds`、Redirect URI: `http://localhost`
   - `Client ID` と `Client Secret` をコピー

2. **`.env` ファイルを作成**
   ```bash
   cd server
   # .env ファイルを手動で作成（以下の内容をコピペ）
   ```
   
   `server/.env` の内容:
   ```env
   SPOTIFY_CLIENT_ID=あなたのClientID
   SPOTIFY_CLIENT_SECRET=あなたのClientSecret
   PORT=4000
   ```

3. **バックエンドサーバーを起動**
   ```bash
   cd server
   npm start
   ```
   
   成功すると以下のメッセージが表示されます:
   ```
   ✅ Spotify プロキシサーバー起動完了
   📍 http://localhost:4000
   ```

4. **フロントエンドを起動（別ターミナル）**
   ```bash
   npm start
   # または
   npx expo start
   ```

### トラブルシューティング

- **「バックエンドサーバーに接続できません」エラー**
  - `server/index.js` が起動しているか確認（`npm start` を実行）
  - `server/.env` に `SPOTIFY_CLIENT_ID` と `SPOTIFY_CLIENT_SECRET` が正しく設定されているか確認

- **「Spotify認証エラー」**
  - `.env` の `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` が正しいか確認
  - Spotify Dashboard でアプリが有効になっているか確認

- **スマホ(実機)で動かす場合**
  - PCのIPアドレスを確認（例: `192.168.1.119`）
  - `.env` または `app.json` で `EXPO_PUBLIC_API_BASE_URL=http://192.168.1.119:4000` を設定
  - PCとスマホが同じWi-Fiネットワークに接続されているか確認

