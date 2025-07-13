const axios = require("axios");
const userModel = require("../models/userModel");

exports.getNews = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ message: `User not found`});
    }

    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'in',
        q: user.preferences.join(","),
      },
      headers: {
        Authorization: `Bearer ${process.env.NEWSAPI_KEY}`,
      }
    });

		console.log(response.data);

    res.status(200).send({ 
      message: 'News fetched successfully',
      news: response.data 
    });
  } catch (err) {
    console.error(err);
    
    if (err.response) {
      return res.status(err.response.status).send({ 
        message: `News API error: ${err.response.data.message || err.message}` 
      });
    } else if (err.request) {
      return res.status(503).send({ message: 'Unable to connect to news service' });
    }
    
    return res.status(500).send({ message: err.message });
  }
};