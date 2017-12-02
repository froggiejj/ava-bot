// overwatchleague.com scraper
const Discord = require('discord.js')

//match template
var match =
{
  teamHome: "Some Team",
  matchStatus: "0:00",
  teamAway: "Another Team",
};

var todaysMatches; // array containing the matches for today (3 or 5 on end-of-stage days)

var matchEmbed = new Discord.RichEmbed();

function fillMatchEmbed(matches)
{
  var matchEmbed = new Discord.RichEmbed();

  matchEmbed.setTitle("Today's Overwatch League Matches")
  .setColor(16754176)
  .setDescription("All OWL matches are streamed at [twitch.tv](https://www.twitch.tv/moonmoon_ow)")
  .setFooter("This was created automatically, contact @Froggiejj if there are any issues.");
  //.setThumbnail("https://imgur.com/tXDI0kR");

  for(i = 0; i < matches.length; i++)
  {
  matchEmbed.addField(matches[i].matchStatus, `${matches[i].teamHome} vs ${matches[i].teamAway}`)
  }

  return matchEmbed
};

//TODO: Write a function that will actually scrape the owl site. Create an array of matches that we pass into the fillMatchEmbed function

var Scraper =
{
  fuel: function (msg)
  {
      msg.channel.send("#BurnBlue");
  },

  owl: function (msg)
  {
    var matchEmbed = fillMatchEmbed(todaysMatches);
    msg.channel.send(matchEmbed);
  }
};
module.exports = Scraper;
