from src.database.db_mysql import get_connection
from src.models.userModel import User
from src.models.personModel import Person
from werkzeug.security import check_password_hash

class AuthService():

    @classmethod
    def auth_login_user(cls, user: User, person:Person):
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
            print("Error en auth_login_user:", ex)
            return None

    @classmethod
    def get_info_login_user(cls, user_name: str):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute('CALL sp_login_user(%s)', (user_name,))
                row = cursor.fetchone()
                print("Info del usuario:", row)

                if row is not None:
                    # Extrae los datos del usuario y la persona correspondientes
                    user_id = row[0]
                    user_name = row[1]
                    password = row[2]
                    user_type = row[3]
                    person_id = row[4]
                    name = row[5]
                    last_name = row[6]
                    dni = row[7]
                    birth_date = row[8]
                    email = row[9]
                    telephone = row[10]
                    id_user_fk = row[11]

                    # crea un diccionario con los datos extraidos
                    combined_data = {
                        'user_id': user_id,
                        'user_name': user_name,
                        'password': password,
                        'user_type': user_type,
                        'person_id': person_id,
                        'name': name,
                        'last_name': last_name,
                        'dni': dni,
                        'birth_date': birth_date,
                        'email': email,
                        'telephone': telephone,
                        'id_user_fk': id_user_fk
                    }
                    print("Info del usuario:", combined_data)
                    return combined_data
                    
                else:
                    return None
                
        except Exception as ex:
            print("Error al obtener los usuarios:", ex)
            return None
        
        finally:
            connection.close()
