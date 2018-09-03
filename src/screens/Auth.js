import React from 'react';
import {
    StyleSheet, View,
} from 'react-native';
import { Form, Item, Input, Button, Text, Label } from 'native-base';
import { connect } from 'react-redux';

import * as actions from '../actions/main';

class Auth extends React.Component {
    state = {
        name: '',
        password: '',
    };

    onSubmit() {
        const { name, password } = this.state;
        if (name === 'admin' && password === '123') {
            this.props.authenticate(true)
            const { navigation } = this.props;
            navigation.navigate('Main')
        }

    }

    render() {

        console.log('this.props', this.props);

        return (
            <View style={{ marginTop: 22 }}>
                <View>
                    <Form>
                        <Item>
                            <Label>Name</Label>
                            <Input
                                onChangeText={(name) => this.setState({ name })}
                            // value={data.username}
                            />
                        </Item>
                        <Item last>
                            <Label>Password</Label>
                            <Input
                                // value={data.email}
                                onChangeText={(password) => this.setState({ password })}
                            />
                        </Item>
                    </Form>
                    <View style={styles.buttonWrapper}>
                        {/* <Button
                            light
                            style={styles.button}
                            onPress={() => toggleModal(false)}
                        >
                            <Text> Cancel </Text>
                        </Button > */}
                        <Button
                            primary
                            style={styles.button}
                            onPress={() => this.onSubmit()}
                        >
                            <Text> Submit </Text>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    isAdmin: state.main.isAdmin,
});

export default connect(mapStateToProps, actions)(Auth);

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