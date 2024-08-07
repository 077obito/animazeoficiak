const express = require('express');
const cors = require('cors');
const cheerio = require('cheerio'); // Instale com: npm install cheerio
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/animes', async (req, res) => {
  try {
    const url = 'https://www.animefire.plus/lancamentos/todos'; 

    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html); 

    const animes = [];
    $('div.divArticleLancamentos').each((index, element) => {
      const link = $(element).find('a').attr('href');
      const capa = $(element).find('img').attr('data-src');
      const titulo = $(element).find('h3.animeTitle').text().trim(); 

      animes.push({ titulo, link, capa });
    });

    res.json(animes);
  } catch (error) {
    console.error('Erro ao obter episódios:', error);
    res.status(500).json({ message: 'Erro ao obter os episódios.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor API de Animes rodando na porta ${port}`);
});
