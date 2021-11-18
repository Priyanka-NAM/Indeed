let connection = new require("./kafka/Connection");
const db = require("./config/db");
db()

let GetReviewService = require("./services/GetReviewService.js");


function handleTopicRequest(topic_name,fname) {
  let consumer = connection.getConsumer(topic_name)
  let producer = connection.getProducer()
  console.log('server is running ')
  consumer.on('message', function (message) {
      console.log('message received for ' + topic_name +" ", fname)
      console.log(JSON.stringify(message.value))
      let data = JSON.parse(message.value)
      var response_times = {}
      response_times[data.correlationId] = {
        "start_time": Date.now()
        }
      console.log(`${response_times[data.correlationId]["start_time"]} handling ${data.correlationId}`)   
      fname.handle_request(data.data, function(err,res){
          if (response_times[data.correlationId]){
            console.log(`${Date.now()} completed ${data.correlationId}`) 
            let time_taken = Date.now() - response_times[data.correlationId]["start_time"]
            console.log(`${data.correlationId} took ${time_taken}`)
            //console.log(res)
            delete response_times[data.correlationId]
          }

          let payloads = [
                  { 
                      topic: data.replyTo, 
                      messages:JSON.stringify({
                          correlationId:data.correlationId,
                          data : res
                      }),
                      partition : 0,
                  }
              ]
          producer.send(payloads, function(err, data){
              if(err) console.log("error sending response: "+err)
              console.log(data)
          });
          return;
      });
      
  });
}

handleTopicRequest("get-reviews", GetReviewService)