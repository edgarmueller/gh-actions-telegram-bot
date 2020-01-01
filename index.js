require('dotenv').config()
const fetch = require('node-fetch')
const telegram = require('node-telegram-bot-api')
const bot = new telegram(process.env.TELEGRAM_API_TOKEN)

const weatherToken = process.env.WEATHER_API_TOKEN
const weatherApiUrl = new URL("https://api.openweathermap.org/data/2.5/weather")
weatherApiUrl.searchParams.set("APPID", weatherToken)
weatherApiUrl.searchParams.set("zip", "81543,de")
weatherApiUrl.searchParams.set("units", "metric")

const fetchWeatherData = async () => {
    const resp = await fetch(weatherApiUrl.toString())
    const body = await resp.json()
    return body
}

const generateWheatherMessage = weatherData =>
    `The weather in ${weatherData.name}: ${weatherData.weather[0].description}. ` +
    `Current temperature is ${weatherData.main.temp} °C, ` +
    `with a low of ${weatherData.main.temp_min} and high of ${weatherData.main.temp_max} °C.`


const main = async () => {
    const weatherData = await fetchWeatherData()
    const weatherString = generateWheatherMessage(weatherData)
    bot.sendMessage(process.env.TELEGRAM_CHAT_ID, weatherString);
}

main()