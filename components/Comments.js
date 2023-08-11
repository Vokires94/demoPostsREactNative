import React, { useState, useRef } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView, SafeAreaView, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addComment, deleteComment, editComment } from '../store/reducers/commentsSlice';
import { Button } from '@react-native-material/core';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Comment from './Comment';

export default function Comments({ route }) {

    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { postId, title, description } = route.params;
    const dispatch = useDispatch();
    const comments = useSelector(state => {
        return state.comments.value;
    });

    const scrollViewComments = useRef(null);

    const scrollToElement = (obj) => {
        scrollViewComments.current.scrollTo(obj);
    }

    const filteredComments = (data) => {
        return data.filter((comment) => comment.postId === postId);
    };

    const addNewComment = async () => {
        if (newComment !== "") {
            setIsLoading(true);
            const hashKey = (Math.random() + 1).toString(36).substring(7);
            await fetch(
                `https://my-json-server.typicode.com/Vokires94/demoPostsREactNative/comments`, {
                method: 'POST',
                body: JSON.stringify({ "id": hashKey, "text": newComment, "postId": postId }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((response) => response.json())
                .then((result) => {
                    dispatch(addComment(result));
                    setNewComment('');
                    Keyboard.dismiss();
                }).finally(() => {
                    setIsLoading(false);
                })

        } else {
            Toast.show({
                type: 'error',
                text1: 'Empty comment',
            });
        }
    }

    const deleteCommentById = async (commentId) => {
        await fetch(
            `https://my-json-server.typicode.com/Vokires94/demoPostsREactNative/comments/${commentId}`, {
            method: 'DELETE',
        }).then(
            () => {
                dispatch(deleteComment(commentId));
            },
            () => {
                Toast.show({
                    type: 'error',
                    text1: 'Server error deleting comment',
                });
            }
        );
    };

    const editCommentById = async (commentId, text) => {
        await fetch(
            `https://my-json-server.typicode.com/Vokires94/demoPostsREactNative/comments/${commentId}`, {
            method: 'PUT',
            body: JSON.stringify({ "id": commentId, "text": text, "postId": postId }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
            .then((result) => {
                dispatch(editComment(result));
            })
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.commentsTitle}>Comments:</Text>
            </View>
            <ScrollView style={styles.comments} ref={scrollViewComments}>
                {filteredComments(comments).length > 0 ?
                    filteredComments(comments).map((comment) => (
                        <Comment
                            key={(Math.random() + 1).toString(36).substring(7)}
                            comment={comment}
                            deleteCommentById={deleteCommentById}
                            editCommentById={editCommentById}
                            scrollToElement={scrollToElement}
                        />
                    )) : <Text style={styles.textNoComments}>No Comments</Text>}
            </ScrollView>
            <View
                style={styles.addCommentWrapper}
            >
                <TextInput
                    style={styles.inputComment}
                    placeholder={'Write new comment'}
                    value={newComment}
                    maxLength={200}
                    onChangeText={text => setNewComment(text)}
                />
                <Button title="Send" color="blue" loading={isLoading} disableElevation onPress={addNewComment} />
            </View >
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    addCommentWrapper: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    inputComment: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250
    },
    title: {
        fontSize: 22,
        marginLeft: 8,
        marginRight: 8
    },
    description: {
        fontSize: 18,
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8
    },
    textNoComments: {
        fontSize: 18,
        marginLeft: 8
    },
    commentsTitle: {
        fontSize: 18,
        marginTop: 8,
        marginLeft: 8
    },
    comments: {
        flex: 1,
        width: '100%',
        marginBottom: 8,
        marginTop: 8
    }
});
