import express from "express";
import { Cloth } from "../models/clothModel.js";
const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.typeOfCloth ||
      !request.body.size ||
      !request.body.color ||
      !request.body.company
    ) {
      return response.status(300).send({ message: "Add all required fields" });
    }
    const newCloth = {
      company: request.body.company,
      name: request.body.name,
      typeOfCloth: request.body.typeOfCloth,
      size: request.body.size,
      color: request.body.color,
      gender: request.body.gender,
      des: request.body.des,
    };
    const cloth = await Cloth.create(newCloth);
    return response.status(202).send(cloth);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/", async (request, response) => {
  try {
    const { size } = request.query;
    const filter = size ? { size } : {};
    const clothes = await Cloth.find(filter);
    return response.status(200).json({
      count: clothes.length,
      data: clothes,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

router.get("/sizes", async (request, response) => {
  try {
    const sizes = await Cloth.distinct("size");
    return response.status(200).json(sizes);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const cloth = await Cloth.findById(id);

    return response.status(202).json(cloth);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.typeOfCloth ||
      !request.body.size ||
      !request.body.color ||
      !request.body.company
    ) {
      return response.status(300).send({ message: "Add all required fields" });
    }

    const { id } = request.params;

    const updatedCloth = await Cloth.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    if (!updatedCloth) {
      return response.status(404).json({ message: "Not Found" });
    }

    return response.status(202).send({ message: "Updated" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const deleteCloth = await Cloth.findByIdAndDelete(id);

    if (!deleteCloth) {
      return response.status(404).json({ message: "Not Found" });
    }

    return response.status(202).send({ message: "Delete" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
