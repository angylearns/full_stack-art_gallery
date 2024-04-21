from flask import Blueprint, request, jsonify
from src.services.AuthService import AuthService
from src.models.userModel import User
from src.utils.Security import Security
from src.models.personModel import Person

# login_blueprint = Blueprint('login_blueprint', __name__)

# @login_blueprint.route('/', methods=['POST', 'GET', 'OPTIONS'],strict_slashes=False)


main = Blueprint('adminPerson_blueprint',__name__)

@main.route('/',methods=['GET','POST', 'PATCH','DELETE','OPTIONS'], strict_slashes=False)


def handle_login():
    print(request.method)
    print("cucucucucucucucucucucucucuc")
    if request.method == 'OPTIONS':
        print("estamos en metodo optionss llllllllllllllllllllllllllllllllllllllllllllllllllllllll")
        # Aquí se crea una respuesta JSON con un mensaje indicando que la solicitud pre-vuelo fue exitosa.
        response = jsonify({'message': 'Preflight request success'})
        #Se añade el encabezado Access-Control-Allow-Origin a la respuesta, permitiendo el acceso desde cualquier origen (*).
        response.headers.add('Access-Control-Allow-Origin', '*')
        #Se añade el encabezado Access-Control-Allow-Headers a la respuesta, especificando los encabezados permitidos en las solicitudes reales. En este caso, se permiten los encabezados Content-Type y Authorization.
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        #Se añade el encabezado Access-Control-Allow-Methods a la respuesta, especificando los métodos HTTP permitidos en las solicitudes reales. Aquí se permiten los métodos GET, PUT, POST y DELETE.
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
        # Finalmente, se devuelve la respuesta, completando el manejo de la solicitud OPTIONS y permitiendo que el navegador continúe con la solicitud real si la pre-vuelo fue exitosa.
        return response



    if request.method == 'POST':
        try:
            # Obtiene los datos de usuario y contraseña del cuerpo de la solicitud
            user_name = request.json['user_name']
            password = request.json['password']

            # Crea un objeto User con los datos recibidos
            user = User(0, user_name, password, None)
            person=(Person(None, None, None, None, None, None, None, None))

            log_user = AuthService.auth_login_user(user, person)
             
            if (log_user is not None):
                encode_token = Security.generate_token(log_user)
                return jsonify({'success': True, 'token': encode_token}), 200
            else:
                return jsonify({'success': False}), 401

        except Exception as e:
            return jsonify({'success': False}), 500
        

    # Este get es para sacar la información de la consulta almacenada para poder hacer las comprobaciones de email y user_name al registrar   
    elif request.method == 'GET':
        try:
            # Obtiene el cuerpo JSON de la solicitud            user_name = request.args.get('user_name')
            request_json = request.json
            user_name = request_json.get('user_name')

            # Llama al método para obtener la información del usuario
            user_info = AuthService.get_info_login_user(user_name)

            if user_info is not None:
                # Si se encuentra la información del usuario, devolverla como respuesta
                return jsonify(user_info), 200
            
            else:
                # Si no se encuentra la información del usuario, devolver un mensaje de error
                return jsonify({'error': 'Usuario no encontrado'}), 404
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
