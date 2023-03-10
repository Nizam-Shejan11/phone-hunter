const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phones-container");
  phoneContainer.textContent = "";

  // show 10 phones
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  // display no phone found
  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  // display all phones
  phones.forEach((phone) => {
    // console.log(phone);
    const phoneDiv = document.createElement("div");
    phoneDiv.innerHTML = `
    <div class="card p-4">
        <img src=${phone.image} class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title"> ${phone.phone_name} </h5>
            <p class="card-text">
               This is a longer card with supporting text below as a natural
               lead-in to additional content. This content is a little bit
               longer.
            </p>
            <button onclick="loadPhoneDetails('${phone.slug}')" href="#"    class="btn btn-primary" 
            data-bs-toggle="modal"
            data-bs-target="#phoneDetailModal">Show Details
            </button>
        </div>
    </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  });

  // stop loader
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

// handle src btn clicked
document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(10);
});

// search input field click enter
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(10);
    }
  });

const toggleSpinner = (isLoading) => {
  const loderSection = document.getElementById("loader");
  if (isLoading) {
    loderSection.classList.remove("d-none");
  } else {
    loderSection.classList.add("d-none");
  }
};

// not the best way
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  console.log(phone);
  const modalTitle = document.getElementById("phoneDetailModalLabel");
  modalTitle.innerText = phone.name;

  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = `
      <img src=${phone?.image} alt="#">
      <h5> Brand: ${phone?.brand} </h5>
      <p> Release Date: ${
        phone?.releaseDate ? phone?.releaseDate : "No Release Date found"
      } </p>
      <p> Memory: ${phone?.mainFeatures.memory} </p>
  `;
};

loadPhones("apple");
