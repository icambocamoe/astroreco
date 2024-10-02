import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js'; // Import your Firebase configuration
import timezones from '../assets/objects/timezones.js';
import RNPickerSelect from 'react-native-picker-select';
import months from '../assets/objects/months.js';
import CitySearch from './CitySearchScreen.js';

const OnboardingScreen = ({ navigation, route }) => {
    //const { useremail, password } = route.params; // Get email and password from navigation params
    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            year: '2024',  
            month: '1',          
            day: '1',
            hour: '00',
            minute: '00',
            longitude: '', // Add longitude field
            latitude: '',  // Add latitude field
            city: '',
            nation: '',
            timezone: '',
            name: '',
            zodiac_type: "Tropic",
            sidereal_mode: null
        },
    });
    const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => (i + 1).toString()));

    const years = Array.from({ length: 125 }, (_, i) => ({
        label: (1900 + i).toString(),
        value: (1900 + i).toString(),
    }));

    const hours = Array.from({ length: 24 }, (_, i) => ({
        label: i < 10 ? '0' + i : i.toString(),
        value: i < 10 ? '0' + i : i.toString(),
    }));

    const minutes = Array.from({ length: 60 }, (_, i) => ({
        label: i < 10 ? '0' + i : i.toString(),
        value: i < 10 ? '0' + i : i.toString(),
    }));

    const timezoneOptions = timezones.map((timezone) => ({
        label: `${timezone.timeZoneAbbreviation} - ${timezone.tzIdentifier} (UTC${timezone.utcOffset})`,
        value: timezone.tzIdentifier,
        nation: timezone.countryCode // Assuming you have a nation field in your timezone data

    }));

    const isLeapYear = (year) => {
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    };

    const updateDays = (month, year) => {
        let daysInMonth;
        if (month === '2') {
            daysInMonth = isLeapYear(year) ? 29 : 28;
        } else if (['4', '6', '9', '11'].includes(month)) {
            daysInMonth = 30;
        } else {
            daysInMonth = 31;
        }
        setDays(Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()));
    };


    // Handle city selection with latitude and longitude update
    const handleCitySelection = (city) => {
        setValue('city', city.name);  // Update input with city name
        setValue('latitude', city.lat);   // Store latitude
        setValue('longitude', city.lng);  // Store longitude

        console.log(`City: ${city.name}, Latitude: ${city.lat}, Longitude: ${city.lng}`);
    };

    useEffect(() => {
        const subscription = watch(({ month, year }) => {
            updateDays(month, year);
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = (data) => {
        const formData = {
            ...data,
        };
        console.log('Collected data:', formData);
        // You can now handle this data (e.g., send it to your backend, navigate, etc.)
        // navigation.navigate('Home');
    };
    return (
        <View style={styles.container}>
            <Text style={styles.header1}>Welcome to Astromedia!</Text>
            <Text style={styles.headers}>Let's get your birth chart done!.</Text>

            <Text style={styles.label}>Full Name</Text>
            <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                        keyboardType="user-name"
                    />
                )}
            />

            <Text style={styles.label}>Fecha de Nacimiento</Text>
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Dia</Text>
                <Controller
                    control={control}
                    name="day"
                    render={({ field: { onChange, value } }) => (
                        <RNPickerSelect
                            value={value}
                            onValueChange={onChange}
                            items={days.map((day) => ({ label: day, value: day }))}
                        />
                    )}
                />
                <Text style={styles.label}>Mes</Text>
                <Controller
                    control={control}
                    name="month"
                    render={({ field: { onChange, value } }) => (
                        <RNPickerSelect
                            value={value}
                            onValueChange={onChange}
                            items={months}
                        />
                    )}
                />
                <Text style={styles.label}>Año</Text>
                <Controller
                    control={control}
                    name="year"
                    render={({ field: { onChange, value } }) => (
                        <RNPickerSelect
                            value={value}
                            onValueChange={onChange}
                            items={years}
                        />
                    )}
                />
            </View>

            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Hora</Text>
                <Controller
                    control={control}
                    name="hour"
                    render={({ field: { onChange, value } }) => (
                        <RNPickerSelect
                            value={value}
                            onValueChange={onChange}
                            items={hours}
                        />
                    )}
                />
                <Text style={styles.label}>Minuto</Text>
                <Controller
                    control={control}
                    name="minute"
                    render={({ field: { onChange, value } }) => (
                        <RNPickerSelect
                            value={value}
                            onValueChange={onChange}
                            items={minutes}
                        />
                    )}
                />
            </View>
            <CitySearch onCitySelected={handleCitySelection} />
            <Text style={styles.label}>Select a Timezone:</Text>
            <Controller
                control={control}
                name="timezone"
                render={({ field: { onChange, value } }) => (
                    <RNPickerSelect
                        value={value}
                        onValueChange={(selectedTimezone) => {
                            // Update the timezone value in the form
                            onChange(selectedTimezone);
            
                            // Find the corresponding timezone object
                            const selectedTimezoneObject = timezoneOptions.find(
                                (option) => option.value === selectedTimezone
                            );
            
                            // Set the nation field based on the selected timezone
                            if (selectedTimezoneObject) {
                                setValue('nation', selectedTimezoneObject.nation || ''); // Set the nation value
                            }
                        }}
                        items={timezoneOptions}
                        placeholder={{
                            label: 'Select a timezone...',
                            value: null,
                        }}
                    />
                )}
            />

            <View style={{ margin: 20 }} ><Button title="Finish Onboarding" onPress={handleSubmit(onSubmit)} /></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    header1: {
        fontSize: 36,
        marginBottom: 8,
    },
    headers: {
        fontSize: 18,
        marginBottom: 8,
    },
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
