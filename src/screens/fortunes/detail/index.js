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
  ScrollView,
} from 'react-native';
import Header from '../../../components/Header';
import TabNavContainer from '../../../components/TabNavContainer';
import {Transition} from 'react-navigation-fluid-transitions';
import FortuneBox from '../../../components/FortuneBox';
import {genderTranslate} from '../../../helpers';
import {createStructuredSelector} from 'reselect';
import {makeSelectCurrentUser} from '../../auth/selectors';
import {connect} from 'react-redux';
import {fortuneSend} from '../actions';

class FortuneDetail extends Component {
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
            <FortuneBox
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
              styles.fortuneDetailBox,
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
            <ScrollView style={styles.fortuneDetailBoxScroll}>
              <Text style={styles.descTitle}>Lorem Ipsum</Text>
              <Text style={styles.descInfo}>{item.fortuneText}</Text>
            </ScrollView>
          </Animated.View>
        </View>
      </TabNavContainer>
    );
  }
}

const styles = StyleSheet.create({
  fortuneDetailBox: {
    backgroundColor: 'rgba(227,227,227,0.1)',
    height: 470,
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 15,
    alignSelf: 'stretch',
    flexDirection: 'column',
  },
  fortuneDetailBoxScroll: {
    paddingHorizontal: 20,
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
    marginBottom: 10,
    fontSize: 18,
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

FortuneDetail.propTypes = {};

const mapStateToProps = createStructuredSelector({
  CurrentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
  };
}

//export default withProgressBar(App);

export default connect(mapStateToProps, mapDispatchToProps)(FortuneDetail);
