from src.database.db_mysql import get_connection
from flask import jsonify  # Importa jsonify para devolver JSON

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
                # return result
                return jsonify(result)
               
        except Exception as ex: 
            print(ex)
