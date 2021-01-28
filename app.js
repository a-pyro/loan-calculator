// ascolto per submit

document.getElementById('loan-form').addEventListener('submit', calcutaResults);

////////////////////////////////////////////
// ========== calc res ================
///////////////////////////////////////////

function calcutaResults(e) {
  e.preventDefault();
  console.log('calcolo');
  // UI Vars

  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    showLoading('.results');
  } else {
    showError('Please check your numbers');
    // !pulire input!
  }
}

// errore
function showError(error) {
  // creo elemento
  const errorDiv = document.createElement('div');
  // classe BS
  errorDiv.className = 'alert alert-danger';
  // testo
  errorDiv.appendChild(document.createTextNode(error));
  // referenze per inserimento dom
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // isnerisco nel dom
  card.insertBefore(errorDiv, heading);

  showLoading('.alert');

  // pulisco errore dopo un po'
  setTimeout(clearError(errorDiv), 3000);
}

// closure
function clearError(err) {
  return () => err.remove();
}

// loading
function showLoading(element) {
  // nascondo la sezione resultper un tot
  const resultsSection = document.querySelector(element);
  resultsSection.classList.add('d-none');

  // mostro lo spinner per poco
  const spinner = document.querySelector('.spinner-grow');
  spinner.classList.remove('d-none');

  // dopo qualche sec inverto
  setTimeout(() => {
    resultsSection.classList.remove('d-none');
    spinner.classList.add('d-none');
  }, 1000);
  // nascondo lo spinner
  // mostro sezione
}
