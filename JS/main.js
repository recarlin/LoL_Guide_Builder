// Russell Carlin
// VFW 1/12
// Project 2
window.addEventListener("DOMContentLoaded", function () {
    var runes = {
        mark: ["Alacrity", "Desolation", "Destruction", "Insight", "Malice", "Strength"],
        seal: ["Clarity", "Defense", "Knowledge", "Resilience", "Vigor", "Vitality"],
        glyph: ["Clarity", "Focus", "Force", "Knowledge", "Potency", "Shielding", "Warding"],
        quint: ["Alacrity", "Avarice", "Desolation", "Force", "Fortitude", "Insight", "Knowledge", "Malice", "Potency", "Strength", "Swiftness", "Vigor"]
    };
    function ge(id) {
        var e = document.getElementById(id);
        return e;
    }
    function getRuneType() {
            var t = document.forms[0].type;
            for (var i=0, l=t.length; i<l; i++) {
                if(t[i].checked) {
                    runeType = t[i].value;
                };
            };
        };
    function runeSelection() {
        if(runeType === "Mark"){
            popSelect(runes.mark);
        } else {
            if(runeType === "Seal"){
                popSelect(runes.seal);
            } else {
                if(runeType === "Glyph") {
                    popSelect(runes.glyph);
                } else {
                    if(runeType === "Quintessence"){
                        popSelect(runes.quint);
                    };
                };
            };
        };
        function popSelect(x) {
            var rs = ge("rname");
            rs.options.length = 0
            for(index in x) {
                rs.options[rs.options.length] = new Option(x[index], x[index]);
            }
        }
    };
    function showRunes(){
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "runes");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        for(i=0, l=localStorage.length; i<l; i++) {
            var makeli = document.createElement("li");
            makeList.appendChild(makeli);
            var key = localStorage.key(i)
            var value = localStorage.getItem(key);
            var rune = JSON.parse(value);
            var makeSubList = document.createElement("ul");
            makeli.appendChild(makeSubList);
            for(var r in rune) {
                var makeSubli = document.createElement("li");
                makeSubList.appendChild(makeSubli);
                var runeSubText = rune[r][0] + ": " + rune[r][1];
                makeSubli.innerHTML = runeSubText;
            }
        }
    };
    function clearRunes(){
        if(localStorage.length === 0) {
            alert("There are no runes saved.")
        } else {
            localStorage.clear();
            alert("Cleared saved runes.")
            window.location.reload();
        };
    };
    function addRunes(){
        var id = Math.floor(Math.random()*100000000);
        var rune = {};
            rune.sec = ["Section Title", ge("secTitle").value]
            rune.type = ["Rune Type", runeType];
            rune.name = ["Rune Name", ge("rname").value];
            rune.amount = ["Amount", ge("quant").value];
            rune.explain = ["Explaination", ge("explain").value];
            rune.date = ["Date Added", ge("date").value];
        localStorage.setItem(id, JSON.stringify(rune))
        alert("Runes Saved!")
    };
    var pn = ge("type"),
        runeType;
    pn.addEventListener("click", getRuneType)
    pn.addEventListener("click", runeSelection)
    var sr = ge("show");
    sr.addEventListener("click", showRunes);
    var cr = ge("clear");
    cr.addEventListener("click", clearRunes);
    var ar = ge("add");
    ar.addEventListener("click", addRunes);
});