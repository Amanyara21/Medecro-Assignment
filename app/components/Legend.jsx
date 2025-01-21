import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Legend = () => (
  <View style={styles.container}>
    <View style={styles.legendItem}>
      <View style={[styles.legendColor, { backgroundColor: 'blue' }]} />
      <Text style={styles.legendText}>Want to Get Treated</Text>
    </View>
    <View style={styles.legendItem}>
      <View style={[styles.legendColor, { backgroundColor: 'yellow' }]} />
      <Text style={styles.legendText}>Previously Treated</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d3d3d3', 
    borderRadius: 10, 
    paddingVertical: 10, 
    paddingHorizontal:20,
    flex: 1,
    marginHorizontal: 5,
  },
  legendText: {
    fontSize: 14,
    marginLeft: 10, 
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default Legend;
