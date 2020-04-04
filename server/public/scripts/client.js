$(document).ready(init);

let items = [];

function init() {
  $("#js-submit-doItem").on("submit", submitItem);

  getItems();
}

function submitItem(event) {
  event.preventDefault();

  const doItemInput = {
    doItem: $("#js-input-doItem").val(),
  };

  postDoItem(doItemInput);
}

function postDoItem(doItem) {
  $.ajax({
    type: "POST",
    url: "/doItem",
    data: doItem,
  })
    .then((response) => {
      getItems();
    })
    .catch((err) => {
      console.warn(err);
    });
}

function getItems() {
  $.ajax({
    type: "GET",
    url: "/doItem",
  })
    .then((response) => {
      items = response;
      renderItem(items);
    })
    .catch((err) => {
      console.warn(err);
    });
}

function clearItem() {
  $("#js-input-doItem").val("");
}

function renderItem() {
  $(".js-item-output").empty();
  for (let doItem of items) {
    $(".js-item-output").append(`<li>${doItem.item_name}</li>`);
  }
}
