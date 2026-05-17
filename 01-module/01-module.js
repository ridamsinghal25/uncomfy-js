const kiranaStore = (
    function () {
        let itemCount = 0;
        const godown = [];

        return {
            add(name) {
                itemCount++
                godown.push(name)

                return `Sharma Ji stocked item: ${name}`
            },
            count() {
                return itemCount
            },
            list() {
                return godown.slice()
            }
        }
    }
)()

// console.log(kiranaStore.add("Tea 10 packs"))
// console.log(kiranaStore.add("Ginger 10kg"))
// console.log("Count: ", kiranaStore.count())
// console.log("List: ", kiranaStore.list())

// console.log("Direct godown ?:", typeof kiranaStore.godown)
// console.log("Direct itemCount ?:", typeof kiranaStore.itemCount)

const AccountBook = (
    function () {
        const records = []
        let accessLog = []

        function logAccess(action) {
            accessLog.push(`[${new Date().toISOString().slice(0, 10)}] - ${action}`)
        }

        function store(doc) {
            logAccess(`Stored: ${doc}`)
            records.push(doc)
        }

        function retrieve(index) {
            logAccess(`Retrieved index: ${index}`)
            return records[index] || 'Not Found'
        }

        function recordCount() {
            logAccess(`Record count`)
            return recordCount.length
        }

        function getAccessLog() {
            return accessLog.slice()
        }

        return {
            store,
            retrieve,
            count: recordCount,
            log: getAccessLog
        }
    }
)()

// console.log(AccountBook.store("Sugar 2kg"))
// console.log(AccountBook.store("Rice 5 kg"))


// console.log("Sharma ji retrieve: ", AccountBook.retrieve(0))
// console.log("Count: ", AccountBook.count())
// console.log("Log Length: ", AccountBook.log().length)
// console.log("Show me type of log access: ", typeof AccountBook.logAccess)


