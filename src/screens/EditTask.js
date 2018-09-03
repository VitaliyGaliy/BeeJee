import React from 'react';
import {
    StyleSheet, View, Modal
} from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions/main';
import EditTaskForm from '../components/EditTaskForm';

class EditTask extends React.Component {
    constructor() {
        super()
        this.state = {
            text: null,
            status: false

        }
        this.setData = this.setData.bind(this)
        this.editData = this.editData.bind(this)
    }

    componentDidMount() {
        const { params } = this.props.navigation.state
        const { tasks } = this.props

        if (params && params.id) {
            const { text, state } = tasks.filter(t => t.id === params.id)[0]

            this.setState({
                text, state
            })
        }
    }

    editData() {
        const data = this.state
        const { navigation } = this.props

        this.props.editTask(data, navigation)
    }

    setData(data) {
        this.setState({
            ...data
        })
    }

    render() {
        console.log('status', this.state.status);

        return (
            <EditTaskForm
                setData={this.setData}
                editData={this.editData}
                data={this.state}
            />
        );
    }
}

const mapStateToProps = state => ({
    tasks: state.main.tasks,
    isAdmin: state.main.isAdmin
});

export default connect(mapStateToProps, actions)(EditTask);
