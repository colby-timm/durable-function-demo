import * as df from "durable-functions";

const counterEntity = df.entity<number>(function (context) {
    let currentValue = context.df.getState(() => 0);

    switch (context.df.operationName) {
        case "add":
            const amount = context.df.getInput();
            currentValue += amount;
            break;
        case "reset":
            currentValue = 0;
            context.df.return(currentValue);
            break;
        case "get":
            context.df.return(currentValue);
            break;
    }

    context.df.setState(currentValue);
});

export default counterEntity;
