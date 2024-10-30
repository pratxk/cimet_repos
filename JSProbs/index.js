const awards = [
    {
      name: "James Peebles",
      category: "javelin",
      team: "Mumbai Indians",
      year: 2019,
    },
    {
      name: "Michel Mayor",
      category: "javelin",
      team: "Gujarat Titans",
      year: 2019,
    },
    {
      name: "Didier Queloz",
      category: "javelin",
      team: "Gujarat Titans",
      year: 2019,
    },
    {
      name: "John B. Goodenough",
      category: "Shooting",
      team: "Chennai Super Kings",
      year: 2019,
    },
    {
      name: "M. Stanley Whittingham",
      category: "Shooting",
      team: "Chennai Super Kings",
      year: 2019,
    },
    {
      name: "Akira Yoshino",
      category: "Shooting",
      team: "Chennai Super Kings",
      year: 2019,
    },
    {
      name: "Arthur Ashkin",
      category: "javelin",
      team: "Pune Warriors",
      year: 2018,
    },
    {
      name: "Gerard Mourou",
      category: "javelin",
      team: "Deccan Chargers",
      year: 2018,
    },
    {
      name: "Donna Strickland",
      category: "javelin",
      team: "Deccan Chargers",
      year: 2018,
    },
    {
      name: "Frances H. Arnold",
      category: "Shooting",
      team: "Kolkata Riders",
      year: 2018,
    },
    {
      name: "George P. Smith",
      category: "Shooting",
      team: "Sunrisers Hyderabad",
      year: 2018,
    },
    {
      name: "Sir Gregory P. Winter",
      category: "Shooting",
      team: "Sunrisers Hyderabad",
      year: 2018,
    },
  ];
  let prizes = [];

  function calculatePrizes(awards) {

    const prizeData = {};

    awards.forEach(({ name, category, team, year }) => {
        if (!prizeData[year]) {
            prizeData[year] = {};
        }
        if (!prizeData[year][category]) {
            prizeData[year][category] = {};
        }
        if (!prizeData[year][category][team]) {
            prizeData[year][category][team] = [];
        }
        prizeData[year][category][team].push(name);
    });
    console.log(prizeData)

    const results = [];

    for (const year in prizeData) {
        for (const category in prizeData[year]) {
            const teams = prizeData[year][category];
            const teamCount = Object.keys(teams).length;
            const prizePerTeam = 1 / teamCount;

            const winners = [];

            for (const team in teams) {
                const teamWinners = teams[team];
                const sharePerWinner = prizePerTeam / teamWinners.length;

                teamWinners.forEach(name => {
                    winners.push({ name, share: sharePerWinner });
                });
            }

            results.push({
                category,
                year: parseInt(year),
                winners,
            });
        }
    }

    return results;
}


console.log(calculatePrizes(awards));


//   function createCounterPromise(maxCount = 3, timeoutMs = 5000) {  
  //     let counter = 0;
  //     let cancelled = false;
  //     const promise = new Promise((resolve, reject) => {
  //         const intervalId = setInterval(() => {
  //             if (cancelled) {
  //                 clearInterval(intervalId);
  //                 return;
  //             }
  //             counter++;
  //             console.log(`Counter ${counter}`);
  //             if (counter >= maxCount) {
  //                 clearInterval(intervalId);
  //                 resolve(`Done ! Counter reached ${maxCount}`);
  //             }
  //         }, timeoutMs / maxCount);
  //     });
    
  //     return {
  //         promise,
  //         cancel: () => {
  //             cancelled = true;
  //         }
  //     };
  // }
  
  // // Usage:
  // const { promise, cancel } = createCounterPromise(10, 15000);
    
  // promise
  //     .then((result) => {
  //         console.log(result);
  //     })
  //     .catch((error) => {
  //         console.error("Error:", error.message);
  //     });
    