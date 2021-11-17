var connection = new require("./kafka/Connection");
var db = require("./config/db");

//topics files
//var signin = require('./services/signin.js');
var GetReviewService = require("./services/GetReviewService.js");

dbconnect();
async function dbconnect() {
  await db();
  handleTopicRequest("get_reviews", GetReviewService);
}

function handleTopicRequest(topic_name, fname) {
  console.log("IN handle topic");
  //var topic_name = 'root_topic';

  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);

    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("customer_signin", CustomerSignInService);
module.exports = dbconnect;
