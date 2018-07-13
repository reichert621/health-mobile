import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Activities } from '../container';

class Home extends Component {
  render() {
    return (
      <View style={styles.today}>
        <Text style={styles.title}>Activities</Text>
        <Activities />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginVertical: 16,
    textAlign: 'center'
  },
  today: {
    marginTop: 40
  }
});

export default Home;
