from flask import Blueprint, request, jsonify, json
from src.services.adminServicesB import adminServicesB


main = Blueprint('admin_blueprint',__name__)

@main.route('/',methods=['GET','POST', 'PATCH','DELETE'])

def get_admin():

    print(request)
    print(request.method)

    print(request.content_type)

    # if request.method != 'GET':

    #     print(request.json)
    #     id_productProvee = request.json["ID_ProdProvee"]
    #     id_producto = request.json["ID_Producto"]
    #     id_provee = request.json["ID_Proveedor"]
    #     productProvee1 = productProvee(id_productProvee,id_producto,id_provee)

   
    if request.method == 'GET':
       
        get_users = adminServicesB.get_user()
        print('el admin se trae los usuarios')
        print(get_users)
        # return jsonify(get_users)
        return get_users
     # Si el método no es GET, devuelve un error 405 Method Not Allowed
    return jsonify({'error': 'Método no permitido'}), 405