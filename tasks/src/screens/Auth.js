import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import commomStyles from '../commomStyles'
import backgroundImage from '../../assets/imgs/login.jpg'
import AuthInput from '../components/AuthInput'
import axios from 'axios'  // requisicoes HTTP - npm i -s axios 
import { server, showError } from '../commom'

export default class Auth extends Component {
    state = {
        stageNew: false,
        name: '',
        email: '',
        password: '',
        confrmPassword: '',
    }

    // login ou cadastro
    // sempre que for usar um metodo assincrono (que aguarda dados requisicao por exemplo)
    // usa o async e um await 
    signinOrSignup = async () => {
        if (this.state.stageNew) {
            try {
                await axios.post(`${server}/cadastraUsuarios.php`, {
                    nome: this.state.name,
                    email: this.state.email,
                    senha: this.state.password,
                    confirmaSenha: this.state.confrmPassword
                })
                Alert.alert('Sucesso !', 'Usuário cadastrado com sucesso')
                this.setState({ stageNew: false})
            } catch (err){
                showError(err);
            }
        } else {
            try{
               // Alert.alert('Aviso','Login')

                fetch('http://www.loucosporofertas.com.br/teste.php',{
                //fetch('www.loucosporofertas.com.br/teste.php',{
                    method: 'POST', 
                    headers : {
                        'Accept': 'application/json, text/plain, */*', 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        key: 'text',
                        usuario: this.state.email,
                        senha: this.state.password
                    })
                } )
                             //  .then((response) => response.json())                
                .then((res) => {
                    alert(response.text())
                    console.log(res)
                    alert(res._bodyText)
                    alert(JSON.stringify(res.message))
                })
                .done()


                // const res = await axios.post(`${server}/login.php`,{
                //     usuario : this.state.email,
                //     senha: this.state.password
                // })
                // Alert.alert(res.data)
                // axios.defaults.headers.commom['Authorization'] = `bearer ${res.data.token}`
                // this.props.navigation.navigate('Home')

            } catch (err){
                showError(err);
            }
        }
    }

    render() {
        return (
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                <Text style={styles.title} >Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie sua conta' : 'Informe seus Dados'}
                    </Text>
                    {// aqui abaixo se for um stageNew ou seja novo cadastro ele ve o segundo parametro se nao pula para frente
                    }
                    { this.state.stageNew &&
                        <AuthInput icon='user' style={styles.input} placeholder='Nome' value={this.state.name} 
                            onChangeText={name => this.setState({name})}
                            ></AuthInput>
                    }
                    {// aqui abaixo funciona da mesma forma que :
                     //   this.setState({ email : email}) 
                    }
                    <AuthInput icon='at' placeholder='E-mail' style={styles.input} value={this.state.email} 
                        onChangeText={email => this.setState({email})} ></AuthInput>
                    <AuthInput icon='lock' secureTextEntry={true}  placeholder='Senha' style={styles.input} value={this.state.password} 
                        onChangeText={password => this.setState({password})} ></AuthInput>
                    { this.state.stageNew &&
                        <AuthInput icon='asterisk' secureTextEntry={true} style={styles.input} placeholder='Confirma Senha' value={this.state.confirmPassword} 
                            onChangeText={confirmPassword => this.setState({confirmPassword})}
                            ></AuthInput>
                    }
                    <TouchableOpacity 
                        onPress={this.signinOrSignup}  >
                        <View style={styles.button}>
                            <Text style={styles.buttonText} >
                                { this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity> 
                </View>
                <TouchableOpacity style={{ padding: 10, }} 
                        onPress={() => this.setState({
                            stageNew : !this.state.stageNew
                }) }>
                <Text style={styles.buttonText}>
                {
                    this.state.stageNew ? 'Já possui conta ?' : 'Anda não possui conta ?'
                }
                </Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: commomStyles.fontFamily,
        color: '#FFF',
        fontSize: 70,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commomStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%',
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        

    },
    buttonText: {
        fontFamily: commomStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
    }
})