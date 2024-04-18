from flask import Blueprint, request, jsonify
from src.services.AuthService import AuthService
from src.models.userModel import User

main = Blueprint('login_blueprint_post', __name__)


@main.route('/',methods=['POST'])

def post_login_user():

    user_name = request.json ['user_name']
    password = request.json ['password']
    
    

    print(user_name)
    print(password)
    
    

    user= User(0,user_name,password,None)


    log_user= AuthService.login_user(user)
    print(log_user)

    if ( log_user != None):
        return jsonify({'success':True})
    else:
        return jsonify({'success':False})
    
    