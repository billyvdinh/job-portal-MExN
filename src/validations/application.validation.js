const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { applicationStatus, applicationActions } = require('../config/applicationStatus');

const createApplication = {
  body: Joi.object().keys({
    job: Joi.string().required(),
    user: Joi.string().required(),
    description: Joi.string().required(),
  }),
  files: Joi.array().items(),
};

const getApplications = {
  query: Joi.object().keys({
    job: Joi.string(),
    user: Joi.string(),
    status: Joi.string().valid(...Object.values(applicationStatus)),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getApplication = {
  params: Joi.object().keys({
    applicationId: Joi.string().custom(objectId),
  }),
};

const updateApplication = {
  params: Joi.object().keys({
    applicationId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    description: Joi.string(),
    status: Joi.string().valid(...Object.values(applicationStatus)),
    action: Joi.string().valid(...Object.values(applicationActions)),
  }),
  files: Joi.array().items(),
};

const deleteApplication = {
  params: Joi.object().keys({
    applicationId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication,
};
