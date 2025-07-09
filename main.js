
// SCROLL TO TOP BUTTON

const scrollBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});

if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// CONTACT FORM VALIDATION

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = this.querySelector('input[name="name"]');
      const email = this.querySelector('input[name="email"]');
      const message = this.querySelector('textarea[name="message"]');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        alert('Please fill in all fields.');
        return;
      }

      if (!validateEmail(email.value.trim())) {
        alert('Please enter a valid email address.');
        return;
      }

      alert('Thank you for contacting us!');
      this.reset();
    });
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}


// PRODUCT VIEW THUMBNAILS

const mainImage = document.querySelector('.main-image');
const thumbnails = document.querySelectorAll('.thumbnails-img');

if (mainImage && thumbnails.length > 0) {
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      mainImage.src = thumb.src;
    });
  });
}


// CART PAGE — Quantity & Total

const cartTable = document.querySelector('.cart table');
if (cartTable) {
  const rows = cartTable.querySelectorAll('tbody tr');
  const totalDisplay = document.querySelector('.cart-total h2');

  function updateCartTotal() {
    let total = 0;
    rows.forEach(row => {
      const price = parseFloat(row.cells[2].textContent.replace('$', ''));
      const qty = parseInt(row.querySelector('input').value);
      const subtotal = price * qty;
      row.cells[4].textContent = `$${subtotal.toFixed(2)}`;
      total += subtotal;
    });
    if (totalDisplay) {
      totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
    }
  }

  rows.forEach(row => {
    const qtyInput = row.querySelector('input');
    qtyInput.addEventListener('change', updateCartTotal);
  });

  updateCartTotal();
}

// =============================
// SEARCH PAGE — Display Query
// =============================
const searchPage = document.querySelector('.search-page');
if (searchPage) {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q');

  if (query) {
    const queryDisplay = searchPage.querySelector('p strong');
    if (queryDisplay) {
      queryDisplay.textContent = `"${query}"`;
    }
  }
}
// =============================
// ADD TO CART FUNCTIONALITY
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.product-card button');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productCard = button.closest('.product-card');
      const name = productCard.querySelector('h3').textContent;
      const price = productCard.querySelector('.price').textContent.replace('$', '');
      const img = productCard.querySelector('img').src;

      addToCart({ name, price, img, quantity: 1 });
      alert(`${name} added to cart!`);
    });
  });

  updateCartCount();
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const index = cart.findIndex(item => item.name === product.name);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  let cartLink = document.querySelector('a[href="cart.html"]');
  if (cartLink) {
    cartLink.textContent = `Cart (${count})`;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const cartTableBody = document.querySelector('.cart tbody');
  const cartTotalDisplay = document.querySelector('.cart-total h2');

  if (!cartTableBody) return;

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartTableBody.innerHTML = `
      <tr><td colspan="5">Your cart is empty.</td></tr>
    `;
    if (cartTotalDisplay) cartTotalDisplay.textContent = `Total: $0.00`;
    return;
  }

  cartTableBody.innerHTML = ''; // clear any static rows

  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.quantity * parseFloat(item.price);
    total += subtotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${item.img}" alt="${item.name}"></td>
      <td>${item.name}</td>
      <td>$${parseFloat(item.price).toFixed(2)}</td>
      <td>
        <input type="number" value="${item.quantity}" min="1" data-index="${index}">
      </td>
      <td>$${subtotal.toFixed(2)}</td>
    `;
    cartTableBody.appendChild(row);
  });

  if (cartTotalDisplay) {
    cartTotalDisplay.textContent = `Total: $${total.toFixed(2)}`;
  }

  setupQuantityChange();
});

function setupQuantityChange() {
  const qtyInputs = document.querySelectorAll('.cart input[type="number"]');
  qtyInputs.forEach(input => {
    input.addEventListener('change', () => {
      const index = parseInt(input.getAttribute('data-index'));
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const newQty = parseInt(input.value);

      if (newQty <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = newQty;
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload(); // reload to update table & totals
    });
  });
}
// =============================
// PROCEED TO CHECKOUT BUTTON
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const checkoutBtn = document.querySelector('.cart-total .btn');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
      e.preventDefault(); // prevent default link behaviour

      // clear cart
      localStorage.removeItem('cart');

      // optionally, show a loading message or alert
      // alert('Order placed successfully!');

      // redirect to confirmation page
      window.location.href = 'order-confirmation.html';
    });
  }
});

//AOS 
AOS.init();
