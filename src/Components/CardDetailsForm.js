import React, { useState } from "react";
import { ATMFront, ATMBack } from "./ATMComponents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CardDetailsForm() {
  const handleConfirmation = () => {
    // Your confirmation logic here
    if (Name && CardNumber && CVC) {
      // Show a success toast message
      toast.success("Card details confirmed successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        // Duration to show the toast in milliseconds (3 seconds in this example)
      });
      
      
      setIsConfirmed(true);
    } else {
      // Show an error toast message
      toast.error("Please fill out all the required fields correctly!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  const [Name, setName] = useState("");
  const [CardNumber, setCardNumber] = useState("");
  const [CVC, setCVC] = useState("");
  const [error, setError] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [Month, setMonth] = useState("");
  const [Year, setYear] = useState("");

  

 

  const isNumeric = (value) => {
    return /^\d+$/.test(value);
  };

  const isNumericCard = (value) => {
    // Use a regular expression that matches digits and white spaces
    const regex = /^[0-9\s]+$/;
    return regex.test(value);
  };

  const isAlphabeticWithSpecialSymbols = (value) => {
    // Use a regular expression that matches alphabetic characters, special symbols, and whitespace
    const regex = /^[A-Za-z!@#$%^&*()_+{}[\]:;<>,.?~\\/\s-]+$/;
    return regex.test(value);
  };

  const isValidMonth = (value) => {
    const numericValue = parseInt(value, 10);
    return (
      !isNaN(numericValue) &&
      value.length === 2 &&
      numericValue >= 1 &&
      numericValue <= 12
    );
  };

  const handleCardNumberChange = (e) => {
    const inputCardNumber = e.target.value.replace(/\s/g, ""); // Remove existing spaces
    let formattedCardNumber = "";

    for (let i = 0; i < inputCardNumber.length; i += 4) {
      if (i !== 0) {
        formattedCardNumber += " ";
      }
      formattedCardNumber += inputCardNumber.substr(i, 4);
    }

    setCardNumber(formattedCardNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    if (
      Name.length === 0 ||
      CardNumber.length === 0 ||
      CardNumber.length !== 19 ||
      CVC.length === 0 ||
      CVC.length !== 3 ||
      !isNumeric(CardNumber) ||
      !isNumeric(CVC)
    ) {
      setError(true);
    }

    if (Name && CardNumber && CVC) {
      console.log(
        " Name: ",
        Name,
        "\ncard number: ",
        CardNumber,
        "\n cvc :",
        CVC
      );
    }
  };
  return (
    <>
      <div className="container">
        <div className="atm-partition">
          {/* Render ATMFront component and pass card details as props */}

          <ATMFront
            cardHolderName={Name}
            cardNumber={CardNumber}
            expDate={`${Month}/${Year}`} // Assuming Month and Year are set correctly
          />

          {/* Render ATMBack component and pass CVC as props */}
          <ATMBack cvc={CVC} />
        </div>

        <div className="credit-form-partition">
          <div className="card-deatils">
            <form onSubmit={handleSubmit}>
              <h2>CARDHOLDER NAME</h2>
              <input
                type="text"
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
              ></input>
              {error && Name.length === 0 ? (
                <label>Name can't be empty</label>
              ) : error && !isAlphabeticWithSpecialSymbols(Name) ? (
                <label>
                  Name should contain only alphabetic characters and special
                  symbols
                </label>
              ) : (
                ""
              )}
              <h2 style={{ paddingTop: "20px" }}>CARD NUMBER</h2>
              <input
                type="text"
                placeholder="e.g. 5657 6867 8889 4536"
                minLength="19"
                maxLength="19"
                onChange={handleCardNumberChange}
                value={CardNumber}
              ></input>
              {error && CardNumber.length === 0 ? (
                <label>Card number can't be empty</label>
              ) : error && CardNumber.length !== 19 ? (
                <label>Card number should be exactly 16 digits</label>
              ) : error && !isNumericCard(CardNumber) ? (
                <label>Card number should contain only digits</label>
              ) : (
                ""
              )}

              <div style={{ display: "flex" }}>
                <h2 style={{ paddingTop: "20px" }}>EXP. DATE (MM/YY)</h2>
                <h2 style={{ marginTop: "20px", marginLeft: "15px" }}>CVC</h2>
              </div>

              <div className="Date">
                <input
                  type="text"
                  className="div1"
                  placeholder="MM"
                  onChange={(e) => setMonth(e.target.value)}
                  minLength="2"
                  maxLength="2"
                ></input>
                <input
                  type="text"
                  className="div2"
                  placeholder="YY"
                  onChange={(e) => setYear(e.target.value)}
                  minLength="2"
                  maxLength="2"
                ></input>

                <input
                  type="text"
                  className="div3"
                  placeholder="e.g. 123"
                  minLength="3"
                  maxLength="3"
                  onChange={(e) => setCVC(e.target.value)}
                ></input>
              </div>
              {error && !isValidMonth(Month) ? (
                <label>Invalid month</label>
              ) : (
                ""
              )}

              {error && !isNumeric(Year) ? (
                <label>Year contain only digits</label>
              ) : (
                ""
              )}
              {error && CVC.length === 0 ? (
                <label style={{ marginLeft: "30px" }}>CVC can't be empty</label>
              ) : error && (!isNumeric(CVC) || CVC.length !== 3) ? (
                <label style={{ marginLeft: "30px" }}>
                  CVC should be 3 digits only
                </label>
              ) : (
                ""
              )}

              <button className="submit" onClick={handleConfirmation}>
                Confirm
              </button>

              {/* Toast container */}
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default CardDetailsForm;
