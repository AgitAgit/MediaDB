
function testFunc(){
    fetch('https://mediadb-88v1.onrender.com/api/data')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
}