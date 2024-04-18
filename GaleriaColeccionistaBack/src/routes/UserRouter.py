from flask import Blueprint, request, jsonify
from src.services.UserService import UserService
from src.models.userModel import User

getUser = Blueprint('user_blueprint_get', __name__)
postUser = Blueprint('user_blueprint_post', __name__)
putUser = Blueprint('user_blueprint_put', __name__)
deleteUser = Blueprint('user_blueprint_delete', __name__)

@getUser.route('/',methods=['GET'])

def get_user():
    list_user=UserService.get_user()
    print("Consola: Usuarios obtenidos.")

    return jsonify([user.__dict__ for user in list_user])
    

@postUser.route('/',methods=['POST'])

def post_user():

    user_name = request.json ['user_name']
    password = request.json ['password']
    user_type = request.json ['user_type']
    

    print(user_name)
    print(password)
    print(user_type)
    

    user= User(0,user_name,password,user_type)


    if UserService.post_user(user):
        print('Consola:Usuario insertada: ', user)
        return 'Usuario creado.'
    
    return 'Página: Ok'

@putUser.route('/<int:id_user>', methods=['PUT'])

def put_user(id_user):
    
    user_name = request.json ['user_name']
    password = request.json ['password']
    user_type = request.json ['user_type']
    

    updateuser= User(id_user,user_name,password,user_type)
    
   
    UserService.put_user(id_user, updateuser)
    print('Consola: Usuario actualizado: ')
    return 'Página: Usuario actualizado.'
   
       
@deleteUser.route('/<int:id_user>', methods=['DELETE'])
def delete_user(id_user):       
    UserService.delete_user(id_user)
    print('Consola: Usuaro eliminado.')
    return 'Página: Usuario eliminado.'

