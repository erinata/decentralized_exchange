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
  // const aliceSellOneDogTokenButton = document.getElementById('aliceSellOneDogTokenButton');
  // aliceSellOneDogTokenButton.addEventListener('click', () => tradeTokenAmount('alice', 'Dog', 'sell', 1));
  // const aliceBuyOneDogTokenButton = document.getElementById('aliceBuyOneDogTokenButton');
  // aliceBuyOneDogTokenButton.addEventListener('click', () => tradeTokenAmount('alice', 'Dog', 'buy', 1));
  // const bobSellOneCatTokenButton = document.getElementById('bobSellOneCatTokenButton');
  // bobSellOneCatTokenButton.addEventListener('click',  () => tradeTokenAmount('bob', 'Cat', 'sell', 1));
  // const bobBuyOneCatTokenButton = document.getElementById('bobBuyOneCatTokenButton');
  // bobBuyOneCatTokenButton.addEventListener('click', () => tradeTokenAmount('bob', 'Cat', 'buy', 1));
  const executeTradeButton = document.getElementById('executeTradeButton');
  executeTradeButton.addEventListener('click', executeTradeButtonHandler);
  const executeUserSelect = document.getElementById('executeUserSelect');
  const executeActionSelect = document.getElementById('executeActionSelect');
  const executeTokenSelect = document.getElementById('executeTokenSelect');
  const executeAmountInput = document.getElementById('executeAmountInput');
  
  const liquidityCatTokenAmountDisplay = document.getElementById('liquidityCatTokenAmountDisplay');
  const liquidityAmountInput = document.getElementById('liquidityAmountInput');
  // add event listener to repond to liquidityAmountInput value changes
  liquidityAmountInput.addEventListener('input', (event) => liquidityAmountInputHandler(event));
  
  const liquidityUserSelect = document.getElementById('liquidityUserSelect');
  
  const depositLiquidityButton = document.getElementById('depositLiquidityButton');
  const withdrawLiquidityButton = document.getElementById('withdrawLiquidityButton');
  
  depositLiquidityButton.addEventListener('click', depositLiquidityButtonHandler);
  withdrawLiquidityButton.addEventListener('click', withdrawLiquidityButtonHandler);
  
  const coinbaseArbitrageButton = document.getElementById('coinbaseArbitrageButton');
  coinbaseArbitrageButton.addEventListener('click', coinbaseArbitrageButtonHandler);


  initialize();
  updateRelativePrice();
});




function coinbaseArbitrageButtonHandler() {
  // get the prices from coinbaseDogTokenPrice and coinbaseCatTokenPrice
  const coinbaseDogPrice = parseFloat(coinbaseDogTokenPrice.innerHTML);
  const coinbaseCatPrice = parseFloat(coinbaseCatTokenPrice.innerHTML);
  // get coinbase price ratio
  const coinbasePriceRatio =  coinbaseDogPrice/coinbaseCatPrice;
  
  const dexDogPrice = parseFloat(relativePriceDogTokenInCatToken.innerHTML);
  
  // if coinbase price ratio is greater than dex price, buy dog token on dex and sell on coinbase until prices are not favorable
  //  else if coinbase price ratio is less than dex price, buy cat token on dex and sell on coinbase until prices are not favorable
  
  // add tolerance for floating point precision issues
  const tolerance = 0.01;
  
  if (coinbasePriceRatio > dexDogPrice + tolerance) {
    console.log('Arbitrage opportunity: Buy Dog Token on DEX and sell on Coinbase');
    // buy dog token on dex
    let dexDogBalance = parseFloat(dexDogTokenBalance.innerHTML);
    let dexCatBalance = parseFloat(dexCatTokenBalance.innerHTML);
    let dogTokensBought = 0;
    let catTokensSpent = 0;
    while (coinbasePriceRatio > (dexCatBalance / dexDogBalance)) {
      // buy 1 dog token at a time
      const catTokensNeeded = (1 * dexCatBalance) / (dexDogBalance - 1);
      if (dexDogBalance < 1 || dexCatBalance < catTokensNeeded) {
        break;
      }
      dogTokensBought += 1;
      catTokensSpent += catTokensNeeded;
      dexDogBalance -= 1;
      dexCatBalance += catTokensNeeded;
    }
    if (dogTokensBought > 0) {
      console.log(`Bought ${dogTokensBought} Dog Tokens on DEX for ${catTokensSpent} Cat Tokens`);
      dexDogTokenBalance.innerHTML = cleanUpNumbers(dexDogBalance);
      dexCatTokenBalance.innerHTML = cleanUpNumbers(dexCatBalance);
      updateRelativePrice();
    } else {
      console.log('No arbitrage opportunity found');
    }
  } else if (coinbasePriceRatio < dexDogPrice - tolerance) {
    console.log('Arbitrage opportunity: Buy Cat Token on DEX and sell on Coinbase');
    // buy cat token on dex
    let dexDogBalance = parseFloat(dexDogTokenBalance.innerHTML);
    let dexCatBalance = parseFloat(dexCatTokenBalance.innerHTML);
    let catTokensBought = 0;
    let dogTokensSpent = 0;
    while (coinbasePriceRatio < (dexCatBalance / dexDogBalance)) {
      // buy 1 cat token at a time
      const dogTokensNeeded = (1 * dexDogBalance) / (dexCatBalance - 1);
      if (dexCatBalance < 1 || dexDogBalance < dogTokensNeeded) {
        break;
      }
      catTokensBought += 1;
      dogTokensSpent += dogTokensNeeded;
      dexCatBalance -= 1;
      dexDogBalance += dogTokensNeeded;
    }
    if (catTokensBought > 0) {
      console.log(`Bought ${catTokensBought} Cat Tokens on DEX for ${dogTokensSpent} Dog Tokens`);
      dexDogTokenBalance.innerHTML = cleanUpNumbers(dexDogBalance);
      dexCatTokenBalance.innerHTML = cleanUpNumbers(dexCatBalance);
      updateRelativePrice();
    } else {
      console.log('No arbitrage opportunity found');
    }
  } else {
    console.log('No arbitrage opportunity found');
  }
}


    
  
  
  




