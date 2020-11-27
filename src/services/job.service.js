const httpStatus = require('http-status');
const { Job } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a job
 * @param {Object} jobBody
 * @returns {Promise<import('swagger-ui-express').JsonObject>}
 */
const createJob = async (jobBody) => {
  return Job.create(jobBody);
};

/**
 * Query for jobs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryJobs = async (filter, options) => {
  const jobs = await Job.paginate(filter, options);
  return jobs;
};

/**
 * Get job by id
 * @param {ObjectId} id
 * @returns {Promise<Job>}
 */
const getJobById = async (id) => {
  return Job.findById(id);
};

/**
 * Update job by id
 * @param {ObjectId} jobId
 * @param {Object} updateBody
 * @returns {Promise<Job>}
 */
const updateJobById = async (jobId, updateBody) => {
  const job = await getJobById(jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }

  Object.assign(job, updateBody);
  await job.save();
  return job;
};

/**
 * Delete job by id
 * @param {ObjectId} jobId
 * @returns {Promise<Job>}
 */
const deleteJobById = async (jobId) => {
  const job = await getJobById(jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  await job.remove();
  return job;
};

module.exports = {
  createJob,
  queryJobs,
  getJobById,
  updateJobById,
  deleteJobById,
};
