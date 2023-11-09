import React from "react";

function ATMFront(props) {
  console.log("ATMFront props:", props);

  return (
    <>
      <div className="atm-front">
        <div style={{ display: "flex" }}>
          <div className="Part1"></div>
          <div className="Part2"></div>
        </div>
        <div className="Input">
          <h2 style={{color:"white"}}>{props.cardNumber}</h2>
        </div>
        <div className="content">
          <h3 style={{color:"white"}}>{props.cardHolderName}</h3>
          <p style={{color:"white"}}>{props.expDate}</p>
        </div>
      </div>
    </>
  );
}

function ATMBack(props) {
  return (
    <>
      <div className="atm-back">
        <div className="greylayout">
          <h3>{props.cvc}</h3>
        </div>
      </div>
    </>
  );
}

export { ATMFront, ATMBack };
