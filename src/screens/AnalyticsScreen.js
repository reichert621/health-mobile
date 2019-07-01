import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

class AnalyticsScreen extends Component {
  inspect() {
    alert('TODO: Create analytics!');
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.inspect()}>
        <Text>Analytics!</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AnalyticsScreen;
