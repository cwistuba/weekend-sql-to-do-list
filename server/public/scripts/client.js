$(document).ready(init);

let items = [];
let completeItemID = 0;

function init() {
  $("#js-submit-doItem").on("submit", submitItem);
  $(".js-item-output").on("click", ".js-btn-remove", deleteItem);
  $(".js-item-output").on("click", ".js-btn-complete", completeItem);

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
  const itemId = event.target.dataset.id;

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

function completeItem() {
  completeItemID = event.target.dataset.id;
  const $itemRowElement = $(this).parent().parent();
  const currentItem = $itemRowElement.children(".js-item-name").text().trim();
  const currentStatus = "y";
  const completeItem = {
    doItem: currentItem,
    complete: currentStatus,
  };
  console.log(completeItem);
  console.log(completeItemID);

  updateCompleteItem(completeItemID, completeItem);
}

function updateCompleteItem(id, completeItem) {
  $.ajax({
    type: "PUT",
    url: `/doItem/${id}`,
    data: completeItem,
  })
    .then((response) => {
      getItem();
    })
    .catch((err) => {
      console.warn(err);
    });
}

function renderItem() {
  $(".js-item-output").empty();

  for (let doItem of items) {
    $(".js-item-output").append(`
    <tr>
    <td class="js-item-name">${doItem.item_name}</td>
    <td>
    <button class="js-btn-remove" data-id=${doItem.id}>Remove</button>
    </td>
    <td>
    <button class="js-btn-complete" data-id=${doItem.id}>Complete</button>
    </td>
    </tr>`);

    if (doItem.complete === "y") {
      const $el = $(".js-item-output").children().last();
      $el.addClass("completed");
    }
  }
}
