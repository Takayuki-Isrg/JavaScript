// src/screens/PlayerScreen.js
import { Audio } from 'expo-av';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useHistory } from '../historyContext';
import { tracks } from '../tracks';

function AIComment({ label, text }) {
  return (
    <View style={styles.commentBlock}>
      <Text style={styles.commentLabel}>{label}</Text>
      <Text style={styles.commentText}>{text}</Text>
    </View>
  );
}

export default function PlayerScreen({ navigation, route }) {
  const trackId = route?.params?.trackId;
  const spotifyTrack = route?.params?.spotifyTrack;
  const previewUrlFromParams = route?.params?.previewUrl;
  const { addHistory } = useHistory();
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const track = useMemo(
    () => tracks.find((t) => t.id === trackId) || spotifyTrack || tracks[0],
    [trackId, spotifyTrack],
  );

  const displayTitle = spotifyTrack?.name || track.title;
  const displayArtist =
    spotifyTrack?.artists?.map((a) => a.name).join(', ') || track.artist;
  const displayAlbum = spotifyTrack?.album?.name || track.album;

  const previewUrl =
    previewUrlFromParams || spotifyTrack?.preview_url || track.previewUrl;

  useEffect(() => {
    if (track) {
      addHistory(track);
    }
  }, [track, addHistory]);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // 曲が切り替わったら、前のプレビュー音源は止めて解放する
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!sound) return;
      setIsPlaying(false);
      try {
        await sound.stopAsync();
      } catch {}
      try {
        await sound.unloadAsync();
      } catch {}
      if (!cancelled) setSound(null);
    })();
    return () => {
      cancelled = true;
    };
    // previewUrl が変わる = 別トラックに切り替わったとみなす
  }, [previewUrl]);

  const handleTogglePreview = async () => {
    if (!previewUrl) return;

    try {
      if (!sound) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: previewUrl },
          { shouldPlay: true },
        );
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (!status || !status.isLoaded) return;
          // 再生終了したらUIも止める
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
        setSound(newSound);
        setIsPlaying(true);
      } else {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (e) {
      console.error('preview error', e);
    }
  };

  const comments =
    track.comments ?? {
      theme: 'この曲のAIコメントはまだ用意されていません。',
      lyrics: '今後のアップデートで歌詞の解説が追加されます。',
      riff: '今後のアップデートでリフ／サウンドの解説が追加されます。',
      drum: '今後のアップデートでドラムの解説が追加されます。',
      rhythm: '今後のアップデートで楽曲リズムの解説が追加されます。',
    };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{displayTitle}</Text>
      {displayAlbum ? <Text style={styles.album}>{displayAlbum}</Text> : null}
      <Text style={styles.subtitle}>{displayArtist}</Text>
      <Text style={styles.subtitleSmall}>AIリスニング・コンパニオン（サンプル）</Text>

      {previewUrl ? (
        <View style={styles.previewArea}>
          <Button
            title={isPlaying ? 'プレビューを一時停止' : 'プレビューを再生（30秒）'}
            onPress={handleTogglePreview}
          />
        </View>
      ) : (
        <Text style={styles.noPreview}>この曲のプレビュー音源はありません。</Text>
      )}

      <AIComment label="楽曲テーマ" text={comments.theme} />
      <AIComment label="歌詞の意味" text={comments.lyrics} />
      <AIComment label="ギターの特徴" text={comments.guitar} />
      <AIComment label="ドラムの特徴" text={comments.drum} />
      <AIComment label="リズムの特徴" text={comments.rhythm} />

      <View style={styles.buttonArea}>
        <Button title="ホームに戻る" onPress={() => navigation.navigate('Home')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#050810',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  album: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#a0aec0',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitleSmall: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  previewArea: {
    marginBottom: 16,
  },
  noPreview: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 16,
  },
  commentBlock: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  commentLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#93c5fd',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#e5e7eb',
    lineHeight: 20,
  },
  buttonArea: {
    marginTop: 16,
  },
});