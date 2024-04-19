from flask import Blueprint, request, jsonify, json
from src.services.adminServicesB import adminServicesB
from src.models.userModel import User
from src.models.personModel import Person



main = Blueprint('adminPerson_blueprint',__name__)

@main.route('/',methods=['GET','POST', 'PATCH','DELETE','OPTIONS'], strict_slashes=False)


def dashboard_admin_persons():
    #user contiene una lista de listas

    print(request)
    print("blbalalablablabalblablalbalbalblablalbalblalb")
    print(request.method)
    print("typeeee type type type type type type type type type type")
    # request.environ['CONTENT_TYPE'] = 'application/json'
    print(request.content_type)
    #content type llega como None
    
    if request.method != 'GET' and request.method != 'OPTIONS':

        print(request.json)
        id_user = request.json["id_user"]
        user_name = request.json["user_name"]
        password = request.json["password"]
        user_type = request.json["user_type"]
        user1 = User(id_user,user_name,password,user_type)
        print("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        print(user1)

        id_person = request.json["id_person"]
        name = request.json["name"]
        last_name = request.json["last_name"]
        dni = request.json["dni"]
        birth_date = request.json["birth_date"]
        email = request.json["email"]
        telephone = request.json["telephone"]
        id_user_fk = request.json["id_user_fk"]
        person1 = Person(id_person, name, last_name, dni, birth_date, email, telephone,id_user_fk)
        print("persona recuperadaaaaaa del jsonnnnnnnnnnnn")

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
        print("lista personsssssssssssssssssssssssssssssssssssssssssssssssssss")
        print(listPersons)
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
                "id_user":person_data[8],
                "user_name": person_data[9],
                "password":person_data[10],
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
        person1.id_user_fk = adminServicesB.lastUserId()
        print("suerteeeeeeeeeeeeeeeeeeeeMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMee")
        print(person1.id_user_fk)
        result2 = adminServicesB.post_Person(person1)
        return "hola mundo"
    elif request.method == 'OPTIONS':
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
    elif request.method == 'PATCH':
        print("estamos en el metodo patchhhh")
        print(person1)
        print("patch userrrrrr")
        print(user1)
        result = adminServicesB.patchPerson(person1)
        # result2 = adminServicesB.patchUser(user1)


     # Si el método no es GET, devuelve un error 405 Method Not Allowed
    return jsonify({'error': 'Método no permitido'}), 405