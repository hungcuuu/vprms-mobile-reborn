import React, { useEffect } from 'react';
import { VirtualizedList } from 'react-native';
import { FlatList } from 'react-native';
import { Button } from 'react-native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import { SliderBox } from 'react-native-image-slider-box';
const ProviderServices = ({ navigation, route }) => {
    const services = route.params?.provider ?? [];
    // console.log(services.services.serviceDetails);
    // const images = [
    //     'https://storage.googleapis.com/vrms-290212.appspot.com/b993e482-b7d7-4cc6-b5e3-160a61243c1fpreview.jpg?GoogleAccessId=firebase-adminsdk-y2tzh@vrms-290212.iam.gserviceaccount.com&Expires=2472004708&Signature=JROFokSik32lYHppJedh5R5SzcLMEVq5egeErrWRLDqgAKOUpyeqvs1uUWgpYQf8%2B%2BhuGAm%2Fh3E1iKKSdmOSP%2FMwz9ro%2FVco%2B36FKj6RCyqduDDGznFyKSMr9rj6JTNOMUd3OYRkJl%2BJAijRztV%2Bk9p9RxucRFxfDIRJXblp59nHaccrklX%2FnoexQvgRI3lNbcEKRlG0oTwaek8ErAglg5GFgVWItTv2PvaJIhHan%2FBaYIis1btQaIZnVMwfLe08heUbTSVqmtQB30g3oJRf8s67ZsIk7UoNbycEPw5j%2BYkIsZSFlQIwm28InPuzVRKfiHw4lAI8VqFGv5uHi9K%2F6g%3D%3D',
    //     'https://lh5.googleusercontent.com/p/AF1QipP_rnwWXIAorYxSJuScmKlfJdLJ65SXGLOA60HA=w426-h240-k-no',

    //     'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
    // ];
    const renderDetail = (detail) => {
        return (
            <View>
                <Text>{detail.id}</Text>

                <Text>{detail.name}</Text>
                <Text>{detail.price}</Text>
            </View>
        );
    };
    const renderServices = () => {
        return (
            <View>
                {services.services
                    ? services.services.map((ser) => (
                          <View key={ser.typeDetail.id}>
                              <Text>{ser.typeDetail.typeName}</Text>
                              <FlatList
                                  data={ser.serviceDetails}
                                  keyExtractor={(item, index) => item.id.toString()}
                                  renderItem={({ item: detail }) => renderDetail(detail)}
                              />
                          </View>
                      ))
                    : null}
            </View>
        );
    };
    useEffect(() => {}, []);
    return (
        <ScrollView>
            <View
                style={{
                    marginTop: 8,
                    marginLeft: 8,
                    borderWidth: 1,
                    // flex: 1,
                    height: 200,
                    // width: 100,
                }}>
                <SliderBox
                    images={
                        // services.imageUrls ??
                        [
                            'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
                            'https://i.vimeocdn.com/portrait/58832_300x300.jpg',

                            'https://i.vimeocdn.com/portrait/58832_300x300.jpg',
                        ]
                    }
                    autoplay
                    dotColor="#FFEE58"
                    inactiveDotColor="#90A4AE"
                />
            </View>

            <View>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 16,
                        margin: 10,
                        // width: '70%',
                        // height: 20,
                        // maxWidth: '70%',
                    }}>
                    {services.id}
                    {services.name}
                </Text>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 16,
                        margin: 10,
                        // width: '70%',
                        // height: 20,
                        // maxWidth: '70%',
                    }}>
                    {services.address}
                </Text>
            </View>
            {renderServices()}
            <View>
                <Button
                    title="next"
                    onPress={() =>
                        navigation.navigate('Review', {
                            detail: {
                                provider: {
                                    id: services.id,
                                    name: services.name,
                                    address: services.address,
                                },
                            },
                        })
                    }
                />
            </View>
        </ScrollView>
    );
};

export default ProviderServices;

const styles = StyleSheet.create({});
