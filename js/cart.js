class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('luxury_cart')) || [];
    this.updateAll();
  }

  add(product, quantity = 1) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ ...product, quantity });
    }
    this.save();
    this.showToast(`${product.name} added to cart`);
  }

  remove(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.save();
    this.updateAll();
  }

  updateQuantity(productId, qty) {
    const item = this.items.find(i => i.id === productId);
    if (item) {
      item.quantity = Math.max(1, qty);
      this.save();
      this.updateAll();
    }
  }

  get total() {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  get count() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  save() {
    localStorage.setItem('luxury_cart', JSON.stringify(this.items));
    this.updateAll();
  }

  updateAll() {
    this.updateCount();
    this.renderCartPage();
    this.renderCheckoutSummary();
  }

  updateCount() {
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = this.count;
      el.style.display = this.count > 0 ? 'flex' : 'none';
    });
  }

  renderCartPage() {
    const container = document.getElementById('cart-items-container');
    const summary = document.getElementById('cart-summary');
    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="empty-cart">
          <div class="icon">&#9744;</div>
          <h2>Your cart is empty</h2>
          <p>Explore our collection and discover pieces that speak to you.</p>
          <a href="/collections.html" class="btn btn-primary">Browse Collection</a>
        </div>`;
      if (summary) summary.innerHTML = '';
      return;
    }

    container.innerHTML = this.items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img class="cart-item-image" src="${item.images?.[0] || 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=300'}" alt="${item.name}">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>${item.materials?.[0] || 'Luxury material'}</p>
          <div class="qty-selector" style="display:inline-flex;margin-top:0.5rem;">
            <button onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
            <input type="text" value="${item.quantity}" readonly>
            <button onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
          <button class="cart-item-remove" onclick="cart.remove(${item.id})">Remove</button>
        </div>
        <div class="cart-item-price">Rs. ${(item.price * item.quantity).toLocaleString("en-PK")}</div>
      </div>
    `).join('');

    if (summary) {
      const subtotal = this.total;
      const shipping = subtotal > 500000 ? 0 : 5000;
      summary.innerHTML = `
        <div class="cart-summary" style="position:sticky;top:100px;">
          <h2>Order Summary</h2>
          <div class="cart-summary-row">
            <span>Subtotal (${this.count} items)</span>
            <span>Rs. ${subtotal.toLocaleString("en-PK")}</span>
          </div>
          <div class="cart-summary-row">
            <span>Shipping</span>
            <span>${shipping === 0 ? 'Free' : 'Rs. ' + shipping.toLocaleString('en-PK')}</span>
          </div>
          <div class="cart-summary-total">
            <span>Total</span>
            <span>Rs. ${(subtotal + shipping).toLocaleString("en-PK")}</span>
          </div>
          <button onclick="proceedToCheckout()" class="btn btn-primary" style="width:100%;margin-top:1.5rem;cursor:pointer;">
            Proceed to Checkout
          </button>
          <div class="payment-methods">
            <h4>We accept</h4>
            <div class="payment-icons">
              <span class="payment-icon">Visa</span>
              <span class="payment-icon">MC</span>
              <span class="payment-icon">Amex</span>
              <span class="payment-icon">PayPal</span>
              <span class="payment-icon">JazzCash</span>
              <span class="payment-icon">EasyPaisa</span>
            </div>
          </div>
          <a href="/collections.html" style="display:block;text-align:center;margin-top:1rem;font-size:0.85rem;color:var(--text-light);text-decoration:underline;">Continue Shopping</a>
        </div>`;
    }
  }

  renderCheckoutSummary() {
    const el = document.getElementById('checkout-summary');
    if (!el) return;

    if (this.items.length === 0) {
      el.innerHTML = '<p style="text-align:center;padding:2rem;color:var(--text-light);">Your cart is empty.</p>';
      return;
    }

    const subtotal = this.total;
    const shipping = subtotal > 500000 ? 0 : 5000;

    el.innerHTML = `
      <div style="padding:1.5rem;background:var(--white);border:1px solid var(--border);">
        <h3 style="font-family:var(--font-heading);font-size:1.2rem;margin-bottom:1rem;color:var(--walnut-dark);">Order Summary</h3>
        ${this.items.map(item => `
          <div style="display:flex;justify-content:space-between;padding:0.5rem 0;font-size:0.85rem;border-bottom:1px solid var(--border);">
            <span>${item.name} × ${item.quantity}</span>
            <span>Rs. ${(item.price * item.quantity).toLocaleString("en-PK")}</span>
          </div>
        `).join('')}
        <div style="display:flex;justify-content:space-between;padding:0.75rem 0;font-size:0.9rem;">
          <span>Shipping</span>
          <span>${shipping === 0 ? 'Free' : 'Rs. ' + shipping.toLocaleString('en-PK')}</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding-top:0.75rem;border-top:2px solid var(--walnut);font-size:1.1rem;font-weight:600;color:var(--walnut-dark);">
          <span>Total</span>
          <span>Rs. ${(subtotal + shipping).toLocaleString("en-PK")}</span>
        </div>
      </div>`;
  }

  showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = `<span style="color:var(--gold);">✓</span> ${message}`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }
}

function proceedToCheckout() {
  if (cart.count >= 2) {
    const user = localStorage.getItem('luxury_user');
    if (user) {
      window.location.href = '/checkout.html';
    } else {
      document.getElementById('register-modal').classList.add('open');
    }
  } else {
    window.location.href = '/checkout.html';
  }
}

async function registerUser(event) {
  event.preventDefault();
  const data = {
    name: document.getElementById('reg-name').value,
    email: document.getElementById('reg-email').value,
    phone: document.getElementById('reg-phone').value,
    address: document.getElementById('reg-address').value,
    city: document.getElementById('reg-city').value
  };
  try {
    const res = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      localStorage.setItem('luxury_user', JSON.stringify(data));
      document.getElementById('register-modal').classList.remove('open');
      window.location.href = '/checkout.html';
    } else {
      alert('Registration failed. Please try again.');
    }
  } catch {
    alert('Server error. Please try again.');
  }
}

function closeRegisterModal() {
  document.getElementById('register-modal').classList.remove('open');
}

const cart = new Cart();
