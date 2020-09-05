import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import FortuneTellerBox from '../../components/FortuneTellerBox';
import Header from '../../components/Header';
import TabNavContainer from '../../components/TabNavContainer';
import {Transition} from 'react-navigation-fluid-transitions';
import makeSelectFortuneTellers from './selectors';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {genderTranslate} from '../../helpers';
import {loadData} from './actions';
import {makeSelectCurrentUser} from '../auth/selectors';
export class FortuneTellers extends Component {
  static navigationOptions = {
    title: 'Falcılar',
  };

  async componentDidMount() {
    this.props.getData();
  }

  render() {
    const {navigation, FortuneTellers, CurrentUser} = this.props;
    return (
      <TabNavContainer>
        <Header title="Falcılar" />
        <View
          style={{
            width: '100%',
            height: '100%',
          }}>
          <FlatList
            style={{
              alignSelf: 'stretch',
              width: '100%',
              paddingTop: 50,
            }}
            data={FortuneTellers.list}
            overScrollMode="never"
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Transition shared={'profileæ' + item.id}>
                <FortuneTellerBox
                  key={item.id}
                  image={item.photo}
                  title={item.firstName + ' ' + item.surname}
                  desc={item.age + ', ' + genderTranslate(item.gender)}
                  waitTime={item.waitTime}
                  status={'Online'}
                  isLastItem={index == FortuneTellers.list.length - 1}
                  onPress={() =>
                    navigation.navigate('FortuneTellerDetail', {item: item})
                  }
                />
              </Transition>
            )}
          />
        </View>
      </TabNavContainer>
    );
  }
}

const styles = StyleSheet.create({});

FortuneTellers.propTypes = {};

const mapStateToProps = createStructuredSelector({
  FortuneTellers: makeSelectFortuneTellers(),
  CurrentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    getData() {
      dispatch(loadData());
    },
  };
}

//export default withProgressBar(App);

export default connect(mapStateToProps, mapDispatchToProps)(FortuneTellers);
