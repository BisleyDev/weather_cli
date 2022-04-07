#!/usr/bin/env node

import {getArgs} from "./helpers/args.js";
import {logError, logHelp, logSuccess, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, STORAGE_DICTIONARY} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";

const startCLI = async () => {
    const arg = getArgs(process.argv)
    if (arg.c) await saveCity(arg.c)
    if (arg.h) return logHelp()
    if (arg.t) saveToken(arg.t)
    getForcast()
}

async function saveToken(value) {
    if (!value.length) {
        logError('token is not specified')
        return
    }
    try {
        await saveKeyValue(STORAGE_DICTIONARY.token, value)
        logSuccess(`${value} - token saved`)
    } catch (e) {
        logError(e.message)
    }
}

async function saveCity(value) {
    if (!value.length) {
        logError('city is not specified')
        return
    }
    try {
        await saveKeyValue(STORAGE_DICTIONARY.city, value)
        logSuccess(`${value} - city saved`)
    } catch (e) {
        logError(e.message)
    }
}

async function getForcast() {
    try {
        const resp = await getWeather()
        printWeather(resp)
    } catch (e) {
        if (e.response?.status === 401) {
            const savedCity = await getKeyValue(STORAGE_DICTIONARY.city)
            logError(`Invalid value - ${savedCity}, please change city`)
        } else if (e.response?.status === 404) {
            logError('Invalid value, please change token')
        } else {
            logError('e.message')
        }
    }
}

startCLI()