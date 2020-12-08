import * as React from 'react';
import { View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const labels = ['Vehicle', 'Type', 'Service', 'Agency', 'Catalog', 'Time', 'Review'];

const labelsBookingProvider = ['Vehicle', 'Type', 'Service', 'Catalog', 'Time', 'Review'];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#40BFFF',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#40BFFF',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#40BFFF',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#40BFFF',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#40BFFF',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#40BFFF',
};

export function ProgressStepBar(props) {
    return (
        <View>
            <StepIndicator
                onPress={(step) => props.onProgressStepBar(step)}
                stepCount={7}
                customStyles={customStyles}
                currentPosition={props.currentPos}
                labels={labels}
            />
        </View>
    );
}
