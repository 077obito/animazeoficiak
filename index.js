const express = require('express');
const cors = require('cors'); // Para permitir requisições de diferentes origens

const app = express();
app.use(cors());

// Dados mockados (substitua por dados reais do seu banco de dados)
const animes = [
    {
        nome: 'Attack on Titan',
        capa: 'https://via.placeholder.com/200x300', // URL da capa do anime
        banner: 'https://via.placeholder.com/600x200', // URL do banner do anime
        id_tmdb: 13060, // ID do anime no TMDb
        sobre: 'Em um mundo onde a humanidade vive dentro de muralhas para se proteger de titãs gigantes, Eren Yeager jura vingança contra as criaturas que destruíram sua vida.',
        link: 'https://www.attackontitan.tv/'
    },
    {
        nome: 'Demon Slayer: Kimetsu no Yaiba',
        capa: 'https://via.placeholder.com/200x300', // URL da capa do anime
        banner: 'https://via.placeholder.com/600x200', // URL do banner do anime
        id_tmdb: 79160, // ID do anime no TMDb
        sobre: 'Tanjiro Kamado, um jovem que vende carvão, se torna um caçador de demônios após sua família ser assassinada e sua irmã transformada em um demônio.',
        link: 'https://kimetsu.com/'
    },
    // Adicione mais animes aqui...
];

// Rota para obter todos os animes
app.get('/animes', (req, res) => {
    res.json(animes);
});

// Rota para obter um anime específico pelo ID
app.get('/animes/:id', (req, res) => {
    const animeId = req.params.id;
    const anime = animes.find(a => a.id_tmdb === parseInt(animeId)); // Convertendo o ID para inteiro

    if (anime) {
        res.json(anime);
    } else {
        res.status(404).json({ message: 'Anime não encontrado.' });
    }
});

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor API de Animes rodando na porta ${port}`);
});