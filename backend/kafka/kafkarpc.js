let crypto = require('crypto')
let conn = require('./Connection')
let TIMEOUT=12000000; //time to wait for response in ms
let self;

exports = module.exports =  KafkaRPC;

function KafkaRPC(){
    self = this
    this.connection = conn
    this.requests = {} //hash to store request in wait for response
    this.response_queue = false //placeholder for the future queue
    this.producer = this.connection.getProducer()
    this.request_times = {}
}

KafkaRPC.prototype.makeRequest = function(topic_name, content, callback){
    self = this;
    let correlationId = crypto.randomBytes(16).toString('hex')
    self.request_times[correlationId] = {"start_time": Date.now()}
    console.log(`${Date.now()} got request for ${correlationId}`)
    //create a timeout for what should happen if we don't get a response
    let tId = setTimeout(function(corr_id){
        //if this ever gets called we didn't get a response in a
        //timely fashion
        console.log('timeout')
        callback(new Error("timeout " + corr_id))
        //delete the entry from hash
        delete self.requests[corr_id]
        delete self.request_times[correlationId]
    }, TIMEOUT, correlationId)

    //create a request entry to store in a hash
    let entry = {
        callback:callback,
        timeout: tId //the id for the timeout so we can clear it
    }

    //put the entry in the hash so we can match the response later
    self.requests[correlationId]=entry
    //make sure we have a response topic
    self.setupResponseQueue(self.producer,topic_name,function(){
        let payloads = [
            { topic: topic_name, messages: JSON.stringify({
                correlationId:correlationId,
                replyTo:'response_topic',
                data:content}),
                partition:0}
        ]
        console.log(payloads)
        self.producer.send(payloads, function(err, data){
            if(err)
                console.log(err);
        })
    })
}


KafkaRPC.prototype.setupResponseQueue = function(producer,topic_name, next){
    //don't mess around if we have a queue
    if(this.response_queue) return next()

    self = this

    //subscribe to messages
    let consumer = self.connection.getConsumer('response_topic')
    consumer.on('message', function (message) {
        let data = JSON.parse(message.value)
        console.log(`${Date.now()} Got response for ${data.correlationId}`)
        //get the correlationId
        let correlationId = data.correlationId
        //is it a response to a pending request
        if(correlationId in self.requests){
            let time_taken = Date.now() - self.request_times[data.correlationId]['start_time']
            console.log(`${data.correlationId} took ${time_taken/1000} sec`)
            //retrieve the request entry
            let entry = self.requests[correlationId]
            //make sure we don't timeout by clearing it
            clearTimeout(entry.timeout)
            //delete the entry from hash
            delete self.requests[correlationId]
            delete self.request_times[correlationId]
            //callback, no err
            entry.callback(null, data.data)
        }
    });
    self.response_queue = true
    return next()
}
