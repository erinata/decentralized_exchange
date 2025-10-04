import './style.css'
// import { setupCounter } from './counter.js'
// setupCounter(document.querySelector('#counter'))

// DOM ready 

var verbose = false;

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
  
  // const executeTradeButton = document.getElementById('executeTradeButton');
  // executeTradeButton.addEventListener('click', executeTradeButtonHandler);
  // const executeUserSelect = document.getElementById('executeUserSelect');
  // const executeActionSelect = document.getElementById('executeActionSelect');
  // const executeTokenSelect = document.getElementById('executeTokenSelect');
  // const executeAmountInput = document.getElementById('executeAmountInput');
  
  const executeTradeBuyAliceButton = document.getElementById('executeTradeBuyAliceButton');
  executeTradeBuyAliceButton.addEventListener('click', () => executeTradeButtonHandler('Alice', 'buy'));
  const executeTradeSellAliceButton = document.getElementById('executeTradeSellAliceButton');
  executeTradeSellAliceButton.addEventListener('click', () => executeTradeButtonHandler('Alice', 'sell'));
  const executeTokenSelectAlice = document.getElementById('executeTokenSelectAlice');
  const executeAmountInputAlice = document.getElementById('executeAmountInputAlice');
  
  const executeTradeBuyBobButton = document.getElementById('executeTradeBuyBobButton');
  executeTradeBuyBobButton.addEventListener('click', () => executeTradeButtonHandler('Bob', 'buy'));
  const executeTradeSellBobButton = document.getElementById('executeTradeSellBobButton');
  executeTradeSellBobButton.addEventListener('click', () => executeTradeButtonHandler('Bob', 'sell'));
  const executeTokenSelectBob = document.getElementById('executeTokenSelectBob');
  const executeAmountInputBob = document.getElementById('executeAmountInputBob');
  
  const executeTradeBuyCarolButton = document.getElementById('executeTradeBuyCarolButton');
  executeTradeBuyCarolButton.addEventListener('click', () => executeTradeButtonHandler('Carol', 'buy'));
  const executeTradeSellCarolButton = document.getElementById('executeTradeSellCarolButton');
  executeTradeSellCarolButton.addEventListener('click', () => executeTradeButtonHandler('Carol', 'sell'));
  const executeTokenSelectCarol = document.getElementById('executeTokenSelectCarol');
  const executeAmountInputCarol = document.getElementById('executeAmountInputCarol');
  
  const executeTradeBuyDaveButton = document.getElementById('executeTradeBuyDaveButton');
  executeTradeBuyDaveButton.addEventListener('click', () => executeTradeButtonHandler('Dave', 'buy'));
  const executeTradeSellDaveButton = document.getElementById('executeTradeSellDaveButton');
  executeTradeSellDaveButton.addEventListener('click', () => executeTradeButtonHandler('Dave', 'sell'));
  const executeTokenSelectDave = document.getElementById('executeTokenSelectDave');
  const executeAmountInputDave = document.getElementById('executeAmountInputDave');
  
  
  
  
  // const liquidityUserSelect = document.getElementById('liquidityUserSelect');
  
  const liquidityCatAmountInputAlice = document.getElementById('liquidityCatAmountInputAlice');
  const liquidityDogAmountInputAlice = document.getElementById('liquidityDogAmountInputAlice');
  liquidityDogAmountInputAlice.addEventListener('input', (event) => liquidityDogAmountInputHandler(event,'Alice'));
  liquidityCatAmountInputAlice.addEventListener('input', (event) => liquidityCatAmountInputHandler(event,'Alice'));
  const depositLiquidityAliceButton = document.getElementById('depositLiquidityAliceButton');
  const withdrawLiquidityAliceButton = document.getElementById('withdrawLiquidityAliceButton');
  depositLiquidityAliceButton.addEventListener('click', () => depositLiquidityButtonHandler('Alice'));
  withdrawLiquidityAliceButton.addEventListener('click', () => withdrawLiquidityButtonHandler('Alice'));
  
  const liquidityCatAmountInputBob = document.getElementById('liquidityCatAmountInputBob');
  const liquidityDogAmountInputBob = document.getElementById('liquidityDogAmountInputBob');
  liquidityDogAmountInputBob.addEventListener('input', (event) => liquidityDogAmountInputHandler(event,'Bob'));
  liquidityCatAmountInputBob.addEventListener('input', (event) => liquidityCatAmountInputHandler(event,'Bob'));
  const depositLiquidityBobButton = document.getElementById('depositLiquidityBobButton');
  const withdrawLiquidityBobButton = document.getElementById('withdrawLiquidityBobButton');
  depositLiquidityBobButton.addEventListener('click', () => depositLiquidityButtonHandler('Bob'));
  withdrawLiquidityBobButton.addEventListener('click', () => withdrawLiquidityButtonHandler('Bob'));
  
  const liquidityCatAmountInputCarol = document.getElementById('liquidityCatAmountInputCarol');
  const liquidityDogAmountInputCarol = document.getElementById('liquidityDogAmountInputCarol');
  liquidityDogAmountInputCarol.addEventListener('input', (event) => liquidityDogAmountInputHandler(event,'Carol'));
  liquidityCatAmountInputCarol.addEventListener('input', (event) => liquidityCatAmountInputHandler(event,'Carol'));
  const depositLiquidityCarolButton = document.getElementById('depositLiquidityCarolButton');
  const withdrawLiquidityCarolButton = document.getElementById('withdrawLiquidityCarolButton');
  depositLiquidityCarolButton.addEventListener('click', () => depositLiquidityButtonHandler('Carol'));
  withdrawLiquidityCarolButton.addEventListener('click', () => withdrawLiquidityButtonHandler('Carol'));
  
  const liquidityCatAmountInputDave = document.getElementById('liquidityCatAmountInputDave');
  const liquidityDogAmountInputDave = document.getElementById('liquidityDogAmountInputDave');
  liquidityDogAmountInputDave.addEventListener('input', (event) => liquidityDogAmountInputHandler(event,'Dave'));
  liquidityCatAmountInputDave.addEventListener('input', (event) => liquidityCatAmountInputHandler(event,'Dave'));
  const depositLiquidityDaveButton = document.getElementById('depositLiquidityDaveButton');
  const withdrawLiquidityDaveButton = document.getElementById('withdrawLiquidityDaveButton');
  depositLiquidityDaveButton.addEventListener('click', () => depositLiquidityButtonHandler('Dave'));
  withdrawLiquidityDaveButton.addEventListener('click', () => withdrawLiquidityButtonHandler('Dave'));
  
  const aliceTotalValueInUSD = document.getElementById('aliceTotalValueInUSD');
  const bobTotalValueInUSD = document.getElementById('bobTotalValueInUSD');
  const carolTotalValueInUSD = document.getElementById('carolTotalValueInUSD');
  const daveTotalValueInUSD = document.getElementById('daveTotalValueInUSD');

  const coinbaseArbitrageButton = document.getElementById('coinbaseArbitrageButton');
  coinbaseArbitrageButton.addEventListener('click', () => coinbaseArbitrageButtonHandler());
  
  const coinbaseArbitrageOneStepButton = document.getElementById('coinbaseArbitrageOneStepButton');
  coinbaseArbitrageOneStepButton.addEventListener('click', () => coinbaseArbitrageButtonHandler(1));

  const coinbaseDogTokenPriceInput = document.getElementById('coinbaseDogTokenPriceInput');
  const coinbaseCatTokenPriceInput = document.getElementById('coinbaseCatTokenPriceInput');
  coinbaseDogTokenPriceInput.addEventListener('input', updateAssetUsdValue);
  coinbaseCatTokenPriceInput.addEventListener('input', updateAssetUsdValue);

  const airdropUserSelect = document.getElementById('airdropUserSelect');
  const airdropTokenSelect = document.getElementById('airdropTokenSelect');
  const airdropAmountInput = document.getElementById('airdropAmountInput');
  const airdropButton = document.getElementById('airdropButton');
  airdropButton.addEventListener('click', airdropButtonHandler);
  
  const activityLogList = document.getElementById('activityLogList');
  
  
  
  initialize();
  updateRelativePrice();
  updateAssetUsdValue();
  
  verbose = true;
  writeToActivityLog('Initialized.');
});


