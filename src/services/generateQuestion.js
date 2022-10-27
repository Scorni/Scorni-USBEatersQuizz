const axios = require('axios');
export async function getQuestions(number,category,tag,difficulty) {
  
  let request = "https://quizapi.io/api/v1/questions?apiKey="+ process.env.VUE_APP_API_KEY;
  if(category){
    request += "&category=" + category;
  }
  if(tag){
    request += "&tags=" + tag;

  }
  if(difficulty){
    request += "&difficulty=" + difficulty;
  }
  if(number){
    request += "&limit=" + number
  }
  const result = await axios
  .get(request)
  .then((res) => {
    return res.data;
  })
  .catch(error => {
    console.log(error)
  })
  return result
}