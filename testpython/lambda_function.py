import boto3
from botocore.exceptions import ClientError


def lambda_handler(event, context):
    try:
        # Initialize the DynamoDB resource
        dynamodb = boto3.resource('dynamodb')

        # Specify the table name
        table_name = 'YourTableName'

        # Get a reference to the DynamoDB table
        table = dynamodb.Table(table_name)

        # Define the key of the item you want to check for
        item_key = {
            'id': 'unique_id_value'
        }

        # Check if the item already exists
        response = table.get_item(Key=item_key)

        if 'Item' in response:
            # Item already exists, return success
            return {
                'statusCode': 200,
                'body': 'Item already exists in DynamoDB table'
            }
        else:
            # Item doesn't exist, add it to the table
            item = {
                'id': 'unique_id_value',
                'attribute1': 'value1',
                'attribute2': 'value2'
                # Add more attributes as needed
            }

            # Put the item into the table
            table.put_item(Item=item)

            # Return a response indicating the success of the operation
            return {
                'statusCode': 200,
                'body': 'Item added to DynamoDB table'
            }
    except ClientError as e:
        # Handle specific DynamoDB client errors
        error_message = f"DynamoDB Error: {e.response['Error']['Message']}"
        return {
            'statusCode': 500,
            'body': error_message
        }
    except Exception as e:
        # Handle other exceptions
        error_message = f"Error: {str(e)}"
        return {
            'statusCode': 500,
            'body': error_message
        }
