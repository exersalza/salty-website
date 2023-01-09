// JQuery stuff
let term_content;

const console_string = `<span class="prefix term-items">
                            julian@salty <span class="grey">::</span> <span class="home">~/</span> >
                            <span class="current-cmd"></span><span class="cursor"></span>
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

dirs = {
    github: '<a href="https://github.com/exersalza">exersalza@git</a>',
    kenexar: '<a href="https://kenexar.eu">kenexar</a>',
    twitch: '<a href="https://twitch.tv/exersalza">exersalza@twitch</a>',
    portfolio: openPortfolio,
}

cmds = {
    clear: function() { $('.term-items').remove(); },
    ls: function(arg) {
        let ret = `
        <span class="term-items">
            <span class="dot">. ..</span>
            <a href="https://github.com/exersalza" class="dir">github</a>
            <a href="https://kenexar.eu" class="dir">kenexar</a>
            <a href="https://twitch.tv/exersalza" class="dir">twitch</a>
            <span class="dir portfolio">portfolio</span>
        </span>
        `;
        if (!arg) {
            term_content.append(ret);
            return;
        }
        
        console.log()
        if (dirs[arg] != undefined && typeof dirs[arg] === "function") {
            dirs[arg]()
            return;
        }

        term_content.append(`<span class="term-items"> 
                                ${(dirs[arg] != undefined) ? dirs[arg] : ret} 
                            </span>`)


    },
    help: function() { 
        term_content.append(`
            <span class="term-items">
                <p class="help-apex">Help Site</p>
                <p class="help-content">Info: <br>-> Anything in <> are parameters that you can give the command to process.</p>

                <p class="help-items">help</p>
                <p class="help-desc">This show's you this site.</p>

                <p class="help-items">clear</p>
                <p class="help-desc">Clears the terminal for you.</p>

                <p class="help-items">ls &lt;dir name&gt;</p>
                <p class="help-desc">List current directory.</p>
            </span>
        `);
    },
    jack: function() {
        window.location.href = "img/logo.png";
    }
}

function openPortfolio() {
    $('.portfolio-member').remove();

    for (let i in data) {
        term_content.append(`<span class="portfolio-member">drwxr-xr-x ${i} julian exersalza 4096 
                <a href="${data[i].url}">${data[i].name} :&nbsp;${data[i].desc}</a><br></span>`);
    }
}

function add_line(str) {
    term_content.append(str);
};

function validate_cmds(cmd) {
    // will get use later, it's for that the cmd is red as long it's a valid command.
}

// terminal stuff
$(function() {
    let term = $('#terminal');
    let input = $('#term-input');

    term_content = $('#terminal-content');

    // show console line
    term_content.append('<span class="motd term-items">type \'help\' for information. <a href="mailto:exersalza.dev@gmail.com">contact</a></span>');
    add_line(console_string);

    input.on("keyup", (e) => {
        if (e.which == 13) {
            // validation
            if (input.val().split(" ")[0] in cmds) {
                let val = input.val().split(" ");

                let arg = (val.length >= 2) ? val[1] : "";
                cmds[val[0]](arg);

            } else {
                if (input.val() != "") {
                    term_content.append(`<span class="term-items">'${input.val()}' is not a Command. Try 'help' for more commands.</span>`);
                }
            }

            $('.current-cmd').attr('class', 'old-cmd');
            $('.cursor').attr('class', 'old-cursor');

            input.val('');
            add_line(console_string);
            return;
        }

        $('.current-cmd').text(input.val());
    })

    input.on("keydown", (e) => { // just for the deletion, that when you hold the button you see how much you delete. :)
        $('.current-cmd').text(input.val());
    })
});
