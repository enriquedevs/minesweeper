from db import db


class UserModel(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50))

    games = db.relationship('GameModel', lazy='dynamic')

    def __init__(self, username):
        self.username = username

    def json(self):
        return {'username': self.name, 'games': [game.json() for game in self.games.all()]}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()
