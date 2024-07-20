const express = require('express');
const multer = require('multer');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuration du stockage avec Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Conserver le nom d'origine du fichier
    }
});

const upload = multer({ storage: storage });

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/install-hass', (req, res) => {
    res.send('Installation de la VM Hass commencée...');
    setTimeout(() => {
        console.log('Installation de la VM Hass terminée');
        io.emit('installationComplete', 'Installation de la VM Hass terminée');
    }, 5000);
});

app.post('/upload-iso', upload.single('iso'), (req, res) => {
    const file = req.file;
    if (file) {
        console.log(`Nom original du fichier : ${file.originalname}`);
        console.log(`Chemin du fichier : ${file.path}`);
        res.send('ISO uploadé : ' + file.originalname);
    } else {
        res.status(400).send('Aucun fichier reçu.');
    }
});

app.get('/manage-docker', (req, res) => {
    res.send('Interface de gestion Docker...');
});

app.get('/manage-smb', (req, res) => {
    res.send('Interface de gestion SMB...');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');
});
