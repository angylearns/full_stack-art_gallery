from flask import Blueprint, request, jsonify, json
from src.services.adminServicesB import adminServicesB
from src.models.userModel import User


main = Blueprint('adminPerson_blueprint',__name__)

@main.route('/',methods=['GET','POST', 'PATCH','DELETE','OPTIONS'])


def dashboard_admin_persons():
    #user contiene una lista de listas

    print(request)
    print("blbalalablablabalblablalbalbalblablalbalblalb")
    print(request.method)
    print("typeeee type type type type type type type type type type")
    print(request.content_type)

    if request.method != 'GET':

        print(request.json)
        id_user = request.json["id_user"]
        user_name = request.json["user_name"]
        password = request.json["password"]
        user_type = request.json["user_type"]
        user1 = User(id_user,user_name,password,user_type)
        print("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        print(user1)

    # if request.method != 'GET':

    #     print(request.json)
    #     id_productProvee = request.json["ID_ProdProvee"]
    #     id_producto = request.json["ID_Producto"]
    #     id_provee = request.json["ID_Proveedor"]
    #     productProvee1 = productProvee(id_productProvee,id_producto,id_provee)

   
    if request.method == 'GET':
        print("miki............................miki...........................miki")
        # get_users = adminServicesB.get_user()
        # print('el admin se trae los usuarios')
        # print(get_users)
        # return jsonify(get_users)

        #recuperamos los datos de los usuarios y de las personas para devolverlas al front
        # datosTransformados = transformData()
        # return jsonify(datosTransformados)

        # Creas una lista para almacenar las instancias de User
        list_persons_serializables = []

        print("Mooooooooooooooooooooooooooooiiiiii.........................")
        #    Obtienes los usuarios
        listPersons = adminServicesB.get_persons()

        # Recorres las tuplas dentro de la tupla principal
        for person_data in listPersons:
        # Creas un diccionario con los datos del usuario
            person_serializable = {
                "id_person": person_data[0],
                "name": person_data[1],
                "last_name": person_data[2],
                "dni": person_data[3],
                "birth_date": person_data[4],
                "email": person_data[5],
                "telephone": person_data[6],
                "id_user_fk": person_data[7],
                "user_name": person_data[9],
                "user_type": person_data[11],
            }
            # Añades el diccionario a la lista de usuarios serializables
            list_persons_serializables.append(person_serializable)

    # Verificas que se hayan creado las instancias correctamente
    # for usuario in list_persons_serializables:
    #     print(f"ID: {usuario['id_user']}, Nombre de usuario: {usuario['user_name']}, Tipo de usuario: {usuario['user_type']}")

        return list_persons_serializables


    elif request.method == 'POST':
        result = adminServicesB.post_PersonUser(user1)
        return 0


     # Si el método no es GET, devuelve un error 405 Method Not Allowed
    return jsonify({'error': 'Método no permitido'}), 405