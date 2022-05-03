const axios = require('axios');

export async function getQuestions(number) {
    let result = await axios
    .get('https://quizapi.io/api/v1/questions?apiKey=m3ge9S2ruYaWdXQT5w8wxx1LAL29iyT5ZsaljYSO&category=sql&difficulty=Easy&limit='+number)
    .catch(error => {
      console.log(error)
    })

    return result.data
    // axios.get(`https://quizapi.io/api/v1/questions?apiKey=m3ge9S2ruYaWdXQT5w8wxx1LAL29iyT5ZsaljYSO&category=sql&difficulty=Easy&limit=10`)
    //     .then(response => {
    //     // JSON responses are automatically parsed.
    //     this.posts = response.data
    //     console.log(response.data);
    //     })
    //     .catch(e => {
    //     this.errors.push(e)
    //     })
    //     .finally(() => this.loading = false)
}