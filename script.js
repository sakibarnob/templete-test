const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes =[];

// show loadeing 

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading 

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// show new quote 

function newQuote(){
    // pick a random quote for api quoten from array 
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // console.log(quote)

    // check if author field is blank and replace with it 'Unknown' 

    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }

    // check quote length to determine styling 
    if(quote.text.length>50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote')
    }
    // authorText.textContent = quote.author;
    // set the code and hight loader 
    quoteText.textContent = quote.text;
    complete(); 
}
// Get Quote Api 

async function getQuotes(){
    const apiUrl = 'https://type.fit/api/quotes';
    loading();
    try{
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    }catch(error){
        // catch error here 
         
    }
}

// twitte quote 
function twitteQuote(){
    const twitterUrl  = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');

}

// Even Listener 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener ('click',twitteQuote)
// on load 

getQuotes();
// loading();

// fetch('https://jsonplaceholder.typicode.com/users')
// .then(res=>res.json())
// .then(res=>console.log(json))

