# These code snippets use an open-source library. http://unirest.io/python
response = unirest.get("https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues",
  headers={
    "X-Mashape-Key": "7rqdqoVayZmshO8NXU48ghFdohl0p1eVxhXjsn2suyj8hS93jq",
    "Accept": "application/json"
  }
)
print(response)