function writeToActivityLog(message) {
  if (verbose) {
    const activityLogList = document.getElementById('activityLogList');
    const listItem = document.createElement('li');
    listItem.textContent = `${message}`;
    activityLogList.append(listItem);
    
    // remove oldest log entry if more than 50 entries
    if (activityLogList.children.length > 20) {
      activityLogList.removeChild(activityLogList.children[0]);
    }
  }
}

function updateAssetUsdValue() {
  const coinbaseDogPrice = parseFloat(coinbaseDogTokenPriceInput.value);
  const coinbaseCatPrice = parseFloat(coinbaseCatTokenPriceInput.value);
  const users = ['alice', 'bob', 'carol', 'dave'];
  users.forEach(user => {
    const originalAssetValue = document.getElementById(`${user}TotalValueInUSD`).innerHTML;
    const userDogBalance = parseFloat(document.getElementById(`${user}DogTokenBalance`).innerHTML);
    const userCatBalance = parseFloat(document.getElementById(`${user}CatTokenBalance`).innerHTML);
    // calculate the value of liquidity pool share
    const userShareOfLiquidityPool = parseFloat(document.getElementById(`${user}ShareOfLiquidityPool`).innerHTML);
    const dexDogBalance = parseFloat(dexDogTokenBalance.innerHTML);
    const dexCatBalance = parseFloat(dexCatTokenBalance.innerHTML);
    const userLiquidityValueInUSD = (userShareOfLiquidityPool / 100) * ((dexDogBalance * coinbaseDogPrice) + (dexCatBalance * coinbaseCatPrice));
    const totalValueInUSD = (userDogBalance * coinbaseDogPrice) + (userCatBalance * coinbaseCatPrice) + userLiquidityValueInUSD;
    document.getElementById(`${user}TotalValueInUSD`).innerHTML = `$${cleanUpNumbers(totalValueInUSD,2)}`;
    if (originalAssetValue !== `$${cleanUpNumbers(totalValueInUSD,2)}` && originalAssetValue !== 'N/A') {
      writeToActivityLog(`${user.charAt(0).toUpperCase() + user.slice(1)}'s total asset value updated from ${originalAssetValue} to $${cleanUpNumbers(totalValueInUSD,2)} USD.`);   
    }
  });

}

    
    
  



