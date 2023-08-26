import { AzureFunction, Context } from "@azure/functions";

const flakyActivity: AzureFunction = async function (context: Context): Promise<object> {
    context.log('Flaky activity triggered');
    context.bindings
    throw Error('Oops!! An error occurred');
};

export default flakyActivity;
