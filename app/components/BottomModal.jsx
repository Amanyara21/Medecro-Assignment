import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import toothData from '../../assets/tooth.json'; 

export default function BottomModal({ toothNumber, onClose, onSave }) {
    const [selectedProblem1, setSelectedProblem1] = useState('');
    const [selectedProblem2, setSelectedProblem2] = useState('');
    const [notes, setNotes] = useState('');

    const tooth = toothData.teeth.find((tooth) => tooth.id === toothNumber);


    return (
            <View style={styles.backdrop}>
                <View style={styles.bottomSheet}>
                    <View style={styles.modalTitle}>
                        <Text style={styles.toothNumber}>{toothNumber}</Text>
                        <Text style={styles.toothName}>{tooth.name}</Text>
                    </View>

                    <Text style={styles.label}>Tooth Problem</Text>
                    <Picker
                        selectedValue={selectedProblem1}
                        onValueChange={(itemValue) => setSelectedProblem1(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select a problem" value="" />
                        <Picker.Item label="Tooth Decay" value="Tooth Decay" />
                        <Picker.Item label="Cavity" value="Cavity" />
                    </Picker>

                    <Text style={styles.label}>2nd Problem</Text>
                    <Picker
                        selectedValue={selectedProblem2}
                        onValueChange={(itemValue) => setSelectedProblem2(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select a problem" value="" />
                        <Picker.Item label="Gum Bleeding" value="Gum Bleeding" />
                        <Picker.Item label="Sensitivity" value="Sensitivity" />
                    </Picker>

                    <Text style={styles.label}>Notes (Optional)</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Type your concerns here...."
                        value={notes}
                        onChangeText={(text) => setNotes(text)}
                        multiline={true}
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.nextButton}
                            onPress={()=>{onSave(toothNumber, selectedProblem1, selectedProblem2, notes)}}
                        >
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({  
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign:"center"
    },
    backdrop: {
        position: "absolute",
        flex: 1,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: "100%",
        height: "100%",
        justifyContent: "flex-end"
    },
    bottomSheet: {
        backgroundColor: '#fff',
        width: '100%',
        height:"65%",
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    modalTitle:{
        flexDirection:"row",
        marginVertical:20,
        alignItems:"center"
    },
    toothNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color:"white",
        height:30,
        width:30,
        textAlign:'center',
        backgroundColor:"#5d55ed",
        borderRadius:50,
    },
    toothName:{
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft:10,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
        color:'black'
    },
    picker: {
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
    },
    textInput: {
        height: 100,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
        textAlignVertical: 'top',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        backgroundColor: '#FF4D4D',
        padding: 15,
        borderRadius: 10,
        flex: 1,
        textAlign: "center",
        marginRight: 10,
    },
    nextButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        flex: 1,
        marginLeft: 10,
    },
});