function airdropButtonHandler() {
    const user = airdropUserSelect.value;
    const users = user === 'all' ? ['Alice', 'Bob', 'Carol', 'Dave'] : [user];
    users.forEach(u => airdropToUser(u));
    updateAssetUsdValue();
}

function airdropToUser(user) {
    const tokenType = airdropTokenSelect.value;
    const amount = parseFloat(airdropAmountInput.value);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }
    // lowercase user for element IDs
    const userLower = user.toLowerCase();
    const userDogBalance = parseFloat(document.getElementById(`${userLower}DogTokenBalance`).innerHTML);
    const userCatBalance = parseFloat(document.getElementById(`${userLower}CatTokenBalance`).innerHTML);
    if (tokenType === 'dogToken') {
      document.getElementById(`${userLower}DogTokenBalance`).innerHTML = cleanUpNumbers(userDogBalance + amount);
    } else if (tokenType === 'catToken') {
      document.getElementById(`${userLower}CatTokenBalance`).innerHTML = cleanUpNumbers(userCatBalance + amount);
    }
    
    writeToActivityLog(`Airdropping ${amount} ${tokenType === 'dogToken' ? 'Dog' : 'Cat'} Tokens to ${user}.`);
    
}
  

function coinbaseArbitrageButtonHandler(remainingSteps = Infinity) {
  const coinbaseDogPrice = parseFloat(coinbaseDogTokenPriceInput.value);
  const coinbaseCatPrice = parseFloat(coinbaseCatTokenPriceInput.value);
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
    while ((coinbasePriceRatio > (dexCatBalance / dexDogBalance)) && remainingSteps > 0) {
      // buy 1 dog token at a time
      const catTokensNeeded = (1 * dexCatBalance) / (dexDogBalance - 1);
      if (dexDogBalance < 1 || dexCatBalance < catTokensNeeded) {
        break;
      }
      dogTokensBought += 1;
      catTokensSpent += catTokensNeeded;
      dexDogBalance -= 1;
      dexCatBalance += catTokensNeeded;
      remainingSteps -= 1;
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
    while ((coinbasePriceRatio < (dexCatBalance / dexDogBalance)) && remainingSteps > 0) {
      // buy 1 cat token at a time
      const dogTokensNeeded = (1 * dexDogBalance) / (dexCatBalance - 1);
      if (dexCatBalance < 1 || dexDogBalance < dogTokensNeeded) {
        break;
      }
      catTokensBought += 1;
      dogTokensSpent += dogTokensNeeded;
      dexCatBalance -= 1;
      dexDogBalance += dogTokensNeeded;
      remainingSteps -= 1;
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
  updateAssetUsdValue();
}


    
  
  
  




function depositLiquidityButtonHandler (user) {
  
  // get the user from the liquidityUserSelect
  // const user = liquidityUserSelect.value;
  const liquidityDogAmountInput = document.getElementById(`liquidityDogAmountInput${user}`);
  const liquidityCatAmountInput = document.getElementById(`liquidityCatAmountInput${user}`);
  const dogTokenAmount = parseFloat(liquidityDogAmountInput.value);
  const catTokenAmount = parseFloat(liquidityCatAmountInput.value);
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
  
  

  
  // if (dexDogBalance === 0 && dexCatBalance === 0) {
  //   catTokenAmount = dogTokenAmount;
  // }

  if (userDogBalance < dogTokenAmount) {
    alert(`${user} does not have enough Dog Tokens to deposit.`);
    return;
  }
  if (userCatBalance < catTokenAmount) {
    alert(`${user} does not have enough Cat Tokens to deposit.`);
    return;
  }
  
  if (dexDogBalance === 0 && dexCatBalance === 0) {
    // first liquidity provider sets the initial price
    if (dogTokenAmount <= 0 || catTokenAmount <= 0) {
      alert('Initial liquidity must be greater than 0 for both Dog and Cat Tokens.');
      return;
    }
    document.getElementById(`${userLower}ShareOfLiquidityPool`).innerHTML = '100';
    dexDogTokenBalance.innerHTML = cleanUpNumbers(dogTokenAmount);
    dexCatTokenBalance.innerHTML = cleanUpNumbers(catTokenAmount);
    document.getElementById(`${userLower}DogTokenBalance`).innerHTML = cleanUpNumbers(userDogBalance - dogTokenAmount);
    document.getElementById(`${userLower}CatTokenBalance`).innerHTML = cleanUpNumbers(userCatBalance - catTokenAmount);
    updateRelativePrice();
    // clear input fields
    document.getElementById(`liquidityDogAmountInput${user}`).value = '';
    document.getElementById(`liquidityCatAmountInput${user}`).value = '';
    return;
  }
  
  // Update user balances
  document.getElementById(`${userLower}DogTokenBalance`).innerHTML = cleanUpNumbers(userDogBalance - dogTokenAmount);
  document.getElementById(`${userLower}CatTokenBalance`).innerHTML = cleanUpNumbers(userCatBalance - catTokenAmount);
  
  const originalBalanceOnLiquidityPool = (dexDogBalance + dexCatBalance)*userShareOfLiquidityPool/100;
  const newBalanceOnLiquidityPool = originalBalanceOnLiquidityPool + dogTokenAmount + catTokenAmount;
  const newTotalLiquidity = dexTotalLiquidity + dogTokenAmount + catTokenAmount;
  const newShareOfLiquidityPool = (newBalanceOnLiquidityPool / newTotalLiquidity) * 100;
  document.getElementById(`${userLower}ShareOfLiquidityPool`).innerHTML = cleanUpNumbers(newShareOfLiquidityPool);
  
  // Update other users' share of liquidity pool
  const users = ['alice', 'bob', 'carol', 'dave'];
  users.forEach(u => {
    if (u !== userLower) {
      const otherUserShare = parseFloat(document.getElementById(`${u}ShareOfLiquidityPool`).innerHTML);
      const otherUserNewShare = (otherUserShare * dexTotalLiquidity) / newTotalLiquidity;
      document.getElementById(`${u}ShareOfLiquidityPool`).innerHTML = cleanUpNumbers(otherUserNewShare);
    }
  });
  
  
  
  
  
  
  
  
  // Update DEX balances
  dexDogTokenBalance.innerHTML = cleanUpNumbers(dexDogBalance + dogTokenAmount);
  dexCatTokenBalance.innerHTML = cleanUpNumbers(dexCatBalance + catTokenAmount);
  
  
  


  
  updateRelativePrice();
  
  // clear input fields
  document.getElementById(`liquidityDogAmountInput${user}`).value = '';
  document.getElementById(`liquidityCatAmountInput${user}`).value = '';
  
}

function withdrawLiquidityButtonHandler (user) {
  // get the user from the liquidityUserSelect
  // const user = liquidityUserSelect.value;
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
      if (dexTotalLiquidity - (dogTokensToWithdraw + catTokensToWithdraw) <= 0) {
        document.getElementById(`${u}ShareOfLiquidityPool`).innerHTML = '0';
      } else {
        const otherUserShare = parseFloat(document.getElementById(`${u}ShareOfLiquidityPool`).innerHTML);
        const otherUserNewShare = (otherUserShare * dexTotalLiquidity) / (dexTotalLiquidity - (dogTokensToWithdraw + catTokensToWithdraw));
        if (otherUserNewShare < 0) {
          document.getElementById(`${u}ShareOfLiquidityPool`).innerHTML = '0';
        } else if (otherUserNewShare > 100) {
          document.getElementById(`${u}ShareOfLiquidityPool`).innerHTML = '100';
        } else {
          document.getElementById(`${u}ShareOfLiquidityPool`).innerHTML = cleanUpNumbers(otherUserNewShare);
        }
      }
    }
  });
  updateRelativePrice();
  
}



