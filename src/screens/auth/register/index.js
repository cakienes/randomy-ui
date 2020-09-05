import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import makeSelectFortuneTellers from '../selectors';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {} from '../actions';
import {Formik} from 'formik';
import LinearGradient from 'react-native-linear-gradient';

export class Register extends Component {
  static navigationOptions = {
    title: 'Register',
  };

  componentDidMount() {}

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <LinearGradient
          colors={['#1F2C7C', '#8B2E74', '#B33370']}
          start={{x: 1.0, y: 1.0}}
          end={{x: 0.0, y: 0.0}}
          style={{height: '100%', width: '100%', alignItems: 'center'}}>
          <View>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '700',
                color: 'white',
                paddingVertical: 20,
                marginTop: 60,
              }}>
              FALCI İLKER
            </Text>
          </View>
          <View style={styles.formContainer}>
            <Formik
              initialValues={{email: ''}}
              onSubmit={values => {
                navigation.navigate('MainPage');
              }}>
              {({handleChange, handleBlur, handleSubmit, values}) => (
                <>
                  <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder="Email"
                    style={styles.input}
                    placeholderTextColor="rgba(255,255,255,0.5)"
                  />
                  <TextInput
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="Şifre"
                    style={styles.input}
                    placeholderTextColor="rgba(255,255,255,0.5)"
                  />
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Giriş Yap</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'stretch',
              }}>
              <TouchableOpacity style={styles.textButton}>
                <Text style={styles.textButtonText}>Şifremi Unuttum</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.textButton}>
                <Text style={styles.textButtonText}>Üye Ol</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    backgroundColor: 'pink',
    height: 130,
    width: 130,
    borderRadius: 65,
    marginTop: 120,
  },
  formContainer: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  input: {
    alignSelf: 'stretch',
    marginVertical: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 8,
    paddingHorizontal: 20,
    color: 'white',
    fontSize: 20,
  },
  submitButton: {
    alignSelf: 'stretch',
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.7)',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 20,
  },
  textButton: {
    marginTop: 15,
  },
  textButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

Register.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
