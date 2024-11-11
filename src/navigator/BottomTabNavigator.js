import HoroscopeScreen from '../screens/HoroscopeScreen.js';
import RecommendationsScreen from '../screens/RecommendationsScreen.js';
import MoviesScreen from '../screens/MoviesScreen.js';
import HomeSvg from '../svg_components/astrology-horoscope-svgrepo-com.svg';
import MusicNoteSvg from '../svg_components/music-note-svgrepo-com.svg';
import MovieReelSvg from '../svg_components/movie-play-button-2-svgrepo-com.svg';
import StarSVG from '../svg_components/stars-svgrepo-com.svg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen.js';

const Tab = createBottomTabNavigator();

export function HomeTabs({ route }) {
    // Extract the passed 'user' param
    const { user } = route.params;
    console.log(user)
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="BirthChart"
          component={HomeScreen}
          initialParams={{ user }} // Pass 'user' to HomeScreen
          options={{
            tabBarIcon: ({ color, size }) => <HomeSvg fill={color} width={size} height={size}  />,
            headerShown: false
          }}
        />
        <Tab.Screen
          name="Horoscope"
          component={HoroscopeScreen}
          initialParams={{ user }} // Pass 'user' to HoroscopeScreen
          options={{
            tabBarIcon: ({ color, size }) => <StarSVG fill={color} width={size} height={size} />,
            headerShown: false
          }}
        />
        <Tab.Screen
          name="Songs"
          component={RecommendationsScreen}
          initialParams={{ user }} // Pass 'user' to RecommendationsScreen
          options={{
            tabBarIcon: ({ color, size }) => <MusicNoteSvg fill={color} width={size} height={size} />,
            headerShown: false
          }}
        />
        <Tab.Screen
          name="Movies"
          component={MoviesScreen}
          initialParams={{ user }} // Pass 'user' to RecommendationsScreen
          options={{
            tabBarIcon: ({ color, size }) => <MovieReelSvg fill={color} width={size} height={size} />,
            headerShown: false
          }}
        />
      </Tab.Navigator>
    );
  }