data = [
    {
        name: "salty-cpp-bot",
        desc: "This is my first Real cpp Project.",
        url: "https://github.com/exersalza/salty-cpp-bot"
    },
    {
        name: "kenexar-core",
        desc: "This Project includes widely used Python snippets used by <a href='https://kenexar.eu/'>Kenexar</a>.",
        url: "https://github.com/Kenexar/kenexar-core"
    },
]

function displayClock() {
    let a;
    let time;
    setInterval(() => {
        a = new Date();
        time = a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
        document.getElementById('clock').innerHTML = time;
    }, 1000);
}

function openPortfolio() {
    let portfolio = $('.portfolio');

    $('.portfolio-member').remove();

    $('#1 > .cmd').html('ls -la .Portfolio/');

    for (let i in data) {
        portfolio.append(`<span class="portfolio-member">drwxr-xr-x ${i} julian exersalza 4096 
                <a href="${data[i].url}">${data[i].name} :&nbsp;${data[i].desc}</a><br></span>`);
    }
}