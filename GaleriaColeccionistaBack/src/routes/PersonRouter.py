from flask import Blueprint, request, jsonify
from src.services.PersonService import PersonService
from src.models.personModel import Person

getPerson = Blueprint('person_blueprint_get', __name__)
postPerson = Blueprint('person_blueprint_post', __name__)
putPerson = Blueprint('person_blueprint_put', __name__)
deletePerson = Blueprint('person_blueprint_delete', __name__)

@getPerson.route('/',methods=['GET'])

def get_person():
    list_person=PersonService.get_person()
    print("Consola: Personas obtenidas.")

    return jsonify([person.__dict__ for person in list_person])

@postPerson.route('/',methods=['POST'])

def post_person():

    first_name = request.json ['first_name']
    last_name = request.json ['last_name']
    dni = request.json ['dni']
    birth_date = request.json ['birth_date']
    email = request.json ['email']
    telephone = request.json ['telephone']
    id_user_fk = request.json ['id_user_fk']

    print(first_name)
    print(last_name)
    print(dni)
    print(birth_date)
    print(email)
    print(id_user_fk)

    person= Person(None,first_name,last_name,dni,birth_date,email, telephone, id_user_fk)


    if PersonService.post_person(person):
        print('Consola:Persona insertada: ', person)
        return jsonify({'id_person':'','first_name':first_name,'last_name':last_name, 'dni':dni, 'birth_date':birth_date, 'email': email, 'telephone':telephone, 'id_user_fk':id_user_fk })
    
    return jsonify({'id_person':'','first_name':first_name,'last_name':last_name, 'dni':dni, 'birth_date':birth_date, 'email': email, 'telephone':telephone, 'id_user_fk':id_user_fk })

@putPerson.route('/<int:id_person>', methods=['PUT'])

def put_person(id_person):
    
    first_name = request.json ['first_name']
    last_name = request.json ['last_name']
    dni = request.json ['dni']
    birth_date = request.json ['birth_date']
    email = request.json ['email']
    telephone = request.json ['telephone']
    id_user_fk = request.json ['id_user_fk']

    updateperson= Person(id_person,first_name,last_name,dni,birth_date,email, telephone, id_user_fk)
    
   
    PersonService.put_person(id_person, updateperson)
    print('Consola: Persona actualizado: ')
    return 'Página: Persona actualizado.'
   
       
@deletePerson.route('/<int:id_person>', methods=['DELETE'])
def delete_person(id_person):       
    PersonService.delete_person(id_person)
    print('Consola: Persona eliminada.')
    return 'Página: Persona eliminada.'

