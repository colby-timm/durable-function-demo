import { AzureFunction, Context } from "@azure/functions";
import {v4 as uuidv4} from 'uuid';
import { Person } from "@models";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const personActivity: AzureFunction = async function (context: Context, person: Person): Promise<object> {
    context.log(`Person activity triggered for ${person.name}`);
    
    // simulate a running process
    await sleep(5000);

    return {
        id: uuidv4(),
        ...person,
    };
};

export default personActivity;
