// import React from 'react'
// import { View } from 'react-native'

// export default function User (props) {
//   console.tron.log(props)

//   return (
//     <View></View>
//   )
// }

//S>----------------------------------------------------------------------------------------<//

// import React from 'react'
// import { View } from 'react-native'

// export default function User ({ navigation }) {
//   console.tron.log(navigation.getParam('user'))

//   return (
//     <View></View>
//   )
// }

//S>----------------------------------------------------------------------------------------<//



import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import api from '../../services/api'

import { Container, Header, Avatar, Name, Bio, Stars, Starred, OwnerAvatar, 
          Info, Title, Author, Indicator 
      } from './styles'

export default class User extends Component {
  // static navigationOptions = {
  //   title: 'Usuário',
  // }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  })

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired
  }

  state = {
    stars: [],
    loading: false,
    page: 1,
    refreshing: false,
  }

  async componentDidMount() {
    const { stars, page } = this.state
    const { navigation } = this.props
    const user = navigation.getParam('user')

    this.setState({ loading: true, refreshing: true })

    const response = await api.get(`/users/${user.login}/starred?page=${page}`)

    this.setState({ 
      stars: [...stars, ...response.data ], 
      loading: false,
      refreshing: false 
    })
  }
  
  loadMore = async () => {
    const { page, stars, refreshing } = this.state
    const { navigation } = this.props
    const user = navigation.getParam('user')
    // console.tron.log('loadmore', this.state.page)
    // this.setState({
    //   // page: page + 1 
    //   refreshing: true, 
    // })

    const response = await api.get(`/users/${user.login}/starred?page=${page + 1}`)

    this.setState({ 
      stars: [...stars, ...response.data ], 
      page: page + 1,
      // refreshing: false 
    })    
  }

  refreshList = async () => {
    const { page, stars, refreshing } = this.state
    const { navigation } = this.props
    const user = navigation.getParam('user')
    this.setState({
      // page: page + 1 
      refreshing: true, 
    })
    console.tron.log('refreshList', this.state.page)

    const response = await api.get(`/users/${user.login}/starred?page=1`)

    this.setState({ 
      stars: response.data, 
      page: 1,
      refreshing: false 
    })    
  }

  handleNavigate = (repository) => {
    const { navigation } = this.props
    // console.tron.log('handleNavigate')
    navigation.navigate('Repository', { repository })
  }


  render() {
    const { navigation } = this.props
    const { stars, loading, refreshing } = this.state

    const user = navigation.getParam('user')

    console.tron.log('render_stars', stars)
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        { loading ? (
            <Indicator>
              <ActivityIndicator size="large" color="#3CF3FF" />
            </Indicator>
          ) : (
            <Stars
              data={stars}
              onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
              refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
              keyExtractor={star => String(star.id)}
              onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
              onEndReached={this.loadMore} // Função que carrega mais itens
              renderItem={({ item }) => (
                <Starred onPress={() => this.handleNavigate(item.html_url)}>
                  <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              )}
            />
          )
        }
      </Container>
    )

  }

}