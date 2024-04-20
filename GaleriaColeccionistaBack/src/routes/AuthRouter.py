from flask import Blueprint, request, jsonify
from src.services.AuthService import AuthService
from src.models.userModel import User
from src.utils.Security import Security
from src.models.personModel import Person


main = Blueprint('login_blueprint_post', __name__)


@main.route('/',methods=['POST'])

def post_login_user():

    user_name = request.json['user_name']
    password = request.json['password']

    user= (User(0,user_name,password,None))
    person=(Person(None, None, None, None, None, None, None, None))
    print(user)

    log_user= AuthService.auth_login_user(user, person)
    print('Hola')
    print(log_user)

    if ( log_user != None):
        encode_token=Security.generate_token(log_user)
        return jsonify({'success':True, 'token':encode_token})
    else:
        return jsonify({'success':False})
    
@main.route('/', methods=['GET'])
def check_login_user_exists():
    # Obtiene el cuerpo JSON de la solicitud
    request_json = request.json
    user_name = request_json.get('user_name')

    # Llama al método para obtener la información del usuario
    user_info = AuthService.get_info_login_user(user_name)

    if user_info is not None:
        # Si se encuentra la información del usuario, devolverla como respuesta
        return jsonify(user_info)
    else:
        # Si no se encuentra la información del usuario, devolver un mensaje de error
        return jsonify({'error': 'Usuario no encontrado'}), 404