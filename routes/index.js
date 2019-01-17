const express = require('express');
const router = express.Router();
const legs = require('../data/legs');
const stops = require('../data/stops');
const driver = require('../data/driver');
const bonusDriver = require('../data/bonusDriver');

// legStop1 = legID[0];
// legStop1 = legID[1];
// Lookup object with name which equals = legStop1,2
router.get('/api/legs', (req, res) => {
  res.json(legs);
});
router.get('/api/stops', (req, res) => {
  res.json(stops);
});

router.get('/api/driver', (req, res) => {
  res.json(driver);
});

router.get('/api/bonusdriver', (req, res) => {
  res.json(bonusDriver);
});

router.put('/api/driver', (req, res) => {
  console.log('driver req', req);
});

router.put('/api/bonusdriver', (req, res) => {
  console.log('bonusdriver req', req);
});

module.exports = router;