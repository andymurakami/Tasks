import {Alert, Platform} from 'react-native'

// servidor: exacon.mysql.uhserver.com
// user: exacon
// password: exa77*
// banco: exacon
const server = Platform.OS === 'ios' ? 'http://www.loucosporofertas.com.br/' : 'http://www.loucosporofertas.com.br'

function showError(err){
    Alert.alert('Ops ! Ocorreu um problema.', `Mensagem: ${err}`)
}

export { server, showError }
