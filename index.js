var triangle_ele = document.querySelector('.triangle');
var halo_ele = document.querySelector('.halo-container');
var user_circle = document.querySelector('.user-circle');
var comp_circle = document.querySelector('.comp-circle');

var next_btn = document.querySelector('.next-button');
var rules_btn = document.querySelector('.rules-button');
var big_text = document.querySelector('.big-text');
var small_text = document.querySelector('.small-text');

var user_symbol_img = document.querySelector('.user_img');
var comp_symbol_img = document.querySelector('.comp_img');

var userScoreBox = document.querySelector('.user-box .actual-score');
var compScoreBox = document.querySelector('.comp-box .actual-score');
var play_again_btn = document.querySelector('.play-again-btn');
var choices = ['stone', 'paper', 'scissor'];

// ======================================F U N C T I O N S=========================================================
function showRules(){
    var rulesBox = document.querySelector('.outer-rules-box');
    rulesBox.style.visibility = 'visible';
}

function hideRules(){
    var rulesBox = document.querySelector('.outer-rules-box');
    rulesBox.style.visibility = 'hidden';
}

function compareChoices(user, comp){
    if (user==comp){
        return 'Tie';
    }
    else if ((user=='stone' && comp=='scissor') || (user=='paper' && comp=='stone') || (user=='scissor' && comp=='paper')) {
        return 'user';
    }
    else {
        return 'comp';
     }}

function user_winner_landing(){
    user_circle.classList.add('halo-box-shadow');
    big_text.innerText = 'YOU WIN';
    next_btn.style.visibility = 'visible';
    rules_btn.style.right = '115px';    
}
function comp_winner_landing(){
    comp_circle.classList.add('halo-box-shadow');
    big_text.innerText = 'YOU LOST';
    next_btn.style.visibility = 'hidden';
    rules_btn.style.right = '15px';
}

function tie_landing(){
    small_text.style.visibility = 'hidden';
    big_text.innerText = 'TIE UP';
    next_btn.style.visibility = 'hidden';
    rules_btn.style.right = '15px';
    play_again_btn.innerText = 'REPLAY';
}

function play_again_func(){
    triangle_ele.style.display = 'block';
    halo_ele.style.display = 'none';

    user_symbol_img.src = '';
    user_circle.classList.remove('halo-stone-circle', 'halo-paper-circle', 'halo-scissor-circle','halo-box-shadow');

    comp_symbol_img.src = '';
    comp_circle.classList.remove('halo-stone-circle', 'halo-paper-circle', 'halo-scissor-circle', 'halo-box-shadow');

    next_btn.style.visibility = 'hidden';
    rules_btn.style.right = '15px';
}
function main_page_return(){
    window.location.href = 'index.html';
}

function next_page(){
    window.location.href = 'winners_page.html';
}
// ==========================================G A M E ===================================================

if (!sessionStorage.getItem('pageLoaded')) {
    localStorage.setItem('user_score', '0');
    localStorage.setItem('comp_score', '0');
    sessionStorage.setItem('pageLoaded', 'true');
    userScoreBox.innerText = userScore;
    compScoreBox.innerText = compScore; 
}

var compScore = parseInt(localStorage.getItem('comp_score')) || 0;
var userScore = parseInt(localStorage.getItem('user_score')) || 0;
userScoreBox.innerText = userScore;
compScoreBox.innerText = compScore;

function gameStart(clickedMark){
    let userChoice = clickedMark;
    let randomNum = Math.floor(Math.random() * 3);
    let compChoice = choices[randomNum];

    let winner = compareChoices(userChoice, compChoice);

    triangle_ele.style.display = 'none';
    halo_ele.style.display = 'flex';    

    user_symbol_img.src = 'images/' + userChoice + '.png';
    user_circle.classList.add('halo-' + userChoice + '-circle');
    comp_symbol_img.src = 'images/' + compChoice + '.png';
    comp_circle.classList.add('halo-' + compChoice + '-circle');

    if (winner == 'user') {
        userScore++;
        localStorage.setItem('user_score', userScore.toString());

        var newUserScore = localStorage.getItem('user_score');
        userScoreBox.innerText = newUserScore;
        user_winner_landing();
    }
    else if (winner == 'comp'){
        compScore++;
        localStorage.setItem('comp_score', compScore.toString());

        var newCompScore = localStorage.getItem('comp_score');
        compScoreBox.innerText = newCompScore;
        comp_winner_landing();
    }
    else {
        tie_landing();
    }
}
