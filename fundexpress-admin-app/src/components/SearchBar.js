import React, { Component } from 'react';
import { View,  Text, ScrollView} from 'react-native';
import UserListDivider from './UserListDivider';
import { Container, Header, InputGroup, Input, Icon, Button, Content, List, ListItem } from 'native-base';

export default class SearchBarItem extends Component {

  constructor(props){
    super(props)
    this.state={
      allUsers:{},
      query : "",
      users: props.users,
      results: [],
      navigation: props.navigation,
      renderCancelButton: false,
    }
  }


  onSearch(){
    var usersToRender = []
    for (i=0; i<this.state.users.length;i++){
      var currentUser = this.state.users[i];
      if (currentUser.fullName.toLowerCase().includes(this.state.query.toLowerCase())){
        usersToRender.push(currentUser);
        //console.log(usersToRender)
      }

    }
    this.setState({results: usersToRender, /*query: ""*/})
    //this.setState({renderCancelButton: true, query: ""});
  }
  //either have a search button or a cancel button
  renderSearchOrCancel(){
    if (this.state.renderCancelButton==true){
      return(
        <Button transparent onPress={() => {this.setState({
          renderCancelButton: false,
          query: "",
          results:[]
        })
      }}>
            <Text style={{alignSelf:'center'}}>Cancel</Text>
        </Button>
      );
    } else {
      return (
        <Button transparent onPress={() => {
            this.onSearch();
            this.setState({
              renderCancelButton: true,

            });
          }
        }>
            <Text style={{alignSelf:'center'}}>Search</Text>
        </Button>
      );
    }

  }
  render() {
    //console.log(this.state.users);
    return (
      <View>
        <View searchBar rounded style={{flexDirection:"row"}}>

            <InputGroup style={{width:"80%"}}>
                <Icon name="ios-search" />
                <Input
                  name='query'
                  placeholder="Type a name"
                  //value={this.state.query}
                  onChangeText={query => {
                    this.setState({ query })
                    }
                }/>
            </InputGroup>
            {this.renderSearchOrCancel()}
        </View>
        {
          this.state.results.map((result) => {
            return (
              <ScrollView>
                <ListItem>
                  <Text key={result._id} onPress={() => {
                      this.state.navigation.navigate('UserHistory', {currentUser: result})
                    }
                  }>
                    {typeof result === 'object' && !(result instanceof Array) ? result.fullName : result.toString()}
                  </Text>
                </ListItem>
              </ScrollView>
            );
          })
        }
      </View>
    );
  }
}
/*        <Button
          onPress={() => this.onSearch()}
          icon={
            <Icon name={'search'} />
          }

        />*/
