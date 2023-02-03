Module.register("MMM-WikipediaFacts", {
	defaults: {
		showTitle: true,
		animationSpeed: 2.5 * 1000,
		updateInterval: 10 * 1000
	},

	start: function () {
		this.loaded = false;
		this.error = false;
		this.fact = null;
		this.sendSocketNotification("GET_FACT", this.config);
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "FACT") {
			this.fact = payload;
			this.loaded = true;
		} else if (notification === "ERROR") {
			this.error = true;
		}
		this.updateDom(this.config.animationSpeed);
	},

	getDom: function () {
		var wrapper = document.createElement("div");
		var fact = document.createElement("div");
		var factTitle = document.createElement("div");

		factTitle.className = "light small dimmed";
		fact.className = "bright medium light";

		wrapper.appendChild(factTitle);
		wrapper.appendChild(fact);

		if (this.error) {
			factTitle.innerHTML = "Nastala chyba při načítání faktů";
		} else if (!this.loaded) {
			factTitle.innerHTML = "Načítání...";
		} else if (this.loaded) {
			if (this.config.showTitle) factTitle.innerHTML = "Věděli jste, že...";
			fact.innerHTML = this.fact;
		}

		return wrapper;
	}
});