function depositLiquidityButtonHandler () {
  // get the user from the liquidityUserSelect
  const user = liquidityUserSelect.value;
  const dogTokenAmount = parseFloat(liquidityAmountInput.value);
  const catTokenAmount = parseFloat(liquidityCatTokenAmountDisplay.innerHTML);
  if (isNaN(dogTokenAmount) || dogTokenAmount <= 0 || isNaN(catTokenAmount) || catTokenAmount <= 0) {
    alert('Please enter a valid Token amount greater than 0.');
    return;
  }
  console.log(`Depositing liquidity: ${user} wants to deposit ${dogTokenAmount} Dog Tokens and ${catTokenAmount} Cat Tokens`);
  // lowercase user for element IDs
  const userLower = user.toLowerCase();
  const userDogBalance = parseFloat(document.getElementById(`${userLower}DogTokenBalance`).innerHTML);
  const userCatBalance = parseFloat(document.getElementById(`${userLower}CatTokenBalance`).innerHTML);
  const userShareOfLiquidityPool = parseFloat(document.getElementById(`${userLower}ShareOfLiquidityPool`).innerHTML);
  const dexDogBalance = parseFloat(dexDogTokenBalance.innerHTML);
  const dexCatBalance = parseFloat(dexCatTokenBalance.innerHTML);
  const dexTotalLiquidity = dexDogBalance + dexCatBalance;
  if (userDogBalance < dogTokenAmount) {
    alert(`${user} does not have enough Dog Tokens to deposit.`);
    return;
  }
  if (userCatBalance < catTokenAmount) {
    alert(`${user} does not have enough Cat Tokens to deposit.`);
    return;
  }
  
  // Calculate the share of the liquidity pool to be given to the user and update liquidity share for all users
  const liquidityAdded = dogTokenAmount + catTokenAmount;
  const userNewShare = (liquidityAdded / (dexTotalLiquidity + liquidityAdded)) * 100;
  document.getElementById(`${userLower}ShareOfLiquidityPool`).innerHTML = cleanUpNumbers(userShareOfLiquidityPool + userNewShare);
  //  update other users' share of liquidity pool
  
  const users = ['alice', 'bob', 'carol', 'dave'];
  users.forEach(u => {
    if (u !== userLower) {
      const otherUserShare = parseFloat(document.getElementById(`${u}ShareOfLiquidityPool`).innerHTML);
      const otherUserNewShare = (otherUserShare * dexTotalLiquidity) / (dexTotalLiquidity + liquidityAdded);
      document.getElementById(`${u}ShareOfLiquidityPool`).innerHTML = cleanUpNumbers(otherUserNewShare);
    }
  });
    
  
  
  // Update user balances
  document.getElementById(`${userLower}DogTokenBalance`).innerHTML = cleanUpNumbers(userDogBalance - dogTokenAmount);
  document.getElementById(`${userLower}CatTokenBalance`).innerHTML = cleanUpNumbers(userCatBalance - catTokenAmount);
  // Update DEX balances
  dexDogTokenBalance.innerHTML = cleanUpNumbers(dexDogBalance + dogTokenAmount);
  dexCatTokenBalance.innerHTML = cleanUpNumbers(dexCatBalance + catTokenAmount);
  
  updateRelativePrice();
  
  
  
}

