let kafka = require('kafka-node')

function ConnectionProvider() {
    this.getConsumer = function(topic_name) {
        this.client = new kafka.KafkaClient("localhost:2181")
        this.kafkaConsumerConnection = new kafka.Consumer(this.client,[ { topic: topic_name, partition: 0 }],{fetchMaxBytes: 2000000000});
        this.client.on('ready', function () { console.log('client ready!') })
        return this.kafkaConsumerConnection;
    }

    this.getProducer = function() {
        if (!this.kafkaProducerConnection) {
            this.client = new kafka.KafkaClient("localhost:2181")
            var HighLevelProducer = kafka.HighLevelProducer
            this.kafkaProducerConnection = new HighLevelProducer(this.client, {fetchMaxBytes: 2000000000})
            console.log('producer ready')
        }
        return this.kafkaProducerConnection
    }
}

exports = module.exports = new ConnectionProvider
