from flask import Blueprint, request
from src.services.PersonService import PersonService
from src.models.personModel import Person

getPerson = Blueprint('person_blueprint_get', __name__)
postPerson = Blueprint('person_blueprint_post', __name__)
putPerson = Blueprint('person_blueprint_put', __name__)
deletePerson = Blueprint('person_blueprint_delete', __name__)

@getPerson.route('/',methods=['GET'])

def get_person():
    PersonService.get_person()
    print("Consola: Personas obtenidas.")

    return 'Página: Personas obtenidss.'

@postPerson.route('/',methods=['POST'])

def post_person():

    name = request.json ['name']
    last_name = request.json ['last_name']
    dni = request.json ['dni']
    birth_date = request.json ['birth_date']
    email = request.json ['email']
    telephone = request.json ['telephone']
    id_user_fk = request.json ['id_user_fk']

    print(name)
    print(last_name)
    print(dni)
    print(birth_date)
    print(email)

    person= Person(0,name,last_name,dni,birth_date,email, telephone, id_user_fk)


    if PersonService.post_person(person):
        print('Consola:Persona insertada: ', person)
        return 'Persona creado.'
    
    return 'Página: Ok'

@putPerson.route('/<int:id_person>', methods=['PUT'])

def put_person(id_person):
    
    name = request.json ['name']
    last_name = request.json ['last_name']
    dni = request.json ['dni']
    birth_date = request.json ['birth_date']
    email = request.json ['email']
    telephone = request.json ['telephone']
    id_user_fk = request.json ['id_user_fk']

    updateperson= Person(id_person,name,last_name,dni,birth_date,email, telephone, id_user_fk)
    
   
    PersonService.put_person(id_person, updateperson)
    print('Consola: Persona actualizado: ')
    return 'Página: Persona actualizado.'
   
       
@deletePerson.route('/<int:id_person>', methods=['DELETE'])
def delete_person(id_person):       
    PersonService.delete_person(id_person)
    print('Consola: Persona eliminada.')
    return 'Página: Persona eliminada.'

