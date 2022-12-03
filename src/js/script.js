// JQuery stuff
let term_content;

const console_string = `<span class="prefix term-items">
                            julian@salty <span class="grey">::</span> <span class="home">~/</span> >
                            <span class="current-cmd"></span>
                        </span>`;

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

cmds = {
    clear: function() { $('.term-items').remove(); },
    help: function() { 
        term_content.append(`
            <span class="term-items">
                <p class="help-apex">Help Site</p>
                <p class="help-content">Help Content</p>
            </span>
        `);
     },
}

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

function add_line(str) {
    term_content.append(str);
};

function validate_cmds(cmd) {

}

// terminal stuff
$(function() {
    let term = $('#terminal');
    let input = $('#term-input');

    term_content = $('#terminal-content');

    // show console line
    add_line(console_string);

    input.on("keyup", (e) => {
        if (e.which == 13) {
            // validation
            if (input.val() in cmds) {
                cmds[input.val()]();

            } else {
                if (input.val() != "") {
                    term_content.append(`<span class="term-items">'${input.val()}' is not a Command. Try 'help' for more commands.</span>`);
                }
            }

            let t = $('.current-cmd');
            t.attr('class', 'old-cmd');

            input.val('');
            add_line(console_string);
            return;
        }

        $('.current-cmd').text(input.val());
    })

    input.on("keydown", (e) => { // just for the deletion, that when you hold the button you see how much you delete. :)
        if (e.which === 8) {
            $('.current-cmd').text(input.val());
        }
    })
});