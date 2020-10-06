import React,{Component} from 'react';

import api from '../../services/api';

import { 
  Container,
  Header, 
  Avatar, 
  Name, 
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
  LoadingText
} from './styles';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import WebView from 'react-native-webview';

class User extends Component {

  state = {
    stars: [],
    loading: true,
    page: 1,
    refreshing: false,
    webview: false,
    webviewUrl: ''
  };

  async componentDidMount() {
    const {page, stars} = this.state;
    const {user} = this.props.route.params;

    this
    .props
    .navigation
    .setOptions({
      title: user.name
    });

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page
      }
    });

    this.setState({
      stars: response.data,
      loading: false
    });
  }

  loadMore = async () => {
    const {user} = this.props.route.params;
    const nextPage = (this.state.page + 1);
    const {stars} = this.state;

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page: nextPage
      }
    });

    this.setState({
      stars: [...stars, ...response.data],
      page: nextPage
    });
  }

  refreshList = async () => {
    this.setState({
      refreshing: true
    });
    const {user} = this.props.route.params;

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page: 1
      }
    });

    this.setState({
      stars: response.data,
      refreshing: false,
      page: 1
    });
  }

  render() {
    const {stars, loading, refreshing, webview, webviewUrl} = this.state;
    const {user} = this.props.route.params;
    
    if(loading) {
      return(
        <Loading>
          <ActivityIndicator
            color='#FFF'
            size='large'
          />
          <LoadingText>Carregando...</LoadingText>
        </Loading>
      );
    }
    
    if(webview) {
      return( <WebView 
        source={{ uri: webviewUrl }}
        style={{ flex: 1 }}
      /> );
    }

    return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />

        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      <Stars
        data={stars}
        keyExtractor={star => String(star.id)}
        onEndReachedThreshold={0.2}
        onEndReached={this.loadMore}
        onRefresh={this.refreshList}
        refreshing={refreshing}
        renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }}/>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => this.setState({
                  webview: true,
                  webviewUrl: item.html_url
                  })}>
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </TouchableOpacity>
            </Starred>
          )
        }
      />
    </Container>);
  }
}

export default User;