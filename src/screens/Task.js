import React from 'react';
import {
    StyleSheet, View, Modal
} from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions/main';
import TaskForm from '../components/TaskForm';

class Task extends React.Component {
    constructor() {
        super()
        this.state = {
            username: null,
            email: '',
            text: null,
            image: null,
            isEdit: false

        }
        this.setData = this.setData.bind(this)
        this.saveData = this.saveData.bind(this)
    }

    componentDidMount() {
        const { params } = this.props.navigation.state
        const { tasks } = this.props

        if (params && params.id) {
            const { username, email, text, image_path } = tasks.filter(t => t.id === params.id)[0]

            this.setState({
                username, email, text, image: image_path, isEdit: true
            })
        }
    }

    saveData() {
        const data = this.state
        const { navigation } = this.props

        this.props.saveTask(data, navigation)
    }

    setData(data) {
        this.setState({
            ...data
        })
    }

    render() {

        return (
            <TaskForm
                setData={this.setData}
                saveData={this.saveData}
                data={this.state}
            />
        );
    }
}

const mapStateToProps = state => ({
    tasks: state.main.tasks,
    isAdmin: state.main.isAdmin
});

export default connect(mapStateToProps, actions)(Task);

const styles = StyleSheet.create({
    buttonWrapper: {
        flex: 1,
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        margin: 10
    }
});