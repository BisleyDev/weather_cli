import * as fs from "fs";
import {getKeyValue, STORAGE_DICTIONARY} from "./storage.service.js";
import axios from "axios";

const baseURL = 'https://api.openweathermap.org/data/2.5/weather'

export async function getWeather() {
    const token = await getKeyValue(STORAGE_DICTIONARY.token)
    const city = await getKeyValue(STORAGE_DICTIONARY.city) || 'kyiv'
    if (!token) {
        throw new Error('API_KEY not found, please save him command -t [API_KEY]')
    }

    const { data } = await axios.get(baseURL, {
        params: {
            q: city,
            appid: token,
            lang: 'en',
            units: 'metric'
        }
    })
    return data
}