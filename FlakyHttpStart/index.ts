import { AzureFunction, Context, HttpRequest, HttpResponse } from "@azure/functions";
import * as df from "durable-functions";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<HttpResponse> {
    context.log('Flaky HTTP trigger function processed a request.');

    const client = df.getClient(context);
    const instanceId = await client.startNew('FlakyOrchestrator', undefined);

    context.log(`Started Flaky orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(context.bindingData.req, instanceId) as HttpResponse;
};

export default httpTrigger;