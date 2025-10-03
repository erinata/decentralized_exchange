import './style.css'
// import { setupCounter } from './counter.js'
// setupCounter(document.querySelector('#counter'))

// DOM ready 

document.addEventListener('DOMContentLoaded', () => {
  // Your code to run since DOM is loaded and ready
  console.log('DOM fully loaded and parsed');
  const aliceDogTokenBalance = document.getElementById('aliceDogTokenBalance');
  const aliceCatTokenBalance = document.getElementById('aliceCatTokenBalance');
  const aliceShareOfLiquidityPool = document.getElementById('aliceShareOfLiquidityPool');
  const bobDogTokenBalance = document.getElementById('bobDogTokenBalance');
  const bobCatTokenBalance = document.getElementById('bobCatTokenBalance');
  const bobShareOfLiquidityPool = document.getElementById('bobShareOfLiquidityPool');
  const carolDogTokenBalance = document.getElementById('carolDogTokenBalance');
  const carolCatTokenBalance = document.getElementById('carolCatTokenBalance');
  const carolShareOfLiquidityPool = document.getElementById('carolShareOfLiquidityPool');
  const daveDogTokenBalance = document.getElementById('daveDogTokenBalance');
  const daveCatTokenBalance = document.getElementById('daveCatTokenBalance');
  const daveShareOfLiquidityPool = document.getElementById('daveShareOfLiquidityPool');
  const dexDogTokenBalance = document.getElementById('dexDogTokenBalance');
  const dexCatTokenBalance = document.getElementById('dexCatTokenBalance');
  const relativePriceDogTokenInCatToken = document.getElementById('relativePriceDogTokenInCatToken');
  const relativePriceCatTokenInDogToken = document.getElementById('relativePriceCatTokenInDogToken');
  const coinbaseDogTokenPrice = document.getElementById('coinbaseDogTokenPrice');
  const coinbaseCatTokenPrice = document.getElementById('coinbaseCatTokenPrice');
  const aliceSellOneDogTokenButton = document.getElementById('aliceSellOneDogTokenButton');
  aliceSellOneDogTokenButton.addEventListener('click', () => tradeTokenAmount('alice', 'Dog', 'sell', 1));
  const aliceBuyOneDogTokenButton = document.getElementById('aliceBuyOneDogTokenButton');
  aliceBuyOneDogTokenButton.addEventListener('click', () => tradeTokenAmount('alice', 'Dog', 'buy', 1));
  const bobSellOneCatTokenButton = document.getElementById('bobSellOneCatTokenButton');
  bobSellOneCatTokenButton.addEventListener('click',  () => tradeTokenAmount('bob', 'Cat', 'sell', 1));
  const bobBuyOneCatTokenButton = document.getElementById('bobBuyOneCatTokenButton');
  bobBuyOneCatTokenButton.addEventListener('click', () => tradeTokenAmount('bob', 'Cat', 'buy', 1));
  const executeTradeButton = document.getElementById('executeTradeButton');
  executeTradeButton.addEventListener('click', executeTradeButtonHandler);

  const userSelect = document.getElementById('userSelect');
  const actionSelect = document.getElementById('actionSelect');
  const tokenSelect = document.getElementById('tokenSelect');
  const amountInput = document.getElementById('amountInput');
  
  initialize();
  updateRelativePrice();
});



function initialize() {

  // Initialize the balances and prices
  aliceDogTokenBalance.innerHTML = '100';
  aliceCatTokenBalance.innerHTML = '200';
  aliceShareOfLiquidityPool.innerHTML = '0';
  bobDogTokenBalance.innerHTML = '150';
  bobCatTokenBalance.innerHTML = '250';
  bobShareOfLiquidityPool.innerHTML = '0';
  carolDogTokenBalance.innerHTML = '1100000';
  carolCatTokenBalance.innerHTML = '1100000';
  carolShareOfLiquidityPool.innerHTML = '0';
  daveDogTokenBalance.innerHTML = '1000';
  daveCatTokenBalance.innerHTML = '1000';
  daveShareOfLiquidityPool.innerHTML = '100';
  dexDogTokenBalance.innerHTML = '1000';
  dexCatTokenBalance.innerHTML = '1000';
  relativePriceDogTokenInCatToken.innerHTML = '1';
  relativePriceCatTokenInDogToken.innerHTML = '1';
  coinbaseDogTokenPrice.innerHTML = '1';
  coinbaseCatTokenPrice.innerHTML = '1';
  
}

function cleanUpNumbers(num) {
  return num.toFixed(16).replace(/\.?0+$/, '');
}

// Function to update the relative price of Dog Token in terms of Cat Token
function updateRelativePrice() {
  const dexDogBalance = parseFloat(dexDogTokenBalance.innerHTML);
  const dexCatBalance = parseFloat(dexCatTokenBalance.innerHTML);
  if (dexDogBalance === 0) {
    relativePriceDogTokenInCatToken.innerHTML = 'Infinity';
    relativePriceCatTokenInDogToken.innerHTML = '0';
  } else if (dexCatBalance === 0) {
    relativePriceDogTokenInCatToken.innerHTML = '0';
    relativePriceCatTokenInDogToken.innerHTML = 'Infinity';
  } else {
    const price = dexCatBalance / dexDogBalance;
    // remove trailing zeros 
    const priceShort = cleanUpNumbers(price);
    const priceShortInverse = cleanUpNumbers(1 / price);
    
    relativePriceDogTokenInCatToken.innerHTML = priceShort;
    relativePriceCatTokenInDogToken.innerHTML = priceShortInverse;
  }
}

    

