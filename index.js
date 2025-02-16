const cartItemList = document.querySelector('#cart-item-list');
let cartList = [];
const activeCode = ['ostad10', 'ostad5'];

async function productDisplay() {
  displayLoading(true);
  const url = 'https://fakestoreapi.com/products';

  // fetch product data
  const data = await fetch(url);
  const res = await data.json();
  displayLoading(false);
  const productParent = document.querySelector('#product');
  // productParent.innerHTML = '';

  res.forEach(({ title, price, description, image, id }) => {
    const parentDiv = document.createElement('div');
    parentDiv.className = 'card bg-base-100 shadow-xl';
    parentDiv.dataset.aos = 'fade-up';

    // title text short
    const shortTitle =
      title.length > 16 ? title.substring(0, 16) + '...' : title;

    // description text short
    const shortDescription =
      description.length > 90
        ? description.substring(0, 90) + '...'
        : description;

    parentDiv.innerHTML = ` <div class="card-body">
    <div   class="flex justify-between">
      <h2 class="card-title">${shortTitle}</h2>
      <button onclick="addToCart(this)"  data-id="${id}" data-title="${title}" data-price="${price}" data-image="${image}"  class="btn btn-neutral add-to-cart-btn">ADD TO CART</button>
    </div>
    <h4 class="flex items-center justify-between text-2xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-8">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
        />
      </svg>
        <div className="divider-neutral w-full">PRICE</div>

    <span class="text-blue-500">${price}</span>
    </h4>
    <p>${shortDescription}!</p>
  </div>
  <figure>
    <img
      class="h-[400px] w-full object-fill"
      src="${image}"
      alt="Shoes"
    />
  </figure>`;
    productParent.appendChild(parentDiv);
  });
}

productDisplay();

function addToCart(button) {
  const mouseClick = new Audio('./audio/click.mp3');
  cartItemList.textContent++;
  const title = button.getAttribute('data-title');
  const price = button.getAttribute('data-price');
  const image = button.getAttribute('data-image');
  const id = button.getAttribute('data-id');
  mouseClick.play();

  cartList.push({ title, price, image, quantity: 1, id });
  button.setAttribute('disabled', 'disabled');
  cartDisplay();
  calculatePrice();
  calculateTotalItem();
}

function cartDisplay() {
  const cartContainer = document.querySelector('#cart-list');

  cartContainer.innerHTML = '';

  cartList.forEach(({ title, price, image, quantity, id }, index) => {
    const cartItem = document.createElement('li');
    const divider = document.createElement('div');
    divider.className = 'divider';

    // title text short
    const shortTitle =
      title.length > 15 ? title.substring(0, 15) + '...' : title;

    cartItem.innerHTML = `<div class="flex items-start space-x-2">
                <img
                  src="${image}"
                  alt=""
                  srcset=""
                  class="size-20 object-fill rounded-md" />
                <div>
                  <h1 class="text-xl">${shortTitle}</h1>
                  <h4 class="flex space-x-5 items-center text-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                    <div className="divider-neutral w-full">PRICE</div>

                    <span class="text-blue-500">${price}</span>
                  </h4>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-5">
                  <button onclick="quantityMinus(${index})" class="btn btn-square btn-error btn-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6 text-white">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 12h14" />
                    </svg>
                  </button>
                  <span class="text-xl">${quantity}</span>
                  <button onclick="quantityPlus(${index})" class="btn btn-square btn-primary btn-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6 text-white">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
                <button onclick="removeCartItem(${id})"  class="btn btn-square btn-error btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6 text-white">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>`;

    cartContainer.appendChild(cartItem);
    cartContainer.appendChild(divider);
  });
}

function quantityPlus(index) {
  cartList[index].quantity += 1;
  cartDisplay();
  calculatePrice();
  calculateTotalItem();
}

function quantityMinus(index) {
  if (cartList[index].quantity > 1) {
    cartList[index].quantity -= 1;
  }

  cartDisplay();
  calculatePrice();
  calculateTotalItem();
}

function removeCartItem(id) {
  const trash = new Audio('./audio/trash.mp3');
  cartList = cartList.filter((item) => Number(item.id) !== id);
  trash.play();
  cartDisplay();
  calculatePrice();
  calculateTotalItem();
  cartItemList.textContent--;

  const button = document.querySelector(`[data-id="${id}"]`);
  if (button) {
    button.removeAttribute('disabled');
  }
}

function calculatePrice() {
  let totalPrice = 0;
  const totalPriceElement = document.querySelector('#total-price');
  cartList.forEach((item) => {
    const totalPriceCalculate = Number(item.price) * item.quantity;
    totalPrice = totalPrice + totalPriceCalculate;
  });
  totalPriceElement.textContent = totalPrice.toFixed(2);
}

function calculateTotalItem() {
  const totalItemElement = document.querySelector('#total-item');
  const totalItem = cartList.reduce((acc, { quantity }) => acc + quantity, 0);

  totalItemElement.textContent = totalItem;
}

function enableAllCartButtons() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach((button) => {
    button.disabled = false;
  });
}

function cartClear() {
  cartList.length = 0;
  cartDisplay();
  calculatePrice();
  calculateTotalItem();
  removeCartItem();
  cartItemList.textContent = 0;
  enableAllCartButtons();
}

function displayLoading(loading) {
  const loadingElement = document.getElementById('product');
  let loadingDiv = document.getElementById('loadingDiv');

  if (!loadingDiv) {
    loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingDiv';
    loadingDiv.className =
      'fixed top-0 left-0 w-full h-full flex justify-center items-center  backdrop-blur-md text-5xl font-bold';
    loadingDiv.textContent = 'LOADING...';
  }

  if (loading) {
    loadingElement.appendChild(loadingDiv);
  } else {
    loadingDiv.remove();
  }
}

function showToast() {
  let existingToast = document.getElementById('orderToast');
  if (existingToast) {
    existingToast.remove();
  }

  const toastDiv = document.createElement('div');
  toastDiv.id = 'orderToast';
  toastDiv.className =
    'fixed top-5 left-1/2 transform -translate-x-1/2 toast toast-top toast-center z-50';

  toastDiv.innerHTML = `
    <div class=" alert alert-success">
      <span class="text-xl">New order placed successfully!</span>
    </div>
    
  `;

  document.body.appendChild(toastDiv);

  setTimeout(() => {
    toastDiv.style.opacity = '0';
    toastDiv.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
      toastDiv.remove();
    }, 500);
  }, 3000);
}

document.getElementById('orderBtn').addEventListener('click', showToast);

function discountPrice() {
  const couponCodeValue = document.getElementById('coupon-code').value;
  const totalPrice = parseFloat(
    document.getElementById('total-price').innerText
  );

  let discount = 0;

  if (couponCodeValue === 'ostad10') {
    discount = totalPrice * 0.1;
  } else if (couponCodeValue === 'ostad5') {
    discount = totalPrice * 0.05;
  } else {
    console.log('Invalid code:', couponCodeValue);
    document.getElementById('discount-amount').innerText = 'Invalid code!';
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
    return;
  }

  const finalPrice = totalPrice - discount;

  document.getElementById('discount-amount').innerText = discount.toFixed(2);
  document.getElementById('total-price').innerText = finalPrice.toFixed(2);
}

document
  .getElementById('couponCodeBtn')
  .addEventListener('click', discountPrice);
