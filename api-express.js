/* eslint-disable no-console */
/* eslint-disable no-empty */
const express = require('express');
const morgan = require('morgan');

let app = express();
app.use(morgan('dev'));

app.get('/sum', (req, res) => {
  let a;
  let b;
  if (req.query.a && req.query.b) {
    a = parseInt(req.query.a);
    b = parseInt(req.query.b);
  } else {
    return res.status(400).send('Must provide a and b.');
  }
  if(isNaN(a) || isNaN(b)) {
    return res.status(400).send('a and b must be numbers')
  }
  const response = `The sum of a and b is ${a + b}`;
  return res.send(response);
});

//#2
app.get('/cipher', (req,res) => {
  let text;
  let shift;
  if(req.query.text && req.query.shift) {
    text = req.query.text.toUpperCase().split('');
    shift = parseInt(req.query.shift);
  } else {
    return res.status(400).send('Must provide both text and shift as query parameters');
  } if (isNaN(shift)) {
    return res.status(400).send('shift must be a number.');
  } if(shift < -25 || shift > 25) {
    return res.status(400).send('shift must be between -25 and 25');
  }
  for(let i =0; i < text.length; i++) {
    let charNum = text[i].charCodeAt(0);
    if(charNum > 90 || charNum < 65) {
      return res.status(400).send('text must be letters a-z only');
    } 
    charNum += shift;
    if(charNum < 65) {
      charNum += 26;
    }
    if (charNum > 90) {
      charNum -= 26;
    }
    text[i] = String.fromCharCode(charNum);
  }
  text = text.join('');
  return res.send(text);
});

//#3 Array

app.get('/lotto', (req, res) => {
  let arrNum = req.query.arr.map( item => parseInt(item));
  console.log(arrNum);
  
  for(let i=0; i<arrNum.length; i++){
    //check if they are numbers
    if(isNaN(arrNum[i])) {
      return res.status(400).send('must be a number');
    }
    //number must be between 1 and 20
    if(arrNum[i] < 1 || arrNum[i] > 20){
        return res.status(400).send('number must between 1 and 20');
    }

    for(let j=0; j<arrNum.length; j++){
        //number must be different
        if(i !== j) {
            if(arrNum[i] === arrNum[j]) {
                return res.status(400).send('each number must be different');
            }
        }

    }

    //must be 6 distinct numbers
    if(arrNum.length !== 6) {
        return res.status(400).send('you must input exactly 6 numbers');
    }
  }
  
  let winningNumbers = [];

  do {
    let num = Math.floor(Math.random()*20) + 1;
    let bool = true;
    if(winningNumbers.length > 0) {
        for(let i=0; i<winningNumbers.length; i++){
            if(num === winningNumbers[i]){
                bool = false;
            } 
        }
        if(bool){
            winningNumbers.push(num);
        }
    } else {
        winningNumbers.push(num);
    }
  } while( winningNumbers.length < 6);
     
  let cnt = 0; 
  for(let i=0; i<arrNum.length; i++) {
    for(let j=0; j<winningNumbers.length; j++){
        if(arrNum[i] === winningNumbers[j]) {
            cnt++;
        }
    }
  }

  //switch statement
  let message;
  switch(cnt) {
      case 4: 
            message = 'Congratulations, you win a free ticket';
            break;
      case 5:
            message = 'Congratulations! You win $100!';
            break;
      case 6:
            message = 'Wow! Unbelievable! You could have won the mega millions!';
            break;
      default:
          message = 'Sorry, you lose';
  }
  
  res.send(message);
    
});

app.listen(3000, () => {
  console.log('listening on 3000');
});