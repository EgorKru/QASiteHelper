const express = require('express');
const { exec } = require('child_process');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/execute', (req, res) => {
    const { code } = req.body;

    // Сохранение кода в файл
    const fileName = 'Main.java';
    require('fs').writeFileSync(fileName, code);

    // Выполнение кода
    exec(`javac ${fileName} && java Main`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr });
        }
        res.json({ output: stdout });
    });
});

const PORT = 5001; // Изменено на 5001
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
