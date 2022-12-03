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

// terminal stuff
$(function() {
    let term = $('#terminal');
    let input = $('#term-input');

    input.on("keyup", (e) => {
        $('.current-cmd').text(input.val());
        
        if (e.which == 13) {
            console.log("ENTER");
        }
    })

    input.on("keydown", () => { // just for the deletion, that when you hold the button you see how much you delete. :)
        $('.current-cmd').text(input.val());
    })
});