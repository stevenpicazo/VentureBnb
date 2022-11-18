// backend/routes/index.js
const express = require('express');

// backend/routes/index.js
// ...
const apiRouter = require('./api');
const router = express.Router();

router.use('/api', apiRouter);
// ...

// backend/routes/index.js
// ...
// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});
// ...

module.exports = router