function liquidityDogAmountInputHandler(event, user) {
  const value = event.target.value;
  if (isNaN(value) || value <= 0) {
    event.target.value = '';
    return;
  } else {
    const dogTokenAmount = parseFloat(value);
    const dexDogBalance = parseFloat(dexDogTokenBalance.innerHTML);
    const dexCatBalance = parseFloat(dexCatTokenBalance.innerHTML);
    if (dexDogBalance === 0 && dexCatBalance === 0) {
      return;
    } else if (dexDogBalance === 0) {
      return;
    } else if (dexCatBalance === 0) {
      return;
    } else {
      const catTokenAmount = (dogTokenAmount * dexCatBalance) / dexDogBalance;
      document.getElementById(`liquidityCatAmountInput${user}`).value = cleanUpNumbers(catTokenAmount);
      // liquidityCatAmountInput.value = cleanUpNumbers(catTokenAmount);
    }
    
  }
  
}

function liquidityCatAmountInputHandler(event, user) {
  const value = event.target.value;
  if (isNaN(value) || value <= 0) {
    event.target.value = '';
    return;
  } else {
    const catTokenAmount = parseFloat(value);
    const dexDogBalance = parseFloat(dexDogTokenBalance.innerHTML);
    const dexCatBalance = parseFloat(dexCatTokenBalance.innerHTML);
    if (dexDogBalance === 0 && dexCatBalance === 0) {
      return;
    } else if (dexDogBalance === 0) {
      return;
    } else if (dexCatBalance === 0) {
      return;
    } else {
      const dogTokenAmount = (catTokenAmount * dexDogBalance) / dexCatBalance;
      document.getElementById(`liquidityDogAmountInput${user}`).value = cleanUpNumbers(dogTokenAmount);
    }
  } 
}

