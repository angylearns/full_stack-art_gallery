from flask import Blueprint, request, jsonify
from src.services.AuthService import AuthService
from src.models.userModel import User
from src.utils.Security import Security
from src.models.personModel import Person

main = Blueprint('adminPerson_blueprint',__name__)

@main.route('/',methods=['GET','POST', 'PATCH','DELETE','OPTIONS'], strict_slashes=False)


def handle_login():
    
    if request.method == 'OPTIONS':
    
        response = jsonify({'message': 'Preflight request success'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
        return response

    if request.method == 'POST':
        try:
            user_name = request.json['user_name']
            password = request.json['password']

            user = User(None, user_name, password, None)
            person=(Person(None, None, None, None, None, None, None, None))

            log_user = AuthService.auth_login_user(user, person)
             
            if (log_user is not None):
                encode_token = Security.generate_token(log_user)
                return jsonify({'success': True, 'token': encode_token}), 200
            else:
                return jsonify({'success': False}), 401

        except Exception as e:
            return jsonify({'success': False}), 500
        

    elif request.method == 'GET':
        try:
            request_json = request.json
            user_name = request_json.get('user_name')

            user_info = AuthService.get_info_login_user(user_name)

            if user_info is not None:
                return jsonify(user_info), 200
            
            else:
                return jsonify({'error': 'Usuario no encontrado'}), 404
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500