import React from 'react'
import {Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome5'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'
import moment from 'moment'

export default props => {
    let check = null
    if (props.doneAt != null) {
        check = (
            <View style = {styles.done}>
                <Icon name = 'check' size = {20} color = {commonStyles.colors.secondary}>
                    
                </Icon>
            </View>
        )
    } else {
        check = <View style = {styles.pendding}>

        </View>
    }

    const descStyle = props.doneAt != null ? 
    {textDecorationLine: 'line-through'} : {}

    const getRightContent = () => {
        return (
            <TouchableOpacity style = {styles.right} onPress = {() => props.onDelete(props.id)}>
                <Icon name = "trash" size = {30} color = "#fff" />
            </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return (
            <TouchableOpacity style = {styles.left}>
                <Icon name = "trash" size = {30} color = "#fff" />
                <Text style = {styles.excludeText}>
                    Excluir
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <Swipeable renderRightActions = {getRightContent} renderLeftActions = {getLeftContent}
        onSwipeableLeftOpen = {() => props.onDelete(props.id)}>
        <View style = {styles.container}>
            <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
            <View style = {styles.checkContainer}>
                {check}
            </View>
            </TouchableWithoutFeedback>
                <Text style = {[styles.description, descStyle]}>
                    {props.desc}
                </Text>
                <Text style = {styles.date}>
                    {moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM')}
                </Text>
            
        </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#aaa',
        backgroundColor: 'white'
    },
    checkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
    },
    pendding: {
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#4d7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    description: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12,
    },
    right: {
        backgroundColor: "red",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 20,
        margin: 10
    }
})