$(document).ready(init);

let items = [];

function init() {
  $("#js-submit-doItem").on("submit", submitItem);
  $(".js-item-output").on("click", ".js-btn-remove", deleteItem);

  getItem();
}

function submitItem(event) {
  event.preventDefault();

  const doItemInput = {
    doItem: $("#js-input-doItem").val(),
    complete: "n",
  };

  postDoItem(doItemInput);
  clearItem();
}

function postDoItem(doItem) {
  $.ajax({
    type: "POST",
    url: "/doItem",
    data: doItem,
  })
    .then((response) => {
      getItem();
    })
    .catch((err) => {
      console.warn(err);
    });
}

function getItem() {
  $.ajax({
    type: "GET",
    url: "/doItem",
  })
    .then((response) => {
      items = response;
      renderItem();
    })
    .catch((err) => {
      console.warn(err);
    });
}

function deleteItem() {
  const itemId = $(this).parent().data("id");

  $.ajax({
    type: "DELETE",
    url: `/doItem/${itemId}`,
  })
    .then((response) => {
      getItem();
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
    //     let completeItem = ``;
    // if (doItem.complete === true) {
    //     completeItem `<button></button>`
    // }

    $(".js-item-output").append(`
    <div data-id=${doItem.id}>
    <span>${doItem.item_name}</span>
    <button class="js-btn-remove">Remove</button>
    <button class="js-btn-complete">Complete</button>
    </div>`);

    if (doItem.complete === true) {
      const $el = $(".js-item-output").children().last();
      $el.addClass("completed");
    }
  }
}
