
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableOpacity} from 'react-native';
import Toolbar from '../components/Toolbar';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { currentDelivery } from '../reducers/completedReducer';


class Deliveries extends Component {
  static navigationOptions = {
    header: null,
    };

    constructor(props) {
      super(props);
      this.state = {
        deliveryArray: [],
        userArray: {}
      } 
    };

    componentWillMount() {
      //writeNewPost(5, 'username', 'user@email.com', 'user', 'name', 'location');
      this.fetchData();
    }
    fetchData = async () => {
        var data1 = [];
        var data2 = [];
        var fireBaseResponse = firebase.database().ref('deliveries');
        fireBaseResponse.once('value').then(snapshot => {
            snapshot.forEach(item => {
                var temp = item.val();
                data1.push(temp);
                
                return false;
            });
        
            this.setState (
              {deliveryArray: data1} 
            )
            
        });
        fireBaseResponse = firebase.database().ref('users');
        fireBaseResponse.once('value').then(snapshot => {
            snapshot.forEach(item => {
                var temp = item.val();
                data2.push({
                  key: item.key,
                  value: temp
                });
                return false;
            });
           
            this.setState (
              {userArray: data2} 
            )
            
        });
    }

    getFirstName = (userId) => {
      for (i = 0; i < this.state.userArray.length; i++) {
        if(this.state.userArray[i].key == userId) {
          return this.state.userArray[i].value.firstName;
        }
      }
    }

    getLocation = (userId) => {
      for (i = 0; i < this.state.userArray.length; i++) {
        if(this.state.userArray[i].key == userId) {
          return this.state.userArray[i].value.location;
        }
      }
    }

    getEmail = (userId) => {
      for (i = 0; i < this.state.userArray.length; i++) {
        if(this.state.userArray[i].key == userId) {
          return this.state.userArray[i].value.email;
        }
      }
    }
    
    waitOrConfirm = (item) => {  
      this.props.currentDelivery(item.id)
      this.props.navigation.navigate('RequestStatus', {
        //confirm: item.confirmedEmail,
        item: item,
      });
    }


    render() {
    return (
      <View style={styles.container}>
            <Toolbar pageType={'Driver'} navigation={this.props.navigation} title={'Deliveries'}/>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: Dimensions.get('screen').height*.01}}>
                <FlatList
                    data= {this.state.deliveryArray}
                    keyExtractor = {(item, index) => index.toString()}
                    renderItem = {
                        ({item, index}) => {
                            return (  
                            <TouchableOpacity onPress={this.waitOrConfirm.bind(this, item)}>                              
                                    <View style={[styles.rectangles, {backgroundColor: '#fff'}]}>
                                      <View style={styles.subView}>
                                        <Text style = {styles.name}>{this.getFirstName(item.buyer)}</Text>
                                        <Text style = {styles.location}>{this.getLocation(item.buyer)}</Text>
                                      </View>
                                      <Text style = {styles.packageSize}>{item.packageSize}</Text>
                                      <Text style = {styles.email}>{this.getEmail(item.buyer)}</Text>
                                    </View> 
                                </TouchableOpacity>   
                            )
                        }
                    }
                />  
              </View>  
        </View>   
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F3F3',
  },
  subView: {
    flexDirection: 'row', 
    alignItems: 'center',
    width: Dimensions.get("screen").width,
  },
  header: {
    fontSize: 40,
    color:  '#fff',
    textAlign: 'center',
    width: Dimensions.get("screen").width,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: Dimensions.get("screen").width*.01,
    marginBottom: Dimensions.get("screen").width*.13
  },
  name: {
    fontSize: 30,
    color: '#212121',
    textAlign: 'left',
    fontFamily: 'Montserrat-Bold',
    marginLeft: Dimensions.get("screen").width*.06,
    paddingTop: Dimensions.get("screen").height*.03,
    paddingRight: Dimensions.get("screen").width*.40,
  },
  packageSize: {
    fontSize: 18,
    color:  '#212121',
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
    marginLeft: Dimensions.get("screen").width*.06,
    marginTop: Dimensions.get("screen").height*.005,
  },
  email: {
    fontSize: 18,
    color:  '#212121',
    textAlign: 'left',
    fontFamily: 'Montserrat-Light',
    marginLeft: Dimensions.get("screen").width*.06,
    marginTop: Dimensions.get("screen").height*.005,
  },
  location: {
    fontSize: 18,
    color:  '#212121',
    textAlign: 'left',
    fontFamily: 'Montserrat-Bold',
    marginLeft: Dimensions.get("screen").width*.02,
    paddingHorizontal: Dimensions.get("screen").width*.05,
    paddingTop: Dimensions.get("screen").height*.03,
  },
  rectangles: {
    width: Dimensions.get("screen").width*.90,
    height: Dimensions.get("screen").height*.17,
    marginTop: Dimensions.get("screen").height*.035,
    borderColor: '#19C6D1',
    borderWidth: 1.5,
    borderRadius: 5,
    shadowOffset: { width: 0, height: Dimensions.get("screen").height*.005 },
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
});

const mapStateToProps = state => {
  return {
    currentId: state.id
  }
}

const mapDispatchToProps = {
  currentDelivery
}

export default connect(mapStateToProps, mapDispatchToProps)(Deliveries);
