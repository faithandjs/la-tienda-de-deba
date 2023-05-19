import React from 'react';
interface prop {
  amount: number | string;
}
const Amount = ({ amount }: prop) => {
  const addComma = () => {
    const number = amount.toString().split('.');
    const arr = number[0].split('');
    const rev = arr.reverse().map((item, index) => {
      if ((index + 1) % 3 === 0 && index + 1 !== arr.length) return ',' + item;
      return item;
    });
    return rev.reverse().join('');
  };
  return (
    <p className="amount">
      <span>€</span>
      <span>{addComma()}</span>
    </p>
  );
};

export default Amount;
