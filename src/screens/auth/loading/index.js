import React, {Component} from 'react';
import {StyleSheet, View, AsyncStorage} from 'react-native';
import makeSelectFortuneTellers from '../selectors';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import LinearGradient from 'react-native-linear-gradient';
import {setCurrentUser} from '../actions';
import {setTokenService} from '../../../utils/request';

export class Loading extends Component {
  static navigationOptions = {
    title: 'Loading',
  };

  componentDidMount() {
    this.checkUser();
  }

  checkUser = () => {
    const {setCurrentUser, navigation} = this.props;
    AsyncStorage.getItem('currentUser').then(
      currentUser => {
        if (currentUser != null && currentUser != 'null') {
          setCurrentUser(JSON.parse(currentUser));
          navigation.navigate('MainPage');
        }
        setCurrentUser(currentUser);
      },
      () => {
        navigation.navigate('Login');
      },
    );
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <LinearGradient
          colors={['#1F2C7C', '#8B2E74', '#B33370']}
          start={{x: 1.0, y: 1.0}}
          end={{x: 0.0, y: 0.0}}
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

Loading.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    setCurrentUser(value) {
      dispatch(setCurrentUser(value));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Loading);
