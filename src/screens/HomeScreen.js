// src/screens/HomeScreen.js
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useHistory } from '../historyContext';

export default function HomeScreen({ navigation }) {
  // JSファイルなので型注釈は不要。文字列で状態を管理するだけでOK。
  const [theme, setTheme] = useState('dark'); // 'light' | 'dark'
  const { history } = useHistory();

  const isDark = theme === 'dark';
  const themeStyles = isDark ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <ScrollView contentContainerStyle={styles.main}>
        <View style={styles.header}>
          <Text style={[styles.appTitle, themeStyles.appTitle]}>AI Tree Sounds</Text>
        </View>

        <View style={styles.themeRow}>
          <Text style={[styles.themeLabel, themeStyles.themeLabel]}>テーマ</Text>
          <Text style={[styles.themeValue, themeStyles.themeValue]}>
            {isDark ? 'ダーク' : 'ライト'}
          </Text>
          <Switch
            value={isDark}
            onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
          />
        </View>

        <Text style={[styles.title, themeStyles.title]}>
          Porcupine Treeの世界を深掘りするAIリスニング・コンパニオン
        </Text>
        <View style={styles.buttonWrapper}>
          <Button
            title="曲を検索する"
            onPress={() => navigation.navigate('Search')}
          />
        </View>

        <View style={styles.historySection}>
          <Text style={[styles.historyTitle, themeStyles.historyTitle]}>
            最近再生した曲
          </Text>
          {history.length === 0 ? (
            <Text style={[styles.historyEmpty, themeStyles.historyEmpty]}>
              まだ再生履歴がありません
            </Text>
          ) : (
            history.slice(0, 5).map((item) => (
              <View key={item.id} style={styles.historyItem}>
                <Text style={[styles.historyItemTitle, themeStyles.historyItemTitle]}>
                  {item.title}
                </Text>
                <Text style={[styles.historyItemMeta, themeStyles.historyItemMeta]}>
                  {item.artist} ・ {item.album}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const basePadding = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: basePadding,
  },
  header: {
    alignItems: 'center',
    marginTop: basePadding * 2,
    marginBottom: 12,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  themeLabel: {
    fontSize: 14,
    marginRight: 4,
  },
  themeValue: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  main: {
    paddingHorizontal: basePadding,
    paddingBottom: basePadding * 2,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonWrapper: {
    marginBottom: 16,
  },
  historySection: {
    marginTop: 24,
    alignSelf: 'stretch',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  historyEmpty: {
    fontSize: 14,
  },
  historyItem: {
    paddingVertical: 6,
  },
  historyItemTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  historyItemMeta: {
    fontSize: 13,
  },
});

const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
  },
  appTitle: {
    color: '#111827',
  },
  themeLabel: {
    color: '#4B5563',
  },
  themeValue: {
    color: '#111827',
  },
  title: {
    color: '#111827',
  },
  historyTitle: {
    color: '#111827',
  },
  historyEmpty: {
    color: '#6B7280',
  },
  historyItemTitle: {
    color: '#111827',
  },
  historyItemMeta: {
    color: '#4B5563',
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#050810',
  },
  appTitle: {
    color: '#F9FAFB',
  },
  themeLabel: {
    color: '#9CA3AF',
  },
  themeValue: {
    color: '#F9FAFB',
  },
  title: {
    color: '#E5E7EB',
  },
  historyTitle: {
    color: '#F9FAFB',
  },
  historyEmpty: {
    color: '#6B7280',
  },
  historyItemTitle: {
    color: '#F9FAFB',
  },
  historyItemMeta: {
    color: '#9CA3AF',
  },
});