function initialize() {

  // Initialize the balances and prices
  aliceDogTokenBalance.innerHTML = '0';
  aliceCatTokenBalance.innerHTML = '0';
  aliceShareOfLiquidityPool.innerHTML = '0';
  bobDogTokenBalance.innerHTML = '0';
  bobCatTokenBalance.innerHTML = '0';
  bobShareOfLiquidityPool.innerHTML = '0';
  carolDogTokenBalance.innerHTML = '0';
  carolCatTokenBalance.innerHTML = '0';
  carolShareOfLiquidityPool.innerHTML = '0';
  daveDogTokenBalance.innerHTML = '0';
  daveCatTokenBalance.innerHTML = '0';
  daveShareOfLiquidityPool.innerHTML = '0';
  dexDogTokenBalance.innerHTML = '0';
  dexCatTokenBalance.innerHTML = '0';
  relativePriceDogTokenInCatToken.innerHTML = '1';
  relativePriceCatTokenInDogToken.innerHTML = '1';
  coinbaseDogTokenPriceInput.value = '1';
  coinbaseCatTokenPriceInput.value = '1';
  
}

function cleanUpNumbers(num, precision = 16) {
  return num.toFixed(precision).replace(/\.?0+$/, '');
}

// Function to update the relative price of Dog Token in terms of Cat Token
function updateRelativePrice() {
  const dexDogBalance = parseFloat(dexDogTokenBalance.innerHTML);
  const dexCatBalance = parseFloat(dexCatTokenBalance.innerHTML);
  
  if (dexDogBalance === 0 && dexCatBalance === 0) {
    relativePriceDogTokenInCatToken.innerHTML = 'N/A';
    relativePriceCatTokenInDogToken.innerHTML = 'N/A';
  } else if (dexDogBalance === 0) {
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
  updateAssetUsdValue();
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
  
  writeToActivityLog(`${user} ${action} ${amount} ${tokenType === 'dogToken' ? 'Dog' : 'Cat'} Tokens.`);
  updateRelativePrice();
  

}
  

// function executeTradeButtonHandler() {
  

//   const user = executeUserSelect.value;
//   const action = executeActionSelect.value;
//   const tokenType = executeTokenSelect.value;
//   const amount = parseFloat(executeAmountInput.value);
  
//   if (isNaN(amount) || amount <= 0) {
//     alert('Please enter a valid amount greater than 0.');
//     return;
//   }
//   console.log(`Executing trade: ${user} wants to ${action} ${amount} of ${tokenType} Token`);
//   tradeTokenAmount(user, tokenType, action, amount);  
// }

function executeTradeButtonHandler(user, action) {
  
  
  const tokenType = document.getElementById(`executeTokenSelect${user}`).value;
  const amount = parseFloat(document.getElementById(`executeAmountInput${user}`).value);
  
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount greater than 0.');
    return;
  }
  console.log(`Executing trade: ${user} wants to ${action} ${amount} of ${tokenType} Token`);
  tradeTokenAmount(user, tokenType, action, amount);  
  updateAssetUsdValue();
}

    
    
    
      
      