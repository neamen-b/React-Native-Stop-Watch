import { View, Text, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AboutPage() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

    
    <>
      <Stack.Screen options={{ title: "About This App" }} />
      <ScrollView style={{ flex: 1, backgroundColor: '#e0f2ff' }}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 15 }}>
            Stopwatch App ⏱️
          </Text>

          <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 20 }}>
            This app is a simple yet powerful stopwatch built using React Native and Expo. It was developed as a personal project to practice real-time state management, navigation, and user experience design in a mobile environment.
          </Text>

          <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 8 }}>
            🛠️ Features:
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24 }}>
            • Start/Stop the timer with millisecond precision{'\n'}
            • Record lap times with a single tap{'\n'}
            • Automatically color laps: green = faster, red = slower{'\n'}
            • Delete laps individually with confirmation{'\n'}
            • Custom modal-based delete dialog (cross-platform){'\n'}
            • Responsive UI with React Native styling
          </Text>

          <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 20, marginBottom: 8 }}>
            📱 Tech Stack:
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24 }}>
            • React Native{'\n'}
            • Expo Router (for navigation){'\n'}
            • TypeScript for strong typing{'\n'}
            • React Hooks (`useState`, `useRef`, `useEffect`){'\n'}
            • Platform support: Web, Android, iOS
          </Text>

          <Text style={{ fontSize: 16, color: 'gray', marginTop: 40 }}>
            Built with plenty of learning and too much caffeine ☕️ by Neamen Beyene.
          </Text>
        </View>
      </ScrollView>
    </>
    </GestureHandlerRootView>
  );
}


// export default function aboutPage(){
//     return (
//         <> 
//             <Stack.Screen options = {{title : "About This App"}}/>
//             <View style = {{backgroundColor : 'lightblue', flex : 1, alignContent : 'flex-start', padding : 20}}>
//                 <Text style ={{fontFamily : 'Times New Roman', fontSize : 45}}>
//                     This is a simple Stopwatch App made using React Native and Expo.
//                 </Text>
//                 <Text>
//                     It has functionalities like lapping, and clearing laps (even indiviudally).
//                     A Lap will be colored green if it was faster than the previous lap, else red.
//                     The first lap is always colored as red. 
//                 </Text>
//             </View>
        
//         </>
//     )
// }