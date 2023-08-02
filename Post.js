import { StyleSheet, Text } from 'react-native';

export default function Post(props) {

    return (
        <Text style={styles.post}>
            Id:{props.id} Title:{props.title}
        </Text>
    );
}

const styles = StyleSheet.create({
    post: {
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
    },
});
