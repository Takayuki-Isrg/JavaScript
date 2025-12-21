import React, { createContext, useContext, useMemo, useState } from 'react';

// 閲覧（再生）履歴を共有するためのコンテキスト

const HistoryContext = createContext(null);

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);

  const addHistory = (track) => {
    if (!track || !track.id) return;

    setHistory((prev) => {
      // 同じ曲は先頭に移動して重複を避ける
      const filtered = prev.filter((item) => item.id !== track.id);

      // ローカルtrackとSpotify trackの差異を吸収
      const title = track.title || track.name || 'Unknown';
      const artist =
        track.artist ||
        (Array.isArray(track.artists) ? track.artists.map((a) => a.name).join(', ') : undefined) ||
        'Unknown';
      const album =
        track.album?.name ||
        track.album ||
        'Unknown';

      const entry = {
        id: track.id,
        title,
        artist,
        album,
        viewedAt: Date.now(),
      };
      return [entry, ...filtered].slice(0, 10); // 最大10件まで保持
    });
  };

  const value = useMemo(
    () => ({
      history,
      addHistory,
    }),
    [history],
  );

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}

export function useHistory() {
  const ctx = useContext(HistoryContext);
  if (!ctx) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return ctx;
}



