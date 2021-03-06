import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, TextInput} from 'react-native';
import PrimaryButton from './../components/PrimaryButton';
import Toolbar from '../components/Toolbar';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { setUser } from '../reducers/completedReducer';
import { AsyncStorage } from "react-native";

const database = firebase.database();

class AccountProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editor: true, email: '', password: '', phoneNumber: '', venmo: '', location: ''};
  }

  static navigationOptions = {
    header: null,
    };

  componentWillMount = async () => {
    const self = this;
    const userId = await AsyncStorage.getItem('userId');
    self.mounted = true;
    if (userId !== null) {
      self.props.setUser(userId)
    }
    database.ref(`users/${this.props.userId}`).on("value", function (userSnapshot) {
      if (self.mounted) {
      self.setState({
        email: userSnapshot.val().email,
        password: userSnapshot.val().password,
        phoneNumber: userSnapshot.val().phoneNumber,
        venmo: userSnapshot.val().venmo,
        location: userSnapshot.val().location,
      })
    }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onPress = () => {
    this.setState({
      editor: !this.state.editor
    })
    database.ref(`users/${this.props.userId}`).set({
      email: this.state.email,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
      venmo: this.state.venmo,
      location: this.state.location,
    })
  }

  updatingUser = () => {
    database.ref(`users/${this.props.userId}`).update({
      email: this.state.email,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
      venmo: this.state.venmo,
      location: this.state.location,
    })
    }

    goBack = () => {	   
      this.props.navigation.navigate('ShopSearch')
    }	  
    
    logOut = () => {
      database.ref(`users/${this.props.userId}`).update({
        loggedIn: false,
      })
      AsyncStorage.removeItem('userId')
      this.props.setUser(null)
      this.props.navigation.navigate('Welcome')
    }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar title={'Account Profile'} pageType={'Profile'}/>
        <View style={styles.subView}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.goBack}>	            
              <Image style={styles.arrowIcon}	             
                  source={require('./../assets/images/left-arrow.png')} />	                 
              <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: Dimensions.get('screen').width * 0.5}} onPress={this.logOut}>
              <Text style={styles.logoutText}>Log Out</Text>	 
          </TouchableOpacity>             
        </View>
        <View style={styles.whiteBox}>
            <View>
              <View style={styles.textIcon}>
                <TextInput style={styles.subHeader} 
                editable={this.state.editor} 
                placeholder={'Email'}
                placeholderTextColor={'#2E2E2F'}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}>
                </TextInput>
                <View style={styles.lineStyle}/>
              </View>  
              <View style={styles.textIcon}>
                <TextInput style={styles.subHeader} 
                editable={this.state.editor} 
                placeholder={'Password'}
                placeholderTextColor={'#2E2E2F'}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}>
                </TextInput>
                <View style={styles.lineStyle}/>
              </View>  
              <View style={styles.textIcon}>
                <TextInput style={styles.subHeader} 
                editable={this.state.editor} 
                placeholder={'Phone Number'}
                placeholderTextColor={'#2E2E2F'}
                onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                value={this.state.phoneNumber}>
                </TextInput>
                <View style={styles.lineStyle}/>
              </View>
              <View style={styles.textIcon}>
                <TextInput style={styles.subHeader} 
                editable={this.state.editor} 
                placeholder={'Venmo Username'}
                placeholderTextColor={'#2E2E2F'}
                onChangeText={(venmo) => this.setState({venmo})}
                value={this.state.venmo}>
                </TextInput>
                <View style={styles.lineStyle}/>
              </View>  
              <View style={styles.textIcon}>
                <TextInput style={styles.subHeader} 
                editable={this.state.editor} 
                placeholder={'Dorm/Room Number'}
                placeholderTextColor={'#2E2E2F'}
                onChangeText={(location) => this.setState({location})}
                value={this.state.location}>
                </TextInput>
                <View style={styles.lineStyle}/>
              </View>    
            <View style={{alignItems: 'center'}}>
              <View style={styles.buttonStyle}>
                <PrimaryButton onPress={this.updatingUser} backgroundColor={'#19C6D1'} height={50} title={'Save'} fontSize={24}/>
              </View>
            </View>
            </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user,
});

const mapDispatchToProps = {
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfile)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    alignItems: 'flex-start',
  },
  textIcon: {
    marginBottom: Dimensions.get("screen").height * .02,
    marginTop: Dimensions.get('screen').height * .04,
  },
  buttonStyle: {
    marginTop: Dimensions.get('screen').height * .015,
    width: Dimensions.get('screen').width * .6,
  },
  subHeader: {
    color: '#2E2E2F',
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    marginLeft: Dimensions.get('screen').width*0.05,
    marginTop: Dimensions.get("screen").height*.02,
    
  },
  whiteBox: {
    flexDirection: 'column',
    width: Dimensions.get("screen").width*.91,
    height: Dimensions.get("screen").height*.6,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    marginTop: Dimensions.get("screen").height*.03,
    marginLeft: Dimensions.get("screen").width*.045,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#19C6D1',
  },
  header:{
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    fontSize: 46,
    textAlign: 'center',
    width: Dimensions.get("screen").width,
    marginTop: Dimensions.get("screen").height*.07,
  },
  editPencil: {
    width: 27,
    height: 27,
    marginRight: Dimensions.get('screen').width*0.05,
    marginTop: Dimensions.get('screen').height*0.02,
  },
  lineStyle: {
    width: Dimensions.get('screen').width*.7,
    height: 1, 
    backgroundColor: '#2E2E2F', 
    marginLeft: Dimensions.get('screen').width*0.05,
  },
  searchTextBox: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width,
    marginLeft: Dimensions.get('screen').width*.01,
    marginTop: Dimensions.get('screen').width*.08
  },
  searchText: {
    color: '#ffffff',
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    textAlign: 'left',
    marginLeft: Dimensions.get('screen').width*.008,
  },
  leftArrow: {
    width: 20,
    height: 22,
    marginLeft: Dimensions.get('screen').width*.01,
    
  },
  backText: {	 
    fontSize: 18,	   
    fontFamily: 'Montserrat-Regular',	    
    color: '#262626',	   
    marginLeft: Dimensions.get("screen").width*.01,	   
    marginTop: -Dimensions.get("screen").height*.006,
  },
  arrowIcon: {	  
    width: 20,	    
    height: 10,	   
  },
  subView: {	 
    flexDirection: 'row', 	    
    paddingHorizontal: Dimensions.get("screen").width*.05,	    
    marginTop: Dimensions.get("screen").height*.02	   
  },
  logoutText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: '#262626',
    marginLeft: Dimensions.get("screen").width * .008,
    marginTop: -Dimensions.get("screen").height * .006,
  },
});
