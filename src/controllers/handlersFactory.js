const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params; // get id from request
    const document = await Model.findByIdAndDelete(id); // find document and delete it
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404)); // if  no document exists return error
    }
    document.remove();
    res.status(200).send({ data: "Document deleted successfully" });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(new ApiError(`no document found for ${req.params.id}`, 404));
    }
    document.save();
    res.status(200).send({ data: document });
  });

exports.getOne = (Model, populationOpt) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);
    if (populationOpt) {
      query = query.populate(populationOpt);
    }
    const document = await query;
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });
exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
    const documents = await Model.find();

    res.status(200).json({ results: documents.length, data: documents });
  });
