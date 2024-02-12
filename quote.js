const quote_button  = document.querySelectorAll('.generate-quote')[0];
const quote_display = document.querySelectorAll('.quote-display')[0];
const initial_quote_display = document.querySelectorAll('.quote-initial-display')[0];
const quote_category = document.querySelectorAll('.quote-category')[0];
const api_key = `Your API KEY here`;

initial_quote_display.style.display = 'block';

const loader = document.querySelectorAll('.loader')[0];
loader.style.display = 'none';

let loading = false;

let quoteCategoryValue = "";

const fetchQuote = async (url) => {
    const res = await fetch(url , {
        method: 'GET',
        headers: { 'X-Api-Key': api_key},
    });
    const data = await res.json();
    return data;
};

const validateQuote = (data) => {
    if(data.length == 0){
        loading = false;
        loading == false ? loader.style.display = 'none' : loader.style.display = 'block';
        alert('No quotes Found!!');
    }else{
        loading = false;
        loading == false ? loader.style.display = 'none' : loader.style.display = 'block';
        quote_display.innerText = data[0].quote;
    }
}

quote_button.addEventListener('click', () => {
    fetchQuoteFunction();
});

quote_category.addEventListener('keyup' , (e)=> {
    if(e.key == "Enter"){
        fetchQuoteFunction();
    }
})

const fetchQuoteFunction = async () => {
    quoteCategoryValue = quote_category.value;
    if(quoteCategoryValue.trim() == ""){
        alert(`Provide a valid quote category value`);
    }
    else{
        const url = `https://api.api-ninjas.com/v1/quotes?category=${quoteCategoryValue}`;
        quote_display.innerText = "";
        //This line will make the example quote disappear
        initial_quote_display.style.display = 'none';

        //Make loading true while data is yet to be fetched
        loading = true;
        loading == true ? loader.style.display = 'block' : loader.style.display = 'none';
        const data = await fetchQuote(url);
        //Make loading false when is fetched
        loading = false;

        validateQuote(data);
    }
}

