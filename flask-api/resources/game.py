from flask_restful import Resource, reqparse
from models.user import UserModel
from models.game import GameModel


class GameResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('gameId',
                        type=int,
                        required=False
                        )
    parser.add_argument('rows',
                        type=int,
                        required=True,
                        help="Game needs number of rows."
                        )
    parser.add_argument('cols',
                        type=int,
                        required=True,
                        help="Game needs number of columns."
                        )
    parser.add_argument('bombs',
                        type=int,
                        required=True,
                        help="Game needs number of bombs."
                        )
    parser.add_argument('board',
                        type=str,
                        required=True,
                        help="Game needs the board."
                        )
    parser.add_argument('cellsState',
                        type=str,
                        required=True,
                        help="Game needs the cellsState."
                        )
    parser.add_argument('cellsClicked',
                        type=int,
                        required=True,
                        help="Game needs cellsClicked."
                        )
    parser.add_argument('minutes',
                        type=int,
                        required=True,
                        help="Game needs number of minutes elapsed."
                        )
    parser.add_argument('seconds',
                        type=int,
                        required=True,
                        help="Game needs number of seconds elapsed."
                        )
    parser.add_argument('millis',
                        type=int,
                        required=True,
                        help="Game needs number of millis elapsed."
                        )
    parser.add_argument('victory',
                        type=int,
                        required=True,
                        help="Game needs if it is a victory."
                        )
    parser.add_argument('endGame',
                        type=int,
                        required=True,
                        help="Game needs if the game is endGame."
                        )

    def post(self, username):
        data = GameResource.parser.parse_args()

        if 'gameId' in data and data['gameId'] is not None:
            try:
                game = GameModel.find_by_id(data['gameId'])
                game.update_to_db(data['board'], data['cellsState'], data['cellsClicked'], data['minutes'],
                                  data['seconds'], data['millis'], data['victory'], data['endGame'])
            except Exception as e:
                print(e)
                return {"message": "An error occurred updating the game."}, 500
        else:
            try:
                user = UserModel.find_by_username(username)
                game = GameModel(user.id, data['rows'], data['cols'], data['bombs'], data['board'], data['cellsState'],
                                 data['cellsClicked'], data['time'])
                game.save_to_db()
            except Exception as e:
                print(e)
                return {"message": "An error occurred creating the game."}, 500

        return game.json(), 201
