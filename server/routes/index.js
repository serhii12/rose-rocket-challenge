const express = require('express');
const router = express.Router();
const legs = require('../data/legs');
const stops = require('../data/stops');
const driver = require('../data/driver');
const bonusDriver = require('../data/bonusDriver');

router.get('/legs', (req, res) => {
  res.json(legs);
});
router.get('/stops', (req, res) => {
  res.json(stops);
});
router.get('/driver', (req, res) => {
  res.json(driver);
});
router.get('/bonusdriver', (req, res) => {
  res.json(bonusDriver);
});
router.put('/driver', (req, res) => {
  // Check the data
  const {legToUpdate, progress} = req.body;
  driver.activeLegID = legToUpdate;
  driver.legProgress = progress;
  const wss = req.app.get('wss')
  wss.broadcast(driver);
  res.json(driver);
});
router.put('/bonusdriver', (req, res) => {
  console.log('bonusdriver req', req);
});

module.exports = router;