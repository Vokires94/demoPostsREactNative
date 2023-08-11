import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, deletePost, addPost, editPost } from '../store/reducers/postsSlice';
import { setComments } from '../store/reducers/commentsSlice';
import Post from './Post';
import Loading from './Loading';
import AddPostDIalog from './AddPostDialog';
import { Feather } from '@expo/vector-icons';

export default function Posts({ navigation }) {

    const [isLoading, setIsLoading] = useState(false);
    const [isAddPostDialogOpen, setAddPostDialogOpen] = useState(false);
    const posts = useSelector(state => state.posts.value);
    const postComments = useSelector(state => state.comments.value);
    const dispatch = useDispatch();

    useEffect(() => {
        getPosts();
        getComments();
    }, []);

    const getPosts = async () => {
        await fetch(
            "https://my-json-server.typicode.com/Vokires94/demoPostsREactNative/posts",
        ).then((response) => response.json())
            .then((result) => dispatch(setPosts(result)))
            .finally(() => {
                setIsLoading(true);
            });
    };

    const deletePostById = async (postId) => {
        await fetch(
            `https://my-json-server.typicode.com/Vokires94/demoPostsREactNative/posts/${postId}`, {
            method: 'DELETE',
        }).then(
            () => {
                dispatch(deletePost(postId));
            }
        );
    };

    const getComments = async () => {
        await fetch(
            "https://my-json-server.typicode.com/Vokires94/demoPostsREactNative/comments",
        ).then((response) => response.json())
            .then((result) => dispatch(setComments(result)))
            .finally(() => {
                setIsLoading(true);
            });
    };

    const filteredComments = (id) => {
        const result = postComments.filter((comment) => comment.postId === id);
        return result;
    };

    const addNewPost = async (title, description) => {
        const hashKey = (Math.random() + 1).toString(36).substring(7);
        await fetch(
            `https://my-json-server.typicode.com/Vokires94/demoPostsREactNative/posts`, {
            method: 'POST',
            body: JSON.stringify({ "id": hashKey, "title": title, "body": description }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
            .then((result) => {
                dispatch(addPost(result));
            })
    };

    const editCurrentPost = async (id, title, description) => {
        await fetch(
            `https://my-json-server.typicode.com/Vokires94/demoPostsREactNative/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ "id": id, "title": title, "body": description }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
            .then((result) => {
                dispatch(editPost(result));
            })
    };

    const closeDialog = () => {
        setAddPostDialogOpen(false);
    }

    const showComments = (postId) => {
        navigation.navigate('Post Details', {
            postId,
            title: posts.filter((post) => post.id === postId)[0].title,
            description: posts.filter((post) => post.id === postId)[0].body,
        });
    }

    return (
        <View style={styles.container}>
            {isLoading
                ? <>
                    <ScrollView style={styles.content}>
                        {posts.length > 0 ?
                            posts.map((post) => (
                                <Post text={post.body} title={post.title} id={post.id}
                                    key={(Math.random() + 1).toString(36).substring(7)}
                                    deletePost={deletePostById}
                                    editPost={editCurrentPost}
                                    comments={filteredComments(post.id)}
                                    navigatiteDetails={showComments}
                                />
                            )) : <Text style={styles.textNoPosts}>No posts</Text>}
                    </ScrollView>
                    <TouchableOpacity style={styles.addTaskWrapper} onPress={() => setAddPostDialogOpen(true)}>
                        <View style={styles.addTask}>
                            <Feather name='plus' size={32} color='black' />
                        </View>
                    </TouchableOpacity>
                </>
                : <Loading />
            }
            <AddPostDIalog open={isAddPostDialogOpen} close={() => closeDialog()} add={addNewPost} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        width: '100%',
        marginBottom: 8,
    },
    textNoPosts: {
        fontSize: 18,
        marginLeft: 8,
    },
    addTaskWrapper: {
        position: 'absolute',
        bottom: 40,
        left: 40,
    },
    addTask: {
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
});
