import React from 'react';
import {
    StyleSheet, View
} from 'react-native';
import { Form, Item, Input, Button, Text, Label, CheckBox } from 'native-base';

export default class EditTaskForm extends React.Component {
    state = {
        image: null,
    };

    render() {
        const { setData, editData, data } = this.props;

        return (
            <View style={{ marginTop: 22 }}>
                <View>
                    <Form>
                        <Item last>
                            <Label>Text</Label>
                            <Input
                                value={data.text}
                                onChangeText={(text) => setData({ text })}
                            />
                        </Item>
                        <CheckBox
                            checked={data.status}
                            onPress={() => setData({ status: !data.status })}
                        />
                    </Form>

                    <View style={styles.buttonWrapper}>
                        <Button
                            primary
                            style={styles.button}
                            onPress={() => editData()}
                        >
                            <Text> Submit </Text>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}


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