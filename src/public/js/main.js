fetch('http://localhost:3000/api/users')
    .then(res => res.json())
    .then(console.log)