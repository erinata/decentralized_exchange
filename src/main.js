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
  aliceSellOneDogTokenButton.addEventListener('click', aliceSellOneDogToken);
  const aliceBuyOneDogTokenButton = document.getElementById('aliceBuyOneDogTokenButton');
  aliceBuyOneDogTokenButton.addEventListener('click', aliceBuyOneDogToken);
  const bobSellOneCatTokenButton = document.getElementById('bobSellOneCatTokenButton');
  bobSellOneCatTokenButton.addEventListener('click', bobSellOneCatToken);
  const bobBuyOneCatTokenButton = document.getElementById('bobBuyOneCatTokenButton');
  bobBuyOneCatTokenButton.addEventListener('click', bobBuyOneCatToken);
  
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




function aliceSellOneDogToken() {
  const aliceDogBalance = parseFloat(aliceDogTokenBalance.innerHTML);
  const aliceCatBalance = parseFloat(aliceCatTokenBalance.innerHTML);
  const dexDogBalance = parseFloat(dexDogTokenBalance.innerHTML);
  const dexCatBalance = parseFloat(dexCatTokenBalance.innerHTML);

  if (aliceDogBalance < 1) {
    alert("Alice does not have enough Dog Tokens to sell.");
    return;
  }

  // Calculate how many Cat Tokens Alice will receive
  const catTokensReceived = (1 * dexCatBalance) / (dexDogBalance + 1);

  // Update balances
  aliceDogTokenBalance.innerHTML = cleanUpNumbers(aliceDogBalance - 1);
  aliceCatTokenBalance.innerHTML = cleanUpNumbers(aliceCatBalance + catTokensReceived);
  dexDogTokenBalance.innerHTML = cleanUpNumbers(dexDogBalance + 1);
  dexCatTokenBalance.innerHTML = cleanUpNumbers(dexCatBalance - catTokensReceived);

  // Update relative price
  updateRelativePrice();
}

function aliceBuyOneDogToken() {
  const aliceDogBalance = parseFloat(aliceDogTokenBalance.innerHTML);
  const aliceCatBalance = parseFloat(aliceCatTokenBalance.innerHTML);
  const dexDogBalance = parseFloat(dexDogTokenBalance.innerHTML);
  const dexCatBalance = parseFloat(dexCatTokenBalance.innerHTML);

  if (dexDogBalance < 1) {
    alert("DEX does not have enough Dog Tokens for Alice to buy.");
    return;
  }

  // Calculate how many Cat Tokens Alice needs to pay
  const catTokensNeeded = (1 * dexCatBalance) / (dexDogBalance - 1);

  if (aliceCatBalance < catTokensNeeded) {
    alert("Alice does not have enough Cat Tokens to buy Dog Tokens.");
    return;
  }

  // Update balances
  aliceDogTokenBalance.innerHTML = cleanUpNumbers(aliceDogBalance + 1);
  aliceCatTokenBalance.innerHTML = cleanUpNumbers(aliceCatBalance - catTokensNeeded);
  dexDogTokenBalance.innerHTML = cleanUpNumbers(dexDogBalance - 1);
  dexCatTokenBalance.innerHTML = cleanUpNumbers(dexCatBalance + catTokensNeeded);

  // Update relative price
  updateRelativePrice();
}


function bobSellOneCatToken() {
  const bobDogBalance = parseFloat(bobDogTokenBalance.innerHTML);
  const bobCatBalance = parseFloat(bobCatTokenBalance.innerHTML);
  const dexDogBalance = parseFloat(dexDogTokenBalance.innerHTML);
  const dexCatBalance = parseFloat(dexCatTokenBalance.innerHTML);

  if (bobCatBalance < 1) {
    alert("Bob does not have enough Cat Tokens to sell.");
    return;
  }

  // Calculate how many Dog Tokens Bob will receive
  const dogTokensReceived = (1 * dexDogBalance) / (dexCatBalance + 1);

  // Update balances
  bobCatTokenBalance.innerHTML = cleanUpNumbers(bobCatBalance - 1);
  bobDogTokenBalance.innerHTML = cleanUpNumbers(bobDogBalance + dogTokensReceived);
  dexCatTokenBalance.innerHTML = cleanUpNumbers(dexCatBalance + 1);
  dexDogTokenBalance.innerHTML = cleanUpNumbers(dexDogBalance - dogTokensReceived);

  // Update relative price
  updateRelativePrice();
}

function bobBuyOneCatToken() {
  const bobDogBalance = parseFloat(bobDogTokenBalance.innerHTML);
  const bobCatBalance = parseFloat(bobCatTokenBalance.innerHTML);
  const dexDogBalance = parseFloat(dexDogTokenBalance.innerHTML);
  const dexCatBalance = parseFloat(dexCatTokenBalance.innerHTML);
  
  if (dexCatBalance < 1) {
    alert("DEX does not have enough Cat Tokens for Bob to buy.");
    return;
  }
  // Calculate how many Dog Tokens Bob needs to pay
  const dogTokensNeeded = (1 * dexDogBalance) / (dexCatBalance - 1);
  if (bobDogBalance < dogTokensNeeded) {
    alert("Bob does not have enough Dog Tokens to buy Cat Tokens.");
    return;
  }
  // Update balances
  bobCatTokenBalance.innerHTML = cleanUpNumbers(bobCatBalance + 1);
  bobDogTokenBalance.innerHTML = cleanUpNumbers(bobDogBalance - dogTokensNeeded);
  dexCatTokenBalance.innerHTML = cleanUpNumbers(dexCatBalance - 1);
  dexDogTokenBalance.innerHTML = cleanUpNumbers(dexDogBalance + dogTokensNeeded);
  // Update relative price
  updateRelativePrice();
}

    