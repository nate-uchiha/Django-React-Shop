from rest_framework import serializers
from .models import Item, Order, OrderItem

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class ItemSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    label = serializers.SerializerMethodField()
    class Meta:
        model = Item
        fields = ('id', 'title', 'price', 'discount_price', 'category', 'label', 'slug', 'description', 'image')

    def get_category(self, obj):
        return obj.get_category_display()

    def get_label(self, obj):
        return obj.get_label_display()


class OrderItemsSerializer(serializers.ModelSerializer):
    item = StringSerializer()
    item_obj = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ('id', 'item', 'quantity', 'item_obj', 'final_price',)

    def get_item_obj(self, obj):
        return ItemSerializer(obj.item).data

    def get_final_price(self, obj):
        return obj.get_final_price()

class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ('id', 'order_items', 'total',)

    def get_order_items(self, obj):
        print("get_order_items: ",obj.items)
        return OrderItemsSerializer(obj.items.all(), many=True).data

    def get_total(self,obj):
        return obj.get_total()