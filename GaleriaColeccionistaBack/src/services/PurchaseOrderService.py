from src.database.db_mysql import get_connection
from src.models.purchaseOrderModel import PurchaseOrder

class PurchaseOrderService():

    @classmethod
    def get_purchaseorder(cls):
        try:
            connection=get_connection()
           
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM purchase_order')
                result= cursor.fetchall()
                print(result)
                connection.close()
                return 'lista actualizada'
               
        except Exception as ex: 
            print(ex)

    @classmethod
    def post_purchaseorder(cls, purchase_order: PurchaseOrder):
        try:
            connection=get_connection()
            print(connection)
        
            with connection.cursor() as cursor:
                id_purchase_order = purchase_order.id_purchase_order
                date = purchase_order.date
                status = purchase_order.status
                id_user_fk = purchase_order.id_user_fk
                

                cursor.execute("INSERT INTO purchase_order (id_purchase_order, date, status, id_user_fk) VALUES ('{0}', '{1}', '{2} ', '{3}');".format(id_purchase_order, date, status, id_user_fk))
                connection.commit()
                connection.close()
                return 'Pedido agregado correctamente'
               
        except Exception as ex: 
            print(ex)

    @classmethod
    def delete_purchaseorder(cls, id_purchase_order):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM purchase_order WHERE id_purchase_order = %s;", (id_purchase_order))
                connection.commit()
            connection.close()
            return 'Pedido eliminado correctamente'
        except Exception as ex:
            print(ex)

    @classmethod
    def put_purchaseorder(cls, id_purchase_order, purchase_order: PurchaseOrder):
        try:
             connection = get_connection()
             with connection.cursor() as cursor:
              date = purchase_order.date
              status = purchase_order.status
              id_user_fk = purchase_order.id_user_fk
              
              cursor.execute("UPDATE purchase_order SET date = %s, status= %s, id_user_fk = %s WHERE id_purchase_order = %s;", (date, status, id_user_fk, id_purchase_order))
              connection.commit()
             connection.close()
             return 'Pedido actualizado correctamente'
        except Exception as ex:
               print(ex)
     
