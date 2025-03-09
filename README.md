# Weather App

A modern React Native weather application built with Expo and NativeWind that provides real-time weather information with a clean, intuitive UI.
![ScreenShot_1](https://github.com/user-attachments/assets/e7df5773-cc45-43bd-bd1b-d3d0ebfe1d6c)
![ScreenShot_2](https://github.com/user-attachments/assets/28398d6f-ff98-4975-bfbb-c6f1602bcc5a)


## Features

- **Real-time Weather Data**: Get current weather conditions for any location
- **Location Search**: Find weather information for cities worldwide
- **GPS Integration**: Automatically detect your current location
- **Hourly Forecast**: View detailed hourly weather predictions
- **5-Day Forecast**: Plan ahead with extended weather forecasts
- **Weather Notifications**: Receive alerts about significant weather changes
- **Clean UI/UX**: Beautiful interface with intuitive navigation
- **Dark Mode Support**: Comfortable viewing in any lighting condition

## Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [NativeWind](https://www.nativewind.dev/) (TailwindCSS for React Native)
- [React Navigation](https://reactnavigation.org/)
- [OpenWeatherMap API](https://openweathermap.org/api) / [AccuWeather API](https://developer.accuweather.com/)

## Project Structure

```
weather_app/
├── assets/             # App icons, images, and fonts
├── api/                # API services
├── components/         # Reusable UI components
├── navigation/         # Navigation configuration
├── screens/            # App screens
├── utils/              # Helper functions
├── App.js              # App entry point
├── app.json            # Expo configuration
└── README.md           # Project documentation
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Benfill/weather_app.git
   cd weather_app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API keys:

   ```
   WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npx expo start
   ```

## Usage

- **Search for a City**: Use the search bar to find weather information for any city
- **Current Location**: Tap the location icon to get weather for your current location
- **View Forecast**: Scroll down to see hourly and 5-day forecasts
- **Check Notifications**: View weather alerts and recommendations

## Project Management

This project is managed using Jira for task tracking and organization:

- **Jira Project**: [Weather App Jira Board](https://benfill.atlassian.net/jira/software/projects/WA)
- **Design Specs**: [Figma Design](<https://www.figma.com/design/nmHRw2o3yBQL49R07nib6d/Weather-Forecast-App-(Community)?node-id=0-1&t=ZtQXK6uumVvpy0wQ-1>)
- **Repository**: [GitHub Repo](https://github.com/Benfill/weather_app)

## Implemented Screens

The application includes the following screens:

- Home screen with current weather conditions
- Hourly and daily forecast screen
- City search and selection
- Weather notifications and alerts

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Weather data provided by [AccuWeather](https://www.accuweather.com/)
- UI design inspired by [Figma Community Template](<https://www.figma.com/design/nmHRw2o3yBQL49R07nib6d/Weather-Forecast-App-(Community)?node-id=0-1&t=ZtQXK6uumVvpy0wQ-1>)
