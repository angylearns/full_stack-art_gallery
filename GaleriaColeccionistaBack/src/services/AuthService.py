from src.database.db_mysql import get_connection
from src.models.userModel import User
from werkzeug.security import check_password_hash
class AuthService():

    @classmethod
    def login_user(cls, user: User):
        try:
            connection = get_connection()

            authenticated_user = None

            with connection.cursor() as cursor:
                # Imprime el nombre de usuario antes de llamar al procedimiento almacenado
                print("Nombre de usuario:", user.user_name)
                
                cursor.execute('CALL sp_login_user(%s)', (user.user_name,))
                row = cursor.fetchone()

                # Imprime la fila devuelta por el procedimiento almacenado
                print("Fila obtenida:", row)
                print("Row 2:", row[2])

                if row is not None and check_password_hash(row[2], user.password):
                    authenticated_user = row
                else:
                    authenticated_user = None 

            connection.close()

            # Imprime el usuario autenticado (puede ser None si la autenticación falla)
            print("Usuario autenticado:", authenticated_user)

            return authenticated_user

        except Exception as ex:
            # Imprime cualquier excepción que ocurra durante el proceso de autenticación
            print("Error en login_user:", ex)
            return None
