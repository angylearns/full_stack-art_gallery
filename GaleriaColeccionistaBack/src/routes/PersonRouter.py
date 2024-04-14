from flask import Blueprint, request
from src.services.PersonService import PersonService
from src.models.personModel import Person

main = Blueprint('person_blueprint',__name__)

@main.route('/',methods=['GET', 'POST'])

def get_person():

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

    if request.method == 'GET':
        get_person = PersonService.get_person()
        if get_person:
            return 'Lista productos actualizada'
        else:
            return 'No se pudo acualizar los productos'
        

    elif request.method == 'POST':
        post_person = PersonService.post_person(person)
        if post_person:
            return 'Producto agregado correctamente'
        else:
            return 'No se pudo agregar el producto'  

@main.route('/', methods=['PUT', 'DELETE'])
def update_delete_producto():
    id_person = request.json['id_person']
    name = request.json ['name']
    last_name = request.json ['last_name']
    dni = request.json ['dni']
    birth_date = request.json ['birth_date']
    email = request.json ['email']
    telephone = request.json ['telephone']
    id_user_fk = request.json ['id_user_fk']

    person= Person(id_person,name,last_name,dni,birth_date,email, telephone, id_user_fk)
    
   
    if request.method == 'PUT':
       put_person = PersonService.put_person(id_person, person)
       if put_person:
           return 'Producto editado correctamente'  
       else:
           return 'No se pudo editar el producto'
    
    elif request.method == 'DELETE':
        delete_person = PersonService.delete_person(id_person)
        if delete_person:
            return 'Producto eliminado correctamente'
        else:
            return 'No se pudo eliminar el producto'
