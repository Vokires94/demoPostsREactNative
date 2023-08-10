import React, { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,
    Button,
} from "@react-native-material/core";
import { TextInput, StyleSheet, Text } from "react-native";

const AddPostDIalog = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleLabel, setTitleLabel] = useState('');
    const [descriptionLabel, setDescriptionLabel] = useState('');

    const close = () => {
        setTitle('');
        setDescription('');
        props.close();
    }

    const add = () => {
        const isValidTitle = validateTitle(/^[a-zA-Z ]*$/);
        const isValidpDescription = validateDescription();
        if (isValidTitle && isValidpDescription) {
            setIsLoading(true);
            props.add(title, description).finally(
                () => {
                    setIsLoading(false);
                    close();
                }
            );
        }
    }

    const validateTitle = (rule) => {
        const isValid = rule ? rule.test(title) : true;
        if (title === '') {
            setTitleLabel('Empty title');
            return false;
        }
        else if (!isValid) {
            setTitleLabel('Only text symbols allowed');
            return false;
        } else {
            setTitleLabel('');
            return true;
        }
    };

    const validateDescription = (rule) => {
        const isValid = rule ? rule.test(description) : true;
        if (description === '') {
            setDescriptionLabel('Empty Description');
            return false;
        }
        else if (!isValid) {
            setDescriptionLabel('Invalid description');
            return false;
        } else {
            setDescriptionLabel('');
            return true;
        }
    };

    return (
        <Dialog visible={props.open} onDismiss={close}>
            <DialogHeader title="Add new Post" />
            <DialogContent>
                <TextInput
                    style={styles.input}
                    placeholder={'Title'}
                    value={title}
                    maxLength={40}
                    onChangeText={text => setTitle(text)} />
                <Text style={styles.inputLabel}>{titleLabel}</Text>
                <TextInput
                    style={[styles.input, { marginTop: 16 }]}
                    placeholder={'Description'}
                    value={description}
                    multiline
                    numberOfLines={4}
                    maxLength={200}
                    onChangeText={text => setDescription(text)}
                />
                <Text style={styles.inputLabel}>{descriptionLabel}</Text>
            </DialogContent>
            <DialogActions>
                <Button
                    style={styles.btn}
                    title="Cancel"
                    compact
                    variant="text"
                    onPress={close}
                />
                <Button
                    style={styles.btn}
                    title="Add"
                    compact
                    variant="text"
                    onPress={add}
                    loading={isLoading}
                />
            </DialogActions>
        </Dialog>
    );
};

const styles = StyleSheet.create({
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: '100%',
    },
    inputLabel: {
        color: 'red',
    },
    btn: {
        minWidth: 80,
    },
});

export default AddPostDIalog;