import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as df from "durable-functions";
import { CounterRequest } from '@models';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Counter HTTP trigger function processed a request.');

    const body: CounterRequest = req.body as CounterRequest;
    const client = df.getClient(context);
    const entityId = new df.EntityId("Counter", body.counterId);
    let stateResponse: df.EntityStateResponse<number>;

    switch (body.counterOption) {
        case "reset":
            await client.signalEntity(entityId, "reset");
            stateResponse = await client.readEntityState(entityId);
        case "get":
            stateResponse = await client.readEntityState(entityId);
    }

    context.log(`ENTITY STATE ${stateResponse.entityState}`)
    context.res = {
        body: {
            count: stateResponse.entityState
        },
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

export default httpTrigger;