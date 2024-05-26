import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
const app = express();
const port = 3000;
app.use(cors());

app.get('/readfile', (req, res) => {
	fs.readFile(path.join('cities_20000.csv'), 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).send('An error occurred while reading the file.');
		} else {
			res.send(data);
		}
	});
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
