let connection =  require('./kafka/Connection');
const colors = require('colors')
const connectDB = require('../config/db')
connectDB()

const top_rated_companies = require('./services/AdminServices/getTopRatedCompaniesService')
const top_reviewed_companies = require('./services/AdminServices/getTopReviewedCompaniesService')
const get_all_companies = require('./services/AdminServices/getAllCompanies')
const top_accepted_rated_ceos = require('./services/AdminServices/getTopRatedCEOs')
const top_accepted_review_users = require('./services/AdminServices/getTopAcceptedReviewUsersService')
const update_user_saved_jobs = require('./services/UserServices/updateUserSavedJobsService')
const delete_user_saved_jobs = require('./services/UserServices/deleteUserSavedJobs')
const get_user_saved_jobs = require('./services/UserServices/getUserSavedJobs')
const get_user_applied_jobs = require('./services/UserServices/getUserAppliedJobs')
const get_user_reviews = require('./services/UserServices/getUserReviews')
const get_user_profile = require('./services/UserServices/getUserProfile')
const update_user_profile = require('./services/UserServices/updateUserProfile')
const fetch_all_jobs = require('./services/UserServices/fetchAllJobs')

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    let consumer = connection.getConsumer(topic_name);
    let producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            let payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                if (err) {
                    console.log(err)
                }
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest('top_rated_companies', top_rated_companies)
handleTopicRequest('top_reviewed_companies', top_reviewed_companies)
handleTopicRequest('get_all_companies', get_all_companies)
handleTopicRequest('top_accepted_rated_ceos', top_accepted_rated_ceos)
handleTopicRequest('top_accepted_review_users',top_accepted_review_users)
handleTopicRequest('update_user_saved_jobs', update_user_saved_jobs)
handleTopicRequest('delete_user_saved_jobs', delete_user_saved_jobs)
handleTopicRequest('get_user_saved_jobs', get_user_saved_jobs)
handleTopicRequest('get_user_applied_jobs', get_user_applied_jobs)
handleTopicRequest('get_user_reviews', get_user_reviews)
handleTopicRequest('get_user_profile', get_user_profile)
handleTopicRequest('update_user_profile', update_user_profile)
handleTopicRequest('fetch_all_jobs', fetch_all_jobs)
