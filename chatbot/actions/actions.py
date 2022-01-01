# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from datetime import datetime
from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet, EventType, AllSlotsReset

import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="qlsach"
)

mycursor = mydb.cursor()

# class ActionDefaultFallback(Action):

#     def name(self) -> Text:
#         return "action_default_fallback"

#     async def run(
#         self,
#         dispatcher: CollectingDispatcher,
#         tracker: Tracker,
#         domain: Dict[Text, Any],
#     ) -> List[Dict[Text, Any]]:
#         dispatcher.utter_message(template="utter_default")

#         return [UserUtteranceReverted()]


class ActionResetCancelOrderForm(Action):
    def name(self) -> Text:
        return "action_reset_cancel_order_form"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        return [SlotSet("order_id", None), SlotSet("seller_note", None)]

class ActionResetReturnOrderForm(Action):
    def name(self) -> Text:
        return "action_reset_return_order_form"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        return [SlotSet("order_id", None), SlotSet("seller_note_return", None)]


class ActionFindOrderStatus(Action):
    def name(self) -> Text:
        return "action_find_order_status"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        order_id = tracker.get_slot("order_id")

        sql = "SELECT status FROM orders, orderstatus WHERE orders.status_id = orderstatus.status_id AND order_id = %s" % (
            order_id)

        mycursor.execute(sql)

        status = mycursor.fetchone()

        row_count = mycursor.rowcount

        if row_count == 0:
            dispatcher.utter_message(
                text="Xin lỗi bạn, mã đơn hàng này không tồn tại 😖")
        else:
            mgs = "Tình trạng của đơn hàng %s là: %s" % (order_id, status[0])
            dispatcher.utter_message(text=mgs)

        return [SlotSet("order_id", None)]


class ActionFindOrderDetail(Action):
    def name(self) -> Text:
        return "action_find_order_detail"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        order_id = tracker.get_slot("order_id")

        sql = "SELECT orderdetail.book_id, orderdetail.price, title, authors, image_url, total_price, shipping_fee, discount FROM orderdetail, orders, books WHERE orders.order_id = orderdetail.order_id AND books.book_id = orderdetail.book_id AND orders.order_id = %s" % (
            order_id)

        mycursor.execute(sql)

        orderdetail = mycursor.fetchall()

        row_count = mycursor.rowcount

        if row_count == 0:
            dispatcher.utter_message(
                text="Xin lỗi bạn, mã đơn hàng này không tồn tại 😖")
        else:
            product = []
            for x in orderdetail:
                product.append({
                    "title": x[2],
                    "subtitle": "Giá bán: %s đồng" % (x[1]),
                    "image_url": x[4],
                    # "default_action": {
                    #     "type": "web_url",
                    #     "url": "http://localhost:3000/product?id=%s" % (x[0]),
                    #     "webview_height_ratio": "tall",
                    # },
                    "buttons": [
                        {
                            "type": "web_url",
                            "url": "http://localhost:3000/product?id=%s" % (x[0]),
                            "title": "Xem chi tiết"
                        }
                    ],
                })
            message = {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": product
                }
            }
            lalala = "- Tiền hàng: %s đồng\n\n- Phí giao hàng: %s đồng\n\n- Mã giảm giá: %s đồng\n\n- Tổng cộng: %s đồng" % (
                x[5]-x[6]-x[7], x[6], x[7], x[5]-x[7])
            dispatcher.utter_message(attachment=message)
            dispatcher.utter_message(text=lalala)
        return [SlotSet("order_id", None)]


class ActionFindNewBook(Action):
    def name(self) -> Text:
        return "action_find_new_book"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        sql = "SELECT book_id, title, authors, price, image_url FROM books WHERE status = 1 AND deleted_date IS NULL ORDER BY book_id DESC LIMIT 0, 10"

        mycursor.execute(sql)

        new_books = mycursor.fetchall()

        product = []

        for x in new_books:
            product.append({
                "title": x[1],
                "subtitle": x[2],
                "image_url": x[4],
                "buttons": [
                    {
                        "type": "web_url",
                        "url": "http://localhost:3000/product?id=%s" % (x[0]),
                        "title": "Xem chi tiết"
                    }
                ],
            })
            message = {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": product
                }
            }

        dispatcher.utter_message(
            text="📚 Hiện tại bọn mình có các sản phẩm mới sau:")
        dispatcher.utter_message(attachment=message)

        return []


class ActionFindBook(Action):
    def name(self) -> Text:
        return "action_find_book"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        book_title = tracker.get_slot("book_title")

        tag = "%" + book_title + "%"

        sql = "SELECT book_id, title, authors, price, image_url FROM books WHERE title LIKE '%s' AND status = 1 AND deleted_date IS NULL LIMIT 0, 10" % (
            tag)

        mycursor.execute(sql)

        new_books = mycursor.fetchall()

        row_count = mycursor.rowcount

        if row_count == 0:
            dispatcher.utter_message(
                text="Xin lỗi bạn, bọn mình hiện chưa có sản phẩm này 😥")
        else:
            product = []
            for x in new_books:
                product.append({
                    "title": x[1],
                    "subtitle": x[2],
                    "image_url": x[4],
                    "buttons": [
                        {
                            "type": "web_url",
                            "url": "http://localhost:3000/product?id=%s" % (x[0]),
                            "title": "Xem chi tiết"
                        }
                    ],
                })
                message = {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": product
                    }
                }
            line = "'%s' gồm các sản phẩm sau:" % (book_title)
            dispatcher.utter_message(text=line)
            dispatcher.utter_message(attachment=message)

        return [SlotSet("book_title", None)]


