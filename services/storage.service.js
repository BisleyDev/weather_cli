import * as os from "os";
import * as path from "path";
import * as fs from "fs";

const filePath = path.join(os.homedir(), 'weather-storage.json')

export const STORAGE_DICTIONARY = {
    token: 'token',
    city: 'city',
}

export const saveKeyValue = async (key, value) => {
    let data = {}
    if (await isExist(filePath)) {
        const file = await fs.promises.readFile(filePath)
        data = JSON.parse(file)
    }
    data[key] = value;
    await fs.promises.writeFile(filePath, JSON.stringify(data))
}

export const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await fs.promises.readFile(filePath)
        return JSON.parse(file)[key]
    }
    return null
}

async function isExist(path) {
    try {
        await fs.promises.stat(path)
        return true
    } catch (e) {
        return false
    }
}