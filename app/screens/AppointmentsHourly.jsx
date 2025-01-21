import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import appointments from '../../assets/appointment.json'

const colors = ['#FF6F61', '#4CAF50', '#00BCD4', '#FF9800', '#9C27B0'];

const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        days.push(date.toISOString().split('T')[0]);
    }
    return days;
};

const getTimePosition = (start, end) => {
    const [startHour, startMinutes] = start.split(':').map(Number);
    const [endHour, endMinutes] = end.split(':').map(Number);

    const startY = startHour * 60 + startMinutes;
    const height = endHour * 60 + endMinutes - (startHour * 60 + startMinutes);

    return { startY, height };
};

const HourlyCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(getNext7Days()[0]);

    const filteredAppointments = appointments
        .filter((appointment) => appointment.date === selectedDate)
        .map((appointment, index) => ({
            ...appointment,
            color: colors[index % colors.length],
        }));

    return (
        <View style={styles.wrapper}>
            <View style={styles.pickerContainer}>

                <Picker
                    selectedValue={selectedDate}
                    onValueChange={(itemValue) => setSelectedDate(itemValue)}
                    style={styles.picker}
                >
                    {getNext7Days().map((date) => (
                        <Picker.Item key={date} label={date} value={date} />
                    ))}
                </Picker>
            </View>

            <ScrollView contentContainerStyle={[styles.container, { height: 1440 }]}>
                {Array.from({ length: 24 }, (_, i) => (
                    <View key={i} style={[styles.hourStrip, { top: i * 60 }]}>
                        <Text style={styles.hourText}>{`${i}:00`}</Text>
                    </View>
                ))}

                {filteredAppointments.map((appointment) => {
                    const { startY, height } = getTimePosition(appointment.start, appointment.end);
                    return (
                        <View
                            key={appointment.id}
                            style={[
                                styles.appointmentBlock,
                                { top: startY, height, backgroundColor: appointment.color },
                            ]}
                        >
                            <Text style={styles.appointmentText}>{appointment.name}</Text>
                            <Text style={styles.appointmentType}>{appointment.type}</Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pickerContainer: {
        width: 200,
        height: 50,
        margin:20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 30,
        overflow: 'hidden',
    },
    picker: {
        width: 200,
        height: 50,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: '#fff',
        color: 'black',
    },
    container: {
        position: 'relative',
    },
    hourStrip: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 60,
        borderTopWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    hourText: {
        fontSize: 14,
        color: '#666',
    },
    appointmentBlock: {
        position: 'absolute',
        left: 80,
        right: 10,
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center',
    },
    appointmentText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    appointmentType: {
        fontSize: 12,
        color: '#fff',
    },
});

export default HourlyCalendar;
