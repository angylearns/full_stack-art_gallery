from src import init_app
from config import config
from flask_cors import CORS
from flask import jsonify, request

configuration = config['development']
app= init_app(configuration)

# @app.route('/products', methods=['OPTIONS'])
# def options():
#     response = jsonify({'message': 'Preflight request success'})
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
#     response.headers.add('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
#     return response

# @app.route('/products', methods=['POST'])
# def example():
#     if request.content_type == 'application/json':
#         # La solicitud es de tipo JSON
#         data = request.json
#         # Aquí puedes trabajar con los datos JSON
#         return jsonify({'message': 'Received JSON data', 'data': data})
#     else:
#         return jsonify({'error': 'Unsupported Media Type'}), 415

# CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Permitir solicitudes solo desde http://localhost:3000



# @app.route('/')
# def index():
#     return jsonify({'message': 'Hello, CORS is enabled!'})

# @app.route('/persons/', methods=['POST'])
# def create_person():
#     data = request.json  # Obtener los datos JSON de la solicitud
#     # Lógica para crear una nueva persona usando los datos JSON
#     print(data)
#     return jsonify({'message': 'Persona creada exitosamente'})

# @app.route('/persons/', methods=['POST'])
# def create_person():
#     data = request.get_json()
#     # Aquí puedes procesar los datos recibidos
#     return jsonify({'message': 'Person created successfully'}), 201

if __name__=='__main__':

    app.run()