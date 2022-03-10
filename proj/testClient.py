
import requests
from users.models import User
#endpoint = "http://localhost:8000/myapi/"

#response = requests.get(endpoint, params={"Test" : 123}, json={"query" : "Hello?"})


print("Current users:")
print(User.objects.all())
#for u in User.objects:
#    print(u)
