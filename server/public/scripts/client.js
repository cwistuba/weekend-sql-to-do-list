$(document).ready(init);

function init() {
  console.log("ToDo List Running");
  $("#js-submit-doItem").on("submit", submitItem);
}

function submitItem(event) {
  event.preventDefault();

  const doItemInput = $("#js-input-doItem").val();

  console.log(doItemInput);
}

function postDoItem(doItem) {
  const dataForServer = {
    doItem: doItem,
  };

  $.ajax({
    type: "POST",
    url: "/todoitems",
    data: dataForServer,
  });
}

function clearItem() {
  $("#js-input-doItem").val("");
}
