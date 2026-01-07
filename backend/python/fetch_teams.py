from nba_api.stats.static import teams
import json

raw_teams_data = teams.get_teams()

cleaned_teams = []

for team in raw_teams_data:
    team_info = {
        "externalId": team['id'],
        "name": team['full_name'],
        "abbreviation": team['abbreviation'],
    }
    cleaned_teams.append(team_info)

print(json.dumps(cleaned_teams, indent=2))