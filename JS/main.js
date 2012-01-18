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
    function getRuneCategory() {
            var t = document.forms[0].runeCat;
            for (var i=0, l=t.length; i<l; i++) {
                if(t[i].checked) {
                    runeCat = t[i].value;
                };
            };
        };
    function toggle(x) {
        switch(x){
            case "on":
                ge("runeForm").style.display = "none";
                ge("clear").style.display = "inline";
                ge("show").style.display = "none";
                ge("addMore").style.display = "inline";
                break;
            case "off":
                ge("runeForm").style.display = "block";
                ge("clear").style.display = "inline";
                ge("show").style.display = "inline";
                ge("addMore").style.display = "none";
                ge("runes").style.display = "none";
                break;
            default:
                return false;
        }
    }
    function runeSelection() {
        if(runeCat === "Mark"){
            popSelect(runes.mark);
        } else {
            if(runeCat === "Seal"){
                popSelect(runes.seal);
            } else {
                if(runeCat === "Glyph") {
                    popSelect(runes.glyph);
                } else {
                    if(runeCat === "Quintessence"){
                        popSelect(runes.quint);
                    };
                };
            };
        };
        function popSelect(x) {
            var rs = ge("runeType");
            rs.options.length = 0
            for(index in x) {
                rs.options[rs.options.length] = new Option(x[index], x[index]);
            }
        }
    };
    function showQuant() {
        var q = ge("quant").value;
        ge("showQuant").innerHTML = "Quantity: " + q
    }
    function showRunes() {
        
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "runes");
        var makeList = document.createElement("ol");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        ge("runes").style.display = "block";
        for(i=0, l=localStorage.length; i<l; i++) {
            var makeli = document.createElement("li");
            makeList.appendChild(makeli);
            var key = localStorage.key(i)
            var value = localStorage.getItem(key);
            var rune = JSON.parse(value);
            var makeSubList = document.createElement("ul");
            makeli.appendChild(makeSubList);
            makeSubList.style.listStyle = "none";
            makeSubList.style.textIndent = "-35px";
            for(var r in rune) {
                var makeSubli = document.createElement("li");
                makeSubList.appendChild(makeSubli);
                var runeSubText = rune[r][0] + ": " + rune[r][1];
                makeSubli.innerHTML = runeSubText;
            }
        }
        toggle("on");
    };
    function clearRunes() {
        if(localStorage.length === 0) {
            alert("There are no runes saved.")
        } else {
            localStorage.clear();
            alert("Cleared saved runes.")
            window.location.reload();
        };
    };
    function addRunes() {
        valiData();
        if (errors.length != 0) {
            showErrors();
        } else {
        var id = Math.floor(Math.random()*100000000);
        var rune = {};
            rune.sec = ["Section Title", ge("secTitle").value]
            rune.type = ["Rune Catagory", runeCat];
            rune.name = ["Rune Type", ge("runeType").value];
            rune.amount = ["Amount", ge("quant").value];
            rune.explain = ["Explaination", ge("explain").value];
            rune.date = ["Date Added", ge("date").value];
        localStorage.setItem(id, JSON.stringify(rune))
        alert("Runes Saved!")
        };
    };
    function valiData() {
        var compiledErrors = [],
            errors = [],
            st = ge("secTitle"),
            ex = ge("explain"),
            da = ge("date"),
            vd = /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
        if (st.value === "*Title*") {
            var titleError = "Please give a section title";
            titleError.style.border = "1px dotted red"
            compiledErrors.push(titleError);
        };
        if (runeCat === "") {
            var catError = "Please select a rune category";
            catError.style.border = "1px dotted red"
            compiledErrors.push(catError);
        };
        if (ex.value === "*Type your guide here*") {
            var explainError = "Please give a rune explaination";
            explainError.style.border = "1px dotted red"
            compiledErrors.push(explainError);
        };
        if (!(vd.exec(da.value))) {
            var dateError = "Please use a valid date: yyyy-mm-dd";
            dateError.style.border = "1px dotted red"
            compiledErrors.push(dateError);
        };
        var errors = compiledErrors
    };
    function showErrors() {
        
    };
    var popt = ge("runeCat"),
        runeCat,
        errors = [];
    popt.addEventListener("click", getRuneCategory);
    popt.addEventListener("click", runeSelection);
    var su = ge("quant");
    su.addEventListener("change", showQuant);
    var sr = ge("show");
    sr.addEventListener("click", showRunes);
    var cr = ge("clear");
    cr.addEventListener("click", clearRunes);
    var ar = ge("add");
    ar.addEventListener("click", addRunes);
});