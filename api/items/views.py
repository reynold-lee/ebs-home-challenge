from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Item
from .serializers import *


@api_view(['GET', 'POST'])
def items_list(request):
    # If GET Request is received
    if request.method == 'GET':
        data = Item.objects.all()
        serializer = ItemSerializer(data, context = {'request' : request}, many = True)
        return Response(serializer.data)
    # If POST Request is received
    elif request.method == 'POST':
        serializer = ItemSerializer(data = request.data)

        if not serializer.is_valid():
            return Response(status = status.HTTP_400_BAD_REQUEST, data=serializer.errors)
        
        item = serializer.save()
        return Response(status = status.HTTP_201_CREATED, data=serializer.data)


@api_view(['PUT', 'DELETE'])
def item_detail(request, id):
    try:
        item = Item.objects.get(id = id)
    except Item.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    # Item whose details are to be edited or deleted, is stored in item object
    # If PUT Request is received
    if request.method == 'PUT':
        serializer = ItemSerializer(item, data = request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK, data=serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # If PUT Request is received
    elif request.method == 'DELETE':
        # Delete above fetched item object
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
