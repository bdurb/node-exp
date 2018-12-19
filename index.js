const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const PORT = 4000

const app = express()
app.use(bodyParser.json())

let people

axios.all([
  axios.get('https://swapi.co/api/people/?page=1'),
  axios.get('https://swapi.co/api/people/?page=2'),
  axios.get('https://swapi.co/api/people/?page=3'),
  axios.get('https://swapi.co/api/people/?page=4'),
  axios.get('https://swapi.co/api/people/?page=5'),
  axios.get('https://swapi.co/api/people/?page=6'),
  axios.get('https://swapi.co/api/people/?page=7'),
  axios.get('https://swapi.co/api/people/?page=8'),
  axios.get('https://swapi.co/api/people/?page=9')
  ])
  .then(res => {
    people = res.map(res => res.data.results).flat()
  })


app.get('/people',(req, res) => {
  needsSorted = req.query.sorted
  if (needsSorted == 'name'){
    const nameSort = people.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    res.send(nameSort)
  }
  else if (needsSorted == 'height'){
    const heightSort = people.sort((a, b) => {
      return parseInt(a.height) - parseInt(b.height)
    })
    res.send(heightSort)
  }
  else if (needsSorted == 'mass'){
    const massSort = people.sort((a, b) => {
      return parseInt(a.mass) - parseInt(b.mass)
    })
    res.send(massSort)
  } else {
  res.send(people)
  }
})

let planets

axios.all([
  axios.get('https://swapi.co/api/planets/?page=1'),
  axios.get('https://swapi.co/api/planets/?page=2'),
  axios.get('https://swapi.co/api/planets/?page=3'),
  axios.get('https://swapi.co/api/planets/?page=4'),
  axios.get('https://swapi.co/api/planets/?page=5'),
  axios.get('https://swapi.co/api/planets/?page=6'),
  axios.get('https://swapi.co/api/planets/?page=7'),
  
  ])
  .then(res => {
    planets = res.map(res => res.data.results).flat()
  })
   


app.get('/planets', (req, res) => {
  planets.forEach(item => {
    for (let url in item.residents) {
      axios.get(item.residents[url])
      .then(res => {
        item.residents[url] = res.data.name
      })
      .catch(err => {
        alert(err)
      })
    }
  })
  res.send(planets)
})



app.listen(PORT, () => {
  console.log(`App up and running on ${PORT}`)
})