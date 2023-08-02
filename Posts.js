import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from './reducers/postsSlice';
import Post from './Post';
// import { useState } from 'react';

export default function Posts() {

    const posts = useSelector(state => state.posts.value);
    const dispatch = useDispatch();

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        const response = await fetch(
            "https://my-json-server.typicode.com/Vokires94/demoPostsREactNative/posts",
        ).then((response) => response.json());

        dispatch(setPosts(response));
    };

    //   const [posts, setPosts] = useState();

    //   useEffect(() => {
    //     // getPosts();
    //     // addPost();
    //     // deletePost(1);
    //   }, []);

    // const getPosts = async () => {
    //   const response = await fetch(
    //     "https://my-json-server.typicode.com/Vokires94/demoPostsREactNative/posts",
    //   ).then((response) => response.json());

    //   // update the state
    //   setPosts(response);
    // };

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

    // const deletePost = async (postId) => {
    //   const response = await fetch(
    //     `https://my-json-server.typicode.com/Vokires94/demoPostsREactNative/posts/${postId}`, {
    //     method: 'DELETE',
    //   }).then(() => {
    //     const result = posts.filter((post) => post.id !== postId);
    //     setPosts(result);
    //   });
    // };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                {posts &&
                    posts.map((post) => (
                        <Post text={post.body} title={post.title} id={post.id} 
                        key={(Math.random() + 1).toString(36).substring(7)}
                        />
                    ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        width: '100%',
        backgroundColor: '#f6f6f6',
    },
});
