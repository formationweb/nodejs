fetch('http://localhost:3000/api/users', {
    credentials: true
}).then(res => res.json()).then(console.log)