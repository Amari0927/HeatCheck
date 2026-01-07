from nba_api.stats.static import teams
from nba_api.stats.endpoints import commonteamroster
import json
import time
from requests.exceptions import ReadTimeout

teams_list = teams.get_teams()
all_players = []

for team in teams_list:
    try:
        roster = commonteamroster.CommonTeamRoster(team['id'], timeout=60).get_data_frames()[0]
    except ReadTimeout:
        print(f"Timeout for team {team['full_name']}, retrying in 5 seconds...")
        time.sleep(5)
        roster = commonteamroster.CommonTeamRoster(team['id'], timeout=60).get_data_frames()[0]

    for _, row in roster.iterrows():
        # process player
        time.sleep(1)  # pause 1 second before next team
        name_parts = row['PLAYER'].strip().split()
        all_players.append({
            "externalId": row['PLAYER_ID'],
            "firstName": name_parts[0],
            "lastName": ' '.join(name_parts[1:]) if len(name_parts) > 1 else '',
            "position": row['POSITION'],
            "team": team['full_name'],
        })  
        
print(json.dumps(all_players, indent=2))