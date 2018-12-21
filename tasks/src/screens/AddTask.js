import React, { Component } from 'react'
import { Alert, View, Modal, Text, TextInput, 
    DatePickerIOS, DatePickerAndroid, 
    TouchableWithoutFeedback, StyleSheet, 
    TouchableOpacity, Platform } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import commomStyles from '../commomStyles'




export default class AddTask extends Component {
    constructor(props){
        super(props)
        this.state = this.getInitialState()
    }

    getInitialState = () => {
        return {
            desc: '',
            date: new Date(),
        }
    }

    save = () => {
        if (!this.state.desc.trim()){
            Alert.alert('Dados inválidos' , 'Descrição não foi preenchida')
            return
        }
        const data = {...this.state}
        this.props.onSave(data) // aqui que ele vai agir sobre os dados a serem salvos
        
    }

    handleDateAndroidChanged = () =>{
        DatePickerAndroid.open({
            date: this.state.date,
        }).then(e => {
            if (e.action !== DatePickerAndroid.dismissedAction){ // se não foi opção de ignorar a data
                const momentDate = moment(this.state.date)
                momentDate.date(e.day)  // seta o dia
                momentDate.month(e.month)
                momentDate.year(e.year)
                this.setState( { date : momentDate.toDate() } )
            }
        }

        )
    }

    render (){
        let datePicker = null
        if (Platform.OS === 'ios'){
            datePicker =  <DatePickerIOS mode='date' date={this.state.date} 
                        onDateChange={date => this.setState({ date })}></DatePickerIOS>
        }else{
            datePicker = (
                <TouchableOpacity onPress={this.handleDateAndroidChanged}>
                    <Text style={styles.date}>
                        {moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')}
                    </Text>
                </TouchableOpacity>
            )
        }
        return (
            <Modal onRequestClose={this.props.onCancel} 
                visible={this.props.isVisible} 
                animationType='slide' 
                transparent={true} 
                onShow={() => this.setState({...this.getInitialState()})}
                >
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa !</Text>
                    <TextInput style={styles.input} placeholder='TEste Descrição...' 
                        onChangeText={desc => this.setState({desc})} 
                        value={this.state.desc}></TextInput>

                {datePicker}
                    <View style={{ flexDirection : 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'

    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commomStyles.colors.default,

    },
    header: {
        fontFamily: commomStyles.fontFamily,
        backgroundColor: commomStyles.colors.default,
        color: commomStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 15,

    },
    input: {
        fontFamily: commomStyles.fontFamily,
        width: '90%',
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6,
    },
    date: {
        fontFamily: commomStyles.fontFamily,
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10,
        textAlign: 'center',

    }
})