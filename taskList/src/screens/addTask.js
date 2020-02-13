import React, {Component } from 'react'
import {Modal, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TextInput, Text, Platform} from 'react-native'
import commonStyles from '../commonStyles'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

const initialState = {
    desc: '',
    date: new Date(),
    showDatePicker: false
}

export default class addTask extends Component {
    state = {
        ...initialState
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        if (this.props.onSave) {
            this.props.onSave(newTask)
        }
        this.setState({...initialState})
    }

    getDateTimePicker = () => {
        let datePicker = <DateTimePicker 
        value = {this.state.date}
        onChange = {(_, date) => this.setState({date, showDatePicker: false})}
        mode = 'date'/>

        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress = {() => this.setState({showDatePicker: true})}>
                        <Text style = {styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker
    }

    render () {
        return (
            <Modal transparent = {true} visible = {this.props.isVisible}
            onRequestClose = {this.props.onCancel}
            animationType = 'slide'>
                <TouchableWithoutFeedback onPress = {this.props.onCancel}>
                    <View style = {styles.background}>

                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <View style = {styles.container}>
                        <Text style = {styles.header}>Nova Tarefa</Text>
                        <TextInput style = {styles.input} 
                        placeholder = 'Informe a descrição'
                        onChangeText = {desc => this.setState({desc})}
                        value = {this.state.desc}>
                        </TextInput>
                        {this.getDateTimePicker()}
                        <View style = {styles.botoes}>
                            <TouchableOpacity onPress = {this.props.onCancel}>
                                <Text style = {styles.button}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {this.save}>
                            <Text style = {styles.button}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress = {this.props.onCancel}>
                    <View style = {styles.background}>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: 'white'
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15
    },
    botoes: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        width: '90%',
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#b3b3b3',
        borderRadius: 6
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today

    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }
})