from src.database.db_mysql import get_connection
from src.models.productModel import Product

class ProductService():

    @classmethod
    def get_product(cls):
        try:
            connection=get_connection()
           
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM product')
                result= cursor.fetchall()
                list_product=[Product.convert_from_BD(row) for row in result]
                print(result)
                connection.close()
                return list_product
               
        except Exception as ex: 
            print(ex)

    @classmethod
    def post_product(cls, product: Product):
        try:
            connection=get_connection()
            print(connection)
        
            with connection.cursor() as cursor:
                id_product = product.id_product
                url = product.url
                title = product.title
                price = product.price
                material = product.material
                dimensions = product.dimensions
                in_stock = product.in_stock
                style = product.style
                id_person_fk = product.id_person_fk

                cursor.callproc("InsertProduct", (id_product, url, title, price, material, dimensions, in_stock, style, id_person_fk))
                connection.commit()
                connection.close()
                return 'Producto agregado correctamente'
               
        except Exception as ex: 
            print(ex)

    @classmethod
    def delete_product(cls, id_product):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.callproc("DeleteProduct", (id_product,))
                connection.commit()
            connection.close()
            return 'Producto eliminado correctamente'
        except Exception as ex:
            print(ex)

    @classmethod
    def put_product(cls, id_product, product: Product):
        try:
             connection = get_connection()
             with connection.cursor() as cursor:
              url = product.url
              title = product.title
              price = product.price
              material = product.material
              dimensions = product.dimensions
              in_stock = product.in_stock
              style = product.style
              id_person_fk = product.id_person_fk
              cursor.callproc("UpdateProduct", (id_product, url, title, price, material, dimensions, in_stock, style, id_person_fk))
              connection.commit()
             connection.close()
             return 'Producto actualizado correctamente'
        except Exception as ex:
               print(ex)
     
    @classmethod
    def get_last_product_id(cls):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute('SELECT MAX(id_product) FROM product')
                result = cursor.fetchone()
                connection.close()
                id_product = result[0] if result[0] is not None else 0
                return id_product
        except Exception as ex:
            print(ex)