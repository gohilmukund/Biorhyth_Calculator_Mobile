import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { pi, sin } from 'mathjs'
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Moment from "moment";
const screenWidth = Dimensions.get("window").width;



function Biorythm() {
    const [dob, setDob] = useState(new Date("01-02-1994"));
    const today = new Date();
    const daysLimit = 12;
    const [show, setShow] = useState(false);

    const [physicalBioRhythm, setPhysicalBioRhythm] = useState([]);
    const [emotionalBioRhythm, setEmotionalBioRhythm] = useState([]);
    const [intellectualBioRhythm, setIntellectualBioRhythm] = useState([]);
    const [graphButton, setGraphButton] = useState(false);

    useEffect(()=>{       
            
            setPhysicalBioRhythm(rhythmCal(23))
            setEmotionalBioRhythm(rhythmCal(28))
            setIntellectualBioRhythm(rhythmCal(33))
            
    },[dob])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setShow(false);
        setDob(currentDate);
    };

    const dateLabels = () => {
        let array = []
        for(let i=-2; i<daysLimit; i++){
            array.push(Moment().add(i,'days').format('DD MMM YYYY'))
        }        
        return array;
    }

    
    function rhythmCal(val) {
        let array = []
        for(let i=-2; i<daysLimit; i++){
            array.push(sin(2*pi*Moment().add(i,'days').diff(dob,'days')/val))
        }
        return array
    }
    

    const data = {
        labels: dateLabels(),
        datasets: [
            {
                data: physicalBioRhythm,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            },
            {
                data: emotionalBioRhythm,
                color: (opacity = 1) => `rgba(255, 65, 255, ${opacity})`, // optional
                strokeWidth: 2 // optional
            },
            {
                data: intellectualBioRhythm,
                color: (opacity = 1) => `rgba(255, 255, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Physical","Emotional", "Intellectual"] // optional
    };

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 3, // optional, default 3
        barPercentage: 0.25,
        useShadowColorFromDataset: false // optional
    };

    return (
        <View style={styles.container}>
        <Text>Today: {today.toDateString()}</Text>
        <TouchableOpacity onPress={()=>setShow(true)} >
            <View style={{backgroundColor:'blue'}}>
                <Text>Select Your Dob</Text>
            </View>
        </TouchableOpacity>
        
        {show && <DateTimePicker
        //   testID="dateTimePicker"
            value={dob}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChange}
        /> }

        <Text>
            Selected Date of Birth Date: {dob.toDateString()}
            {"\n\n"}
            
            P: {sin(2*pi*Moment().diff(dob,'days')/23)}{"\n\n"}   
            E: {sin(2*pi*Moment().diff(dob,'days')/28)}{"\n\n"}   
            I: {sin(2*pi*Moment().diff(dob,'days')/33)}
        </Text>

        <TouchableOpacity onPress={()=>setGraphButton(!graphButton)}><Text>Press Me</Text></TouchableOpacity>

        {graphButton && <LineChart
            data={data}
            width={screenWidth}
            height={300}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            // bezier
        />}
        
        <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default Biorythm;