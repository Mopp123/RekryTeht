
import requests

endpoint = "http://localhost:8000/myapi/"

response = requests.get(endpoint, params={"Test" : 123}, json={"query" : "Hello?"})

print(response.json())
