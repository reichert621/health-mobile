import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AssessmentCard = ({ title, assessment, onSelect }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.action}>Start</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 8,
    marginTop: 8,
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 24,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.16,
    width: '90%'
  },
  title: {
    color: '#595557',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1.6
  },
  action: {
    color: '#B88C5A',
    fontWeight: '100',
    fontSize: 14,
    letterSpacing: 1.2
  }
});

export default AssessmentCard;
