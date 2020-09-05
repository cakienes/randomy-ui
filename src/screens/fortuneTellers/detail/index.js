import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  Animated,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/Header';
import TabNavContainer from '../../../components/TabNavContainer';
import {Transition} from 'react-navigation-fluid-transitions';
import FortuneTellerBox from '../../../components/FortuneTellerBox';
import {genderTranslate} from '../../../helpers';
import {createStructuredSelector} from 'reselect';
import {makeSelectCurrentUser} from '../../auth/selectors';
import {connect} from 'react-redux';
import {fortuneSend} from '../actions';

class FortuneTellerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mountAnim: new Animated.Value(0),
    };
  }

  SearchPressInAnim = () => {
    Animated.timing(this.state.mountAnim, {
      toValue: 10,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };
  SearchPressOutAnim = () => {
    Animated.timing(this.state.mountAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  sendFortune = (id, type) => {
    const data = {fortuneTellerId: id, type: type};
    this.props.navigation.navigate('FortuneSend', {data});
  };

  componentDidMount() {
    this.SearchPressInAnim();
    BackHandler.addEventListener('hardwareBackPress', this.SearchPressOutAnim);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  static navigationOptions = {
    title: 'Falcılar',
  };
  render() {
    const {navigation} = this.props;
    const {item} = navigation.state.params;

    return (
      <TabNavContainer>
        <View
          style={{
            width: '100%',
            height: '100%',
          }}>
          <Transition shared={'profileæ' + item.id}>
            <FortuneTellerBox
              key={item.id}
              boxHeigth={300}
              image={item.photo}
              title={item.firstName + ' ' + item.surname}
              desc={item.age + ', ' + genderTranslate(item.gender)}
              waitTime={item.waitTime}
              status={'Online'}
              isLastItem={false}
            />
          </Transition>
          <Animated.View
            style={[
              styles.fortuneTellerDetailBox,
              {
                transform: [
                  {
                    translateY: this.state.mountAnim.interpolate({
                      inputRange: [0, 10],
                      outputRange: [1000, 0],
                    }),
                  },
                ],
              },
            ]}>
            <Text style={styles.descTitle}>Biografi</Text>
            <Text style={styles.descInfo}>{item.bio}</Text>
            <Text style={styles.descTitle}>Lorem Ipsum</Text>
            <Text style={styles.descInfo}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              cursus blandit tempor. Sed malesuada vel tellus eget elementum.
              Vestibulum sodales, leo ac maximus consectetur, est purus
              venenatis lacus, ut pharetra ex mauris sed lectus. Duis convallis
              bibendum libero vitae egestas. Praesent in eleifend diam. Fusce
              convallis lobortis viverra. In egestas turpis eget dignissim
              maximus. Nullam commodo nulla dui, at aliquam nunc feugiat non.
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.sendView,
              {
                transform: [
                  {
                    translateY: this.state.mountAnim.interpolate({
                      inputRange: [0, 10],
                      outputRange: [1000, 0],
                    }),
                  },
                ],
              },
            ]}>
            <Animated.View
              style={[
                styles.sendBox,
                {
                  transform: [
                    {
                      translateX: this.state.mountAnim.interpolate({
                        inputRange: [0, 10],
                        outputRange: [-1000, 0],
                      }),
                    },
                  ],
                },
              ]}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.sendBoxTouch}
                onPress={() => this.sendFortune(item.id, 'fg')}>
                <Text style={styles.sendBoxText}>Fal Gönder</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={[
                styles.appointmentBox,
                {
                  transform: [
                    {
                      translateX: this.state.mountAnim.interpolate({
                        inputRange: [0, 10],
                        outputRange: [1000, 0],
                      }),
                    },
                  ],
                },
              ]}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.sendBoxTouch}
                onPress={() => this.sendFortune(item.id, 'ki')}>
                <Text style={styles.sendBoxText}>Kahvemi içiyorum</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>
      </TabNavContainer>
    );
  }
}

const styles = StyleSheet.create({
  fortuneTellerDetailBox: {
    backgroundColor: 'rgba(227,227,227,0.1)',
    height: 400,
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 15,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    flexDirection: 'column',
  },
  descTitle: {
    width: '100%',
    fontSize: 22,
    marginTop: 15,
    color: 'white',
  },
  descInfo: {
    width: '100%',
    color: '#eee',
  },
  sendView: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginHorizontal: 15,
    marginTop: 10,
  },
  sendBox: {
    flex: 1,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBoxTouch: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentBox: {
    flex: 1,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBoxText: {
    color: 'white',
    fontSize: 16,
  },
});

FortuneTellerDetail.propTypes = {};

const mapStateToProps = createStructuredSelector({
  CurrentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    fortuneSend(values, successFunc) {
      dispatch(fortuneSend(values, successFunc));
    },
  };
}

//export default withProgressBar(App);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FortuneTellerDetail);
