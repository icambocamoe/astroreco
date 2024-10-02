import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js'; // Import your Firebase configuration
import timezones from '../assets/objects/timezones.js';
import RNPickerSelect from 'react-native-picker-select';

const OnboardingScreen = ({ navigation, route }) => {
    //const { username, password } = route.params; // Get email and password from navigation params
    const [birthDate, setBirthDate] = useState('');
    const [birthTime, setBirthTime] = useState('');
    const [birthPlace, setBirthPlace] = useState('');

    const handleNext = () => {
        // Store birth info or pass to the next screen
        navigation.navigate('Features');
    };
    const handleFinishOnboarding = async () => {
        try {
            // Automatically log in the user
            await signInWithEmailAndPassword(auth, username, password);

            // Navigate to Home screen after successful login
            navigation.navigate('Home');
        } catch (error) {
            console.error("Error logging in after onboarding: ", error);
            // Handle error (optional)
        }
    };
    const [selectedTimezone, setSelectedTimezone] = useState('');

    // Map timezones to a format suitable for the picker
    const timezoneOptions = timezones.map((timezone) => ({
        label: `${timezone.timeZoneAbbreviation} - ${timezone.tzIdentifier} (UTC${timezone.utcOffset})`,
        value: timezone.tzIdentifier,
    }));

    return (
        <View>
            <Text>Welcome to the App!</Text>
            <Text>Complete the onboarding to get started.</Text>
            <View style={styles.container}>
                <TextInput
                    placeholder="Enter your Birth Date (YYYY-MM-DD)"
                    value={birthDate}
                    onChangeText={setBirthDate}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Enter your Birth Time (HH:MM)"
                    value={birthTime}
                    onChangeText={setBirthTime}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Enter your Birth Place"
                    value={birthPlace}
                    onChangeText={setBirthPlace}
                    style={styles.input}
                />
                <Text style={styles.label}>Select a Timezone:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedTimezone(value)}
                    items={timezoneOptions}
                    placeholder={{
                        label: 'Select a timezone...',
                        value: null,
                    }}
                    style={pickerSelectStyles}
                />
                <Text style={styles.selected}>Selected Timezone: {selectedTimezone || 'None'}</Text>
                <Button title="Next" onPress={handleNext} />
            </View>
            <Button title="Finish Onboarding" onPress={handleFinishOnboarding} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    input: { width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
});

const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
};

export default OnboardingScreen;
