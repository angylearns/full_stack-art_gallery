from src.database.db_mysql import get_connection
from src.models.userModel import User
from src.models.personModel import Person
from werkzeug.security import check_password_hash

class AuthService():

    @classmethod
    def login_user(cls, user: User, person:Person):
        try:
            connection = get_connection()

            authenticated_user = None

            with connection.cursor() as cursor:
                
                cursor.execute('CALL sp_login_user(%s)', (user.user_name))
                row = cursor.fetchone()

                if row is not None and check_password_hash(row[2], user.password):
                    user= User(int(row[0]), row[1], row[2], row[3])
    
                    person=Person(row[4], row[5], None, None, None, None, None, user)
                    authenticated_user = person
                    print('A continuación este es el authenticated_user:')
                    print(authenticated_user)

                else:
                    authenticated_user = None 

            connection.close()

            

            return authenticated_user

        except Exception as ex:
            # Imprime cualquier excepción que ocurra durante el proceso de autenticación
            print("Error en login_user:", ex)
            return None
