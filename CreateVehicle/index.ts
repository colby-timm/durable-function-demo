import { AzureFunction, Context } from "@azure/functions";
import {v4 as uuidv4} from 'uuid';
import { Vehicle } from '@models';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const vehicleActivity: AzureFunction = async function (context: Context, vehicle: Vehicle): Promise<object> {
    context.log(`Vehicle activity triggered for ${vehicle.name}`);

    // simulate a running process
    await sleep(1000);

    return {
        id: uuidv4(),
        ...vehicle,
    };
};

export default vehicleActivity;
