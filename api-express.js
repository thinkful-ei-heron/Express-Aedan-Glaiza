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

app.listen(3000, () => {
    console.log('listening on 3000');
});