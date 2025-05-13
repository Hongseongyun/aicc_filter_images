// Common GET Request

async function getRequest(url) {
  return await fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error('Error: ' + response.status);
    }
    return response.json();
  });
}

async function getProducts() {
  const getProductsUrl =
    'https://www.dabipyeung.com/baexang_back/product/get_products?cate=dp&limit=8&sort=new';
  // trycatch
  try {
    const imageData = await getRequest(getProductsUrl);
    console.log(imageData);
    console.log(imageData[0].pr_img, imageData[0].pr_type);
    //구조분해 할당
    const { pr_img, pr_type } = imageData[0];
    console.log(pr_img);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

getProducts();

// 버튼 생성 및 버튼 클릭 기능

function getItemElements() {
  const btnChars = ['all', 'bag', 'shoes', 'watch', 'camera', 'headphone'];
  const btnsWrapper = document.querySelector('.filter-btns');

  btnChars.map((btnChar) => {
    const modifiedChar = btnChar.charAt(0).toUpperCase() + btnChar.slice(1);
    const buttons = `<button class="filter-btn" data-filter = "${btnChar}">${modifiedChar}</button>`;

    btnsWrapper.insertAdjacentHTML('beforeend', buttons);
  });

  const btnsElements = document.querySelectorAll('.filter-btn');
  btnsElements[0].classList.add('active');

  function activateFilter() {
    btnsElements.forEach((btn) => {
      btn.classList.remove('active');
    });
    this.classList.add('active');
  }

  // button을 클릭 했을 때 activateFilter 함수 실행
  btnsElements.forEach((btn) => {
    btn.addEventListener('click', activateFilter);
  });
}

getItemElements();
