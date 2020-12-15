const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { applicationStatus, applicationActions } = require('../config/applicationStatus');

const applicationSchema = mongoose.Schema(
  {
    job: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Job',
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    attachments: {
      type: [{ type: Object }],
    },
    status: {
      type: String,
      enum: applicationStatus,
      default: applicationStatus.PENDING,
    },
    action: {
      type: String,
      enum: applicationActions,
      default: applicationActions.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
applicationSchema.plugin(toJSON);
applicationSchema.plugin(paginate);

/**
 * @typedef Application
 */
const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
