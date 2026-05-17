const stationClock = {
    _hour: 12,
    _minute: 0,

    tick() {
        this._minute += 1

        if (this._minute >= 60) {
            this._minute = 0
            this._hour = (this._hour % 12) + 1
        }
    },

    time() {
        const h = String(this._hour).padStart(2, "0")
        const m = String(this._minute).padStart(2, "0")

        return `${h}:${m}`
    }
}

// console.log("Sharma Ji Checks: ", stationClock.time())
stationClock.tick()
stationClock.tick()

// console.log("Time after 2 tick: ", stationClock.time())

// const platform1 = stationClock
// const platform2 = stationClock

// console.log("Same Instance?: ", platform1 === platform2)

// Closure Based Singleton with Private State
// Singleton with IIFE
const stationBell = (function() {
    let ringCount = 0

    const instance = {
        ring() {
            ringCount++
            return `Sharma Ji rings bell ${ringCount}`
        },
        total() {
            return ringCount
        },
    }

    return instance
})()

// console.log(stationBell.ring())
// console.log(stationBell.ring())

// console.log("Total ring count: ", stationBell.total())

// Class Based Singleton
// TRUE Singleton
class ClockMechanism {
    constructor() {
        if (ClockMechanism._instance) {
            return ClockMechanism._instance
        }
        this.gears = 42
        this.wound = false
        ClockMechanism._instance = this
    }

    wind() {
        this.wound = true
        return `Changed the state to true`
    }

    status() {
        return `Gears: ${this.gears}, wound: ${this.wound}`
    }

    static getInstance() {
        if(!ClockMechanism._instance) {
            new ClockMechanism()
        }

        return ClockMechanism._instance
    }
}

const mech = ClockMechanism.getInstance()
// console.log("ClockMechanism 1: ", ClockMechanism)

ClockMechanism._instance = null

// console.log("ClockMechanism 2: ", ClockMechanism)

const mech1 = new ClockMechanism()
const mech2 = new ClockMechanism()

// console.log("Same or not: ", mech1 === mech2)


function createStationConfig() {
    const config = {
        platform: 8,
        tracks: 12,
        junction: "Bengaluru"
    }

    return Object.freeze(config)
}

const stationConfig = createStationConfig()

console.log("Platform: ", stationConfig.platform)
console.log("Platform: ", Object.getOwnPropertyDescriptors(stationConfig))

stationConfig.platform = 9999

console.log("Platform: ", stationConfig.platform)
