import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import commomStyles from '../commomStyles'
import Swipeable from 'react-native-swipeable'


export default props => {
    let check = null
    if (props.doneAt !== null) {
        check = (
            <View style={styles.done}>
                <Icon name='check' size={20} color={commomStyles.colors.secondary}></Icon>
            </View>
        )
    } else {
        check = <View style={styles.pending} ></View>
    }

    const descStyle = props.doneAt !== null ?
        { textDecorationLine: 'line-through' } : {}

    const leftContent = (
        <View style={styles.exclude}>
            <Icon name='trash' size={20} color='#FFF'></Icon>
            <Text style={styles.excludeText}>Excluir</Text>
        </View>
    )
    // rightContent pode ser array
    const rightContent = [
        <TouchableOpacity style={[styles.exclude, { justifyContent: 'flex-start', paddingLeft: 20 }]}
            onPress={() => props.onDelete(props.id)} >
            <Icon name='trash' size={30} color='#FFF' ></Icon>
        </TouchableOpacity>

    ]


    return (

        <Swipeable leftActionActivationDistance={200}
            onLeftActionActivate={() => props.onDelete(props.id)}
            leftContent={leftContent}
            rightButtons={rightContent} >

            <View style={styles.container}>
                {
                    // arrow function '() =>'  foi usado pq precisava de um parametro(props.id) na funcao callBack do 
                    // onPress, caso contrario funcao anonima javascript normal
                }
                <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)} >
                    <View style={styles.checkContainer}>{check}</View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.description, descStyle]}>
                        {props.desc}
                    </Text>
                    <Text style={styles.data}>
                        {
                            moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM')

                        }
                    </Text>
                </View>
            </View>
        </Swipeable>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#AAA',
    },
    checkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',

    },
    pending: {
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: '#555',

    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center',

    },
    description: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.mainText,
        fontSize: 15,

    },
    date: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.subText,
        fontSize: 12,
    },
    exclude: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    excludeText: {
        fontFamily: commomStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10,
    }
})