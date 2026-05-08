import dotenv from "dotenv";

import { fetchDepots, fetchVehicles } from "./api.js";
import { knapsack } from "./knapsack.js";

dotenv.config();

const runScheduler = async () => {
  try {
    const token = process.env.TOKEN;

    const depots = await fetchDepots(token);
    const vehicles = await fetchVehicles(token);

    console.log("Depots:", depots);

    console.log(
      "Vehicles Sample:",
      vehicles.slice(0, 3)
    );

    const mechanicHours =
      depots[0].MechanicHours;

    const formattedVehicles = vehicles.map(
      (vehicle) => ({
        hours: vehicle.Duration,
        impact: vehicle.Impact,
      })
    );

    const result = knapsack(
      formattedVehicles,
      mechanicHours
    );

    console.log(
      "Depot Mechanic Hours:",
      mechanicHours
    );

    console.log(
      "Maximum Impact:",
      result
    );

  } catch (error) {
    console.log(error.message);
  }
};

runScheduler();