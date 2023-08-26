import { AzureFunction, Context, HttpRequest, HttpResponse } from "@azure/functions";
import * as df from "durable-functions";
import { StarWarsPostRequest } from '@models';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<HttpResponse> {
    context.log('Star Wars HTTP trigger function processed a request.');

    const body: StarWarsPostRequest = req.body as StarWarsPostRequest;

    const client = df.getClient(context);
    const instanceId = await client.startNew('StarWarsOrchestrator', undefined, body);

    context.log(`Started Star Wars orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(context.bindingData.req, instanceId) as HttpResponse;
};

export default httpTrigger;