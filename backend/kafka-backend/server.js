let connection =  require('./kafka/Connection');
const colors = require('colors')
const connectDB = require('../config/db')
connectDB()

const top_rated_companies = require('./services/AdminServices/getTopRatedCompaniesService')
const top_reviewed_companies = require('./services/AdminServices/getTopReviewedCompaniesService')
const get_all_companies = require('./services/AdminServices/getAllCompanies')
const top_accepted_rated_ceos = require('./services/AdminServices/getTopRatedCEOs')
const top_accepted_review_users = require('./services/AdminServices/getTopAcceptedReviewUsersService')

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
