import dayjs from 'dayjs';
import { api } from '../constants.js';
import { generateTMDBParams } from '../util.js';

export async function getActorById(req, res) {
  try {
    const response = await api
      .get(
        `/person/${req.params.id}/movie_credits`,
        generateTMDBParams(req.params.id.toString()),
      )
      .then((r) => {
        return r.data.cast;
      });
    res.status(200).json({ response });
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }
}

export async function getActorByName(req, res) {
  try {
    const response = await api
      .get('/search/person', generateTMDBParams(req.params.name))
      .then((r) => {
        return r.data.results;
      });
    res.status(200).json({ response });
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }
}

export async function getActorImage(req, res) {
  try {
    const response = await api
      .get(
        `/person/${req.params.id}/images`,
        generateTMDBParams(req.params.id.toString()),
      )
      .then((res) => {
        return res.data.profiles[0].file_path;
      });
    res.status(200).json({ response });
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }
}

export async function getMovieById(req, res) {
  try {
    const response = await api
      .get(
        `/movie/${req.params.id}/credits`,
        generateTMDBParams(req.params.id.toString()),
      )
      .then((res) => {
        return res.data.cast;
      });
    res.status(200).json({ response });
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }
}

export async function getMovieByName(req, res) {
  try {
    const now = dayjs(Date.now()).format('YYYY-MM-DD');
    const tempResponse = await api
      .get(`/search/movie`, generateTMDBParams(req.params.name))
      .then((res) => {
        return res.data.results;
      });
    const response = tempResponse.filter((movie) => {
      if (movie.release_date !== '') {
        return !dayjs(movie.release_date).isAfter(now);
      } else return;
    });
    res.status(200).json({ response });
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }
}
