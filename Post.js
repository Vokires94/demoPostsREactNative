import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function Post(props) {

    return (
        <View style={styles.post}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <Text style={styles.text} numberOfLines={2}>
                {props.text}
            </Text>
            <View>
                <Text>Comments({props.comments.length || 0})</Text>
            </View>
            <View style={styles.btnContainer}>
                <Pressable style={[styles.btn, { backgroundColor: 'blue' }]} ><Text style={styles.btnText}>Edit</Text></Pressable>
                <Pressable style={[styles.btn, { backgroundColor: 'red' }]} onPress={() => props.deletePost(props.id)} ><Text style={styles.btnText}>Delete</Text></Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 8,
        borderRadius: 8,
        padding: 8,
    },
    title: {
        fontSize: 22,
    },
    text: {
        fontSize: 18,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 4,
        elevation: 3,
        marginLeft: 8,
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
