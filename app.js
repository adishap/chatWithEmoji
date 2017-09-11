// map objects to img urls
var map = {
    ":D": "http://i.stack.imgur.com/nO2hl.png",
    ":)": "http://i.stack.imgur.com/QrKSV.png",
    ";)": "http://i.stack.imgur.com/IjpTt.png"
};

function escapeSpecialChars(regex) {
    return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
}

// display all emojis which can be used
function addEmojis() {
    var emojiDiv = document.getElementById('all-emojis');
    for (i in map) {
        var img = document.createElement('img');
        img.src = map[i];
        emojiDiv.appendChild(img);
    }
}

document.getElementById('textarea').addEventListener("keyup", function(event) {
    // if enter is pressed
    if (event.which == 13 || event.keyCode == 13) {
        var msgDiv = document.getElementById('messages');
        var div = document.createElement('div');
        div.innerHTML = this.innerHTML;
        msgDiv.appendChild(div);
        this.innerHTML = "";
    } else {
        // replce for all emoji
        for (var i in map) {
            var regex = new RegExp(escapeSpecialChars(i), 'gim');
            if (regex.test(this.innerHTML)) {
                this.innerHTML = this.innerHTML.replace(regex, "<img src='" + map[i] + "'>");
            }
        }
    }
});

// add emoji to emoji map
document.querySelector("#add-emoji").addEventListener("submit", function(event) {
    var emoji = document.querySelector("[name='emoji']");
    var emojiUrl = document.querySelector("[name='url']");

    //stop form from submitting
    event.preventDefault();

    map[emoji.value] = emojiUrl.value;
    addEmojis();
    emojiUrl.value = emoji.value = "";
});

// initially call emojis
addEmojis();