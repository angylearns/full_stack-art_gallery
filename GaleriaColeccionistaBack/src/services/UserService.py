from src.database.db_mysql import get_connection
from src.models.userModel import User

class UserService():

    @classmethod
    def get_user(cls):
        try:
            connection=get_connection()
           
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM user')
                result= cursor.fetchall()
                print(result)
                connection.close()
                return 'lista actualizada'
               
        except Exception as ex: 
            print(ex)

    @classmethod
    def post_user(cls, user: User):
        try:
            connection=get_connection()
            print(connection)
        
            with connection.cursor() as cursor:
                id_user = user.id_user
                user_name = user.user_name
                password = user.password
                user_type = user.user_type
                

                cursor.execute("INSERT INTO user (id_user, user_name, password, user_type) VALUES ('{0}', '{1}', '{2} ', '{3}');".format(id_user, user_name, password, user_type))
                connection.commit()
                connection.close()
                return 'Usuario agregado correctamente'
               
        except Exception as ex: 
            print(ex)

    @classmethod
    def delete_user(cls, id_user):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM user WHERE id_person = %s;", (id_user))
                connection.commit()
            connection.close()
            return 'Usuario eliminado correctamente'
        except Exception as ex:
            print(ex)

    @classmethod
    def put_user(cls, id_user, user: User):
        try:
             connection = get_connection()
             with connection.cursor() as cursor:
              user_name = user.user_name
              password = user.password
              user_type = user.user_type
              
              cursor.execute("UPDATE user SET user_name = %s, password= %s, user_type = %s WHERE id_user = %s;", (user_name, password, user_type, id_user))
              connection.commit()
             connection.close()
             return 'Usuario actualizado correctamente'
        except Exception as ex:
               print(ex)
     
