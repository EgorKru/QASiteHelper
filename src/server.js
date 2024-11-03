const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/execute', (req, res) => {
    const { code } = req.body;

    // Сохранение кода в файл
    const fileName = 'Main.java';
    fs.writeFile(fileName, code, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error writing file: ' + err.message });
        }

        // Выполнение кода
        exec(`javac ${fileName} && java Main`, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: stderr });
            }
            res.json({ output: stdout });
        });
    });
});

const PORT = 5001; // Порт для сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
