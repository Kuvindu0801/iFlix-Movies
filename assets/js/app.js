

const url= 'http://www.omdbapi.com/?t=predator+badlands&y=2025&apikey=790e9269';
const method='GET';

fetch(url)
.then(res => res.json())
.then(data => console.log(data));