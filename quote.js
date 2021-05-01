const quote = document.querySelector(".js-quote"),
  quoteTitle = quote.querySelector("h3");

const QUOTE_NUMBER = 5;
const sentences = ["Don't put off until tomorrow what you can do today -100USD-", "No one can make you feel inferior without your consent -Eleanor Roosevelt-", "We are what we repeatedly do. Excellence, then, is not an act, but a habit.","We are stronger in the places where we've been broken -Old Man-" , "Forgiveness isn't just the absence of anger. I think it's also the presence of self-love, when you actually begin to value yourself. -Tara Westover-", 'When something is important enought, you do it even if the odds are not in your favor -the Dogefather-'
  ];

function handleQuoteLoad(){
  console.log("finished loading quote!");
}
function paintQuote(quoteNum){
  quoteUsed = sentences[quoteNum];
  quoteTitle.innerText = quoteUsed;
  handleQuoteLoad();
}

function genRandom(){
  const number = Math.floor(Math.random()* QUOTE_NUMBER);
  return number;
}

function init(){
  const randomNumber = genRandom();
  paintQuote(randomNumber);
}

init();
