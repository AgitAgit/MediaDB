const _cloudServerAdress = 'https://mediadb-91464205485.us-central1.run.app';
const _localServerAdress = 'http://localhost:3000';
const _pingPath = '/api/ping';
const _dataPath = '/api/data';
const _pokemonPath = '/api/pokemon';

function testFunc(){
    fetch(`${_cloudServerAdress}${_dataPath}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
}

function pokemonFetch(){
    fetch(`${_cloudServerAdress}${_pokemonPath}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
}