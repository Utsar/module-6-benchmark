import express from "express";
import { Router } from "express";
import { Review } from "../../db/models/index.js";
import sequelize from "sequelize";

const router = Router();

router
  .route("/:productId/reviews")
  //   GET - REVIEWS OF PRODUCT
  .get(async (req, res, next) => {
    try {
      const data = await Review.findAll({
        where: { productId: req.params.productId },
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  //   CREATE -  NEW REVIEW
  .post(async (req, res, next) => {
    try {
      const data = await Review.create({
        ...req.body,
        productId: req.params.productId,
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router
  .route("/:productId/reviews/:reviewId")
  //   GET - SINGLE REVIEW
  .get(async (req, res, next) => {
    try {
      const { productId, reviewId } = req.params;
      const data = await Review.findByPk(reviewId);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  //   UPDATE - REVIEW
  .put(async (req, res, next) => {
    try {
      const data = await Review.update(req.body, {
        where: { id: req.params.reviewId },
        returning: true,
      });

      res.send(data[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  //   DELETE - REVIEW
  .delete(async (req, res, next) => {
    try {
      const rowsCount = await Review.destroy({
        where: { id: req.params.reviewId },
      });

      if (rowsCount === 0) {
        res
          .status(404)
          .send(`Review with id of: ${req.params.reviewId} Not Found!`);
      } else {
        res.send(`Deleted review with id of: ${req.params.reviewId}`);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default router;