class ActionCancelOrder(Action):
    def name(self) -> Text:
        return "action_cancel_order"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        events = tracker.current_state()['events']
        user_events = []
        for e in events:
            if e['event'] == 'user':
                user_events.append(e)

        custom_data = user_events[-1]['metadata']

        order_id = tracker.get_slot("order_id")

        seller_note = tracker.get_slot("seller_note")

        exist_sql = "SELECT * FROM orders WHERE order_id = %s" % (order_id)

        mycursor.execute(exist_sql)

        status1 = mycursor.fetchone()

        row_count1 = mycursor.rowcount

        if row_count1 == 0:
            dispatcher.utter_message(
                text="Xin lỗi bạn, mã đơn hàng này không tồn tại 😖")
        else:
            if(custom_data["user_id"] != 0):
                check = "SELECT * FROM orders WHERE user_id = %s AND order_id = %s" % (
                    custom_data["user_id"], order_id)

                mycursor.execute(check)

                status2 = mycursor.fetchone()

                row_count2 = mycursor.rowcount

                if row_count2 == 0:
                    dispatcher.utter_message(
                        text="Xin lỗi, bạn không thể hủy đơn hàng của người khác 😖")
                else:
                    if (status2[13] == "cxn"):

                        sql = "UPDATE orders SET status_id = 'dh', seller_note = '%s' WHERE order_id = %s" % (
                            seller_note, order_id)

                        mycursor.execute(sql)

                        mydb.commit()

                        dispatcher.utter_message(
                            text="Yêu cầu hủy đơn đã được gửi 🤗")

                    elif (status2[13] == "clh"):

                        sql = "UPDATE orders SET status_id = 'dh', seller_note = '%s' WHERE order_id = %s" % (
                            seller_note, order_id)

                        mycursor.execute(sql)

                        mydb.commit()

                        dispatcher.utter_message(
                            text="Yêu cầu hủy đơn đã được gửi 🤗")

                    elif (status2[13] == "dh"):
                        dispatcher.utter_message(
                            text="Đơn hàng này đã được hủy từ trước rồi, bạn không cần phải thực hiện lại nữa 🤗")

                    else:
                        dispatcher.utter_message(
                            text="Đơn hàng này đã được gửi đi, bạn không thể hủy đơn 🤗")
            else:
                dispatcher.utter_message(
                    response="utter_required_login")

        return [SlotSet("order_id", None), SlotSet("seller_note", None)]


class ActionReturnOrder(Action):
    def name(self) -> Text:
        return "action_return_order"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        events = tracker.current_state()['events']
        user_events = []
        for e in events:
            if e['event'] == 'user':
                user_events.append(e)

        custom_data = user_events[-1]['metadata']

        order_id = tracker.get_slot("order_id")

        seller_note = tracker.get_slot("seller_note_return")

        exist_sql = "SELECT * FROM orders WHERE order_id = %s" % (order_id)

        mycursor.execute(exist_sql)

        status1 = mycursor.fetchone()

        row_count1 = mycursor.rowcount

        if row_count1 == 0:
            dispatcher.utter_message(
                text="Xin lỗi bạn, mã đơn hàng này không tồn tại 😖")
        else:
            if(custom_data["user_id"] != 0):
                check = "SELECT * FROM orders WHERE user_id = %s AND order_id = %s" % (
                    custom_data["user_id"], order_id)

                mycursor.execute(check)

                status2 = mycursor.fetchone()

                row_count2 = mycursor.rowcount

                if row_count2 == 0:
                    dispatcher.utter_message(
                        text="Xin lỗi, đơn hàng này là của người khác mà 😖")
                else:
                    if (status2[13] == "ht"):

                        sql = "UPDATE orders SET status_id = 'aro', seller_note = '%s' WHERE order_id = %s" % (
                            seller_note, order_id)

                        mycursor.execute(sql)

                        mydb.commit()

                        dispatcher.utter_message(
                            text="Yêu cầu trả hàng đã được gửi, nhớ chờ điện thoại nhé, bọn mình sẽ liên hệ đến bạn ngay thôi 🤗")
                    elif (status2[13] == "dh"):
                        dispatcher.utter_message(
                            text="Bạn đã hủy đơn hàng này rồi mà 😰")
                    else:
                        dispatcher.utter_message(
                            text="Đơn hàng đang trong quá trình giao, bạn không thể trả hàng 😬")
            else:
                dispatcher.utter_message(
                    response="utter_required_login")

        return [SlotSet("order_id", None), SlotSet("seller_note_return", None)]


class ActionFindPromotion(Action):
    def name(self) -> Text:
        return "action_find_promotion"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        today = datetime.today().strftime('%Y-%m-%d')

        sql = "SELECT * FROM promotions WHERE public = 1 AND deleted_date IS NULL AND status = 1 AND '%s' < expired_date" % (
            today)

        mycursor.execute(sql)

        vouchers = mycursor.fetchall()

        row_count = mycursor.rowcount

        if row_count == 0:
            dispatcher.utter_message(
                text="Xin lỗi bạn, hiện tại bọn mình chưa có chương trình khuyến mãi nào 🥲")
        else:
            mgs = "❤️ Chương trình khuyến mãi đang diễn ra tại Book Lovers bao gồm"
            dispatcher.utter_message(text=mgs)
            for i in vouchers:
                promo = '🎁 Chương trình "%s" \n\n📅 Diễn ra từ %s đến hết %s \n\n🧧 Giảm ngay %s%s tối đa %s₫ \n\n🎉 Nhập ngay mã: %s' % (
                    i[7], i[5].strftime("%d-%m-%Y"), i[6].strftime("%d-%m-%Y"), i[1], i[4], i[2], i[0].upper())
                dispatcher.utter_message(text=promo)

        return [SlotSet("order_id", None)]
