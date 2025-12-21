// import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

// // ローディング画面
// export default function Page() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.main}>
//         <ActivityIndicator size="large" color="#60A5FA" />
//         <Text style={styles.title}>AI Tree Sounds</Text>
//         <Text style={styles.subtitle}>読み込み中...</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     padding: 24,
//     backgroundColor: "#050810",
//   },
//   main: {
//     flex: 1,
//     justifyContent: "center",
//     maxWidth: 480,
//     marginHorizontal: "auto",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#F9FAFB",
//     textAlign: "center",
//     marginTop: 16,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#9CA3AF",
//     textAlign: "center",
//     marginTop: 4,
//   },
// });

// import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

// // ローディング画面
// export default function Page() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.main}>
//         <ActivityIndicator size="large" color="#60A5FA" />
//         <Text style={styles.title}>AI Tree Sounds</Text>
//         <Text style={styles.subtitle}>読み込み中...</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     padding: 24,
//     backgroundColor: "#050810",
//   },
//   main: {
//     flex: 1,
//     justifyContent: "center",
//     maxWidth: 480,
//     marginHorizontal: "auto",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#F9FAFB",
//     textAlign: "center",
//     marginTop: 16,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#9CA3AF",
//     textAlign: "center",
//     marginTop: 4,
//   },
// });

// app/index.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="search" options={{ title: 'Search' }} />
      <Stack.Screen name="results" options={{ title: 'Results' }} />
    </Stack>
  );
}


