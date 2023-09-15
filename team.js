
function after_load_display(){
    var t= document.querySelectorAll(".card-container");
    t[0].style.display ="block";
    t[1].style.display ="inline";
    t[2].style.display ="none";
    t[3].style.display ="none";
    document.querySelector(".word_render").innerHTML = "Final Year Members";
}
function final(){
    var t= document.querySelectorAll(".card-container");
    for(let i of t){
        i.style.display = "none";
    }
    t[0].style.display = "block";
    document.querySelector('#final').style.display = "inline";
    document.querySelector(".word_render").innerHTML = "Final Year Members";
}

function second(){
    var t= document.querySelectorAll(".card-container");
    for(let i of t){
        i.style.display = "none";
    }
    t[0].style.display = "block";
    document.querySelector('#second').style.display = "inline";
    document.querySelector(".word_render").innerHTML = "Second Year Members";
}

function third(){
    var t= document.querySelectorAll(".card-container");
    for(let i of t){
        i.style.display = "none";
    }
    t[0].style.display = "block";
    document.querySelector('#third').style.display = "inline";
    document.querySelector(".word_render").innerHTML = "Third Year Members";
}