import pymysql

def get_connection():
    try:
        return pymysql.connect(
            host='localhost',
            database='db_galeria_coleccionista',
            user='root',
            passwd=''
)
       
    except Exception as ex: 
        print (ex)