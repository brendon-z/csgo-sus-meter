const SteamUser = require('steam-user');
const GlobalOffensive = require('globaloffensive');
const readlineSync = require("readline-sync");

let client = new SteamUser();
let csgo = new GlobalOffensive(client);

let username = readlineSync.question('Username: ');
let password = readlineSync.question('Password: ', {noEchoBack: true});

client.logOn({
	"accountName": username,
	"password": password
});

client.on('loggedOn', function(details) {
	console.log("Logged into Steam as " + client.steamID.getSteam3RenderedID());
    client.gamesPlayed([730]);
    csgo.on('connectedToGC', function() {
        console.log('Connected to GC!');
        // let sharecode = readlineSync.question('Current game share code: ');
        console.log(client.steamID)
        let sharecode = readlineSync.question('Sharecode: ',);
        csgo.requestGame(sharecode);
        csgo.on('matchList', function(matches, data) {
            console.log('Match details');
            console.log('==============================');
            console.log('Match id: ' + matches[0].matchid);
            console.log('Match time and date: ' + new Date(matches[0].matchtime * 1000));
            console.log('Round stats');
            console.log('------------------------------');
            for (const round of matches[0].roundstatsall) {
                console.log(round.kills);
            }
        });
    })
});


