import unittest
import coverage

# Create a coverage object
cov = coverage.Coverage(source=['lambda_function'])

# Start recording coverage
cov.start()

# Import and run your test suite
from test_lambda_function import TestLambdaHandler
if __name__ == '__main__':
    unittest.main()

# Stop recording coverage
cov.stop()

# Generate a coverage report
cov.save()
cov.report()
