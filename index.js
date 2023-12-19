const express = require("express");
const app = express();

// Middleware to verify working hours
const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hour = date.getHours();

  if (dayOfWeek > 0 && dayOfWeek < 6 && hour >= 9 && hour < 17) {
    // Within working hours, continue to next middleware or route
    next();
  } else {
    res.send(
      "Sorry, the website is only available during working hours (Monday to Friday, 9am to 5pm)."
    );
  }
};

// Middleware to serve static files from the public directory (CSS)
app.use(express.static("public"));

// Set the view engine to EJS (optional - use any template engine you prefer)
app.set("view engine", "ejs");

// Routes
app.get("/", workingHoursMiddleware, (req, res) => {
  res.render("home");
});

app.get("/services", workingHoursMiddleware, (req, res) => {
  res.render("services");
});

app.get("/contact", workingHoursMiddleware, (req, res) => {
  res.render("contact");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
