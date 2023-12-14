function lanceDe(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calcul terminé')
            const rand = Math.random()
            //resolve(rand)
            reject(new Error('erreur'))
        }, ms)
    })
}

/*
lanceDe(1000).then((nb1) => {
    console.log(nb1)
    return lanceDe(2000)
}).then((nb2) => {
    console.log(nb2)
    return lanceDe(2000)
}).then((nb3) => {
    console.log(nb3)
    return Promise.all([ lanceDe(1000), lanceDe(2000) ])
}).then((arrayNb) => {
    console.log(arrayNb)
}).catch((err) => {
    console.log(err)
})
*/

async function foo() {
    try {
        const nb1 = await lanceDe(1000)
        const nb2 = await lanceDe(1000)
        const nb3 = await lanceDe(1000)
        console.log(nb1, nb2, nb3)
    }
    catch (err) {
        console.log('A', err)
        throw err
    }
}

foo().then((str) => {
    console.log('terminé')
}).catch((err) => {
    console.log('B', err)
})