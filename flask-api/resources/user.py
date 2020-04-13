from flask_restful import Resource
from models.user import UserModel


class UserResource(Resource):
    def get(self, username):
        user = UserModel.find_by_username(username)
        if user:
            return user.json()
        return {'message': 'User not found'}, 404

    def post(self, username):
        if UserModel.find_by_username(username):
            return {'message': "A user with name '{}' already exists.".format(username)}, 400

        user = UserModel(username)
        try:
            user.save_to_db()
        except Exception as e:
            print(e)
            return {"message": "An error occurred creating the user."}, 500

        return user.json(), 201
