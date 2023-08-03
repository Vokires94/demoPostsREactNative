import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, deletePost } from './reducers/postsSlice';
import { setComments } from './reducers/commentsSlice';
import Post from './Post';

export default function Posts() {

    const posts = useSelector(state => state.posts.value);
    const postComments = useSelector(state => state.comments.value);
    const dispatch = useDispatch();

    useEffect(() => {
        getPosts();
        getComments();
    }, []);

    const getPosts = async () => {
        const response = await fetch(
            "https://my-json-server.typicode.com/Vokires94/demoPostsREactNative/posts",
        ).then((response) => response.json());

        dispatch(setPosts(response));
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
        const response = await fetch(
            "https://my-json-server.typicode.com/Vokires94/demoPostsREactNative/comments",
        ).then((response) => response.json());

        dispatch(setComments(response));
    };

    const filteredComments = (id) => {
        const result = postComments.filter((comment)=> comment.postId === id);
        return result;
    };

    // const addPost = async () => {
    //   const response = await fetch(
    //     "https://my-json-server.typicode.com/Vokires94/demoPostsREactNative/posts", {
    //     method: 'POST',
    //     body: JSON.stringify({ "id": 4, "title": "Post 4" }),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //   }).then((response) => response.json());

    //   setPosts([
    //     ...posts,
    //     { "id": 4, "title": "Post 4" }
    //   ]);
    // };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                {posts &&
                    posts.map((post) => (
                        <Post text={post.body} title={post.title} id={post.id}
                            key={(Math.random() + 1).toString(36).substring(7)}
                            deletePost={deletePostById}
                            comments={filteredComments(post.id)}
                        />
                    ))}
            </ScrollView>
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
});
