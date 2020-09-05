import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import Header from '../../components/Header';
import TabNavContainer from '../../components/TabNavContainer';
import FortuneBox from '../../components/FortuneBox';
import {Transition} from 'react-navigation-fluid-transitions';
import {genderTranslate} from '../../helpers';
import makeSelectFortunes from './selectors';
import {makeSelectCurrentUser} from '../auth/selectors';
import {loadFortunes} from './actions';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

class Fortunes extends Component {
  async componentDidMount() {
    this.props.getData();
  }
  render() {
    const {navigation, Fortunes, CurrentUser} = this.props;
    console.warn(Fortunes);
    return (
      <TabNavContainer>
        <Header title="Fallarım" />
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
            data={Fortunes.list}
            overScrollMode="never"
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Transition shared={'profile-' + item.id}>
                <FortuneBox
                  key={item.id}
                  image={item.photo}
                  title={item.firstName + ' ' + item.surname}
                  desc={''}
                  waitTime={item.waitTime}
                  status={item.status}
                  isLastItem={index == Fortunes.list.length - 1}
                  onPress={() =>
                    navigation.navigate('FortuneDetail', {item: item})
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

Fortunes.propTypes = {};

const mapStateToProps = createStructuredSelector({
  Fortunes: makeSelectFortunes(),
  CurrentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    getData() {
      dispatch(loadFortunes());
    },
  };
}

//export default withProgressBar(App);

export default connect(mapStateToProps, mapDispatchToProps)(Fortunes);
