const express = require("express");
const actionModel = require("../data/helpers/actionModel");

const router = express.Router();

router.post("/", (req, res) => {
  const action = req.body;
  actionModel
    .insert(action)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The action needs a Name and Description."
      });
    });
});

router.get("/", (req, res) => {
    actionModel
    .get()
    .then(actions => {
      res.json(actions);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The action information could not be retrieved."
      });
    });
});

router.get("/:id", (req, res) => {
  const actionId = req.params.id;
  actionModel
    .get(actionId)
    .then(action => {
      if (action) {
        actionModel.get(actionId).then(findAction => {
          res.status(201).json(findAction);
        });
      } else {
        res.status(404).json({
          error: err,
          message: "The action with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "Error retrieving the action"
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  actionModel
    .remove(id)
    .then(deleted => {
      if (deleted) {
        actionModel.remove(id).then(removeAction => {
          res.status(201).json(removeAction);
        });
      } else {
        res.status(500).json({
          error: err,
          mesage: "The action could not be removed"
        });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({
          error: err,
          message: "The action with the specified ID does not exist."
        });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  actionModel
    .update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(400).json({
          message: "Please provide name and description for the action."
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({
          error: err,
          message: "The action information could not be modified."
        });
    });
});

module.exports = router;