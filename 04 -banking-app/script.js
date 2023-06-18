'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Mihaela Diaconu',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(movements) {
  containerMovements.innerHTML = '';
movements.forEach((movement, index) => {
  const type=movement>0 ? "deposit" : "withdrawal";

  const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${index+1}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${movement}</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html)
})
}
//displayMovements(account1.movements);


/////////////////////////////////////////////////
/////////////////////////////////////////////////

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// display movements



const display = function (account, movements, sort = false) {
  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : movements;
  containerMovements.innerHTML = '';
  movs.forEach((movement, index) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    }</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${movement}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//display(account1.movements); call later
//user name for 1 account
const user = "Mihaela Diaconu";
const userN=user.split(" ").map((word) => word.slice(0, 1)).join("").toLowerCase();
console.log(userN);
////////////////
let usernames=function (accounts) {
  let usernames=accounts.map((account)=> {
    return account.owner
      .split(' ')
      .map(word => word.slice(0, 1))
      .join('')
      .toLowerCase();}
  )
return usernames;
}


usernames(accounts);

//or, without modifying the original array
function createUsers (accounts) {
  accounts.forEach((account)=> {
    return account.owner
      .split(' ')
      .map(word => word.slice(0, 1))
      .join('')
      .toLowerCase();}
  )
}

//console.log(createUsernames(accounts));

//create deposits with movements > 0 and withdrawals with movements < 0
let deposits = movements.filter((movement)=> movement > 0);
console.log(deposits);

let withdrawals = movements.filter(movement => movement < 0);
console.log(withdrawals);


//calculate the global balance
const balance=movements.reduce((acc, curr, i, arr) => {
  console.log(`Iteration number ${i} have ${acc}`)
  return acc+curr
}, 0)
console.log(balance);


const calcPrintBalance = function (account) {
  const balance = account.movements.reduce((acc, curr, i, arr) => {
    console.log(`Iteration number ${i} have ${acc}`);
    return acc + curr;
  }, 0);
  account.balance = balance;
  labelBalance.textContent = `${balance} EUR`; //exec latter
  return balance
}

//console.log(calcPrintBalance(account1.movements));
//console.log(labelBalance)

//calculate summary
const calcDisplaySummary = function (account) {
let balance = account.movements.filter(mov => mov > 0)
.reduce((acc, mov) =>acc+mov, 0 );
account.balance=balance;
labelSumIn.textContent=`${balance} EUR`;
}

//calcDisplaySummary(movements);

//out moves
const out = movements.filter(mov => mov < 0).reduce((acc, mov) => acc+mov, 0);
//labelSumOut.textContent = `${out} EUR`

//interest calc
let interest = movements.filter(mov => mov > 0).reduce((acc, mov) => (acc+mov)*0.012, 0).toFixed(2);
console.log(interest);
//labelSumInterest.textContent=`${interest} EUR`

//maximum value of the movements
const maxMovement = function (movements) {
  const maxBalance = movements.reduce((acc, curr, i, arr) => {
    console.log(`Iteration number ${i} have ${acc} and current ${curr} `);
    if(acc > curr) {return acc;}
    else {return curr}
  }, movements[0]);
  return maxBalance;
};

console.log(maxMovement(movements));

//update UI
const updateUI=function(account) {
calcPrintBalance(account);
calcDisplaySummary(account);
display(account, account.movements);
}

//login functionality
let currentAccount=null;
btnLogin.addEventListener("click", (e)=> {
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.owner === inputLoginUsername.value
  ); // the object
  //verify pin
  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    //display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;
    //clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    //display movements
    displayMovements(currentAccount.movements);
    ///display balance
    const balance = currentAccount.movements.reduce((acc, curr, i, arr) => {
      //console.log(`Iteration number ${i} have ${acc}`);
      return acc + curr;
    }, 0);
    labelBalance.textContent = `${balance} EUR`;

    //display summary
    calcDisplaySummary(currentAccount);
    //display negative movements
    let negativeMov =
      currentAccount &&
      currentAccount.movements
        .filter(mov => mov < 0)
        .reduce((acc, curr) => acc + curr, 0);
    labelSumOut.textContent = `${negativeMov} EUR`;
    //display interest
    const interestR = currentAccount && currentAccount.interestRate;
    const positiveMovements =
      currentAccount &&
      currentAccount.movements
        .filter(mov => mov > 0)
        .reduce((acc, curr) => acc + curr, 0);
    const interest = (positiveMovements * interestR) / 100;
    labelSumInterest.textContent = `${interest} EUR`;
  }
updateUI(currentAccount);
  console.log(currentAccount);
})


//transfer money
btnTransfer.addEventListener("click", (e)=> {
e.preventDefault();
const amount=Number(inputTransferAmount.value);
const receiverAccInput=inputTransferTo.value;
const receiverAcc= accounts.find((account) => account.owner === receiverAccInput);

console.log(receiverAcc);
//clean inputs
inputTransferAmount.value = receiverAccInput.value = "";
//checks
if (receiverAcc && amount > 0 && currentAccount.balance >= amount) {
  //doing transfer
  currentAccount.movements.push(-amount);
  receiverAcc.movements.push(amount);
  updateUI(currentAccount);
}
})


//close account
btnClose.addEventListener("click", (e) => {
e.preventDefault();
const findAccount=accounts.findIndex(account => account===currentAccount);//the index of account to be deleted
if(inputCloseUsername.value === currentAccount.owner && Number(inputClosePin.value) === currentAccount.pin) {
//delete account
  accounts.splice(findAccount, findAccount+1);
//hide UI
containerApp.style.opacity=0;
}
});

//calculate global balance
let accountsMovements=accounts.map((account)=> account.movements);
let totalMovements = accountsMovements.flat(1).reduce((acc, curr)=> acc+curr, 0)


//sort button event
let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  display(currentAccount, currentAccount.movements, !sorted);
  sorted = !sorted;
});

//loan
btnLoan.addEventListener("click", (e)=> {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
if(amount > 0 && currentAccount.movements.some(mov=> mov >= amount*0.1)) {
  //Add movement
  currentAccount.movements.push(amount);
  //update the UI
    updateUI(currentAccount);
 }
 inputLoanAmount.value="";
})