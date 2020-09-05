import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import PersonBox from '../../../components/PersonBox';

export default class ChoosePerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatListIndex: 0,
    };
  }

  nextQuestionFunc = () => {
    console.log(this.state.flatListIndex);

    let index = this.state.flatListIndex;
    if (index == 6) {
      index = 0;
    } else {
      index++;
    }
    this.setState({flatListIndex: index}, () =>
      this.flatListRef.scrollToIndex({
        animated: true,
        index: this.state.flatListIndex,
      }),
    );
  };
  render() {
    return (
      <FlatList
        ref={ref => {
          this.flatListRef = ref;
        }}
        style={{height: '100%', width: '100%'}}
        data={[
          {
            p1: 'https://i.picsum.photos/id/239/300/450.jpg',
            p2: 'https://i.picsum.photos/id/238/300/450.jpg',
            p3: 'https://i.picsum.photos/id/231/300/450.jpg',
            p4: 'https://i.picsum.photos/id/223/300/450.jpg',
          },
          {
            p1: 'https://i.picsum.photos/id/240/300/450.jpg',
            p2: 'https://i.picsum.photos/id/237/300/450.jpg',
            p3: 'https://i.picsum.photos/id/229/300/450.jpg',
            p4: 'https://i.picsum.photos/id/222/300/450.jpg',
          },
          {
            p1: 'https://i.picsum.photos/id/242/300/450.jpg',
            p2: 'https://i.picsum.photos/id/236/300/450.jpg',
            p3: 'https://i.picsum.photos/id/228/300/450.jpg',
            p4: 'https://i.picsum.photos/id/221/300/450.jpg',
          },
          {
            p1: 'https://i.picsum.photos/id/243/300/450.jpg',
            p2: 'https://i.picsum.photos/id/235/300/450.jpg',
            p3: 'https://i.picsum.photos/id/227/300/450.jpg',
            p4: 'https://i.picsum.photos/id/220/300/450.jpg',
          },
          {
            p1: 'https://i.picsum.photos/id/244/300/450.jpg',
            p2: 'https://i.picsum.photos/id/234/300/450.jpg',
            p3: 'https://i.picsum.photos/id/301/300/450.jpg',
            p4: 'https://i.picsum.photos/id/219/300/450.jpg',
          },
          {
            p1: 'https://i.picsum.photos/id/500/300/450.jpg',
            p2: 'https://i.picsum.photos/id/233/300/450.jpg',
            p3: 'https://i.picsum.photos/id/225/300/450.jpg',
            p4: 'https://i.picsum.photos/id/218/300/450.jpg',
          },
          {
            p1: 'https://i.picsum.photos/id/501/300/450.jpg',
            p2: 'https://i.picsum.photos/id/232/300/450.jpg',
            p3: 'https://i.picsum.photos/id/502/300/450.jpg',
            p4: 'https://i.picsum.photos/id/217/300/450.jpg',
          },
        ]}
        horizontal={true}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index, separators}) => (
          <View>
            <View style={styles.personBoxRow}>
              <View style={styles.personBoxHolder}>
                <PersonBox
                  nextQuestionFunc={this.nextQuestionFunc}
                  pictureUrl={item.p1}
                />
              </View>
              <View style={styles.personBoxHolder}>
                <PersonBox
                  nextQuestionFunc={this.nextQuestionFunc}
                  pictureUrl={item.p2}
                />
              </View>
            </View>
            <View style={styles.personBoxRow}>
              <View style={styles.personBoxHolder}>
                <PersonBox
                  nextQuestionFunc={this.nextQuestionFunc}
                  pictureUrl={item.p3}
                />
              </View>
              <View style={styles.personBoxHolder}>
                <PersonBox
                  nextQuestionFunc={this.nextQuestionFunc}
                  pictureUrl={item.p4}
                />
              </View>
            </View>
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  personBoxHolder: {
    position: 'relative',
    margin: 10,
  },
  personBoxRow: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
