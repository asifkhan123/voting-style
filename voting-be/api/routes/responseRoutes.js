const { route } = require("express/lib/application");

//determine how an application responds to client requests
module.exports = function (app) {
  const responses = require("../controllers/responseController");

  //response Routes
  app
    .route("/results")
    .get(responses.list_all_responses)
    .post(responses.create_a_response);
};
