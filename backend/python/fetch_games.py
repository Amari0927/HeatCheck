from nba_api.stats.endpoints import leaguegamefinder
import json

game_finder = leaguegamefinder.LeagueGameFinder(season_nullable="2025-26", season_type_nullable="Regular Season", league_id_nullable='00')

game_data = game_finder.get_data_frames()[0]

games = []

for game_id, group in game_data.groupby('GAME_ID'):
    if len(group) != 2:
        continue  
    
    home_row = group[group['MATCHUP'].str.contains('vs')].iloc[0]
    away_row = group[group['MATCHUP'].str.contains('@')].iloc[0]
    
    games.append({
        "externalId": game_id,
        "season": home_row['SEASON_ID'],
        "gameType": 'REGULAR',
        "gameDate": home_row['GAME_DATE'],
        "homeTeamid": home_row['TEAM_ID'],
        "awayTeamid": away_row['TEAM_ID'],
    })
    
    
print(json.dumps(games, indent=2))

