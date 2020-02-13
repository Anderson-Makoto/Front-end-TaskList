import React from 'react'
import {StyleSheet, View, Text, ImageBackground, FlatList, TouchableOpacity, Alert} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../resources/today.jpg'
import commonStyles from '../commonStyles'
import Task from '../component/task'
import Icon from 'react-native-vector-icons/FontAwesome5Pro'
import AddTask from './addTask'
import asyncStorage from '@react-native-community/async-storage'

const initialState = {
    showAddTask: false,
    showDoneTasks: true,
    visibleTasks: [],
    tasks: []
}

export default class Agenda extends React.Component {
    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await asyncStorage.getItem('state')
        this.setState(JSON.parse(stateString) || initialState, this.filterTasks)
        
        
    }

    toggleTask = id => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === id) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({tasks})
    }

    toggleFilter = () => {
        this.setState({
            showDoneTasks: !this.state.showDoneTasks
        }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null

        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({visibleTasks})

        asyncStorage.setItem('state', JSON.stringify(this.state))
    }

    addTask = newTask => {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados inválidos', 'Descrição não informada')
            return
        }

        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })

        this.setState({tasks, showAddTask: false}, this.filterTasks)
    }

    deleteTask = id => {
        const tasks = this.state.tasks.filter(task => task.id !== id)
        this.setState({tasks}, this.filterTasks)
    }

    render(){
        return(
            <View style = {styles.container}>
                <AddTask isVisible = {this.state.showAddTask} onCancel = {() => this.setState({showAddTask : false})}
                onSave = {this.addTask}/>
                <ImageBackground source = {todayImage} style = {styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress = {this.toggleFilter}>
                            <Icon name = {this.state.showDoneTasks ? 'eye' : 'eye-slash'} size = {20} 
                            color = {commonStyles.colors.secondary}/>
                        </TouchableOpacity>

                    </View>
                    <View style = {styles.titleBar}>
                        <Text style = {styles.title}>Hoje</Text>
                        <Text style = {styles.subTitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style = {styles.taskContainer}>
                    <FlatList data={this.state.visibleTasks} 
                        keyExtractor={item => `${item.id}`} 
                        renderItem={({item}) => <Task {...item} 
                        toggleTask = {this.toggleTask} 
                        onDelete = {this.deleteTask}/>}>
                    </FlatList>
                </View>
                <TouchableOpacity style = {styles.addButton} onPress = { () => this.setState({showAddTask: true})}>
                    <Icon name = 'plus' size = {20} color = {commonStyles.colors.secondary} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    taskContainer: {
        flex: 7
    },
    iconBar: {
        flexDirection: 'row'
    },
    addButton : {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})