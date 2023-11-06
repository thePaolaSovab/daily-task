const express = require('express');
const app = express();
const settings = require('./settings');

app.use(express.static(settings.staticContentPath));
app.use(express.json());

console.clear();

// routes
const taskRoutes = require('./src/routes/task-router');
const responsibleRoutes = require('./src/routes/responsible-router');

app.use('/tareas', taskRoutes);
app.use('/responsible', responsibleRoutes);

app.get('*', (req, res) => {
    res.redirect('/tareas/list');
});

app.listen(8000, () => {
    console.log(`Server on port 8000`);
})