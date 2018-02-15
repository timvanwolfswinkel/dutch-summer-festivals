import axios from "axios";

/**
 * Fetch a list of festivals
 * @return {Promise<Object>} List of festivals
 * @see {@link https://cdn.contentful.com}
 */
export default function fetchFestivals() {
  return axios.get(
    `${process.env.API_URL}/spaces/${
      process.env.SPACE_ID
    }/entries?access_token=${process.env.ACCESS_TOKEN}&content_type=festival`
  );
}
