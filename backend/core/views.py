from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.permissions import AllowAny, IsAuthenticated

from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist

from .models import Item, Order, OrderItem
from .serializers import ItemSerializer, OrderSerializer



def hello(request):
     return Response("world")

class ItemListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

class AddtoCartView(APIView):
    def post(self, request, *args, **kwargs):
        print("AddToCart Post Method") 
        slug = request.data.get('slug', None)
        if slug is None:
            return Response({"message": "Invalid Request"}, status=HTTP_400_BAD_REQUEST)
        item = get_object_or_404(Item, slug=slug)
        order_item, created = OrderItem.objects.get_or_create(
            item=item,
            user=request.user,
            ordered=False
        )
        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            print("Order Exists: ",order)
            # check if the order item is in the order
            if order.items.filter(item__slug=item.slug).exists():
                print("Item Slug Exisits")
                order_item.quantity += 1
                order_item.save()
                return Response(status=HTTP_200_OK)
            else:
                print("Item Slug Does Not Exisits")
                order.items.add(order_item)
                print("Order Item added")
                return Response(status=HTTP_200_OK)
        else:
            ordered_date = timezone.now()
            order = Order.objects.create(
                user=request.user, ordered_date=ordered_date)
            order.items.add(order_item)
            return Response(status=HTTP_200_OK)

class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated,]
    
    def get_object(self):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
            print("Order in OrderDetailView: ", order)
            return order
        except ObjectDoesNotExist:
            return Response({
                "message": "You do not have an active order"
            }, status= HTTP_400_BAD_REQUEST)