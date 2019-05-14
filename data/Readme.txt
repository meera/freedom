# Use this command and the Agent.json to populate initial Agent Database
# Modify hostname and collection name based on your setup.

mongoimport --host 'localhost:27017'  --db freedomdb --jsonArray --collection agents --file agents.json