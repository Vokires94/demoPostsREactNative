import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

export default function PostDetails({ route }) {

    const { postId, title, description } = route.params;
    const comments = useSelector(state => {
        const allComments = state.comments.value;
        return allComments.filter((comment) => comment.postId === postId);
    });

    return (
        <View >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.commentsTitle}>Comments:</Text>
            <ScrollView style={styles.comments}>
                {comments.length > 0 ?
                    comments.map((comment) => (
                        <Text style={styles.comment} key={(Math.random() + 1).toString(36).substring(7)}>{comment.text}</Text>
                    )) : <Text style={styles.textNoComments}>No Comments</Text>}
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        marginLeft: 8,
    },
    description: {
        fontSize: 18,
        marginTop: 8,
        marginLeft: 8,
    },
    textNoComments: {
        fontSize: 18,
        marginLeft: 8,
    },
    commentsTitle: {
        fontSize: 18,
        marginTop: 8,
        marginLeft: 8,
    },
    comments: {
        width: '100%',
        marginBottom: 8,
        borderWidth: 1,
    },
    comment: {
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 8,
        borderRadius: 8,
        padding: 8,
        backgroundColor: 'white',
    }
});
