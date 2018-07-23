import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { login } from '../api/auth';

// TODO: move more logic to separate component
class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        username: '',
        password: ''
      }
    };
  }

  login() {
    const { navigation } = this.props;
    const { username, password } = this.state.credentials;

    return login({ username, password })
      .then(user => {
        console.log('Logged in!', user);

        return navigation.navigate('main');
      })
      .catch(err => {
        console.log('Error logging in!', err);

        return alert(`Invalid credentials! ${JSON.stringify(err)}`);
      });
  }

  handleInputChange(field, text) {
    const { credentials } = this.state;
    const updates = { ...credentials, [field]: text };

    return this.setState({ credentials: updates });
  }

  render() {
    // TODO: improve UI
    return (
      <View style={styles.login}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Log in</Text>
        <TextInput
          placeholder="Username"
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={this.handleInputChange.bind(this, 'username')}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          autoCorrect={false}
          onChangeText={this.handleInputChange.bind(this, 'password')}
        />
        <Button title="Log in" onPress={this.login.bind(this)} />
        <Button
          title="Need an account? Register here!"
          onPress={() => this.props.navigation.navigate('register')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 2,
    height: 50,
    width: '100%',
    padding: 8,
    marginBottom: 8
  }
});

export default LoginScreen;
