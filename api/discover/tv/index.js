var tmdbUrl = "https://api.themoviedb.org"

const axios = require('axios');
const url = require('url');
const querystring = require('querystring');

const apiKey = process.env.TMDB_API_KEY;
// const apiKey = process.env.TMDB_API_KEY;

module.exports = async (req, res) => {
  const { url: requestUrl, body } = req;
  const parsedUrl = url.parse(requestUrl);
  const query = querystring.parse(parsedUrl.query);
  if(!isObjectEmpty(body))
  {
      tmdbUrl = `https://api.themoviedb.org/3/discover/${body.type}\
?include_adult=${body.include_adult}\
&language=${body.language}\
&page=${body.page}\
&sort_by=${body.sort_by}\
&api_key=${apiKey}`;
  }else if(!isObjectEmpty(query)){
      tmdbUrl = `https://api.themoviedb.org/3/discover/${query.type}\
?include_adult=${query.include_adult}\
&language=${query.language}\
&page=${query.page}\
&sort_by=${query.sort_by}\
&api_key=${apiKey}`;
  }else{
      tmdbUrl=`https://api.themoviedb.org/3/discover?api_key=${apiKey}`
  }
  try {
    const response = await axios.get(tmdbUrl);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(`Error fetching data from TMDb API
      tmdbUrl:${tmdbUrl}
      body:${body}
      query:${query}
      is Body empty:${isObjectEmpty(body)}
      is query empty:${isObjectEmpty(query)}
      `);
  }
};

function isObjectEmpty(obj) {
  if(typeof obj === "undefined"){
    return true;
  }
  return false;
}