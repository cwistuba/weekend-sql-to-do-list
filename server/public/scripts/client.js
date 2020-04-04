$(document).ready(init);

function init() {
  console.log("ToDo List Running");
  $("#js-submit-doItem").on("submit", submitItem);
}

function submitItem(event) {
  event.preventDefault();

  const doItemInput = $("#js-input-doItem").val();

  postDoItem(doItemInput);
}

function postDoItem(doItem) {
  const dataForServer = {
    doItem: doItem,
  };

  $.ajax({
    type: "POST",
    url: "/items",
    data: dataForServer,
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
    url: "/items",
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.warn(err);
    });
}

function clearItem() {
  $("#js-input-doItem").val("");
}
