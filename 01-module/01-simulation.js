// Simulation

const sharmaMart = {}

sharmaMart.Inventory = (function () {
    function unitPrice(totalPrice, quantity) {
        return totalPrice / quantity
    }

    function totalWeight(weightPerItem, quantity) {
        return weightPerItem * quantity
    }

    // export {unitPrice, totalWeight}
    return {
        unitPrice,
        totalWeight,
    }
})()


// Dependency Injection
sharmaMart.BillingCalCulator = (function(Inv) {
    function bulkDiscount(pricePerKg, kgs) {
        const totalWeight = Inv.totalWeight(pricePerKg, kgs)

        return `${(totalWeight * 0.95).toFixed(1)} after 5% bulk discount`
    }

    return {
        bulkDiscount
    }
})(sharmaMart.Inventory)

console.log(sharmaMart.BillingCalCulator.bulkDiscount(60, 10))

console.log("Object Module: ", Object.keys(sharmaMart))
console.log("Inventory APIS: ", Object.keys(sharmaMart.Inventory))