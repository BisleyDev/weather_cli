import chalk from 'chalk'
import dedent from 'dedent-js'
import {getIcon} from "../helpers/getWeatherIcon.js";

export const logError = (error) => {
    console.log(chalk.bgRed(' ERROR: '), error)
}

export const logSuccess = (message) => {
    console.log(chalk.bgGreen(" SUCCESS: "), message)
}

export const logHelp = () => {
    console.log(
        dedent(`
        ${chalk.bgCyan(" HELPER")}
        ${chalk.green('Без параметров')} - вывод погоды
        ${chalk.green('-h')} - вывод помощи
        ${chalk.green('-с [CITY]')} - установить город
        ${chalk.green('-t [API_KEY]')} - сохранить токен от OpenWeather
    `))
}

export const printWeather = (data) => {
    console.log(
        dedent(`
        ${chalk.bgBlueBright(`Weather in ${data.name}`)}
        Time: ${new Date(data.dt * 1000)}
        
        ${getIcon(data.weather[0].icon)}  ${data.weather[0].main}
        Description: ${data.weather[0].description}
        
        Temp: ${data.main.temp}% (feels like: ${data.main.feels_like})
              max: ${data.main.temp_max}
              min: ${data.main.temp_min}
              
        Wind speed: ${data.wind.speed} 
        
        Sunrise: ${new Date(data.sys.sunrise * 1000)}
        Sunset: ${new Date(data.sys.sunset * 1000)}

    `))
}