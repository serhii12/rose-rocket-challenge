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
  const {legToUpdate, progress} = req.body;
  const check = legs.find(el => el.legID === legToUpdate);
  if (!legToUpdate || !progress || !check) {
    res.status(400).json({ error: 'invalid request: no data in PUT body or invalid data format' });
    return;
  }
  driver.activeLegID = legToUpdate;
  driver.legProgress = progress;
  const wss = req.app.get('wss')
  wss.broadcast(driver);
  res.json(driver);
});
router.put('/bonusdriver', (req, res) => {
  const {x, y} = req.body;
  if (!x || !y) {
    res.status(400).json({ error: 'invalid request: no data in PUT body or invalid data format' });
    return;
  }
  bonusDriver.x = x;
  bonusDriver.y = y;
  const wss = req.app.get('wss')
  wss.broadcast(bonusDriver);
  res.json(bonusDriver);
});

module.exports = router;