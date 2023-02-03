var NodeHelper = require("node_helper");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = NodeHelper.create({
	start: function () {
		console.log("Starting module: " + this.name);
		this.fact = null;
		this.factsLength = null;
		this.facts = [];
		this.factsFake = [];
	},

	socketNotificationReceived: function (notification, payload) {
		this.config = payload;
		if (notification === "GET_FACT") {
			if (this.fact === null) {
				this.fetchFacts();
			} else this.sendSocketNotification("FACT", this.fact);
		}
	},

	fetchFacts: async function () {
		try {
			const response = await axios.get(`https://cs.wikipedia.org/wiki/Wikipedie:Zaj%C3%ADmavosti/N%C3%A1vrhy`);
			const html = await response.data;
			var $ = cheerio.load(html);
		} catch (error) {
			this.sendSocketNotification("ERROR");
			console.log("Error due fetch process - ", error);
		}

		const regex = /^\…([^?]*\?)([\s\S])*/;

		$("li").each((index, element) => {
			if (regex.test($(element).text())) {
				var elementValue = $(element).text().replace(regex, "$1").trim();
				this.facts.push(elementValue.charAt(0).toUpperCase() + elementValue.slice(1));
			}
		});

		this.factsLength = this.facts.length;

		if (this.facts.length > 0) {
			console.log(this.factsLength + " facts fetch was successful");
			this.updateFact();
			setInterval(this.updateFact.bind(this), this.config.updateInterval);
		} else {
			this.sendSocketNotification("ERROR");
			console.log("Error due fetch process - no quote");
		}
	},

	updateFact: function () {
		this.fact = this.facts[Math.floor(Math.random() * this.factsLength)];
		this.sendSocketNotification("FACT", this.fact);
	}
});
