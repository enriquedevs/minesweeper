from db import db


class GameModel(db.Model):
    __tablename__ = 'game'

    id = db.Column(db.Integer, primary_key=True)
    rows = db.Column(db.Integer)
    cols = db.Column(db.Integer)
    bombs = db.Column(db.Integer)
    board = db.Column(db.String(1000))
    cells_state = db.Column(db.String(2000))
    cells_clicked = db.Column(db.Integer)
    minutes = db.Column(db.Integer)
    seconds = db.Column(db.Integer)
    millis = db.Column(db.Integer)
    victory = db.Column(db.Integer)
    end_game = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('UserModel')

    def __init__(self, user_id, rows, cols, bombs, board, cells_state, cells_clicked, minutes, seconds, millis, victory, end_game):
        self.user_id = user_id
        self.rows = rows
        self.cols = cols
        self.bombs = bombs
        self.board = board
        self.cells_state = cells_state
        self.cells_clicked = cells_clicked
        self.minutes = minutes
        self.seconds = seconds
        self.millis = millis
        self.victory = victory
        self.end_game = end_game

    def json(self):
        return {'gameId': self.id,
                'rows': self.rows,
                'cols': self.cols,
                'bombs': self.bombs,
                'board': self.board,
                'cellsState': self.cells_state,
                'cellsClicked': self.cells_clicked,
                'minutes': self.minutes,
                'seconds': self.seconds,
                'millis': self.millis,
                'victory': self.victory,
                'endGame': self.endGame
                }

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def update_to_db(self, board, cells_state, cells_clicked, minutes, seconds, millis, victory, end_game):
        self.board = board
        self.cells_state = cells_state
        self.cells_clicked = cells_clicked
        self.minutes = minutes
        self.seconds = seconds
        self.millis = millis
        self.victory = victory
        self.end_game = end_game
        db.session.commit()
