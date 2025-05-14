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
  const filterWrapper = document.querySelector('.filter-images');
  // trycatch
  try {
    const imageData = await getRequest(getProductsUrl);

    imageData.map((item) => {
      //구조분해 할당
      const { pr_img, pr_type } = item;
      const itemElement = `
      <div class="filter-image" data-filter="${pr_type}">
        <span><img src="${pr_img}" alt="" /></span>
      </div>
      `;
      filterWrapper.insertAdjacentHTML('beforeend', itemElement);
    });
    const filterImages = document.querySelectorAll('.filter-image');
    getItemElements(filterImages);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

getProducts();

// 버튼 생성 및 버튼 클릭 기능

function getItemElements(imgItems) {
  imgItems.forEach((item) => {
    item.addEventListener('click', showLightBox);
  });

  const btnChars = ['all', 'bag', 'shoe', 'watch', 'camera', 'headphone'];
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

    const selectBtn = this.getAttribute('data-filter');
    imgItems.forEach((imgItem) => {
      imgItem.classList.add('hide');
      const selectedImageType = imgItem.getAttribute('data-filter');
      setTimeout(() => {
        if (selectedImageType === selectBtn || selectBtn === 'all') {
          imgItem.classList.remove('hide');
          imgItem.classList.add('show');
        } else {
          imgItem.classList.remove('show');
          imgItem.classList.add('hide');
        }
      }, 100);
    });
  }

  // button을 클릭 했을 때 activateFilter 함수 실행
  btnsElements.forEach((btn) => {
    btn.addEventListener('click', activateFilter);
  });
}

const lightBox = document.querySelector('.light-box');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close');

// Light Box 활성화 기능
function showLightBox() {
  const selectedImage = this.querySelector('img').src;
  // getAttribute
  // <a href="http://abc/com"></a>
  // getAttribute("href") : http://abc/com
  //getAttribute("href", "http://abc/com") : <a href="http://abc/com"></a>
  const categoryName = this.getAttribute('data-filter');

  const lightBoxImage = document.querySelector('.light-box-image img');
  const lightBoxCategoty = document.querySelector('.title p');

  lightBoxImage.setAttribute('src', selectedImage);
  lightBoxCategoty.textContent = categoryName;

  lightBox.style.display = 'block';
  overlay.style.display = 'block';
}

function closeLightBox() {
  lightBox.style.display = 'none';
  overlay.style.display = 'none';
}

[overlay, closeBtn].forEach((elmt) => {
  elmt.addEventListener('click', closeLightBox);
});
