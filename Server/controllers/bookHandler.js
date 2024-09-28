const { find} = require('./mongoActions')
const { spawn } = require('child_process');
const pythonPath = 'venv\\Scripts\\python';
const fs = require('fs');
const tmp = require('tmp');
const axios = require('axios');

exports.getData = (req, res)=> {
    const { filter, limit } = req.body;
    // console.log("FILTER", filter);
    
    find("books", filter, limit)
    .then(data => {
        res.json(data);
    })
    .catch(error=>{
        console.log(error);
        res.json(error);
    })
};

/*
exports.getBookRecommendation = (req, res) => {
    find("books", null, 12470) // Current amount of books: 12,470 in mongoDB
        .then(allBooks =>  {
            // Create a temporary file for the books data
            tmp.file(async (err, tmpFilePath, fd, cleanupCallback) => {
                if (err) {
                    return res.status(500).send('Error creating temp file');
                }

                // Write the books data to the temporary file
                fs.writeFileSync(tmpFilePath, JSON.stringify(allBooks));

                const { bookId } = req.body; // Retrieve the bookId from the request

                try {
                    console.log("here", bookId);
                    
                    const response = await axios.post(`http://localhost:5000/api/data/python/book/recommend`,
                        {
                            bookId,
                            tmpFilePath
                        }
                    );
                    console.log(response.data);
                    
                    res.json(response.data);
                } catch (err) {
                    return res.status(402).send('Error parsing Python output: ' + err.message);
                } finally {
                    cleanupCallback(); // Clean up the temp file
                }
            });
        })
        .catch(err => {
            res.status(401).send('Server error: ' + err.message);
        });
};
*/


tmp.setGracefulCleanup();
exports.getBookRecommendation = (req, res) => {
    find("books", null, 12470) // Current amount of books: 12,470 in mongoDB
        .then(allBooks => {
            // Create a temporary file for the books data
            tmp.file((err, tmpFilePath, fd, cleanupCallback) => {
                if (err) {
                    return res.status(500).send('Error creating temp file');
                }

                // Write the books data to the temporary file
                fs.writeFileSync(tmpFilePath, JSON.stringify(allBooks));

                const { bookId } = req.body; // Retrieve the bookId from the request

                // Spawn the Python process and pass the bookId and temp file path
                const pythonProcess = spawn(pythonPath, ['./machineLearning/booksML.py', bookId, tmpFilePath]);

                let data = ''; // Variable to capture the Python output

                // Capture data (output) from the Python process
                pythonProcess.stdout.on('data', (chunk) => {
                    data += chunk.toString();
                });

                // Handle Python process exit
                pythonProcess.on('close', (code) => {
                    if (code !== 0) {
                        cleanupCallback(); // Clean up the temp file
                        return res.status(500).send('Python script failed');
                    }

                    try {
                        const recommendations = JSON.parse(data); // Parse the output from Python
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.json(recommendations); // Send recommendations as JSON response
                    } catch (err) {
                        return res.status(500).send('Error parsing Python output: ' + err.message);
                    } finally {
                        cleanupCallback(); // Clean up the temp file
                    }
                });

                // Handle any errors from the Python process
                pythonProcess.stderr.on('data', (chunk) => {
                    console.error(`Python error: ${chunk.toString()}`);
                });
            });
        })
        .catch(err => {
            res.status(500).send('Server error: ' + err.message);
        });
};
