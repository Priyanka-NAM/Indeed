const mongoose = require("mongoose");
const jobsSchema = mongoose.Schema({
  jobId: {
    type: Number,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  employerID: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  isRemote: {
    type: Boolean,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  jobDescription: {
    compensation: {
      type: Number,
      required: true,
    },
    responsibilites: {
      type: String,
      required: true,
    },
    requirement: {
      type: String,
      required: true,
    },
    moreInfo: {
      type: Number,
      required: true,
    },
  },
  jobLocation: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

const Jobs = mongoose.model("Jobs", jobsSchema);
module.exports = Jobs;
