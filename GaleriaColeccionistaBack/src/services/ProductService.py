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
                print(result)
                connection.close()
                return 'lista actualizada'
               
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
                id_purchase_order_fk = product.id_purchase_oreder_fk
                id_person_fk = product.id_person_fk

                cursor.execute("INSERT INTO product (id_product, url, title, price, material, dimensions, in_stock, style, id_purchase_order_fk, id_person_fk) VALUES ('{0}', '{1}', '{2} ', '{3}', '{4}', '{5}','{6}', '{7}','{8}', '{9}');".format(id_product, url, title, price, material, dimensions, in_stock, style, id_purchase_order_fk, id_person_fk))
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
                cursor.execute("DELETE FROM product WHERE id_product = %s;", (id_product))
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
              id_purchase_order_fk = product.id_purchase_oreder_fk
              id_person_fk = product.id_person_fk
              cursor.execute("UPDATE product SET url = %s, title = %s, price = %s, material = %s, dimensions = %s, in_stock = %s, style = %s, id_purchase_order_fk = %s, id_person_fk = %s WHERE id_product = %s;", ( url, title, price, material, dimensions, in_stock, style, id_purchase_order_fk, id_person_fk, id_product))
              connection.commit()
             connection.close()
             return 'Producto actualizado correctamente'
        except Exception as ex:
               print(ex)
     
