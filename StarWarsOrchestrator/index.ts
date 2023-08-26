import * as df from 'durable-functions';
import { Task } from 'durable-functions/lib/src/task';
import { StarWarsPostRequest } from '@models';

const starWarsOrchestrator = df.orchestrator(function* (context) {
    const bodyRequest: StarWarsPostRequest = context.df.getInput() as StarWarsPostRequest;
    const entityId = new df.EntityId("Counter", bodyRequest.counterId);
    
    const starWarsTasks: Task[] = [];

    bodyRequest.people?.forEach(person => {
        starWarsTasks.push(context.df.callActivity('CreatePerson', person));
    });
    
    bodyRequest.vehicles?.forEach(vehicle => {
        starWarsTasks.push(context.df.callActivity('CreateVehicle', vehicle));
    });

    yield context.df.callEntity(entityId, "add", bodyRequest.people.length);

    const result = yield context.df.Task.all(starWarsTasks);
    context.df.setCustomStatus("Star Wars universe created!");

    return result;
});

export default starWarsOrchestrator;
