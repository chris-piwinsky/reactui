const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    // Set up AWS StepFunctions and CloudWatch Logs clients
    const stepfunctions = new AWS.StepFunctions();
    const cloudwatchlogs = new AWS.CloudWatchLogs();

    // Get the Step Function ARN from environment variables
    const stepFunctionArn = process.env.STEP_FUNCTION_ARN;

    try {
        // Start the Step Function execution
        const executionParams = {
            stateMachineArn: stepFunctionArn,
            input: JSON.stringify(event), // Pass the event data as input
        };
        const executionResponse = await stepfunctions.startExecution(executionParams).promise();

        // Log the Step Function execution response
        console.log('Step Function execution started:', executionResponse);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Step Function execution started successfully.',
                executionArn: executionResponse.executionArn,
            }),
        };
    } catch (error) {
        // Log the error and return an error response
        console.error('Error starting Step Function execution:', error);

        // Log the error details to CloudWatch Logs
        await cloudwatchlogs.createLogGroup({ logGroupName: '/aws/lambda/stepFunctionLambda' }).promise();
        await cloudwatchlogs.createLogStream({ logGroupName: '/aws/lambda/stepFunctionLambda', logStreamName: 'error' }).promise();
        await cloudwatchlogs.putLogEvents({
            logGroupName: '/aws/lambda/stepFunctionLambda',
            logStreamName: 'error',
            logEvents: [
                {
                    timestamp: new Date().getTime(),
                    message: JSON.stringify(error),
                },
            ],
        }).promise();

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error starting Step Function execution.',
                error: error.message,
            }),
        };
    }
};
