import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback } from 'react-native';

export default function Post(props) {

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.text);

    const edit = () => {
        if (!isEditing) {
            setIsEditing(!isEditing);
        } else {
            if (title !== "" && description !== "") {
                props.editPost(props.id, title, description).then(
                    () => {
                        setIsEditing(!isEditing);
                    },
                    () => {
                        console.log('Error editing post');
                        setIsEditing(!isEditing);
                        setTitle(props.title);
                        setDescription(props.text);
                    }
                );
            } else {
                setIsEditing(!isEditing);
                setTitle(props.title);
                setDescription(props.text);
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => props.navigatiteDetails(props.id)}>
            <View style={styles.post}>
                {isEditing ?
                    <TextInput
                        style={styles.cardInput}
                        value={title}
                        maxLength={40}
                        onChangeText={text => setTitle(text)} /> :
                    <Text style={styles.title} numberOfLines={1}>
                        {props.title}
                    </Text>
                }
                {isEditing ?
                    <TextInput
                        style={[styles.cardInput, { marginTop: 8, textAlignVertical: 'top' }]}
                        value={description}
                        multiline
                        scrollEnabled
                        numberOfLines={4}
                        maxLength={200}
                        returnKeyType="done"
                        onChangeText={text => setDescription(text)} /> :
                    <Text style={styles.text} numberOfLines={2}>
                        {props.text}
                    </Text>
                }
                <View style={styles.comments}>
                    <Text>Comments({props.comments.length})</Text>
                </View>
                <View style={styles.btnContainer}>
                    <Pressable
                        style={[styles.btn, { backgroundColor: 'blue' }]}
                        onPress={() => edit()}
                    >
                        <Text style={styles.btnText}>{isEditing ? 'Save' : 'Edit'}</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.btn, { backgroundColor: 'red' }]}
                        onPress={() => props.deletePost(props.id)}
                    >
                        <Text style={styles.btnText}>Delete</Text>
                    </Pressable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    post: {
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 8,
        borderRadius: 8,
        padding: 8,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 22,
    },
    text: {
        fontSize: 18,
        marginTop: 8,
    },
    comments: {
        marginTop: 4,
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
    cardInput: {
        paddingVertical: 4,
        paddingHorizontal: 4,
        borderWidth: 1,
        width: '100%',
        textAlignVertical: 'center'
    },
});
