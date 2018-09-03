import React from 'react';
import {
    StyleSheet, View, Image
} from 'react-native';
import { Form, Item, Input, Button, Text, Label } from 'native-base';
import { ImagePicker, Permissions, ImageManipulator } from 'expo';

export default class TaskForm extends React.Component {
    state = {
        image: null,
    };

    _pickImage = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        const manipResult = await ImageManipulator.manipulate(
            result.uri,
            [{ resize: { width: 320 } }],
            { format: 'jpg' }
        );

        if (!result.cancelled) {
            this.setState({ image: manipResult.uri });
        }
        this.props.setData({ image: manipResult.uri })
    };

    render() {
        const { setData, saveData, editData, data } = this.props;
        let image = this.state.image || this.props.data.image
        console.log('this.props.data', this.props.data);

        return (
            <View style={{ marginTop: 22 }}>
                <View>
                    <Form>
                        <Item>
                            <Label>Username</Label>
                            <Input
                                onChangeText={(username) => setData({ username })}
                            // value={data.username}
                            />
                        </Item>
                        <Item last>
                            <Label>Email</Label>
                            <Input
                                // value={data.email}
                                onChangeText={(email) => setData({ email })}
                            />
                        </Item>
                        <Item last>
                            <Label>Text</Label>
                            <Input
                                // value={data.text}
                                onChangeText={(text) => setData({ text })}
                            />
                        </Item>
                    </Form>

                    {image &&
                        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

                    <View style={styles.buttonWrapper}>
                        <Button
                            primary
                            style={styles.button}
                            onPress={this._pickImage}
                        >
                            <Text> Pick an image </Text>
                        </Button >
                        <Button
                            primary
                            style={styles.button}
                            onPress={() => {
                                data.isEdit ? editData() : saveData()
                            }
                            }
                        >
                            <Text> Submit </Text>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

// const mapStateToProps = state => ({
//     tasks: state.main.tasks,
// });

// export default connect(mapStateToProps, actions)(TaskForm);

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