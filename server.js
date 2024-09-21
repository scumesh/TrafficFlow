const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS, JS)
app.use(express.static('public'));

// Set the views directory for EJS files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Route to serve the input form
app.get('/', (req, res) => {
  res.render('form');
});

// Route to handle form submission and display results
app.post('/find-route', (req, res) => {
  const start = req.body.start;
  const end = req.body.end;

  // Example graph data; in production, you can fetch this from a database
  const graph = {
    'A': { 'B': 2, 'C': 5 },
    'B': { 'A': 2, 'C': 3, 'D': 7 },
    'C': { 'A': 5, 'B': 3, 'D': 2 },
    'D': { 'B': 7, 'C': 2, 'E': 3 },
    'E': { 'D': 3 }
  };

  // Convert the graph to a JSON string and pass it as an argument to the Python script
  const graphJson = JSON.stringify(graph);

  // Call the Python script and pass start, end, and graph JSON as arguments
  exec(python3 app.py ${start} ${end} '${graphJson}', (error, stdout, stderr) => {
    if (error) {
      console.error(Error executing Python script: ${error.message});
      return res.status(500).send('Error occurred while calculating route.');
    }

    const result = JSON.parse(stdout);
    const pathCoordinates = result.path.map(node => {
      // Replace with actual coordinates for each node if available
      return [51.505, -0.09]; // Placeholder coordinates
    });

    res.render('results', { 
      path: result.path, 
      totalDistance: result.total_distance, 
      pathCoordinates 
    });
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(Server running at http://localhost:${port}/);
});