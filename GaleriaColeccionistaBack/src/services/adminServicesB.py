from src.database.db_mysql import get_connection
from flask import jsonify  # Importa jsonify para devolver JSON
from src.models.userModel import User

class adminServicesB():

    @classmethod
    def get_user(cls):
        try:
            connection = get_connection()
           
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM user')
                result = cursor.fetchall()
                connection.close()
                print("resultadoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo")
                print(result)
                print(jsonify(result))
                print("cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc")
                # Devolver los resultados en formato JSON
                return result
                # return jsonify(result)
               
        except Exception as ex: 
            print(ex)


    @classmethod
    def get_persons(cls):
        try:
            connection = get_connection()
           
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM person JOIN user ON id_user_fk = id_user')
                result = cursor.fetchall()
                connection.close()
                
                print(result)
                
                print(jsonify(result))
                
                # Devolver los resultados en formato JSON
                return result
                # return jsonify(result)
               
        except Exception as ex: 
            print(ex)



    @classmethod
    def post_PersonUser(cls, user:User):
        try:
            connection = get_connection()
            print(connection)
            with connection.cursor() as cursor:
                id_user = user.id_user
                user_name = user.user_name
                password = user.password
                user_type = user.user_type

                cursor.execute("INSERT INTO user (id_user, user_name, password, user_type )"+
                           "VALUES ('{0}','{1}','{2}','{3}')".format(id_user,user_name,password,user_type))
                connection.commit()
            print("cucucucucucucucucucucucuc")
            connection.close()
            return 0
        except Exception as ex:
            print(ex)
