import React, {Component} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {anonymousLogin} from '../api';
export class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  anonymousLogin = () => {
    const {anonymousLogin, navigation} = this.props;
    anonymousLogin().then(() => {
      debugger;
      navigation.navigate('MainPage');
    });
  };

  render() {
    return (
      <View style={styles.loginBackground}>
        <View style={styles.loginWithInstagram}>
          <Button title="Anonymous Sign In" onPress={this.anonymousLogin} />
        </View>
      </View>
    );
  }
}

Login.propTypes = {};

const styles = StyleSheet.create({
  loginBackground: {
    backgroundColor: 'white',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  appNameHolder: {
    marginTop: 20,
    marginBottom: 20,
  },
  appName: {
    textAlign: 'center',
    fontSize: 44,
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Arial,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif!important',
  },
  loginWithInstagram: {
    height: 100,
  },
});

const mapStateToProps = createStructuredSelector({});

export const mapDispatchToProps = dispatch => ({
  anonymousLogin: () => dispatch(anonymousLogin()),
});

//export default withProgressBar(App);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
