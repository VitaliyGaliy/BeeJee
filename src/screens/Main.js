import React from 'react';
import {
    StyleSheet, Text, View, Image, FlatList, Button, TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions/main';

class App extends React.Component {
    static navigationOptions = (props) => {

        const { navigation, navigation: { state: { params } } } = props
        console.log('params', params);

        return {
            headerTitle: 'TasksList',
            headerLeft: (
                <Button
                    title={params && params.isAdmin ? 'Logout' : 'Login as Admin'}
                    onPress={() => params && params.isAdmin ?
                        params.authenticate(false) :
                        navigation.navigate('Auth')
                    }
                />
            ),
            headerRight: (
                <Button
                    title='Add task'
                    onPress={() => navigation.push('Task')}
                />
            ),
        };
    };

    constructor() {
        super()
        this.state = {
            current_page: 1,
            total_task_cont: null,
            sort_field: null
        }
        this.navigationOptions = this.constructor.navigationOptions;
    }

    componentDidMount() {
        const { isAdmin, authenticate } = this.props
        this.props.navigation.setParams({ isAdmin, authenticate });

        this.setState({
            current_page: this.state.current_page + 1
        })
        const { current_page, sort_field } = this.state
        this.props.getTasks({ page: current_page, sort_field: sort_field })
    }

    componentWillUpdate(nextProps) {
        const { isAdmin } = nextProps

        if (this.props.navigation.getParam('isAdmin') != isAdmin)
            this.props.navigation.setParams({ isAdmin })
    }

    loadMoreTasks() {
        const { total_task_count } = this.props;
        const { current_page, sort_field } = this.state
        let cnt = 3;
        let cnt_page = Math.ceil(total_task_count / cnt);
        if (this.state.current_page <= cnt_page) {

            this.setState({
                total_task_cont: cnt_page,
                current_page: this.state.current_page + 1
            })
            this.props.getTasks({ page: current_page, sort_field })
        }
    }

    sortTasks(val) {
        this.setState({
            sort_field: val,
            current_page: 2
        })

        this.props.refreshTasks()
        this.props.getTasks({ page: 1, sort_field: val })
    }

    render() {

        const { tasks, navigation: { navigate }, isAdmin } = this.props;
        console.log('tasks', tasks);

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerName}>Sort by: </Text>
                    <View style={styles.headerTextWrapper}>
                        <Button onPress={() => this.sortTasks('id')} title='ID'></Button>
                        <Button onPress={() => this.sortTasks('username')} title='Name'></Button>
                        <Button onPress={() => this.sortTasks('email')} title='Email'></Button>
                        <Button onPress={() => this.sortTasks('status')} title='Status'></Button>
                    </View>
                </View>
                <FlatList
                    style={styles.flatList}
                    data={tasks}
                    onEndReached={() => this.loadMoreTasks()}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) =>
                        <TouchableWithoutFeedback
                            onPress={() => isAdmin && navigate('EditTask', { id: item.id })}
                        >
                            <View style={styles.itemsWrapper}>
                                <Image
                                    source={{ uri: item.image_path }}
                                    style={{ width: 320, height: 240 }} />
                                />
                                <View style={styles.textBlockWrapper}>
                                    <View style={styles.textWrapper}>
                                        <Text>Username: {item.username}</Text>
                                        <Text>Email: {item.email}</Text>
                                        <Text>Text: {item.text}</Text>
                                    </View>
                                    <Text style={{ flex: 2, color: 'green' }}>
                                        {tasks.status === 10 && 'Done'}
                                    </Text>
                                </View>


                            </View>
                        </TouchableWithoutFeedback>
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    tasks: state.main.tasks,
    total_task_count: state.main.total_task_count,
    isAdmin: state.main.isAdmin
});

export default connect(mapStateToProps, actions)(App);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flatList: {
        flex: 1,
    },
    itemsWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBlockWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textWrapper: {
        flex: 8,
        marginLeft: 30,
        marginTop: 15,
        marginBottom: 15,
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
    headerTextWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});