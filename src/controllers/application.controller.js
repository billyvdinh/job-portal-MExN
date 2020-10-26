const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { applicationService } = require('../services');

const createApplication = catchAsync(async (req, res) => {
  const attachments = req.files.map((f) => {
    return { filename: f.filename, path: `uploads/${f.filename}` };
  });

  const body = {
    ...req.body,
    attachments,
  };
  const application = await applicationService.createApplication(body);
  res.status(httpStatus.CREATED).send(application);
});

const getApplications = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['job', 'user', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  // Only show own applications to normal users
  if (req.user.role === 'user') {
    filter.user = req.user.id;
  }
  const result = await applicationService.queryApplications(filter, options);
  res.send(result);
});

const getApplication = catchAsync(async (req, res) => {
  const application = await applicationService.getApplicationById(req.params.applicationId);
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }
  res.send(application);
});

const updateApplication = catchAsync(async (req, res) => {
  const body = { ...req.body };

  if (req.files && req.files.length > 0) {
    const attachments = req.files.map((f) => {
      return { filename: f.filename, path: `uploads/${f.filename}` };
    });
    body.attachments = attachments;
  }

  const application = await applicationService.updateApplicationById(req.params.applicationId, body);

  res.send(application);
});

const deleteApplication = catchAsync(async (req, res) => {
  await applicationService.deleteApplicationById(req.params.applicationId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication,
};