function withdrawLiquidityButtonHandler () {
  // get the user from the liquidityUserSelect
  const user = liquidityUserSelect.value;
  const userLower = user.toLowerCase();
  const userShareOfLiquidityPool = parseFloat(document.getElementById(`${userLower}ShareOfLiquidityPool`).innerHTML);
  if (userShareOfLiquidityPool <= 0) {
    alert(`${user} does not have any share of the liquidity pool to withdraw.`);
    return;
  }
  console.log(`Withdrawing liquidity: ${user} wants to withdraw their share of the liquidity pool`);
  const dexDogBalance = parseFloat(dexDogTokenBalance.innerHTML);
  const dexCatBalance = parseFloat(dexCatTokenBalance.innerHTML);
  const dexTotalLiquidity = dexDogBalance + dexCatBalance;
  
  // Calculate the amount of Dog and Cat tokens to be withdrawn based on user's share of the liquidity pool
  const dogTokensToWithdraw = (userShareOfLiquidityPool / 100) * dexDogBalance;
  const catTokensToWithdraw = (userShareOfLiquidityPool / 100) * dexCatBalance;
  
  // Update user balances
  const userDogBalance = parseFloat(document.getElementById(`${userLower}DogTokenBalance`).innerHTML);
  const userCatBalance = parseFloat(document.getElementById(`${userLower}CatTokenBalance`).innerHTML);
  document.getElementById(`${userLower}DogTokenBalance`).innerHTML = cleanUpNumbers(userDogBalance + dogTokensToWithdraw);
  document.getElementById(`${userLower}CatTokenBalance`).innerHTML = cleanUpNumbers(userCatBalance + catTokensToWithdraw);
  
  // Update DEX balances
  dexDogTokenBalance.innerHTML = cleanUpNumbers(dexDogBalance - dogTokensToWithdraw);
  dexCatTokenBalance.innerHTML = cleanUpNumbers(dexCatBalance - catTokensToWithdraw);
  
  // Set user's share of liquidity pool to zero
  document.getElementById(`${userLower}ShareOfLiquidityPool`).innerHTML = '0';
  
  // Update other users' share of liquidity pool
  const users = ['alice', 'bob', 'carol', 'dave'];
  users.forEach(u => {
    if (u !== userLower) {
      const otherUserShare = parseFloat(document.getElementById(`${u}ShareOfLiquidityPool`).innerHTML);
      const otherUserNewShare = (otherUserShare * dexTotalLiquidity) / (dexTotalLiquidity - (dogTokensToWithdraw + catTokensToWithdraw));
      document.getElementById(`${u}ShareOfLiquidityPool`).innerHTML = cleanUpNumbers(otherUserNewShare);
    }
  });
  updateRelativePrice();
  
}



function liquidityAmountInputHandler(event) {
  const value = event.target.value;
  if (isNaN(value) || value <= 0) {
    event.target.value = '';
    return;
  } else {
    // calculate the equivalent Dog and Cat token amounts based on current DEX balances
    //  restricting the d```og token amount is the same as the value
    const dexDogBalance = parseFloat(dexDogTokenBalance.innerHTML);
    const dexCatBalance = parseFloat(dexCatTokenBalance.innerHTML);
    const catTokenAmount = (parseFloat(value) * dexCatBalance) / dexDogBalance;
    liquidityCatTokenAmountDisplay.innerHTML = cleanUpNumbers(catTokenAmount);
    
  }
  
}



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
  dexCatTokenBalance.innerHTML = '2000';
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
  

  const user = executeUserSelect.value;
  const action = executeActionSelect.value;
  const tokenType = executeTokenSelect.value;
  const amount = parseFloat(executeAmountInput.value);
  
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount greater than 0.');
    return;
  }
  console.log(`Executing trade: ${user} wants to ${action} ${amount} of ${tokenType} Token`);
  tradeTokenAmount(user, tokenType, action, amount);  
}

    
    
    
      
      