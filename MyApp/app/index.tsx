// importing react native components. similar to divs etc..
import {View, Button, Text, Pressable, TouchableOpacity, Alert, Modal} from "react-native";
import {Stack, Link} from 'expo-router'
// importing react hooks
// useState for state of a component, rerenders when things change
// useEffect to run something everytime things change
// useRef to track state but does not cause rerender
import {useState, useEffect, useRef} from "react";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';



type aLap = {
  // Total time elapsed at time
  time : number,
  // Time change since last lap
  timeChange : number
  // TIme change since last lap as string
  timeChangeString : string,
  // faster or slower than last lap. Slower = False, Faster or Equal = True
  FasterThanLastLap : boolean,
  // Green if faster, red if slower
  color : string
}

// Treating the conformmodal function below as a component. It has props "tags"
type ConfirmationModalProps = {
  // Sets the visibility of the component. Basically through useState
  visible : boolean,
  // callback. Removes the lap by calling removeLap
  onConfirm : () => void,
  // Callback. Does nothing becuase the deletion has been cancelled. Well it would set ShowModal to false. unmounting
  onCancel : () => void,
  // index of the lap selected to be deleted.
  indexOfLapToDelete : number
}

export default function App(){
  // initially set to 0. keep track of time elapsed
  const [elapsedTime, setElapsedTime] = useState(0);

  // Another hook to keep track of timer status
  const [isRunning, setRunning] = useState(false);
  // useRef is either null or whatever is returned by setInterval
  // By default is null

  // Holds all the lap times
  const [laps, setLaps] = useState <Array<aLap>>([]);
  // Holds the most recent lap time.
  const [lastLapTime, setLastLapTime] = useState <number>(0);

  // Total elapsed time at last lap
  const [lastElapsedTime, setLastElapsedTime] = useState <number>(elapsedTime)

  // Tracks deletion cofirm changes
  const [showModal, setShowModal] = useState <boolean> (false);

  // Keeps track of the lap number to be deleted
  const [lapNumber, setLapNumber] = useState <number> (-1);

  const intervalRef = useRef <NodeJS.Timeout | null>(null);

  const startWatch = () => {
    // first check if it is already running
    if (intervalRef.current !== null){
      alert("Timer already running!")
      return;
    }
    setRunning(true);

    intervalRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 10)
  }
 
  const stopWatch = () => {
    // Is it running?
    if (intervalRef.current !== null){
      // Stops the callback?
      clearInterval(intervalRef.current);
      // Removes the reference from current and assigns null
      intervalRef.current = null;
      setRunning(false);
    } else {
      alert("Timer already paused!")
      return;
    }
  }

  const clearWatch = () => {
      console.log("Running clear watch!")
      setElapsedTime(0);
      setLastElapsedTime(0);
      // Stops the elapsedTime
      clearInterval(intervalRef.current)
      // Dereferences it
      intervalRef.current = null;

      setRunning(false)
      // Remove laps when clear button is pressed
      setLaps([])
  }

  const lap = () =>{
    //to be called when lap button is pressed

    if (isRunning){
      // Determine lap length\
      const latestLap = lastElapsedTime === 0 ? elapsedTime : elapsedTime - lastElapsedTime
      console.log(`elpased ${elapsedTime}, lastElapsed ${lastElapsedTime}, ${lastLapTime}`)
      const newLap : aLap = {
        time : elapsedTime,
        timeChange : latestLap,
        timeChangeString : formatTime(latestLap),
        FasterThanLastLap : latestLap > lastLapTime ? false : true,
        color : latestLap > lastLapTime ? 'red' : 'green'
      }
      // Thiscopying is memory expensive tho. All the laps components would be rerendered. 
      setLaps((prev) => ([...prev, newLap]))

      setLastLapTime(newLap.timeChange)
      setLastElapsedTime(elapsedTime)
      // pushing to the array won't trigger a rerender in react.
      // if (intervalRef.current === null){
      //   laps.push(elapsedTime)
      // }
      // else{
      //   laps.push(laps[laps.length - 1] - elapsedTime);
      // }
      // console.log(laps)
      // // createLapComponent(laps);
    }
    else{
      alert("Stopwatch is stopped!")
    }
  }

  const confirmRemoval = (indexOflap : number) => {
    console.log("confirmation")

    // Apparently alert works for andoird and ios but not for web
    // Alert.alert("Delete Lap", "Are you sure you want to delete Lap ${indexOflap + 1}?",
    //   [
    //     { text : "Cancel", style : "cancel"},
    //     {text : "Delete", style : "destructive", onPress : () => removeLap(indexOflap)}
    //   ]
    // )

    return (
      <View 
      style = {{ flex: 1, padding : 20, alignItems : 'center'}}>
        <Text 
        style = {{color :' blue', flexDirection : 'row'}}>
          Please confirm that you want to delete lap {indexOflap}
          <Button title = 'Delete' onPress={() => {removeLap(indexOflap)}}></Button>
          <Button title = 'Cancel' onPress={() => alert("Deletion Canceled")}></Button>
        </Text>
      </View>
    )
    
  }
  const removeLap = (indexOfLap : number) => {
    // this actually creates a new map so there will be a change in reference that would trigger a rerender.\
    // given index of the lap, return the map without the entry with this index
    setLaps(prev => (prev.filter((val, i) => i !== indexOfLap)))
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

    <>
      <Stack.Screen
        options={{
          title: 'Neamen Beyene\'s React Native Stopwatch',
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: 'black',
          headerTitleAlign: 'left',
        }}
      />

      {/* <Link href = '/about' style = {{ marginTop : 10, fontSize : 16, color : 'blue'}}> About This Project</Link> */}

      <View style={{ flex: 1, padding: 20, backgroundColor: '#f0f0f0', alignItems: 'center' }}>
        
        {/* Timer */}
        <View style={{ marginVertical: 30 }}>
          <Text style={{ fontSize: 48, fontWeight: 'bold', fontFamily: 'monospace' }}>
            {formatTime(elapsedTime)}
          </Text>
        </View>
    
        {/* Buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 20 }}>
          <Button title="Start" onPress={startWatch} />
          <Button title="Stop" onPress={stopWatch} />
          <Button title="Clear" onPress={clearWatch} />
          <Button title="Lap" onPress={lap} />
        </View>
    
        {/* Laps */}
        <ScrollView style={{ width: '80%', marginTop: 10 }}>
          {laps.map((lap, index) => (
            <TouchableOpacity
              key={index}
              // Set the showmodal to true, triggering the conformModal, also set lapnumber on press
              onPress = {() => {setShowModal(true), setLapNumber(index)}}
              style={{
                backgroundColor: lap.color,
                padding: 10,
                marginVertical: 4,
                borderRadius: 6,
              }}
              
            >
              <Text style={{ color: lap.color === 'red' ? 'white' : 'black', fontFamily: 'monospace', fontSize: 16 }}>
                Lap {index + 1}: {lap.timeChangeString}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ConfirmModal
          // What are the props?
          visible = {showModal}
          // Give the function i
          onConfirm={() => {removeLap(lapNumber), setShowModal(false)}}
          onCancel={() => {setShowModal(false)}}
          indexOfLapToDelete={lapNumber}
          />
      </View>
    </>
    </GestureHandlerRootView>
  );
  
}


const formatTime = (elaspsedTime : number) => {
  const hours : number = Math.floor(elaspsedTime / 360000);
  const minutes : number = Math.floor((elaspsedTime % 360000) / 6000);

  // This ensures that seconds do go past 60. No need for floor since modulo is always intergers
  const seconds : number = Math.floor((elaspsedTime % 6000) / 100);
  const CentiSeconds : number = elaspsedTime % 100;

  // Do some padding so that single digits number have zero infront
  const hoursString : String = String(hours).padStart(2, "0");
  const minutesString : String = String(minutes).padStart(2, "0");
  const secondsString : String = String(seconds).padStart(2, "0");
  const CentiSecondsString : String = String(CentiSeconds).padStart(2, "0")

  return `${hoursString} : ${minutesString} : ${secondsString}.${CentiSecondsString}`
}

// Returns JSX is a custom component that can be referecend in any other JSX. Always capitalize!
const ConfirmModal = ({visible, onConfirm, onCancel, indexOfLapToDelete} : ConfirmationModalProps) => {

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)', // dim background
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '100%',
            maxWidth: 320,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 18, marginBottom: 15 }}>
            Are you sure you want to delete Lap {indexOfLapToDelete + 1}?
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Cancel" onPress={onCancel} />
            <Button title="Delete" color="red" onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>

  )
}