function tradeTokenAmount(user, tokenType, action, amount) {
  // lowercase user for element IDs
  user = user.toLowerCase();
  const userDogBalance = parseFloat(document.getElementById(`${user}DogTokenBalance`).innerHTML);
  const userCatBalance = parseFloat(document.getElementById(`${user}CatTokenBalance`).innerHTML);
  const dexDogBalance = parseFloat(dexDogTokenBalance.innerHTML);
  const dexCatBalance = parseFloat(dexCatTokenBalance.innerHTML);

  if (tokenType === 'dogToken') {
    if (action === 'sell') {
      if (userDogBalance < amount) {
        alert(`${user.charAt(0).toUpperCase() + user.slice(1)} does not have enough Dog Tokens to sell.`);
        return;
      }
      const catTokensReceived = (amount * dexCatBalance) / (dexDogBalance + amount);
      document.getElementById(`${user}DogTokenBalance`).innerHTML = cleanUpNumbers(userDogBalance - amount);
      document.getElementById(`${user}CatTokenBalance`).innerHTML = cleanUpNumbers(userCatBalance + catTokensReceived);
      dexDogTokenBalance.innerHTML = cleanUpNumbers(dexDogBalance + amount);
      dexCatTokenBalance.innerHTML = cleanUpNumbers(dexCatBalance - catTokensReceived);
    } else if (action === 'buy') {
      if (dexDogBalance < amount) {
        alert(`DEX does not have enough Dog Tokens for ${user.charAt(0).toUpperCase() + user.slice(1)} to buy.`);
        return;
      }
      const catTokensNeeded = (amount * dexCatBalance) / (dexDogBalance - amount);
      if (userCatBalance < catTokensNeeded) {
        alert(`${user.charAt(0).toUpperCase() + user.slice(1)} does not have enough Cat Tokens to buy Dog Tokens.`);
        return;
      }
      document.getElementById(`${user}DogTokenBalance`).innerHTML = cleanUpNumbers(userDogBalance + amount);
      document.getElementById(`${user}CatTokenBalance`).innerHTML = cleanUpNumbers(userCatBalance - catTokensNeeded);
      dexDogTokenBalance.innerHTML = cleanUpNumbers(dexDogBalance - amount);
      dexCatTokenBalance.innerHTML = cleanUpNumbers(dexCatBalance + catTokensNeeded);
    }
  } else if (tokenType === 'catToken') {
    if (action === 'sell') {
      if (userCatBalance < amount) {
        alert(`${user.charAt(0).toUpperCase() + user.slice(1)} does not have enough Cat Tokens to sell.`);
        return;
      }
      const dogTokensReceived = (amount * dexDogBalance) / (dexCatBalance + amount);
      document.getElementById(`${user}CatTokenBalance`).innerHTML = cleanUpNumbers(userCatBalance - amount);
      document.getElementById(`${user}DogTokenBalance`).innerHTML = cleanUpNumbers(userDogBalance + dogTokensReceived);
      dexCatTokenBalance.innerHTML = cleanUpNumbers(dexCatBalance + amount);
      dexDogTokenBalance.innerHTML = cleanUpNumbers(dexDogBalance - dogTokensReceived);
    } else if (action === 'buy') {
      if (dexCatBalance < amount) {
        alert(`DEX does not have enough Cat Tokens for ${user.charAt(0).toUpperCase() + user.slice(1)} to buy.`);
        return;
      }
      const dogTokensNeeded = (amount * dexDogBalance) / (dexCatBalance - amount);
      if (userDogBalance < dogTokensNeeded) {
        alert(`${user.charAt(0).toUpperCase() + user.slice(1)} does not have enough Dog Tokens to buy Cat Tokens.`);
        return;
      }
      document.getElementById(`${user}CatTokenBalance`).innerHTML = cleanUpNumbers(userCatBalance + amount);
      document.getElementById(`${user}DogTokenBalance`).innerHTML = cleanUpNumbers(userDogBalance - dogTokensNeeded);
      dexCatTokenBalance.innerHTML = cleanUpNumbers(dexCatBalance - amount);
      dexDogTokenBalance.innerHTML = cleanUpNumbers(dexDogBalance + dogTokensNeeded);
    }
  }
  updateRelativePrice();
}
  

function executeTradeButtonHandler() {
  

  const user = document.getElementById('userSelect').value;
  const action = document.getElementById('actionSelect').value;
  const tokenType = document.getElementById('tokenSelect').value;
  const amount = parseFloat(document.getElementById('amountInput').value);
  
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount greater than 0.');
    return;
  }
  console.log(`Executing trade: ${user} wants to ${action} ${amount} of ${tokenType} Token`);
  tradeTokenAmount(user, tokenType, action, amount);  
}

    
    
    
      
      