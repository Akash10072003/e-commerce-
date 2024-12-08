class OrderPlacer {
    constructor(whatsappNumber) {
        this.whatsappNumber = whatsappNumber;
        this.init();
    }

    init() {
        document.querySelectorAll('.cta-btn').forEach(button => {
            button.addEventListener('click', (e) => this.openOrderForm(e.target));
        });
    }

    openOrderForm(button) {
        // Get product details from data attribute
        const productDetails = button.getAttribute('data-product') || "Product details not provided.";

        // Create the form dynamically
        const formOverlay = document.createElement('div');
        formOverlay.style.position = 'fixed';
        formOverlay.style.top = '0';
        formOverlay.style.left = '0';
        formOverlay.style.width = '100vw';
        formOverlay.style.height = '100vh';
        formOverlay.style.background = 'rgba(0, 0, 0, 0.5)';
        formOverlay.style.display = 'flex';
        formOverlay.style.justifyContent = 'center';
        formOverlay.style.alignItems = 'center';
        formOverlay.style.zIndex = '1000';

        const formContainer = document.createElement('div');
        formContainer.style.background = '#fff';
        formContainer.style.padding = '20px';
        formContainer.style.borderRadius = '8px';
        formContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        formContainer.style.width = '90%';
        formContainer.style.maxWidth = '400px';

        formContainer.innerHTML = `
            <h2 style="text-align: center; margin-bottom: 20px;">Place Your Order</h2>
            <form id="orderForm">
                <div style="margin-bottom: 10px;">
                    <label for="name" style="display: block; font-weight: bold;">Name</label>
                    <input type="text" id="name" style="width: 100%; padding: 8px;" required />
                </div>
                <div style="margin-bottom: 10px;">
                    <label for="address" style="display: block; font-weight: bold;">Address</label>
                    <textarea id="address" style="width: 100%; padding: 8px;" required></textarea>
                </div>
                <div style="margin-bottom: 10px;">
                    <label for="contact" style="display: block; font-weight: bold;">Contact Number</label>
                    <input type="tel" id="contact" style="width: 100%; padding: 8px;" required />
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <button type="submit" style="background: #0073e6; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; width: 48%;">Submit</button>
                    <button type="button" id="cancelButton" style="background: #ff4c4c; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; width: 48%;">Cancel</button>
                </div>
            </form>
        `;

        formOverlay.appendChild(formContainer);
        document.body.appendChild(formOverlay);

        const orderForm = document.getElementById('orderForm');
        orderForm.addEventListener('submit', (e) => this.submitOrder(e, formOverlay, productDetails));

        // Cancel button functionality
        const cancelButton = document.getElementById('cancelButton');
        cancelButton.addEventListener('click', () => this.cancelOrder(formOverlay));
    }

    submitOrder(e, formOverlay, productDetails) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const contact = document.getElementById('contact').value;

        // Include product details in the message
        const message = `Order Details:%0AProduct: ${productDetails}%0AName: ${name}%0AAddress: ${address}%0AContact Number: ${contact}`;

        // WhatsApp link
        const whatsappLink = `https://wa.me/${this.whatsappNumber}?text=${message}`;
        window.open(whatsappLink, '_blank');

        // Remove the form overlay
        document.body.removeChild(formOverlay);

        alert('Your order has been placed successfully!');
    }

    cancelOrder(formOverlay) {
        // Remove the form overlay
        document.body.removeChild(formOverlay);
    }
}

// Initialize the library
new OrderPlacer('7980374301');
