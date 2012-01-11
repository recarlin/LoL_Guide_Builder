// Russell Carlin
// VFW 1/12
// Project 2
window.addEventListener("DOMContentLoaded"), function (){
    function ge(id){
        var e = document.getElementById(id);
        return e;
    };
    function runeSelection(){
        var runeType = 
    };
    function showRunes(){
        
    };
    function clearRunes(){
        
    };
    function addRunes(){
        
    };
    var sr = ge("show");
    sr.addEventListener("click", showRunes);
    var cr = ge("clear");
    cr.addEventListener("click", clearRunes);
    var ar = ge("add");
    ar.addEventListener("click", addRunes);
    var runes = {
        mark: ["Alacrity", "Desolation", "Destruction", "Insight", "Malice", "Strength"],
        seal:["Clarity", "Defense", "Knowledge", "Resilience", "Vigor", "Vitality"],
        glyph:["Clarity", "Focus", "Force", "Knowledge", "Potency", "Shielding", "Warding"],
        quint:["Alacrity", "Avarice", "Desolation", "Force", "Fortitude", "Insight", "Knowledge", "Malice", "Potency", "Strength", "Swiftness", "Vigor"]
        };
});