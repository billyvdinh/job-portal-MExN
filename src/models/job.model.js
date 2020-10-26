const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { jobStatus } = require('../config/jobStatus');

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    applicants: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: jobStatus,
      default: jobStatus.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);

/**
 * @typedef Job
 */
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
