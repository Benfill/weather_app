export const getWeatherCondition = (weatherMain: string, weatherDescription: string) => {
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return 'Sunny';
    case 'clouds':
      if (weatherDescription.includes('few')) return 'Partly Cloudy';
      if (weatherDescription.includes('scattered')) return 'Cloudy';
      if (weatherDescription.includes('broken') || weatherDescription.includes('overcast'))
        return 'Cloudy';
      return 'Cloudy';
    case 'rain':
      return 'Rainy';
    case 'snow':
      return 'Snowy';
    case 'thunderstorm':
      return 'Thunderstorm';
    case 'drizzle':
      return 'Drizzle';
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog':
    case 'sand':
    case 'ash':
    case 'squall':
    case 'tornado':
      return 'Hazy';
    default:
      return weatherDescription;
  }
};
