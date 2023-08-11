import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function Comment(props) {

    const [editedComment, setEditedComment] = useState(props.comment.text);
    const [isEditing, setIsEditing] = useState(false);
    const [viewCoordinates, setViewCoordinates] = useState({ x: 0, y: 0 });

    const scrollToView = () => {
        props.scrollToElement({ x: viewCoordinates.x, y: viewCoordinates.y, animated: true });
    }

    const cancel = () => {
        setIsEditing(false);
        setEditedComment(props.comment.text);
    }

    const edit = () => {
        setIsEditing(true);
    }

    const save = () => {
        if (editedComment !== "") {
            props.editCommentById(props.comment.id, editedComment).then(
                () => { },
                () => {
                    Toast.show({
                        type: 'error',
                        text1: 'Server error editing comment',
                    });
                }
            ).finally(
                () => {
                    setIsEditing(false);
                }
            )
        } else {
            cancel();
        }
    }

    return (
        <View style={styles.commentContainer} onLayout={event => {
            const layout = event.nativeEvent.layout;
            setViewCoordinates({ ...viewCoordinates, x: layout.x, y: layout.y })
        }}>
            {isEditing ?
                <TextInput
                    style={[styles.commentEditInput, { textAlignVertical: 'top' }]}
                    value={editedComment}
                    multiline
                    scrollEnabled
                    numberOfLines={4}
                    maxLength={200}
                    returnKeyType="done"
                    onChangeText={text => setEditedComment(text)}
                    onFocus={scrollToView}
                /> :
                <Text style={styles.comment}>
                    {props.comment.text}
                </Text>
            }
            <View style={styles.btnContainer}>
                {isEditing ? <>
                    <Pressable
                        style={[styles.btn, { backgroundColor: 'blue' }]}
                        onPress={save}
                    >
                        <Text style={styles.btnText}>Save</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.btn, { backgroundColor: 'red' }]}
                        onPress={cancel}
                    >
                        <Text style={styles.btnText}>Cancel</Text>
                    </Pressable>
                </> : <>
                    <Pressable
                        style={[styles.btn, { backgroundColor: 'blue' }]}
                        onPress={edit}
                    >
                        <Text style={styles.btnText}>Edit</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.btn, { backgroundColor: 'red' }]}
                        onPress={() => props.deleteCommentById(props.comment.id)}
                    >
                        <Text style={styles.btnText}>Delete</Text>
                    </Pressable>
                </>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    comment: {
        fontSize: 14,
        lineHeight: 14
    },
    commentContainer: {
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 8,
        borderRadius: 8,
        padding: 8,
        backgroundColor: 'white',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderRadius: 4,
        elevation: 3,
        marginLeft: 8,
        minWidth: 80,
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    commentEditInput: {
        paddingVertical: 4,
        paddingHorizontal: 4,
        borderWidth: 1,
        width: '100%',
        textAlignVertical: 'center'
    }
});
