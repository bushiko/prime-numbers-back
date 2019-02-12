const express = require('express');
const router = express.Router();

/**
 * This method returns a list of prime numbers given a limit.
 * Algorith based on the Sieve of Eratosthenes 
 * https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes#Computational_analysis
 *  
 * @param {number} limit 
 */
var getPrimes = function( limit ) {
  var list = [];
  var primes = []
  var squaredLimit = Math.sqrt( limit );

  // Step 1: Generate an array of boolean values from 2 to n 
  // initially all set to true
  // example for limit 5: [empty, empty true, true]
  for( let i = 2; i < limit; i++) {
    list[i] = true;
  }

  // Step 2: Mark as false multiples in the array starting from 2
  for( let i = 2; i <= squaredLimit; i++ ) {
    if ( list[i] ) {
      for( let j = i*i; j <= limit; j += i ) {
        list[j] = false;
      }
    }
  }

  // Step 3: All those marked i such that list[i] is true
  for ( let i = 2; i < limit; i++ ) {
    if ( list[i] ) {
      primes.push(i);
    }
  }

  return primes;
}



router.get('/', function(req, res, next) {
  const limit = parseInt(req.query.limit, 10);
  console.log(`responding for limit: ${limit}`);

  if ( isNaN(limit) ) { return res.status(400).json({error: 'bad limit'}); }

  const primes = getPrimes( limit );
  const sum = primes.reduce((prevVal, currentVal) => {
    return prevVal + currentVal
  }, 0);

  return res
    .status(200)
    .json({
      primes,
      sum
    });
});

module.exports = router;
