const axios = require('axios');
const inquirer = require('inquirer');

const app = {
  getFoodTrucks: (pageNum, choice) => {
    const offset = 10 * (pageNum - 1);
    const timeNow = new Date().getHours();
    const newTime = `${timeNow}:00`;

    return axios
      .get(`https://data.sfgov.org/resource/bbb8-hzi6.json?$limit=10&$offset=${offset}&$where=start24<'${newTime}' AND end24>'${newTime}'`)
      .then(res => {
        if (res.status === 200) {
          let foodTrucks = res.data;

          foodTrucks.sort((a, b) => {
            if (a.applicant < b.applicant) return -1;
            if (a.applicant > b.applicant) return 1; 
            return 0;
          });

          return foodTrucks.map(x => ({
            name: x.applicant,
            address: x.location,
            open: x.start24,
            close: x.end24
          }));
        }
      })
      .then(data => console.log(data))
      .then(() => {
        return inquirer.prompt([{
            name: 'Question',
            message: 'Would you like to continue and view the next 10 food trucks?',
            type: 'input'
          }])
          .then((answers) => {
            return answers.Question;
          })
      })
      .catch(console.log);
  }
}

const [ node, file, command ] = process.argv;

let pageNum = 1;

const executeCommand = (choice) => {
  return app[command](pageNum, "yes")
    .then(answer => {
      if (answer === "no") return process.exit();
      pageNum++;
      return executeCommand(answer);
    })
};

executeCommand();