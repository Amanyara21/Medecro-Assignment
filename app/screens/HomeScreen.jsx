import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import TeethView from '../components/TeethView';
import Legend from '../components/Legend';
import { initializeDatabase, fetchToothStatuses, updateToothStatus } from '../db/Database';
import BottomModal from '../components/BottomModal';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTooth, setSelectedTooth] = useState(null);
    const [teethStatus, setTeethStatus] = useState(Array(33).fill(null));

    useEffect(() => {
        initializeDatabase();
        fetchToothStatuses(setTeethStatus);
    }, []);

    const handleToothPress = (toothNumber) => {
        setSelectedTooth(toothNumber);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedTooth(null);
    };
    const saveData = async (toothNumber, problem1, problem2, notes) => {

        await updateToothStatus(toothNumber, problem1, problem2, notes, "pending");

        setTeethStatus(prevTeethStatus => {
            const updatedTeethStatus = [...prevTeethStatus];
            updatedTeethStatus[toothNumber ] = 'blue';
            return updatedTeethStatus;
        });

        setModalVisible(false);
        setSelectedTooth(null);

    };


    return (
        <ScrollView >

            {/* It is only for Go to second task */}
            <TouchableOpacity
                style={styles.nextButton}
                onPress={()=>{router.push('/screens/AppointmentsHourly')}}
            >
                <Text style={styles.buttonText}>Go to Task 2</Text>
            </TouchableOpacity>

            {/* Teths and Legend */}
            <View style={styles.container}>
                <TeethView teethStatus={teethStatus} handleToothPress={handleToothPress} />
                <Legend />
            </View>

            {/* BottomModal */}
            {modalVisible && (
                <BottomModal modalVisible={modalVisible} toothNumber={selectedTooth} onClose={closeModal} onSave={saveData} />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        padding: 20,
    },
    nextButton: {
        width:150,
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        flex: 1,
        marginLeft: 10,
        alignSelf:"flex-end"
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign:"center"
    },
});

export default HomeScreen;
