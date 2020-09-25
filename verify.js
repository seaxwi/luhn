const INVALID = "INVALID";
const VISA = "VISA";
const AMEX = "AMEX";
const MASTERCARD = "MASTERCARD";

function verify() {
  var number = document.getElementById('ccnumber').value;
  var output = "";
  var number_length = ndigits(number);

  /* Check validity */
  output = output.concat("Luhn check: ")
  if (!luhn_check(number)) {
    output = output.concat("Invalid card!" + "\n");
    output = output.concat("Issuer: N/A");
  } else {
    output = output.concat("Valid!" + "\n");
    output = output.concat("Issuer: ")
    /* Try to find matching card */
    var id = get_digit(number, 0) * 10 + get_digit(number, 1);
    if (id / 10 == 4 && (number_length == 13 || number_length == 16)) {
      output = output.concat(VISA);
    } else if (id == 34 || id == 37) {
      output = output.concat(AMEX);
    } else if (id > 50 && id < 56) {
      output = output.concat(MASTERCARD);
    }
    /* No matching card found */
    else {
      output = output.concat("No matching issuer found!")
    }
  }

  document.getElementById('output-box').innerHTML = output;;
}

/**
 * Preform a validation check using the Luhn algorithm.
 * https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * number: the number to check
 *
 * returns: true of check succeeds, otherwise false
 */
function luhn_check(number) {
  var sum_even = 0; /* even */
  var sum_odd = 0; /* odd */

  var index = 0;
  var n = ndigits(number);

  for (i = 0; i < n; i++) {
    console.log(i);
    var digit = get_digit(number, n - i - 1);
    // number -= digit;

    if (i % 2 == 0) {
      sum_even += digit;
    } else {
      digit *= 2;
      if (digit > 9) {
        sum_odd += Math.trunc(digit / 10) + (digit % 10);
      } else {
        sum_odd += digit;
      }
    }
    index++;
  }
  var sum = sum_even + sum_odd;

  /* Return true if last digit is 0 */
  console.log(sum);
  console.log(sum % 10 == 0);
  return (sum % 10 == 0 && sum != 0); /* Sum should end in 0 but not BE 0 */
}

/**
 * Returns the digit at index in number.
 *
 * number: number
 * index: which digit to return. Most significant is at index = 0,
 *        least significant at index = n - 1.
 *
 * return: digit at index in number
 */
function get_digit(number, index) {
  var n = ndigits(number);
  var result = number;
  result %= 10 ** (n - index);
  result = Math.trunc(result / (10 ** (n - index - 1)));

  /* signed integer division truncates towards zero */

  return result;
}

/**
 * Returns the number of digits in a number
 *
 * number: the number to perform count on
 *
 * returns: number of digits
 */
function ndigits(number) {
  var ndigits = 0;
  while (number != 0) {
    number = Math.trunc(number / 10);
    ndigits++;
    console.log(number);
  }
  return ndigits;
}
