import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

import { AirbnbRating } from 'react-native-ratings';
import axios from '../../axios';

const Feedback = ({ navigation, route }) => {
    const [capturedPhoto, setCapturedPhoto] = useState(null);

    const requestId = route.params?.requestId;

    const [, setContent] = useState('');
    const [imageUrls, setImageUrls] = useState(null);
    const [ratings, setRatings] = useState(1);

    const sendFeedbackHandler = () => {
        // console.log(feedbackForm);
        console.log(imageUrls);
        const data = new FormData();

        // data.append('content', content);
        imageUrls.forEach(img => {
            data.append('images', img);
        });
        // data.append('ratings', ratings);
        console.log(data);
        axios
            .post(`requests/${1}/feedbacks`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Accept: 'application/json',
                },
            })
            .then(rs => {
                if (rs.status === 200) {
                    Alert.alert('Success');
                    navigation.pop();
                }
            })
            .catch(err => {
                Alert.alert('Something went wrong!');
                console.log(err);
            });
    };
    const pickImage = async () => {
        return await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsMultipleSelection: true,
            //base64: true,
        })
            .then(result => {
                console.log(result);
                if (!result.cancelled) {
                    let localUri = result.uri;
                    let filename = localUri.split('/').pop();

                    // Infer the type of the image
                    let match = /\.(\w+)$/.exec(filename);
                    let type = match ? `image/${match[1]}` : 'image';

                    setImageUrls([{ uri: localUri, name: filename, type }]);
                    setCapturedPhoto(localUri);
                }
            })
            .catch(error => {
                Alert.alert('Error', 'Something wrong with Camera');
            });
    };
    useEffect(() => {
        navigation.setOptions({ title: `request #${requestId}` });
    }, [navigation, requestId]);
    return (
        <ScrollView style={styles.container}>
            <View>
                <Input
                    style={{ borderWidth: 1 }}
                    placeholder="Content"
                    onChangeText={text => setContent(text)}
                    multiline={true}
                    numberOfLines={4}
                />
                <View style={{}}>
                    <Button title="Choose Image" onPress={pickImage} />
                    <Image
                        style={{
                            alignSelf: 'center',
                            width: Dimensions.get('screen').width,
                            height: capturedPhoto ? 300 : 0,
                            // zIndex: 1,
                        }}
                        source={{ uri: capturedPhoto ?? null }}
                    />
                </View>
                <AirbnbRating
                    // selectedColor="yellow"
                    onFinishRating={rating => setRatings(rating)}
                    defaultRating={ratings}
                />
                {/* <Rating
                            // ratingBackgroundColor={'red'}
                            // showRating
                            // tintColor="blue"
                            // ratingBackgroundColor="red"
                            ratingCount={1}
                            // fractions={5}
                            startingValue={5}
                            imageSize={15}
                        /> */}
                <View style={{ marginTop: 10 }}>
                    <Button title="Send" onPress={() => sendFeedbackHandler()} />
                </View>
            </View>
        </ScrollView>
    );
};

export default Feedback;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 8,
        // backgroundColor: 'blue',
    },
});
