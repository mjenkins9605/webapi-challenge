const express = require("express");
const projectModel = require("../data/helpers/projectModel");

const router = express.Router();

router.post("/", (req, res) => {
  const project = req.body;
  projectModel
    .insert(project)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The project needs a Name and Description."
      });
    });
});

router.get("/", (req, res) => {
  projectModel
    .get()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The project information could not be retrieved."
      });
    });
});

router.get("/:id", (req, res) => {
  const projectId = req.params.id;
  projectModel
    .get(projectId)
    .then(project => {
      if (project) {
        projectModel.get(projectId).then(findProject => {
          res.status(201).json(findProject);
        });
      } else {
        res.status(404).json({
          error: err,
          message: "The project with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "Error retrieving the project"
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  projectModel
    .remove(id)
    .then(deleted => {
      if (deleted) {
        projectModel.remove(id).then(removeProject => {
          res.status(201).json(removeProject);
        });
      } else {
        res.status(500).json({
          error: err,
          mesage: "The project could not be removed"
        });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({
          error: err,
          message: "The project with the specified ID does not exist."
        });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  projectModel
    .update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(400).json({
          message: "Please provide name and description for the project."
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({
          error: err,
          message: "The project information could not be modified."
        });
    });
});

module.exports = router;