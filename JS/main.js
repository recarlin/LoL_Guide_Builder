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
                rs.options[rs.options.length] = new Option(x[index], index);
            }
        }
    };
    //function showRunes(){
    //    
    //};
    //function clearRunes(){
    //    
    //};
    //function addRunes(){
    //    
    //};
    var pn = ge("type"),
        runeType;
    pn.addEventListener("click", getRuneType)
    pn.addEventListener("click", runeSelection)
    //var sr = ge("show");
    //sr.addEventListener("click", showRunes);
    //var cr = ge("clear");
    //cr.addEventListener("click", clearRunes);
    //var ar = ge("add");
    //ar.addEventListener("click", addRunes);
});