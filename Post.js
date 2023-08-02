import { StyleSheet, Text, View } from 'react-native';

export default function Post(props) {

    return (
        <View style={styles.post}>
            <Text style={styles.title}>
                Title:{props.title}
            </Text>
            <Text style={styles.text}>
                {props.text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
    },
});
