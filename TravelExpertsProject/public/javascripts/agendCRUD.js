const { Customer } = require("../models/customerRegister");

function lnameQuery() {
  const query = document.getElementById("lname");
  Customer.find(
    { CustLastName: query },
    "CustFirstName CustLastName",
    function (err, customer) {
      if (err) return handleError(err);
      console.log("%s %s.", customer.CustFirstName, Customer.CustLastName);
    }
  );
}
