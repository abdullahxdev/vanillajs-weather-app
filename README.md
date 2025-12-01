# 🌤️ Weather Dashboard

![Weather Dashboard](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/OpenWeatherMap-orange?style=for-the-badge&logo=weather&logoColor=white)

A dynamic, glassmorphic weather application built with vanilla JavaScript that fetches real-time weather data and 5-day forecasts using the OpenWeatherMap API. Features adaptive backgrounds, persistent search history, and seamless temperature unit conversion.

## ✨ Features

- 🌍 **Real-time Weather Data** - Current weather conditions for any city worldwide
- 📅 **5-Day Forecast** - Detailed weather predictions with icons and descriptions
- 🌡️ **Temperature Toggle** - Switch between Celsius and Fahrenheit instantly
- 💾 **Search History** - Persistent storage using localStorage (saves last 10 searches)
- 🎨 **Dynamic Backgrounds** - Adaptive themes based on weather conditions (sunny, rainy, cloudy, etc.)
- 🔍 **Smart Search** - Input validation and error handling for invalid cities
- ✨ **Glassmorphism UI** - Modern, translucent design with blur effects
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🎭 **Animated Elements** - Floating particles and smooth transitions

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Animations, Glassmorphism
- **JavaScript (ES6+)** - Async/Await, Fetch API, DOM Manipulation
- **OpenWeatherMap API** - Weather data provider
- **Local Storage API** - Persistent data storage

## 📦 Installation & Setup

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- OpenWeatherMap API key ([Get it here](https://openweathermap.org/api))

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Create configuration file**
   ```bash
   cp config.example.js config.js
   ```

3. **Add your API key**
   
   Open `config.js` and replace `YOUR_API_KEY_HERE` with your actual OpenWeatherMap API key:
   ```javascript
   const CONFIG = {
       API_KEY: 'your_actual_api_key_here',
       API_BASE_URL: 'https://api.openweathermap.org/data/2.5'
   };
   ```

4. **Open in browser**
   
   Simply open `index.html` in your browser, or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

5. **Access the app**
   
   Navigate to `http://localhost:8000` in your browser

## 🔑 Getting an API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API Keys section
4. Generate a new API key
5. Copy and paste it into `config.js`

**Note:** Free tier allows 60 calls/minute and 1,000,000 calls/month.

## 📂 Project Structure

```
weather-dashboard/
│
├── index.html              # Main HTML file
├── style.css               # Styling and animations
├── script.js               # Core JavaScript logic
├── config.example.js       # Template configuration file
├── config.js              # Your API key (gitignored)
├── .gitignore             # Git ignore rules
├── README.md              # Project documentation
│
└── screenshots/           # Screenshots for README
    ├── desktop.png
    └── mobile.png
```

## 💻 Key JavaScript Concepts Used

- **Async/Await & Promises** - Asynchronous API calls
- **Fetch API** - HTTP requests to OpenWeatherMap
- **JSON Parsing** - Data manipulation
- **DOM Manipulation** - Dynamic content updates
- **Event Listeners** - User interaction handling
- **Local Storage** - Persistent data storage
- **Array Methods** - map(), filter(), slice(), join()
- **Template Literals** - Dynamic HTML generation
- **Arrow Functions** - Concise function syntax
- **Error Handling** - try/catch blocks
- **Set Data Structure** - Unique date tracking
- **ES6 Modules** - Code organization

## 🎨 CSS Features

- **Flexbox & Grid** - Modern layouts
- **Glassmorphism** - Backdrop blur effects
- **CSS Animations** - Keyframe animations
- **Transitions** - Smooth hover effects
- **Linear Gradients** - Dynamic backgrounds
- **Media Queries** - Responsive design
- **Custom Properties** - (Can be added for theming)

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## 🐛 Known Issues

- API key must be obtained separately (not included in repo)
- Rate limiting applies on free tier (60 calls/minute)
- Requires internet connection for API calls

## 🔒 Security Notes

- **Never commit `config.js`** - It contains your API key
- API key is exposed in frontend (expected for free tier)
- For production apps, use backend proxy to hide API keys
- OpenWeatherMap free tier has rate limiting protection

## 🚀 Future Enhancements

- [ ] Add weather alerts and warnings
- [ ] Implement geolocation for automatic city detection
- [ ] Add weather maps visualization
- [ ] Support for multiple languages
- [ ] Dark/Light theme toggle
- [ ] Weather comparison between cities
- [ ] Export weather data as PDF/Image
- [ ] Add air quality index (AQI)
- [ ] Implement service worker for offline support

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@abdullahxdev](https://github.com/abdullahxdev)
- LinkedIn: [Muhammad Abdullah](https://linkedin.com/in/mabdullahxdev)
- Email: abdullahisdev@gmail.com

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from OpenWeatherMap API
- Font: [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)
- Inspiration from modern glassmorphism design trends


⭐ **If you found this project helpful, please consider giving it a star!** ⭐
