import * as df from 'durable-functions';

const flakyOrchestrator = df.orchestrator(function* (context) {   
    const retryOptions = new df.RetryOptions(1000, 3); // retry 3 times with first retry interval of 1 second
    retryOptions.backoffCoefficient = 2; // exponential backoff

    yield context.df.callActivityWithRetry('FlakyActivity', retryOptions)
});

export default flakyOrchestrator;
