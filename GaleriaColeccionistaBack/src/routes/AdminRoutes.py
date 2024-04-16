from flask import Blueprint, request, jsonify, json
from src.services.adminServicesB import adminServicesB
from src.models.userModel import User


main = Blueprint('admin_blueprint',__name__)

@main.route('/',methods=['GET','POST', 'PATCH','DELETE'])


def transformData():
    # Creas una lista para almacenar las instancias de User
    lista_usuarios_serializables = []

    print("Mimiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii.........................")
    # Obtienes los usuarios
    get_users = adminServicesB.get_user()

    # Recorres las tuplas dentro de la tupla principal
    for datos_usuario in get_users:
        # Creas un diccionario con los datos del usuario
        usuario_serializable = {
            "id_user": datos_usuario[0],
            "user_name": datos_usuario[1],
            "password": datos_usuario[2],
            "user_type": datos_usuario[3]
        }
        # Añades el diccionario a la lista de usuarios serializables
        lista_usuarios_serializables.append(usuario_serializable)

    # Verificas que se hayan creado las instancias correctamente
    for usuario in lista_usuarios_serializables:
        print(f"ID: {usuario['id_user']}, Nombre de usuario: {usuario['user_name']}, Tipo de usuario: {usuario['user_type']}")

    return lista_usuarios_serializables


def dashboard_admin_users():
    #user contiene una lista de listas

    print(request)
    print(request.method)
    print("hola .............................................................................................")
    print(request.content_type)

    # if request.method != 'GET':

    #     print(request.json)
    #     id_productProvee = request.json["ID_ProdProvee"]
    #     id_producto = request.json["ID_Producto"]
    #     id_provee = request.json["ID_Proveedor"]
    #     productProvee1 = productProvee(id_productProvee,id_producto,id_provee)

   
    if request.method == 'GET':
        print("hola caracola.............................................................................................")
        # get_users = adminServicesB.get_user()
        # print('el admin se trae los usuarios')
        # print(get_users)
        # return jsonify(get_users)

        #recuperamos los datos de los usuarios y de las personas para devolverlas al front
        datosTransformados = transformData()
        return jsonify(datosTransformados)
    


     # Si el método no es GET, devuelve un error 405 Method Not Allowed
    return jsonify({'error': 'Método no permitido'}), 405