// import PaystackPop from '@paystack/inline-js';
import React, { useState,useEffect } from 'react';
// declare var PaystackPop: any;
const Paystack = () => {
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [amount, setAmount] = useState('');
  // function payWithPaystack(){
  //   var handler = PaystackPop.setup({
  //     key: 'paste your key here',
  //     email: 'customer@email.com',
  //     amount: 10000,
  //     ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
  //     metadata: {
  //        custom_fields: [
  //           {
  //               display_name: "Mobile Number",
  //               variable_name: "mobile_number",
  //               value: "+2348012345678"
  //           }
  //        ]
  //     },
  //     callback: function(response:any){
  //         alert('success. transaction ref is ' + response.reference);
  //     },
  //     onClose: function(){
  //         alert('window closed');
  //     }
  //   });
  //   handler.openIframe();
  // }
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    // script.onload = initGateway;
    // return () => {
    //   document.body.removeChild(script);
    //   setTimeout(() => {
    //     document.querySelectorAll("iframe[name^=paystack]").forEach(n=>{
    //       n.parentNode?.removeChild(n)
    //     })
    //   }, 1000)
    //   // mounted.current += 1;
    // };
  }, []);
  // }, [onClose]);
  return (
    <div>
      <h3>Make Payment</h3>
      <form>
        <script src="https://js.paystack.co/v1/inline.js"></script>
        {/* <button type="button" onClick="payWithPaystack()"> Pay </button>  */}
      </form>
      {/* <form action="">
        <div className="input-box">
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="FirstName" id="firstName" value={fname} onChange={(e)=> setFname(e.target.value)} />
        </div>
        <div className="input-box">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="LastName" id="lastName" value={lname} onChange={(e)=> setLname(e.target.value)} />
        </div>
        <div className="input-box">
          <label htmlFor="email">Email</label>
          <input type="text" name="Email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
        </div>
        <div className="input-box">
          {/* <label htmlFor="FirstName"></label>
          <input type="text" name="FirstName" id="FirstName" /> 
        </div>
      </form> */}
    </div>
  );
};

export default Paystack;
