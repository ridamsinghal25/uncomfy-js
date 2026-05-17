```js

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
        totalWeight
    }
})()

how you would create es6 module from it


Your current code is using the **old IIFE module pattern + namespace object pattern**.

You are doing:

```js id="3qvay4"
sharmaMart.Inventory = (function () {

    function unitPrice() {}
    function totalWeight() {}

    return {
        unitPrice,
        totalWeight
    }

})()
```

This was the old way of creating modules before ES6.

---

# How We Convert This to ES6 Module

In ES6:

* every file itself becomes a module
* no need for IIFE
* no need for namespace object
* use `export` and `import`

---

# STEP 1 — Create `inventory.js`

```js id="pjlwmx"
// inventory.js

export function unitPrice(totalPrice, quantity) {
    return totalPrice / quantity;
}

export function totalWeight(weightPerItem, quantity) {
    return weightPerItem * quantity;
}
```

That’s it.

This file itself is now a module.

---

# STEP 2 — Use It Somewhere Else

Example:

```js id="cmrj7n"
// main.js

import { unitPrice, totalWeight } from "./inventory.js";

console.log(unitPrice(500, 10));
console.log(totalWeight(2, 5));
```

---

# THIS replaces your old code

Old:

```js id="c6djlwm"
sharmaMart.Inventory.unitPrice()
```

New:

```js id="0njw9g"
unitPrice()
```

because imports directly bring functions into scope.

---

# If You WANT Namespace Style

You can still keep namespace-like access.

---

# inventory.js

```js id="jlwmim"
function unitPrice(totalPrice, quantity) {
    return totalPrice / quantity;
}

function totalWeight(weightPerItem, quantity) {
    return weightPerItem * quantity;
}

export {
    unitPrice,
    totalWeight
};
```

---

# main.js

```js id="djlwm6"
import * as Inventory from "./inventory.js";

console.log(Inventory.unitPrice(500, 10));
console.log(Inventory.totalWeight(2, 5));
```

Now:

```txt id="2k9jlw"
Inventory
```

becomes:

```txt id="qjlwm0"
Module Namespace Object
```

similar to your old:

```js id="ksjlwm"
sharmaMart.Inventory
```

---

# Internal Comparison

---

# OLD IIFE MODULE

```js id="4zwjlwm"
const Inventory = (function () {

    function unitPrice() {}

    return {
        unitPrice
    }

})();
```

You manually created:

* private scope
* returned object
* namespace

---

# ES6 MODULE

```js id="jlwm5n"
export function unitPrice() {}
```

JavaScript automatically creates:

* module scope
* encapsulation
* namespace capability

No need for IIFE anymore.

---

# PRIVATE VARIABLES IN ES6 MODULES

Equivalent to closure private state:

```js id="jlwmf0"
// inventory.js

const TAX = 18;

export function finalPrice(price) {
    return price + TAX;
}
```

Outside module:

```js id="vjlwmj"
import { finalPrice } from "./inventory.js";

console.log(TAX); // ERROR
```

Because module scope is private.

---

# BEST MODERN VERSION OF YOUR CODE

---

# inventory.js

```js id="jjlwmn"
export function unitPrice(totalPrice, quantity) {
    return totalPrice / quantity;
}

export function totalWeight(weightPerItem, quantity) {
    return weightPerItem * quantity;
}
```

---

# main.js

```js id="jlwm1a"
import * as Inventory from "./inventory.js";

console.log(Inventory.unitPrice(1000, 20));

console.log(Inventory.totalWeight(2, 10));
```

---

# What JavaScript Internally Creates

Conceptually:

```txt id="jlwmvn"
Module Scope
------------------------
unitPrice()
totalWeight()
```

Then:

```js id="4jlwmp"
import * as Inventory
```

creates:

```txt id="jlwmui"
Inventory = {
   unitPrice,
   totalWeight
}
```

This is the:

```txt id="jlwm28"
Module Namespace Object
```

---

# SUPER IMPORTANT

In ES6 modules:

## Everything is private by default

Only exported things are public.

This is why ES6 modules naturally replace:

* IIFE
* revealing module pattern
* namespace pattern
* closure module pattern

```