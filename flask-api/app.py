from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from resources.user import UserResource
from resources.game import GameResource

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
CORS(app)
api = Api(app)


@app.before_first_request
def create_tables():
    db.create_all()


api.add_resource(UserResource, '/user/<string:username>')
api.add_resource(GameResource, '/user/<string:username>/game')

if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(port=5000, debug=True)