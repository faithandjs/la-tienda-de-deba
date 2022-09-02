import React from 'react';

const Sale = ({ month }: { month: string }) => {
  return (
    <section className="sale">
      <div className="stripes"></div>
      <div className="text-box">
        <div>
          sales! <span>30%</span> off, all {month}!
        </div>
      </div>
      <div className="stripes"></div>
    </section>
  );
};

export default Sale;
