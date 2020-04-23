const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");

inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username",
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    axios.get(queryUrl).then(function(res) {
      const repos = res.data.map(function(repo) {
        //   console.log(res.data[5]   )
        return repo;
      });

    //   const repoNamesStr = repos.join("\n");
      inquirer.
        prompt({
            message: "Enter a Repository Name:",
            name: "repoName",
        })
        .then(function({ repoName }) {
            for(let i = 0; i < repos.length; i++) {
                if(repos[i].name == repoName){
                    console.log(repos[i]);
                    const title = repos[i].name;
                    console.log(title);
                    const description = repos[i].description;
                    const license = repos[i].license.name;
                    console.log(license);
                    var avatar = repos[i].owner.avatar_url

                    avatar = "<p align='center'> <img src='" + avatar + "', width='800'> </p>";

                    const strArr = [avatar, title, description, license];

                    fs.appendFile('README.md', "\n" + strArr.join("\n"), function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                    });
                }
            }
            // console.log(repos[5]);

        });

    //   fs.writeFile("repos.txt", repoNamesStr, function(err) {
    //     if (err) {
    //       throw err;
    //     }

    //     console.log(`Saved ${repoNames.length} repos`);
    //   });
    });
    
    
  });

