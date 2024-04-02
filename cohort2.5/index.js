const express = require("express");
const app = express();
app.use(express.json());
const users = [
	{
		name: "John",
		kidneys: [
			{
				healthy: false,
			},
			{
				healthy: false,
			},
			{
				healthy: false,
			},
		],
	},
];

app.get("/getHealthyKidneys", function (req, res) {
	// Use ":name" to capture the parameter from the URL
	const userName = req.query.name;
	let healthyKidneys = 0;
	let unHealthyKidneys = 0;
	let totalKidneys = 0;
	users.forEach((user) => {
		const { name, kidneys } = user;
		console.log(name);
		console.log(typeof name);
		console.log(typeof userName);
		if (name === userName) {
			kidneys.forEach((kidney) => {
				if (kidney.healthy === true) {
					healthyKidneys++;
				} else {
					unHealthyKidneys++;
				}
			});
		}
		totalKidneys = healthyKidneys + unHealthyKidneys;
	});

	res.send({
		healthyKidneys: healthyKidneys,
		unHealthyKidneys: unHealthyKidneys,
		totalKidneys: totalKidneys,
	}); // Use res.send() instead of res.res() and convert to string
});

app.post("/addNewKidney", function (req, res) {
	try {
		const userName = req.body.name;

		const user = users.find((user) => user.name === userName);

		if (!user) {
			return res.status(404).send({ error: "User not found" });
		}

		user.kidneys.push({ healthy: true });

		res.send({
			message: "New kidney added successfully",
		});
	} catch (err) {
		console.error(err);
		res.status(500).send({ error: "Internal Server Error" });
	}
});

app.put("/replacekidney", function (req, res) {
	try {
		const userName = req.body.name;
		const user = users.find((user) => user.name === userName);
		if (!user) {
			return res.status(404).send({ error: "User not found" });
		}
		for (const kidney of user.kidneys) {
			if (!kidney.healthy) {
				kidney.healthy = true;
				return res.status(200).send({
					message: "kidney sucessfully replaced",
				});
				break;
			}
		}

		res.status("404").send({
			message: "no unhealthy kidney found for replacement",
		});
	} catch (error) {
		res.status(500).send({ error: "Internal Server Error" });
	}
});
app.delete("/removeKidney", function (req, res) {
    const userName = req.body.name;
    const isHealthy = req.body.healthy;
    let removedOne = false;
    const user = users.find((user) => user.name === userName);

    try {
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        user.kidneys = user.kidneys.filter((kidney) => {
            if (isHealthy === kidney.healthy && !removedOne) {
                removedOne = true;
                console.log("here");
                return false;
            } else {
                return true;
            }
        });

        res.status(200).send({
            message: "Kidney removed successfully",
        });

        console.log(user.kidneys);
    } catch (err) {
        console.log("Error is:", err);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.listen(3000);
