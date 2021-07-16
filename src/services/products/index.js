import express from "express";
import { Router } from "express";
import { Product } from "../../db/models/index.js";
import sequelize from "sequelize";

const { Op } = sequelize;

const router = Router();

router
  .route("/")
  //   GET - PRODUCTS
  .get(async (req, res, next) => {
    try {
      const filters = [];
      const keys = Object.keys(req.query);

      keys.forEach((key) => {
        let element;

        if (key === "brand") {
          element = { [key]: { [Op.eq]: req.query[key] } };
        } else {
          element = { [key]: { [Op.substring]: req.query[key] } };
        }
        filters.push(element);
      });

      const data = await Product.findAll({
        where: filters.length > 0 ? { [Op.or]: filters } : {},
      });
      res.send(data);
    } catch (error) {
      next(error);
    }
  })
  //   CREATE - PRODUCT
  .post(async (req, res, next) => {
    try {
      const data = await Product.create(req.body);
      res.send(data);
    } catch (error) {
      next(error);
    }
  });

router
  .route("/:productId")
  //   GET -  SINGLE PRODUCT
  .get(async (req, res, next) => {
    try {
      const data = await Product.findByPk(req.params.productId);
      res.send(data);
    } catch (error) {
      next(error);
    }
  })
  //   UPDATE - PRODUCT
  .put(async (req, res, next) => {
    try {
      const data = await Product.update(req.body, {
        where: { id: req.params.productId },
        returning: true,
      });
      res.send(data[1][0]);
    } catch (error) {
      next(error);
    }
  })
  //   DELETE - PRODUCT
  .delete(async (req, res, next) => {
    try {
      const rowsCount = await Product.destroy({
        where: { id: req.params.productId },
      });
      if (rowsCount === 0) {
        res
          .status(404)
          .send(`Product with id: ${req.params.productId} Not Found!`);
      } else {
        res.send(`Deleted product: ${req.params.productId}`);
      }
    } catch (error) {
      next(error);
    }
  });

export default router;
