module.exports = function multiply(a, b) {
  const numberA = a.toString().split('');
  const numberB = b.toString().split('');
  return sumRowsInColumn(_multiplyInColumn(numberA, numberB));
}

function _multiplyInColumn(a, b) {
  const rows = [];
  b.reverse().forEach((digit, index) => {
    const numB = parseInt(digit, 10);
    let transfer = 0;
    rows.push(a.slice().reverse().map(num => {
      let mult = parseInt(num, 10) * numB;
      if (transfer > 0) {
        mult += transfer;
        transfer = 0;
      }
      if (mult > 9) {
        const split = mult.toString().split('');
        transfer = parseInt(split[0], 10);
        return split[1];
      }
      return mult.toString();
    })
    // Append transfer
    .concat(transfer)
    // Reverse array
    .reverse()
    // Append trailing zeros
    .concat('0'.repeat(index).split(''))
    // Exclude zeros and empty strings
    .filter(Boolean));
  });
  return rows;
}

function sumRowsInColumn(rows) {
  return rows.reduce((prev, cur) => sumTwoRows(prev, cur), ['0']).join('');
}

function sumTwoRows(a, b) {
  const result = [];
  if (a.length < b .length) {
    [a, b] = [b, a];
  }

  const lenA = a.length - 1;
  const lenB = b.length - 1;
  let transfer = 0;

  for(let i = 0; i <= lenA; i += 1) {
    let sum;
    if (b[lenB - i]) {
      sum = parseInt(a[lenA - i], 10) + parseInt(b[lenB - i], 10) + transfer;
    } else {
      sum = parseInt(a[lenA - i], 10) + transfer;
    }
    transfer = 0;
    if (sum > 9) {
      const split = sum.toString().split('');
      transfer = parseInt(split[0], 10);
      sum = split[1];
    }
    result[lenA - i] = sum.toString();
  }
  if (transfer > 0) {
    result.unshift(transfer.toString());
  }
  return result;
}
