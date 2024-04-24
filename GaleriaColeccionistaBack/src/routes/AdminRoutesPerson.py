from flask import Blueprint, request, jsonify, json
from src.services.adminServicesB import adminServicesB
from src.models.userModel import User
from src.models.personModel import Person


admin_person_blueprint = Blueprint('admin_person_blueprint', __name__)
@admin_person_blueprint.route('/', methods=['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], strict_slashes=False)


def dashboard_admin_persons():
    
    if request.method != 'GET' and request.method != 'OPTIONS':

        id_user = request.json["id_user"]
        user_name = request.json["user_name"]
        password = request.json["password"]
        user_type = request.json["user_type"]
        user1 = User(id_user,user_name,password,user_type)

        id_person = request.json["id_person"]
        first_name = request.json["first_name"]
        last_name = request.json["last_name"]
        dni = request.json["dni"]
        birth_date = request.json["birth_date"]
        email = request.json["email"]
        telephone = request.json["telephone"]
        id_user_fk = request.json["id_user_fk"]
        person1 = Person(id_person, first_name, last_name, dni, birth_date, email, telephone,id_user_fk)
  
    if request.method == 'GET':
        
        list_persons_serializables = []

        listPersons = adminServicesB.get_persons()
    
        for person_data in listPersons:
          
            person_serializable = {
                "id_person": person_data[0],
                "first_name": person_data[1],
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
           
            list_persons_serializables.append(person_serializable)

        return list_persons_serializables


    elif request.method == 'POST':
        result = adminServicesB.post_PersonUser(user1)
        person1.id_user_fk = adminServicesB.lastUserId()
        result2 = adminServicesB.post_Person(person1)
        return "Ok."
    elif request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight request success'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
        return response
    elif request.method == 'PATCH':
        result = adminServicesB.patchPerson(person1)
        result2 = adminServicesB.patchUser(user1)
    elif request.method == 'DELETE':
        result = adminServicesB.deletePerson(person1)
        result2 = adminServicesB.deleteUser(user1)
        return jsonify({'ok': 'elemento borrado'})

    return jsonify({'error': 'Método no permitido'}), 405