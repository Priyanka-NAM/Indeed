let connection = require("./kafka/Connection");
const colors = require("colors");
const connectDB = require("../config/db");
connectDB();

const top_rated_companies = require("./services/AdminServices/getTopRatedCompaniesService");
const top_reviewed_companies = require("./services/AdminServices/getTopReviewedCompaniesService");
const get_all_companies = require("./services/AdminServices/getAllCompanies");
const top_accepted_rated_ceos = require("./services/AdminServices/getTopRatedCEOs");
const top_accepted_review_users = require("./services/AdminServices/getTopAcceptedReviewUsersService");
const post_salary = require("./services/CompanyServices/PostSalaryService");
const get_salary = require("./services/CompanyServices/GetSalaryService");
const post_review = require("./services/CompanyServices/PostReviewService");
const company_specific_review = require("./services/CompanyServices/CompanySpecificService");
const get_all_reviews = require("./services/CompanyServices/GetAllReviewService");
const company_review = require("./services/CompanyServices/CompanyReview");
const update_review = require("./services/CompanyServices/UpdateReviewService");
const update_helpful_count = require("./services/CompanyServices/UpdateHelpfulCountService");
const upload_photo = require("./services/CompanyServices/UploadPhotoService");
const upload_photo_status = require("./services/CompanyServices/UploadPhotoStatusService");
const user_review = require("./services/CompanyServices/UserReviewService");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  let consumer = connection.getConsumer(topic_name);
  let producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      let payloads = [
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
handleTopicRequest("top_rated_companies", top_rated_companies);
handleTopicRequest("top_reviewed_companies", top_reviewed_companies);
handleTopicRequest("get_all_companies", get_all_companies);
handleTopicRequest("top_accepted_rated_ceos", top_accepted_rated_ceos);
handleTopicRequest("top_accepted_review_users", top_accepted_review_users);
handleTopicRequest("post_salary", post_salary);
handleTopicRequest("get_salary", get_salary);
handleTopicRequest("post_review", post_review);
handleTopicRequest("company_specific_review", company_specific_review);
handleTopicRequest("get_all_reviews", get_all_reviews);
handleTopicRequest("company_review", company_review);
handleTopicRequest("update_review", update_review);
handleTopicRequest("update_helpful_count", update_helpful_count);
handleTopicRequest("upload_photo", upload_photo);
handleTopicRequest("upload_photo_status", upload_photo_status);
handleTopicRequest("user_review", user_review);
