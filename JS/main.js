// Russell Carlin
// VFW 1/12
// Project 3
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
            var c = document.forms[0].runeCat;
            for (var i=0, l=c.length; i<l; i++) {
                if(c[i].checked) {
                    runeCat = c[i].value;
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
            var buttonsLi = document.createElement("li");
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
                makeSubList.appendChild(buttonsLi);
            };
            createButtons(localStorage.key(i), buttonsLi);  
        };
        toggle("on");
    };
    function createButtons(key, buttonsLi) {
        var editButton = document.createElement("a");
        editButton.href = "#";
        editButton.key = key;
        var editTxt = "Edit Rune Set";
        editButton.addEventListener("click", editRunes);
        editButton.innerHTML = editTxt;
        buttonsLi.appendChild(editButton);
        
        var deleteButton = document.createElement("a");
        deleteButton.href = "#";
        deleteButton.key = key;
        deleteButton.setAttribute("id", "del")
        var deleteTxt = "Delete Rune Set";
        deleteButton.addEventListener("click", deleteRunes);
        deleteButton.innerHTML = deleteTxt;
        buttonsLi.appendChild(deleteButton);
        buttonsLi.style.margin = "0px 0px 10px 0px";
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
    function editRunes () {
        ge("nav").style.display = "none";
        var value = localStorage.getItem(this.key);
        var rune = JSON.parse(value);
        toggle("off");
        ge("secTitle").value     = rune.sec[1]
        ge("quant").value  = rune.amount[1]
        ge("explain").value = rune.explain[1]
        ge("date").value    = rune.date[1]
        var rad = document.forms[0].runeCat;
        if(rune.cat[1] === "Mark"){
            rad[0].setAttribute("checked", "checked");
        } else {
            if(rune.cat[1] === "Seal"){
                rad[1].setAttribute("checked", "checked");
            } else {
                if(rune.cat[1] === "Glyph") {
                    rad[2].setAttribute("checked", "checked");
                } else {
                    if(rune.cat[1] === "Quintessence"){
                        rad[3].setAttribute("checked", "checked");
                    };
                };
            };
        };
        getRuneCategory();
        runeSelection();
        ge("runeType").value = rune.type[1]
        ge("add").value = "Save Edit";
        currentKey = (this.key)
    };
    function addRunes() {
        var id = Math.floor(Math.random()*100000000);
        var rune = {};
            rune.sec     = ["Section Title", ge("secTitle").value]
            rune.cat     = ["Rune Catagory", runeCat];
            rune.type    = ["Rune Type", ge("runeType").value];
            rune.amount  = ["Amount", ge("quant").value];
            rune.explain = ["Explaination", ge("explain").value];
            rune.date    = ["Date Added", ge("date").value];
        localStorage.setItem(id, JSON.stringify(rune))
        alert("Runes Saved!")
        var rs = ge("runeType");
        document.location.reload();
        document.forms[0].reset();
        runeCat = "";
        rs.options.length = 0;
        rs.options[0] = new Option("*Select a rune category*", "selectCat");
    };
    function deleteRunes () {
        var ask = confirm("Delete this rune set?");
        if (ask) {
            localStorage.removeItem(this.key);
            window.location.reload();
        } else {
            alert("Rune set not deleted.")
        };
    };
    function valiData(e) {
        var st = ge("secTitle"),
            ex = ge("explain"),
            da = ge("date"),
            rc = ge("runeCat"),
            el = ge("errorList"),
            vd = /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
            el.innerHTML = "";
            st.style.border = "1px solid black";
            rc.style.border = "none";
            ex.style.border = "1px solid black";
            da.style.border = "1px solid black";
        if (st.value === "") {
            var titleError = "Please give a section title";
            st.style.border = "2px solid red";
            errors.push(titleError);
        }
        if (runeCat === "") {
            var catError = "Please select a rune category";
            rc.style.border = "2px solid red";
            errors.push(catError);
        }
        if (ex.value === "") {
            var explainError = "Please give a rune explaination";
            ex.style.border = "2px solid red";
            errors.push(explainError);
        }
        if (!(vd.exec(da.value))) {
            var dateError = "Please use a valid date: yyyy-mm-dd";
            da.style.border = "2px solid red";
            errors.push(dateError);
        }
        if (errors.length === 0) {
            if (ge("add").value === "Save Edit") {
                localStorage.removeItem(currentKey);
                addRunes();
            } else {
                addRunes();
            };
        } else {
            showErrors();
        };
        e.preventDefault();
    };
    function showErrors() {
        var el = ge("errorList")
        for(i=0, l=errors.length; i<l; i++) {
            var newError = document.createElement("li");
            newError.innerHTML = errors[i];
            el.appendChild(newError);
        };
        errors = [];
    };
    var popt = ge("runeCat"),
        runeCat = ""
    popt.addEventListener("click", getRuneCategory);
    popt.addEventListener("click", runeSelection);
    var su = ge("quant");
    su.addEventListener("change", showQuant);
    var sr = ge("show");
    sr.addEventListener("click", showRunes);
    var cr = ge("clear");
    cr.addEventListener("click", clearRunes);
    var ar = ge("add");
    ar.addEventListener("click", valiData);
    var errors = [],
        currentKey;
    
});