// const deleteLapComponent = (laps : string[]) => {
//   // Ask if they are sure they want to delete the lap


//   return (
//     <View style ={{ flex : 1, alignContent : 'center', alignItems : 'center'}}>
//       {laps.map((elem index) => (
//         <Text key = {index}>
//           Lap ..
//         </Text>
//       ))}
//     </View>
//   )
// }


























// import react antive compoennt
// import {View, Text, useColorScheme, Button} from 'react-native';
// import { useState, useEffect } from 'react';


// // The default functional component that is rendered when the file is run
// export default function index() : any {
//   // This uses the preferred color scheme by the user
//   const colorScheme = useColorScheme();
//   // This is a react hook that lets you track state in your functional component
//   const [elapsedTime, setElapsedTime] = useState(0);

//   // tracks and sets background color. Default to lightblue
//   const [backgroundColor, setColor] = useState('lightblue')


//   useEffect(() => { 
//     if (elapsedTime % 2 == 0){
//       setColor('lightblue')
//     }
//     else{
//       setColor('red')
//     }
//   }, [elapsedTime])

// // the jsx layout with view, which is a like a  div , and text, which contatins text
// return (
//   // This styles the view component
// <View style = {{flex : 1, justifyContent : "center", alignItems :"center", backgroundColor : (backgroundColor)}}> 
//   {/* the text component is inside the view component */}
// <Text >Pressed {elapsedTime} times</Text>
// <Button title='Press Here' onPress={() => setElapsedTime(elapsedTime + 1)}></Button>
// <Button title='Clear elapsedTime' onPress = {() => setElapsedTime(0)}></Button>

// <View style = {{flex : 0.5, justifyContent : 'center', alignItems : 'center'}}></View>
// </View>


// )
// }
