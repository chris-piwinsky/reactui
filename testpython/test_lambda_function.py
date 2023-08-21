import unittest
from unittest.mock import patch, MagicMock
from botocore.exceptions import ClientError
from lambda_function import lambda_handler

class TestLambdaHandler(unittest.TestCase):
    @patch('lambda_function.boto3')
    def test_lambda_handler_item_exists(self, mock_boto3):
        # Mock DynamoDB resource and table
        mock_dynamodb = MagicMock()
        mock_table = MagicMock()
        mock_table.get_item.return_value = {'Item': {'id': 'unique_id_value'}}
        mock_boto3.resource.return_value = mock_dynamodb
        mock_dynamodb.Table.return_value = mock_table
        
        # Call the Lambda function
        event = {}
        context = {}
        result = lambda_handler(event, context)

        # Assert the result
        self.assertEqual(result['statusCode'], 200)
        self.assertEqual(result['body'], 'Item already exists in DynamoDB table')

    @patch('lambda_function.boto3')
    def test_lambda_handler_item_not_exists(self, mock_boto3):
        # Mock DynamoDB resource and table
        mock_dynamodb = MagicMock()
        mock_table = MagicMock()
        mock_table.get_item.return_value = {}
        mock_boto3.resource.return_value = mock_dynamodb
        mock_dynamodb.Table.return_value = mock_table
        
        # Call the Lambda function
        event = {}
        context = {}
        result = lambda_handler(event, context)

        # Assert the result
        self.assertEqual(result['statusCode'], 200)
        self.assertEqual(result['body'], 'Item added to DynamoDB table')

    @patch('lambda_function.boto3')
    def test_lambda_handler_dynamodb_error(self, mock_boto3):
        # Mock DynamoDB resource and table with a specific error
        mock_dynamodb = MagicMock()
        mock_table = MagicMock()
        mock_table.get_item.side_effect = ClientError({'Error': {'Message': 'DynamoDB Error'}}, 'GetItem')
        mock_boto3.resource.return_value = mock_dynamodb
        mock_dynamodb.Table.return_value = mock_table
        
        # Call the Lambda function
        event = {}
        context = {}
        result = lambda_handler(event, context)

        # Assert the result
        self.assertEqual(result['statusCode'], 500)
        self.assertIn('DynamoDB Error', result['body'])

if __name__ == '__main__':
    unittest.main()
