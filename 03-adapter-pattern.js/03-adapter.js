const foreignWeatherAPI = {
    fetch_weather(city_name) {
        return {
            city_name,
            temp_fahrenheit: 72,
            wind_speed_mph: 5,
            condition: "partially cloudy"
        }
    }
}

class WeatherAdapter {
    constructor(foreignAPI) {
        this._api = foreignAPI
    }

    getWeather(city_name) {
        const raw = this._api.fetch_weather(city_name)
        return {
            city: city_name,
            tempCelsius: Math.round(((raw.temp_fahrenheit - 32) * 5)/9),
            windKmph: Math.round(raw.wind_speed_mph * 1.6),
            condition: raw.condition
        }
    } 


}

const weather = new WeatherAdapter(foreignWeatherAPI)

console.log(weather.getWeather("Jaipur"))

const localStorageSimulator = (() => {
    const store = new Map()

    return {
        getItem(key) {
            return store.has(key) ? store.get(key) : null
        },
        setItem(key, value) {
            store.set(key, String(value))
        },
        get length() {
            return store.size
        },
        clear() {
            store.clear()
        }
    }
})()


class AsyncStorageAdapter {
    constructor(syncStorage) {
        this._storage = syncStorage
    }

    async getItem(key) {
        const raw = this._storage.getItem(key)
        try {
            return JSON.parse(raw)
        } catch (error) {
            return raw
        }
    }
}

async function runAsyncStorageDemo() {
    const storage = new AsyncStorageAdapter(localStorageSimulator)

    await storage.getItem("user")
}