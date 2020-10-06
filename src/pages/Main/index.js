import React,{Component} from 'react';

import {Keyboard, ActivityIndicator} from 'react-native';
import { 
  Container, 
  Form, 
  ButtonSubmit, 
  Input, 
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText
} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

class Main extends Component {
  state = {
    newUsers: '',
    users: [],
    loading: false
  };

  async componentDidMount(){
    const users = await AsyncStorage.getItem('users');

    if(users){
      this.setState({
        users: JSON.parse(users)
      });
    }
  }

  async componentDidUpdate(_, prevState){
    const {users} = this.state;

    if(prevState.users !== users){
      await AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }
  
  handleNavigatorToUser = user => {
    const {navigation} = this.props;
    navigation.navigate('User', { user });
  }

  handleAddUser = async () => {
    Keyboard.dismiss();

    const {users, newUsers} = this.state;
    if(newUsers.length === 0)
      return null;

    this.setState({
      loading: true
    });
    const response = await api.get(`/users/${newUsers.trim()}`);
    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url 
    };

    this.setState({
      users: [...users, data],
      newUsers: '',
      loading: false
    });
  }

  render() {
    const {users, newUsers, loading} = this.state;

    return (
      <>
        <Container>
          <Form>
            <Input 
              placeholder='Adicionar Usuario'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={text => this.setState({ newUsers: text })}
              onSubmitEditing={this.handleAddUser}
              returnKeyType='send'
              value={newUsers}
            />
  
            <ButtonSubmit
              onPress={this.handleAddUser}
              loading={loading}
            >
              {
                loading ? 
                (<ActivityIndicator color='#fff' />)
                :
                (<Icon
                  name='add'
                  size={30}
                  color='#FFF'
                />)
              }
              
            </ButtonSubmit>
          </Form>

          <List 
             data={users}
             keyExtractor={key => key.login}
             renderItem={({ item }) => (
               <User>
                 <Avatar source={{ uri: item.avatar }} />

                 <Name>{item.name}</Name>
                 <Bio>{item.bio}</Bio>

                 <ProfileButton 
                  onPress={() => this.handleNavigatorToUser(item)}
                 >
                   <ProfileButtonText>Ver Perfil</ProfileButtonText>
                 </ProfileButton>
               </User>
             )}
          />
        </Container>
      </>
    );
  }
}

export default Main;