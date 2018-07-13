import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

class Reflection extends Component {
  inspect() {
    alert('Reflection!');
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.inspect()}>
        <Text>Reflection!</Text>
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

export default Reflection;
