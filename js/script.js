window.onload = displayClock();

function displayClock() {
    let a;
    let time;
    setInterval(() => {
        a = new Date();
        time = a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
        document.getElementById('clock').innerHTML = time;
    }, 1000);
}